const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

// Mock browser environment
global.window = {
    addEventListener: () => {},
    dataLayer: [],
    location: { pathname: '/' }
};

global.document = {
    addEventListener: () => {},
    getElementById: () => null,
    createElement: () => ({}),
    head: {
        appendChild: () => {}
    },
    cookie: ''
};

// Load the script
const scriptPath = path.resolve(__dirname, '../js/cookie-consent.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Eval the script content in the global scope to make setCookie and getCookie available
eval(scriptContent);

test('cookie-consent.js utilities', async (t) => {
    await t.test('setCookie should set a cookie with name, value and days', () => {
        setCookie('testCookie', 'testValue', 7);
        assert.ok(global.document.cookie.includes('testCookie=testValue'));
        assert.ok(global.document.cookie.includes('expires='));
        assert.ok(global.document.cookie.includes('path=/'));
    });

    await t.test('setCookie should set a session cookie when days is not provided', () => {
        global.document.cookie = ''; // Reset
        setCookie('sessionCookie', 'sessionValue');
        assert.ok(global.document.cookie.includes('sessionCookie=sessionValue'));
        assert.ok(!global.document.cookie.includes('expires='));
        assert.ok(global.document.cookie.includes('path=/'));
    });

    await t.test('setCookie should handle empty values', () => {
        global.document.cookie = ''; // Reset
        setCookie('emptyCookie', '');
        assert.ok(global.document.cookie.includes('emptyCookie='));
        assert.ok(global.document.cookie.includes('path=/'));
    });

    await t.test('getCookie should retrieve a cookie value', () => {
        global.document.cookie = 'foo=bar; testCookie=testValue; other=val';
        assert.strictEqual(getCookie('testCookie'), 'testValue');
        assert.strictEqual(getCookie('foo'), 'bar');
        assert.strictEqual(getCookie('other'), 'val');
    });

    await t.test('getCookie should return null for non-existent cookie', () => {
        global.document.cookie = 'foo=bar';
        assert.strictEqual(getCookie('nonExistent'), null);
    });
});
