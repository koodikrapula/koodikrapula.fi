import char from '../../js/data/char'
import { isProdBuild, isScheduled } from '../../js/data/utils'

const adjacentEpisode = (data, offset) => {
  const { episodes } = data.collections
  const { url: currentUrl } = data.page

  const currentIndex = episodes.findIndex(({ url }) => url === currentUrl)
  return episodes[currentIndex + offset]
}
const nextEpisode = (data) => adjacentEpisode(data, -1)
const previousEpisode = (data) => adjacentEpisode(data, +1)

const permalink = (data) =>
  isProdBuild() && isScheduled(data) ? false : `/${data.page.fileSlug}/`

const eleventyExcludeFromCollections = (data) => permalink(data) === false

const title = (data) =>
  `${data.page.fileSlug} ${char.ndash} ${data.title}${char.nbsp}${data.emoji}`

export default {
  layout: 'Episode',
  eleventyComputed: {
    eleventyExcludeFromCollections,
    nextEpisode,
    permalink,
    previousEpisode,
    title,
  },
}
