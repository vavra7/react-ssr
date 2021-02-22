module.exports = {
  env: {
    node: true,
    browser: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:react/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['simple-import-sort'],
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/explicit-function-return-type': [
      1,
      {
        allowExpressions: true
      }
    ],
    '@typescript-eslint/explicit-member-accessibility': [
      1,
      {
        overrides: {
          accessors: 'no-public',
          constructors: 'no-public'
        }
      }
    ],
    '@typescript-eslint/no-non-null-assertion': 0,
    'react/jsx-sort-props': [
      1,
      {
        noSortAlphabetically: false,
        shorthandLast: false,
        callbacksLast: false
      }
    ],
    'react/button-has-type': 1,
    'react/no-deprecated': 1,
    'react/prefer-es6-class': [1, 'always'],
    'react/jsx-one-expression-per-line': [1, { allow: 'single-child' }],
    'react/prop-types': 0,
    'simple-import-sort/imports': 1,
    'simple-import-sort/exports': 1,
    'prefer-rest-params': 0
  }
};
