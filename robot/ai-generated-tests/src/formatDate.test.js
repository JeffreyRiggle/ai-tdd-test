const formatDate = require('./formatDate'); // Import your implementation

test('formatDate function formats a date in the desired format (YYYY-MM-DD)', () => {
  const date = new Date('2023-09-10T12:00:00Z');
  expect(formatDate(date, 'YYYY-MM-DD')).toBe('2023-09-10');
});

test('formatDate function handles invalid date input gracefully', () => {
  expect(formatDate('invalidDate')).toBe('Invalid Date');
});

test('formatDate function formats a date in a custom format', () => {
  const date = new Date('2023-09-10T12:00:00Z');
  expect(formatDate(date, 'MMMM D, YYYY')).toBe('September 10, 2023');
});
