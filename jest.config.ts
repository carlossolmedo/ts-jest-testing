import type { Config } from '@jest/types';

const baseDir = '<rootDir>/src/app/server-app3';
const baseTestDir = '<rootDir>/src/test/server-app3';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [`${baseDir}/**/*.ts`],
  testMatch: [`${baseTestDir}/**/*.test.ts`],
}

export default config;