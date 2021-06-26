import { isProdEnv, isScheduled } from '../data/utils'

export default (config) => {
  config.addCollection('episodes', (collectionApi) =>
    collectionApi
      .getFilteredByGlob('./content/episodes/*.md')
      .filter((episode) => !(isProdEnv() && isScheduled(episode)))
      // Newest first
      .reverse()
  )
}
