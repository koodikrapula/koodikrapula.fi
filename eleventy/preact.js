const path = require('path')
const { isValidElement } = require('preact')
const PreactCompat = require('preact/compat')
const { render } = require('preact-render-to-string')
require('react')

module.exports = (config) => {
  disableViewsCache(config)
  patchPreact()

  config.addTransform('preactLayouts', (content) =>
    isValidElement(content) ? `<!DOCTYPE html>${render(content)}` : content
  )

  config.addWatchTarget('./views/components/')
}

/**
 * Alias React to Preact.
 * Needed for 3rd party React libraries to work properly,
 * e.g. `@heroicons/react`.
 *
 * Code taken from here and simplified:
 * https://preactjs.com/guide/v8/switching-to-preact/#aliasing-in-node-using-module-alias
 * The page is about Preact v8, but seems to work with v10 too.
 * The v10 docs are missing similar instructions for some reason.
 */
function patchPreact() {
  // eslint-disable-next-line no-underscore-dangle
  module.constructor._cache[require.resolve('react')].exports = PreactCompat
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
