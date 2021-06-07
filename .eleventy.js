const fs = require('fs')
const util = require('util')

module.exports = (config) => {
  config.addCollection('episodes', (collectionApi) =>
    collectionApi
      .getFilteredByGlob('./content/episodes/*.md')
      // Newest first
      .reverse()
  )

  config.addFilter('console', (value) => util.inspect(value))

  config.setBrowserSyncConfig({
    callbacks: {
      ready(err, browserSync) {
        // Provides the 404 content without redirect. Source:
        // https://github.com/11ty/eleventy-base-blog/blob/v5.0.2/.eleventy.js#L56-L64
        const notFoundContent = fs.readFileSync('./_site/404.html')
        browserSync.addMiddleware('*', (req, res) => {
          res.write(notFoundContent)
          res.end()
        })
      },
    },
  })

  return {
    dir: {
      input: 'content',
      // These are relative to the input dir
      data: '../data',
      includes: '../layouts',
    },
  }
}
