// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    // add Jest globals so `test`, `expect` etc. aren’t flagged
    jest: true,
    // if you ever use `process` in Node scripts or env vars:
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended'
    // optional: lint Jest-specific patterns
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true }
  },
  settings: {
    react: { version: 'detect' }
  },
  rules: {
    // React 17+ with the new JSX transform doesn’t need React in scope:
    'react/react-in-jsx-scope': 'off',

    // If you’d rather allow unescaped apostrophes, quotes, etc.:
    // either escape them in your JSX, or turn this rule off:
    'react/no-unescaped-entities': 'off',

    'prettier/prettier': 'error'
  },
  overrides: [
    {
      // only for your test files, if you want different settings
      files: ['**/*.test.{js,jsx}'],
      env: { jest: true }
    }
  ]
}
