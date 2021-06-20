require('react')

const { content } = require('@twind/content')
const { default: typography } = require('@twind/typography')
const path = require('path')
const { isValidElement, VNode } = require('preact')
const PreactCompat = require('preact/compat')
const { render } = require('preact-render-to-string')
const { apply, setup } = require('twind')
const {
  getStyleTag,
  shim,
  virtualSheet,
  VirtualSheet,
} = require('twind/shim/server')

module.exports = (config) => {
  disableViewsCache(config)
  patchPreact()
  const sheet = setupTwind()

  config.addTransform('preactLayouts', (content) =>
    isValidElement(content) ? transformPreactLayout(content, sheet) : content
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
 *
 * @param {object} config
 * 11ty's config object.
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

/**
 * Setup Twind (set base styles and configure plugins)
 * and return a virtual sheet for SSR.
 *
 * NOTE: The watch mode must be restarted after modifying these.
 * (This applies to all 11ty config files.)
 *
 * @returns {VirtualSheet}
 * Twind's virtual sheet.
 */
function setupTwind() {
  const sheet = virtualSheet()

  setup({
    plugins: {
      ...typography(),
    },
    preflight: {
      // Chrome stupidly hides text underlines behind the bg color,
      // so the color's opacity is reduced
      // to make underlines at least somewhat visible
      '::selection': apply('bg-yellow-300 bg-opacity-50'),

      // Prose styles need to be declared here
      // because of these issues:
      // - https://github.com/tw-in-js/typography/issues/1
      // - https://github.com/tw-in-js/typography/issues/3
      '.prose.prose a': apply('font-normal'),
      '.prose a:hover': apply('text-red-600'),
      '.prose a:active': apply('text-red-700'),
      '.prose ol > li, .prose ul > li': apply('relative'),
      '.prose ol > li::before, .prose ul > li::before': apply(
        content('""'),
        'absolute bg-gray-300 rounded-full'
      ),
    },
    sheet,
  })

  return sheet
}

/**
 * Convert `htm` to HTML
 * and generate styles using Twind.
 *
 * @param {VNode<{}>} content
 * The layout's contents,
 * so in this case a Preact VNode.
 *
 * @param {VirtualSheet} sheet
 * Twind's virtual sheet.
 *
 * @returns {string}
 * Final HTML.
 */
function transformPreactLayout(content, sheet) {
  sheet.reset()
  const html = `<!DOCTYPE html>${render(content)}`
  const htmlWithProperClasses = shim(html)
  return htmlWithProperClasses.replace(
    '<style id="__twind"></style>',
    getStyleTag(sheet)
  )
}
