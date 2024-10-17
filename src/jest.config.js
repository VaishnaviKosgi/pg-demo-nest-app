// jest.config.js
module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    collectCoverageFrom: [
      '**/*.{js,ts}',
      '!**/node_modules/**',
      '!**/dist/**',
    ],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
  };
  