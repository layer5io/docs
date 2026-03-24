#!/usr/bin/env python3
"""Build a single-file markdown digest from a Hugo content directory.

Usage: python3 build-digest.py <content_dir> <output_file> <title>

Excludes: release notes, helm chart values, images, videos, HTML comments, Hugo shortcodes.
"""

import sys
import os
import re
from datetime import datetime, timezone
from pathlib import Path


def strip_front_matter(text: str) -> str:
    """Remove YAML front matter delimited by ---."""
    if text.startswith("---"):
        end = text.find("---", 3)
        if end != -1:
            return text[end + 3:].lstrip("\n")
    return text


def extract_title(text: str) -> str | None:
    """Extract title from YAML front matter."""
    if not text.startswith("---"):
        return None
    end = text.find("---", 3)
    if end == -1:
        return None
    fm = text[3:end]
    for line in fm.split("\n"):
        line = line.strip()
        if line.lower().startswith("title:"):
            title = line[6:].strip()
            # Remove quotes
            if (title.startswith('"') and title.endswith('"')) or \
               (title.startswith("'") and title.endswith("'")):
                title = title[1:-1]
            return title
    return None


def clean_body(body: str) -> str:
    """Remove images, videos, shortcodes, HTML, and comments from markdown body."""
    # Remove HTML comments (multiline)
    body = re.sub(r'<!--.*?-->', '', body, flags=re.DOTALL)

    # Remove style blocks
    body = re.sub(r'<style>.*?</style>', '', body, flags=re.DOTALL)

    # Remove script blocks
    body = re.sub(r'<script>.*?</script>', '', body, flags=re.DOTALL)

    lines = body.split('\n')
    cleaned = []
    for line in lines:
        # Skip image references (markdown images with image/video extensions)
        if re.match(r'^\s*!\[.*?\]\(.*?\.(png|jpg|jpeg|gif|svg|webp|mp4|webm|mov|avi).*?\)\s*$', line, re.IGNORECASE):
            continue

        # Skip lines that are entirely a Hugo shortcode call
        if re.match(r'^\s*\{\{[<%<\*]', line):
            continue

        # Remove any inline Hugo shortcode tags: {{< ... >}}, {{% ... %}}, {{</* ... */>}}
        line = re.sub(r'\{\{[<%<\*]+.*?[%>\*>]+\}\}', '', line)
        # Catch {{ ... }} template calls
        line = re.sub(r'\{\{.*?\}\}', '', line)

        # Remove remaining HTML tags but keep content
        line = re.sub(r'<[^>]+>', '', line)

        cleaned.append(line)

    body = '\n'.join(cleaned)

    # Collapse 3+ consecutive blank lines to 2
    body = re.sub(r'\n{3,}', '\n\n', body)

    return body.strip()


def title_from_path(filepath: Path) -> str:
    """Derive a title from the file path."""
    name = filepath.stem
    if name in ('_index', 'index'):
        name = filepath.parent.name
    # Convert hyphens/underscores to spaces, title case
    return name.replace('-', ' ').replace('_', ' ').title()


def heading_depth(relpath: Path, is_index: bool) -> int:
    """Calculate heading depth from relative path depth."""
    parts = list(relpath.parts)
    depth = len(parts)
    if is_index:
        depth -= 1
    # Clamp between 2 and 4
    return max(2, min(4, depth))


def main():
    if len(sys.argv) != 4:
        print(f"Usage: {sys.argv[0]} <content_dir> <output_file> <title>")
        sys.exit(1)

    content_dir = Path(sys.argv[1])
    output_file = Path(sys.argv[2])
    doc_title = sys.argv[3]

    # Collect all markdown files, excluding releases and helm-chart-values
    md_files = []
    for f in sorted(content_dir.rglob("*.md")):
        rel = f.relative_to(content_dir)
        parts = rel.parts

        # Exclude release notes
        if 'releases' in parts:
            continue
        # Exclude helm chart values
        if f.name == 'helm-chart-values.md':
            continue

        md_files.append(f)

    now = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    out_lines = [
        f"# {doc_title}\n",
        f"> Auto-generated documentation digest. Source: `{content_dir}`  ",
        f"> Generated: {now}\n",
        "---\n",
    ]

    file_count = 0
    for filepath in md_files:
        raw = filepath.read_text(encoding='utf-8', errors='replace')

        title = extract_title(raw) or title_from_path(filepath)
        body = strip_front_matter(raw)
        body = clean_body(body)

        # Skip empty files
        if not body.strip():
            continue

        rel = filepath.relative_to(content_dir)
        is_index = filepath.stem in ('_index', 'index')
        depth = heading_depth(rel, is_index)
        heading = '#' * depth

        out_lines.append(f"\n{heading} {title}\n")
        out_lines.append(body)
        out_lines.append("\n\n---\n")
        file_count += 1

    output_file.write_text('\n'.join(out_lines), encoding='utf-8')
    total_lines = sum(1 for _ in output_file.read_text().split('\n'))
    print(f"Done: {total_lines} lines, {file_count} documents written to {output_file}")


if __name__ == '__main__':
    main()
