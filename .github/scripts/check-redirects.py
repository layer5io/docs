#!/usr/bin/env python3
"""Verify every old_path in PATHMAP.csv resolves in the built site to a page or alias stub.

Usage: check-redirects.py <PATHMAP.csv> <public-dir>
"""
import csv
import sys
from pathlib import Path
from urllib.parse import unquote, urlparse


def resolves(public: Path, old_path: str) -> bool:
    path = unquote(urlparse(old_path.strip()).path).strip("/")
    candidates = [public / path / "index.html", public / f"{path}.html", public / path]
    if not path:
        candidates = [public / "index.html"]
    return any(c.is_file() for c in candidates)


def main() -> int:
    pathmap, public = Path(sys.argv[1]), Path(sys.argv[2])
    if not pathmap.is_file():
        print(f"{pathmap} not found", file=sys.stderr)
        return 1
    missing = []
    with pathmap.open(newline="") as fh:
        for row in csv.DictReader(fh):
            old = (row.get("old_path") or "").strip()
            if old and not resolves(public, old):
                missing.append(old)
    for old in missing:
        print(f"Unresolved redirect: {old}", file=sys.stderr)
    print(f"{len(missing)} unresolved")
    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main())
