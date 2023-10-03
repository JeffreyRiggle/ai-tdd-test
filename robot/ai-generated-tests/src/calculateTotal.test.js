const calculateTotal = require('./calculateTotal'); // Import your implementation

test('calculateTotal function correctly calculates the total of a single number', () => {
  expect(calculateTotal([42])).toBe(42);
});

test('calculateTotal function correctly handles large numbers', () => {
  expect(calculateTotal([1e6, 2e6, 3e6])).toBe(6e6);
});

test('calculateTotal function correctly handles negative numbers', () => {
  expect(calculateTotal([-1, -2, -3])).toBe(-6);
});
