module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    es2021: true,
  },
  ignorePatterns: [
    'dist/**',
    'node_modules/**',
    '**/*.js',
    'libs/grpc/src/proto/**',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'import/no-cycle': 'error',
    // Import 관련 규칙
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Node.js 내장 (fs, path)
          'external', // node_modules
          'internal', // @libs/*, @auth/*
          'parent', // ../
          'sibling', // ./
          'index',
        ],
        pathGroups: [
          {
            pattern: '@libs/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@auth/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@user/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@project/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-unresolved': 'error',
    'import/no-duplicates': 'error',

    // Path alias 강제 (상대 경로 금지)
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../*', '../../*', '../../../*'],
            message:
              'Use path aliases (@project/*, @libs/*, etc.) instead of relative imports with "../"',
          },
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
};
