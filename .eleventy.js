require('./patchPreact')

const fs = require('fs')
const path = require('path')
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

  disableViewsCache(config)

  return {
    dir: {
      input: 'content',

      // These are relative to the input dir
      data: '../data',
      includes: '../views/layouts',
    },
  }
}

/**
 * Disable Node.js's `require()` cache from the files in the `views` folder.
 *
 * Does not actually _disable_ the cache,
 * but automatically clears the cache
 * after any of the files are modified.
 * So practically disables it.
 *
 * Needed because Node.js aggressively caches `require()`'d files.
 * Otherwise modifying component files might not take effect.
 * Dunno where the problem actually is: in Node.js, Browsersync or 11ty.
 */
function disableViewsCache(config) {
  const viewsFolder = path.resolve('./views/')

  config.on('beforeWatch', (changedFiles) => {
    const relativePaths = changedFiles.map(path.normalize)

    if (!relativePaths.find((file) => file.startsWith(`views${path.sep}`))) {
      // No files were modified under the `views` folder
      // -> no need to clear the cache
      return
    }

    Object.keys(require.cache).forEach(
      (cachePath) =>
        cachePath.startsWith(viewsFolder) && delete require.cache[cachePath]
    )
  })
}
