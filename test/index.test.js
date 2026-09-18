import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidIFSC, parseIFSC, getBankName, normalizeIFSC, BANK_CODES } from '../src/index.js';

test('normalizeIFSC', () => {
  assert.equal(normalizeIFSC(' sbin0000001 '), 'SBIN0000001');
  assert.equal(normalizeIFSC(''), '');
  assert.equal(normalizeIFSC(null), '');
  assert.equal(normalizeIFSC(undefined), '');
});

test('isValidIFSC - Valid codes (strict mode default)', () => {
  assert.equal(isValidIFSC('SBIN0000001'), true);
  assert.equal(isValidIFSC('HDFC0000001'), true);
  assert.equal(isValidIFSC('ICIC0000104'), true);
  assert.equal(isValidIFSC('UTIB0000005'), true);
  assert.equal(isValidIFSC('KKBK0000001'), true);
  assert.equal(isValidIFSC('BARB0000001'), true);
  assert.equal(isValidIFSC('PYTM0123456'), true);
  assert.equal(isValidIFSC('sbin0000001'), true); // auto trimmed & upper-cased
});

test('isValidIFSC - Invalid format', () => {
  assert.equal(isValidIFSC('SBIN000001'), false); // 10 chars
  assert.equal(isValidIFSC('SBIN00000001'), false); // 12 chars
  assert.equal(isValidIFSC('SBI10000001'), false); // 4th char is number
  assert.equal(isValidIFSC('SBIN1000001'), false); // 5th char is '1' instead of '0'
  assert.equal(isValidIFSC('SBIN000000!'), false); // special char
  assert.equal(isValidIFSC(''), false);
  assert.equal(isValidIFSC(null), false);
  assert.equal(isValidIFSC(undefined), false);
  assert.equal(isValidIFSC(12345), false);
});

test('isValidIFSC - Unknown bank prefix', () => {
  // ZZZZ is not a registered RBI bank
  assert.equal(isValidIFSC('ZZZZ0000001'), false);
  // in non-strict mode, only format is checked
  assert.equal(isValidIFSC('ZZZZ0000001', { strict: false }), true);
});

test('parseIFSC - Valid code', () => {
  const res = parseIFSC('HDFC0000001');
  assert.equal(res.valid, true);
  assert.equal(res.bankCode, 'HDFC');
  assert.equal(res.bankName, 'HDFC Bank');
  assert.equal(res.branchCode, '000001');
  assert.equal(res.isKnownBank, true);
});

test('parseIFSC - Invalid code', () => {
  const res = parseIFSC('INVALID');
  assert.equal(res.valid, false);
  assert.equal(res.bankCode, null);
  assert.equal(res.bankName, null);
  assert.ok(res.reason);
});

test('getBankName', () => {
  assert.equal(getBankName('SBIN0001234'), 'State Bank of India');
  assert.equal(getBankName('ICIC'), 'ICICI Bank');
  assert.equal(getBankName('ZZZZ'), null);
  assert.equal(getBankName(''), null);
  assert.equal(getBankName(null), null);
});

test('BANK_CODES contains major banks', () => {
  assert.ok(Object.keys(BANK_CODES).length > 40);
  assert.equal(BANK_CODES['SBIN'], 'State Bank of India');
});
