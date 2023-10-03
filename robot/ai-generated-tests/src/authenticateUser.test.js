const authenticateUser = require('./authenticateUser'); // Import your implementation

test('authenticateUser function returns false for empty username or password', () => {
  expect(authenticateUser('', 'password123')).toBe(false);
  expect(authenticateUser('john_doe', '')).toBe(false);
});

test('authenticateUser function returns false for case-sensitive username', () => {
  expect(authenticateUser('John_Doe', 'password123')).toBe(false);
});

test('authenticateUser function returns true for valid credentials with leading/trailing whitespace', () => {
  expect(authenticateUser('  john_doe  ', 'password123')).toBe(true);
});
