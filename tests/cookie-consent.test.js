const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

// Mock browser environment
global.document = {
    _cookies: '',
    get cookie() {
        return this._cookies;
    },
    set cookie(val) {
        // Simple mock: append if not present, or replace if we want to be more realistic
        // For these tests, we'll just track the latest set for simplicity or use a more complex mock
        if (this._cookies) {
            this._cookies += '; ' + val.split(';')[0];
        } else {
            this._cookies = val.split(';')[0];
        }
    },
    addEventListener: () => {},
    getElementById: () => null,
    createElement: () => ({})
};
global.window = {};

// Load the script
const scriptPath = path.resolve(__dirname, '../js/cookie-consent.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Eval the script content in the global scope
eval(scriptContent);

test('Cookie utility functions', async (t) => {
    await t.test('setCookie should set a cookie', () => {
        global.document._cookies = '';
        setCookie('test-cookie', 'test-value', 1);
        assert.ok(global.document.cookie.includes('test-cookie=test-value'));
    });

    await t.test('getCookie should retrieve a set cookie', () => {
        global.document._cookies = 'user=jules; theme=dark';
        assert.strictEqual(getCookie('user'), 'jules');
        assert.strictEqual(getCookie('theme'), 'dark');
    });

    await t.test('getCookie should return null if cookie not found', () => {
        global.document._cookies = 'user=jules';
        assert.strictEqual(getCookie('non-existent'), null);
    });

    await t.test('setCookie and getCookie should work together', () => {
        global.document._cookies = '';
        setCookie('session', '12345', 1);
        assert.strictEqual(getCookie('session'), '12345');
    });
});
