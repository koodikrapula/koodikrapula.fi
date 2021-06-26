import setupBrowserSync from './browserSync'
import setupCollections from './collections'
import setupPreact from './preact'

export default (config) => {
  setupBrowserSync(config)
  setupCollections(config)
  setupPreact(config)

  config.addPassthroughCopy('./assets')

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
