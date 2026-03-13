// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    // jest env provides describe/test/expect/beforeEach etc. — same globals as vitest
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: 'detect' },
  },
  globals: {
    vi: 'readonly',
  },
  rules: {
    // React 17+ with the new JSX transform doesn't need React in scope:
    'react/react-in-jsx-scope': 'off',

    // If you'd rather allow unescaped apostrophes, quotes, etc.:
    // either escape them in your JSX, or turn this rule off:
    'react/no-unescaped-entities': 'off',

    'prettier/prettier': 'error',
  },
  overrides: [
    {
      // only for your test files, if you want different settings
      files: ['**/*.test.{js,jsx}'],
      env: { jest: true },
    },
  ],
};
