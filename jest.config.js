const mapPathsFromTsConfig = require('jest-module-name-mapper').default;

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  roots: ['<rootDir>/lib'],
  setupFiles: ['fake-indexeddb/auto'],
  transform: { '^.+\\.ts$': 'ts-jest' },
  moduleNameMapper: mapPathsFromTsConfig(),
  modulePathIgnorePatterns: ['node_modules'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|js)'],
};
