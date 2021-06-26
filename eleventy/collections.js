import { isProdBuild, isScheduled } from '../src/js/data/utils'

export default (config) => {
  config.addCollection('episodes', (collectionApi) =>
    collectionApi
      .getFilteredByGlob('./src/content/episodes/*.md')
      .filter((episode) => !(isProdBuild() && isScheduled(episode)))
      // Newest first
      .reverse()
  )
}
