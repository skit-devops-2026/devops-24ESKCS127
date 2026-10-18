import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

// Core business logic for Cart calculations in the E-Commerce Store
function calculateCartTotal(items, discountPercent = 0) {
  if (!Array.isArray(items)) {
    throw new TypeError('Items must be an array');
  }

  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return sum + price * quantity;
  }, 0);

  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discountAmount);

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    total: Math.round(total * 100) / 100,
    itemCount: items.reduce((count, item) => count + (Number(item.quantity) || 1), 0)
  };
}

describe('E-Commerce Cart Logic Tests', () => {
  test('calculates empty cart correctly', () => {
    const summary = calculateCartTotal([]);
    assert.equal(summary.subtotal, 0);
    assert.equal(summary.total, 0);
    assert.equal(summary.itemCount, 0);
  });

  test('calculates cart with single item without discount', () => {
    const items = [{ id: 1, name: 'Wireless Headphones', price: 99.99, quantity: 2 }];
    const summary = calculateCartTotal(items);
    assert.equal(summary.subtotal, 199.98);
    assert.equal(summary.total, 199.98);
    assert.equal(summary.itemCount, 2);
  });

  test('applies percentage discount accurately', () => {
    const items = [
      { id: 1, name: 'Mechanical Keyboard', price: 100, quantity: 1 },
      { id: 2, name: 'Gaming Mouse', price: 50, quantity: 2 }
    ];
    // Subtotal = 100 + 100 = 200. 10% discount = 20. Total = 180.
    const summary = calculateCartTotal(items, 10);
    assert.equal(summary.subtotal, 200);
    assert.equal(summary.discountAmount, 20);
    assert.equal(summary.total, 180);
    assert.equal(summary.itemCount, 3);
  });

  test('throws TypeError on invalid input', () => {
    assert.throws(() => calculateCartTotal(null), {
      name: 'TypeError',
      message: 'Items must be an array'
    });
  });
});
