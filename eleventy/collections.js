import { isProdEnv, isScheduled } from '../src/js/data/utils'

export default (config) => {
  config.addCollection('episodes', (collectionApi) =>
    collectionApi
      .getFilteredByGlob('./src/content/episodes/*.md')
      .filter((episode) => !(isProdEnv() && isScheduled(episode)))
      // Newest first
      .reverse()
  )
}
