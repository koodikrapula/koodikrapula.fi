require('sexy-require')

require('./patchPreact')

const fs = require('fs')
const { isValidElement } = require('preact')
const { render } = require('preact-render-to-string')

const { isProdEnv, isScheduled } = require('./data/utils')

module.exports = (config) => {
  config.addCollection('episodes', (collectionApi) =>
    collectionApi
      .getFilteredByGlob('./content/episodes/*.md')
      .filter((episode) => !(isProdEnv() && isScheduled(episode)))
      // Newest first
      .reverse()
  )

  config.addPassthroughCopy('./assets')

  config.addTransform('preactLayouts', (content) =>
    isValidElement(content) ? `<!DOCTYPE html>${render(content)}` : content
  )

  config.addWatchTarget('./views/components/')

  // See https://browsersync.io/docs/options for all options
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

    // > Clicks, scrolls & form inputs on any device
    // > will be mirrored to all others.
    // Annoying feature
    ghostMode: false,

    // Enable to create a public URL (`https://something-random.loca.lt/`);
    // useful when testing on mobile devices
    tunnel: false,

    // > Browsersync includes a user-interface
    // > that is accessed via a separate port.
    // > The UI allows to controls all devices,
    // > push sync updates
    // > and much more.
    // Not needed
    ui: false,
  })

  // Defaults to true in Eleventy 1.0
  config.setDataDeepMerge(true)

  return {
    dir: {
      input: 'content',

      // These are relative to the input dir
      data: '../data',
      includes: '../views/layouts',
    },
  }
}
