/** @type {import('prettier').Options} */
module.exports = {
  semi: false,
  singleQuote: true,
  overrides: [
    {
      files: '*.njk',
      options: {
        parser: 'melody',
        twigMelodyPlugins: ['node_modules/prettier-plugin-twig-enhancements'],
      },
    },
  ],
}
