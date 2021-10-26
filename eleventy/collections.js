import { isPreviewBuild, isProdBuild, isScheduled } from '../src/js/utils'

export default (config) => {
  config.addCollection('episodes', (collectionApi) =>
    collectionApi
      .getFilteredByGlob('./src/content/episodes/*.md')
      .filter(
        (episode) =>
          !(isProdBuild() && isScheduled(episode)) || isPreviewBuild()
      )
      // Newest first
      .reverse()
  )
}
