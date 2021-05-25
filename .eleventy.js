const util = require('util')

module.exports = (config) => {
  config.addCollection(
    'episodes',
    (collectionApi) =>
      collectionApi
        .getFilteredByGlob('./content/*.md')
        .filter((page) => /^\d+$/.test(page.fileSlug)) // Check if file name is number
        .reverse() // Newest first
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
