const util = require('util')

module.exports = (config) => {
  config.addCollection('episodes', (collectionApi) =>
    collectionApi
      .getFilteredByGlob('./content/episodes/*.md')
      // Newest first
      .reverse()
  )

  config.addFilter('console', (value) => util.inspect(value))

  return {
    dir: {
      input: 'content',
      // These are relative to the input dir
      data: '../data',
      includes: '../layouts',
    },
  }
}
