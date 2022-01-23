/** @type {import('@types/eslint').Linter.BaseConfig} */
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:eslint-comments/recommended',
    'prettier', // This should probably come last
  ],
  ignorePatterns: ['!.eleventy.js'],
  overrides: [
    {
      files: '*.11ty.js',
      rules: {
        'class-methods-use-this': 'off',
      },
    },
    {
      files: 'scripts/*.js',
      rules: {
        'unicorn/no-process-exit': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['simple-import-sort', 'unicorn'],
  rules: {
    /* BUILT-IN RULES: "Possible Problems"
     * https://eslint.org/docs/rules/#possible-problems
     */

    'array-callback-return': 'warn',
    'no-template-curly-in-string': 'warn',

    // Functions are hoisted, classes and variables are not
    'no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],

    /* BUILT-IN RULES: "Suggestions"
     * https://eslint.org/docs/rules/#suggestions
     */

    curly: ['error', 'multi-line', 'consistent'],
    'consistent-return': 'warn',
    'dot-notation': 'error',

    // `== null` checks against `null` and `undefined`.
    // In other cases `===` should be used.
    eqeqeq: ['error', 'always', { null: 'ignore' }],

    'no-array-constructor': 'error',
    'no-else-return': 'error',
    'no-implied-eval': 'error',
    'no-lonely-if': 'error',
    'no-sequences': ['error', { allowInParentheses: false }],
    'no-shadow': 'warn',
    'no-throw-literal': 'error',
    'no-unneeded-ternary': 'warn',

    /* BUILT-IN RULES: "Layout & Formatting"
     * https://eslint.org/docs/rules/#layout-formatting
     */

    quotes: ['error', 'single', { avoidEscape: true }],

    /* PLUGINS */

    // This is also reported by Unicorn,
    // and Unicorn's error message is clearer
    'eslint-comments/no-unlimited-disable': 'off',

    'eslint-comments/no-unused-disable': 'error',

    'simple-import-sort/imports': 'error',

    /* UNICORN
     *
     * An opinionated selection of the Unicorn rules.
     * https://github.com/sindresorhus/eslint-plugin-unicorn
     */

    'unicorn/better-regex': 'error',
    'unicorn/catch-error-name': 'error',
    'unicorn/consistent-destructuring': 'error',
    'unicorn/consistent-function-scoping': 'error',
    'unicorn/custom-error-definition': 'error',

    // Let Prettier handle this
    'unicorn/empty-brace-spaces': 'off',

    'unicorn/error-message': 'error',
    'unicorn/escape-case': 'error',

    // No need to fail builds because of expired TODO comments
    'unicorn/expiring-todo-comments': 'warn',

    'unicorn/explicit-length-check': 'error',

    // No need for this
    'unicorn/filename-case': 'off',

    // Would make imports less clear 🤔
    'unicorn/import-index': 'off',

    'unicorn/import-style': 'error',
    'unicorn/new-for-builtins': 'error',
    'unicorn/no-abusive-eslint-disable': 'error',

    // I see the point,
    // but passing a function reference is so nice (albeit risky, I know ¯\(ツ)/¯)
    'unicorn/no-array-callback-reference': 'off',

    // `[].forEach()` is nice
    'unicorn/no-array-for-each': 'off',

    // Would be nice, but not released yet
    'unicorn/no-array-method-this-argument': 'off',

    'unicorn/no-array-push-push': 'error',

    // `[].reduce()` is nice
    'unicorn/no-array-reduce': 'off',

    'unicorn/no-console-spaces': 'error',
    'unicorn/no-document-cookie': 'error',
    'unicorn/no-for-loop': 'error',
    'unicorn/no-hex-escape': 'error',
    'unicorn/no-instanceof-array': 'error',

    // Variable `newFoo` looks OK to me
    'unicorn/no-keyword-prefix': 'off',

    'unicorn/no-lonely-if': 'error',
    'unicorn/no-nested-ternary': 'error',
    'unicorn/no-new-array': 'error',
    'unicorn/no-new-buffer': 'error',

    // `null`s are OK, I think
    'unicorn/no-null': 'off',

    'unicorn/no-object-as-default-parameter': 'error',
    'unicorn/no-process-exit': 'error',
    'unicorn/no-static-only-class': 'error',
    'unicorn/no-this-assignment': 'error',
    'unicorn/no-unreadable-array-destructuring': 'error',
    'unicorn/no-unsafe-regex': 'error',
    'unicorn/no-unused-properties': 'error',
    'unicorn/no-useless-undefined': 'error',
    'unicorn/no-zero-fractions': 'error',
    'unicorn/number-literal-case': 'error',
    'unicorn/numeric-separators-style': 'error',
    'unicorn/prefer-add-event-listener': 'error',
    'unicorn/prefer-array-find': 'error',
    'unicorn/prefer-array-flat': 'error',
    'unicorn/prefer-array-flat-map': 'error',
    'unicorn/prefer-array-index-of': 'error',
    'unicorn/prefer-array-some': 'error',

    // Would be nice,
    // but not supported by any browser yet
    'unicorn/prefer-at': 'off',

    'unicorn/prefer-date-now': 'error',
    'unicorn/prefer-default-parameters': 'error',
    'unicorn/prefer-dom-node-append': 'error',
    'unicorn/prefer-dom-node-dataset': 'error',
    'unicorn/prefer-dom-node-remove': 'error',
    'unicorn/prefer-dom-node-text-content': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-keyboard-event-key': 'error',
    'unicorn/prefer-math-trunc': 'error',
    'unicorn/prefer-modern-dom-apis': 'error',
    'unicorn/prefer-module': 'error',
    'unicorn/prefer-negative-index': 'error',

    // Would be nice,
    // but doesn't work well with `import/no-unresolved`,
    // at least with Node.js v14:
    // https://stackoverflow.com/q/67263317/1079869
    'unicorn/prefer-node-protocol': 'off',

    'unicorn/prefer-number-properties': [
      'error',
      {
        // `Infinity` and `-Infinity` are nicer than
        // `Number.POSITIVE_INFINITY` and `Number.NEGATIVE_INFINITY`
        checkInfinity: false,
      },
    ],

    // Still a TC39 proposal, so not available yet
    'unicorn/prefer-object-has-own': 'off',

    'unicorn/prefer-optional-catch-binding': 'error',
    'unicorn/prefer-prototype-methods': 'error',
    'unicorn/prefer-query-selector': 'error',
    'unicorn/prefer-reflect-apply': 'error',
    'unicorn/prefer-regexp-test': 'error',
    'unicorn/prefer-set-has': 'error',

    // I have found that the spread operator sometimes has bad performance
    'unicorn/prefer-spread': 'off',

    // Would be nice but supported only by Node.js v15+.
    // TODO [engine:node@>=15]: Change the level to `'error'`
    'unicorn/prefer-string-replace-all': 'off',

    'unicorn/prefer-string-slice': 'error',
    'unicorn/prefer-string-starts-ends-with': 'error',
    'unicorn/prefer-string-trim-start-end': 'error',
    'unicorn/prefer-switch': 'error',
    'unicorn/prefer-ternary': 'error',

    // Might be nice, but not released yet
    'unicorn/prefer-top-level-await': 'off',

    'unicorn/prefer-type-error': 'error',

    // Abbreviations are bad, except when I want to use them ¯\(ツ)/¯
    'unicorn/prevent-abbreviations': 'off',

    'unicorn/require-array-join-separator': 'error',
    'unicorn/require-number-to-fixed-digits-argument': 'error',

    // Would be nice, but not released yet
    'unicorn/require-post-message-target-origin': 'off',

    // No need for this
    'unicorn/string-content': 'off',

    'unicorn/throw-new-error': 'error',
  },
}
