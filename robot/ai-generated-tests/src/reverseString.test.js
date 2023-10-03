const reverseString = require('./reverseString'); // Import your implementation

test('reverseString function reverses a string with special characters', () => {
  expect(reverseString('@b@d$')).toBe('$d@b@');
});

test('reverseString function correctly handles whitespace characters', () => {
  expect(reverseString('  spaces   ')).toBe('   secaps  ');
});

test('reverseString function handles strings with emoji', () => {
  expect(reverseString('🙂👍')).toBe('👍🙂');
});
