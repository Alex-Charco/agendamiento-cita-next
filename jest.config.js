module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/app/$1', // <- AJUSTADO AQUÍ
    },
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    extensionsToTreatAsEsm: ['.jsx'],
};