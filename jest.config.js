const mapPathsFromTsConfig = require('jest-module-name-mapper').default;

module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/lib'],
  setupFiles: ['fake-indexeddb/auto'],
  transform: { '^.+\\.ts$': 'ts-jest' },
  moduleNameMapper: mapPathsFromTsConfig(),
  modulePathIgnorePatterns: ['node_modules'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|js)'],
};
