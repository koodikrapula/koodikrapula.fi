const { isProdEnv, isScheduled } = require('../data/utils')

module.exports = (config) => {
  config.addCollection('episodes', (collectionApi) =>
    collectionApi
      .getFilteredByGlob('./content/episodes/*.md')
      .filter((episode) => !(isProdEnv() && isScheduled(episode)))
      // Newest first
      .reverse()
  )
}
