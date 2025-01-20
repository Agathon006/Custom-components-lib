module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "\\.(css|less|scss)$": "identity-obj-proxy",
    },
    modulePaths: ['<rootDir>'],
    transform: {
        '^.+\\.(ts|tsx)?$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
        }],
      },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    testMatch: ['**/src/**/*.test.(ts|tsx)'],
};