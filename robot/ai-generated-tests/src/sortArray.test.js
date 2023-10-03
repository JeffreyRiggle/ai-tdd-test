const sortArray = require('./sortArray'); // Import your implementation

test('sortArray function correctly handles an already sorted array', () => {
  expect(sortArray([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
});

test('sortArray function correctly handles arrays with negative numbers', () => {
  expect(sortArray([5, -2, 0, -8, 3])).toEqual([-8, -2, 0, 3, 5]);
});

test('sortArray function correctly handles arrays with mixed data types', () => {
  expect(sortArray(['apple', 'banana', 'cherry', 'apple', 'date'])).toEqual(['apple', 'apple', 'banana', 'cherry', 'date']);
});
