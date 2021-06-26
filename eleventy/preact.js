import 'react'

import path from 'path'
import { isValidElement } from 'preact'
import PreactCompat from 'preact/compat'
import { render } from 'preact-render-to-string'
import { setup as setupTwind } from 'twind'
import { getStyleTag, shim } from 'twind/shim/server'

import twindConfig, { sheet } from '../twind.config'

const componentsFolderPath = './src/js/components/'

export default (config) => {
  disableComponentCache(config)
  patchPreact()
  setupTwind(twindConfig)

  config.addTransform('preactLayouts', (content) =>
    isValidElement(content) ? transformPreactLayout(content) : content
  )

  config.addWatchTarget(componentsFolderPath)
}

/**
 * Disable Node.js's `require()` cache from the files in the `components` folder.
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
 * Interestingly,
 * layout files are not cached aggressively
 * even though they are Preact components too.
 * Possibly because the `components` folder is an "extra folder" to 11ty.
 *
 * @param {object} config
 * 11ty's config object.
 */
function disableComponentCache(config) {
  const componentsFolderFullPath = path.resolve(componentsFolderPath)

  config.on('beforeWatch', (changedFiles) => {
    const changedFilesRelativePaths = changedFiles.map(path.normalize)
    const componentsFolderRelativePath = componentsFolderPath
      .slice(2) // Omit `./` from the start
      .replace(/\//g, path.sep)

    if (
      !changedFilesRelativePaths.find((changedFilePath) =>
        changedFilePath.startsWith(componentsFolderRelativePath)
      )
    ) {
      // No files were modified under the `views` folder
      // -> no need to clear the cache
      return
    }

    Object.keys(require.cache).forEach(
      (cachePath) =>
        cachePath.startsWith(componentsFolderFullPath) &&
        delete require.cache[cachePath]
    )
  })
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
 * Convert `htm` to HTML
 * and generate styles using Twind.
 *
 * @param {import('preact').VNode<{}>} content
 * The contents of an 11ty content file,
 * so in this case a Preact VNode.
 *
 * @returns {string}
 * Final HTML.
 */
function transformPreactLayout(content) {
  sheet.reset()
  const html = `<!DOCTYPE html>${render(content)}`
  const htmlWithProperClasses = shim(html)
  return htmlWithProperClasses.replace(
    '<style id="__twind"></style>',
    getStyleTag(sheet)
  )
}
