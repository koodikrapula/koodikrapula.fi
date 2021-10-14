import md from '../src/js/data/md'
import setupBrowserSync from './browserSync'
import setupCollections from './collections'
import setupPreact from './preact'

export default (config) => {
  setupBrowserSync(config)
  setupCollections(config)
  setupPreact(config)

  // Defaults to true in Eleventy 1.0
  config.setDataDeepMerge(true)

  config.setLibrary('md', md)

  return {
    dir: {
      input: './src/content/',

      // These are relative to the input dir
      data: '../js/data/',
      includes: '../js/layouts/',
    },
  }
}
