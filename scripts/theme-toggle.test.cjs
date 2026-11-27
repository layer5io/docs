const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { runInNewContext } = require('node:vm');

const partial = (name) => readFileSync(join(__dirname, '../layouts/partials', name), 'utf8');
const script = (html) => html.match(/<script>([\s\S]*?)<\/script>/)[1];
const earlyScript = script(partial('head.html'));
const controller = script(partial('theme-toggle-script.html'));

function page({ saved, blocked = false } = {}) {
  const root = new Map();
  const labels = new Map();
  const events = {};
  let stored = saved;
  let writes = 0;
  let click;
  const localStorage = {
    getItem() {
      if (blocked) throw new Error('Storage disabled');
      return stored ?? null;
    },
    setItem(key, value) {
      if (blocked) throw new Error('Storage disabled');
      writes++;
      stored = value;
    },
  };
  const toggle = {
    hidden: true,
    setAttribute: (key, value) => labels.set(key, value),
    addEventListener: (type, callback) => { click = callback; },
  };
  const context = {
    localStorage,
    document: {
      documentElement: {
        setAttribute: (key, value) => root.set(key, value),
        getAttribute: (key) => root.get(key),
      },
      getElementById: () => toggle,
    },
    window: { addEventListener: (type, callback) => { events[type] = callback; } },
  };
  runInNewContext(earlyScript, context);
  const initialTheme = root.get('data-theme');
  runInNewContext(controller, context);
  return {
    root, labels, toggle, initialTheme,
    click: () => click(),
    writes: () => writes,
    stored: () => stored,
    storage: (key, newValue, storageArea = localStorage) => events.storage({ key, newValue, storageArea }),
  };
}

test('restores a valid preference and initializes without writing storage', () => {
  for (const saved of [undefined, 'dark', 'light', 'invalid']) {
    const p = page({ saved });
    const expected = saved === 'light' ? 'light' : 'dark';
    assert.equal(p.initialTheme, expected);
    assert.equal(p.root.get('data-bs-theme'), expected);
    assert.equal(p.writes(), 0);
    assert.equal(p.toggle.hidden, false);
  }
});

test('switches both theme attributes, persists explicit choices, and updates action labels', () => {
  const p = page();
  p.click();
  assert.equal(p.root.get('data-theme'), 'light');
  assert.equal(p.root.get('data-bs-theme'), 'light');
  assert.equal(p.stored(), 'light');
  assert.equal(p.labels.get('aria-label'), 'Switch to dark theme');
  assert.equal(p.labels.get('title'), 'Switch to dark theme');
  p.click();
  assert.equal(p.stored(), 'dark');
  assert.equal(p.labels.get('aria-label'), 'Switch to light theme');
});

test('continues switching when storage reads and writes throw', () => {
  const p = page({ blocked: true });
  assert.equal(p.initialTheme, 'dark');
  p.click();
  assert.equal(p.root.get('data-theme'), 'light');
  assert.equal(p.labels.get('aria-label'), 'Switch to dark theme');
});

test('syncs changes, removals, and clear events without writing back', () => {
  const p = page();
  p.storage('theme', 'light');
  assert.equal(p.root.get('data-theme'), 'light');
  assert.equal(p.root.get('data-bs-theme'), 'light');
  p.storage('theme', null);
  assert.equal(p.root.get('data-theme'), 'dark');
  p.storage('theme', 'light');
  p.storage(null, null);
  assert.equal(p.root.get('data-theme'), 'dark');
  assert.equal(p.writes(), 0);
});

test('ignores unrelated keys and session storage events', () => {
  const p = page({ saved: 'light' });
  p.storage('sidebar-width', '260');
  p.storage('theme', 'dark', {});
  assert.equal(p.root.get('data-theme'), 'light');
  assert.equal(p.writes(), 0);
});
