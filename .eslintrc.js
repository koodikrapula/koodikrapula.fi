/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  env: {
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  ignorePatterns: ['!.eleventy.js'],
  overrides: [
    {
      files: '*.11ty.js',
      rules: {
        'class-methods-use-this': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  plugins: ['simple-import-sort'],
  rules: {
    // Allow function hoisting
    // because sometimes it makes things clearer
    'no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],

    // Allow concatenating strings with `+`
    // because sometimes it's clearer than template strings
    'prefer-template': 'off',

    'simple-import-sort/imports': 'error',

    // The following Airbnb rules need to be re-defined
    // because the Prettier rules override them
    quotes: ['error', 'single', { avoidEscape: true }],
  },
}
