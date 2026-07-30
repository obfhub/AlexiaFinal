import test from 'node:test';
import assert from 'node:assert/strict';
import { buildContactMessage, parseChatIds } from '../src/api/contactTelegram.js';

test('buildContactMessage includes the submitted contact details', () => {
  const result = buildContactMessage({
    name: 'Ana Maria',
    phone: '+373 60000000',
    plan: 'Premium',
    price: '1200',
    userAgent: 'Mozilla/5.0',
  });

  assert.match(result, /Ana Maria/);
  assert.match(result, /\+373 60000000/);
  assert.match(result, /Premium/);
  assert.match(result, /Mozilla\/5\.0/);
});

test('parseChatIds supports comma-separated chat IDs', () => {
  assert.deepEqual(parseChatIds('7333565540,1876506094'), ['7333565540', '1876506094']);
  assert.deepEqual(parseChatIds(' 7333565540 , 1876506094 '), ['7333565540', '1876506094']);
});
