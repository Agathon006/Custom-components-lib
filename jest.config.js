export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy',
        '\\.svg$': '<rootDir>/src/test/svgMock.tsx',
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