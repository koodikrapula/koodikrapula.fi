require('sexy-require')

require('./patchPreact')

const { isValidElement } = require('preact')
const { render } = require('preact-render-to-string')
const util = require('util')

module.exports = (config) => {
  config.addCollection('episodes', (collectionApi) =>
    collectionApi
      .getFilteredByGlob('./content/episodes/*.md')
      // Newest first
      .reverse()
  )

  config.addFilter('console', (value) => util.inspect(value))

  config.addTransform('preactLayouts', (content) =>
    isValidElement(content) ? `<!DOCTYPE html>${render(content)}` : content
  )

  config.addWatchTarget('./views/components/')

  return {
    dir: {
      input: 'content',

      // These are relative to the input dir
      data: '../data',
      includes: '../views/layouts',
    },
  }
}
