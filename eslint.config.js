import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  ...compat.extends('plugin:storybook/recommended'),
  ...compat.extends('eslint:recommended'),
  ...compat.extends('plugin:react/recommended'),
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends('prettier'),
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      react: reactPlugin,
    },
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.storybook/**',
      '*.config.js',
      '.*.js',
      'declarations.d.ts',
      '**/*.test.tsx',
      '**/*.stories.tsx',
    ],
  },
];