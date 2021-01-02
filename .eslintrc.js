module.exports = {
  env: {
    node: true,
    browser: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/no-var-requires': 0,
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
    ]
  }
};
