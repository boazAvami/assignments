module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'], // Specify the test folder
  collectCoverage: true,  // Enable code coverage collection
  coverageDirectory: './coverage',  // Specify where to save coverage reports
  coverageReporters: ['text', 'lcov'],  // Output formats; 'text' will print in terminal, 'lcov' for HTML
};