import type { Config } from '@jest/types';

const baseDir = '<rootDir>/src/app/server-app2';
const baseTestDir = '<rootDir>/src/test/server-app2';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [`${baseDir}/**/*.test.ts`],
  testMatch: [`${baseTestDir}/**/*.test.ts`],
}

export default config;