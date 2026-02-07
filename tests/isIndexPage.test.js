const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

// Mock browser environment
global.window = {
    location: {
        pathname: ''
    },
    innerWidth: 1024,
    addEventListener: () => {}
};

global.document = {
    addEventListener: () => {},
    querySelectorAll: () => [],
    querySelector: () => null,
    body: {
        style: {}
    }
};

// Load the script
const scriptPath = path.resolve(__dirname, '../js/unified-menu.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Eval the script content in the global scope
eval(scriptContent);

test('isIndexPage utility', async (t) => {
    await t.test('should return true for index.html', () => {
        global.window.location.pathname = '/index.html';
        assert.strictEqual(isIndexPage(), true);
    });

    await t.test('should return true for path ending with /', () => {
        global.window.location.pathname = '/';
        assert.strictEqual(isIndexPage(), true);
    });

    await t.test('should return true for path ending with \\', () => {
        global.window.location.pathname = '\\';
        assert.strictEqual(isIndexPage(), true);
    });

    await t.test('should return true for index.html in a subdirectory', () => {
        global.window.location.pathname = '/subdir/index.html';
        assert.strictEqual(isIndexPage(), true);
    });

    await t.test('should return true for a subdirectory ending with /', () => {
        global.window.location.pathname = '/subdir/';
        assert.strictEqual(isIndexPage(), true);
    });

    await t.test('should return false for home.html', () => {
        global.window.location.pathname = '/home.html';
        assert.strictEqual(isIndexPage(), false);
    });

    await t.test('should return false for comuni.html', () => {
        global.window.location.pathname = '/comuni.html';
        assert.strictEqual(isIndexPage(), false);
    });

    await t.test('should return false for other paths', () => {
        global.window.location.pathname = '/some-other-page';
        assert.strictEqual(isIndexPage(), false);
    });
});
