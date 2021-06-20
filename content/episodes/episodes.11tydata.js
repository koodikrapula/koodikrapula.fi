const char = require('$/data/char')
const { isProdEnv, isScheduled } = require('$/data/utils')

const getAdjacentEpisode = (offset) => (data) => {
  const { episodes } = data.collections
  const { url: currentUrl } = data.page

  const currentIndex = episodes.findIndex(({ url }) => url === currentUrl)
  return episodes[currentIndex + offset]
}

const permalink = (data) =>
  isProdEnv() && isScheduled(data) ? false : `/${data.page.fileSlug}/`

const title = (data) =>
  `${data.page.fileSlug} ${char.ndash} ${data.title}${char.nbsp}${data.emoji}`

module.exports = {
  layout: 'Episode',
  eleventyComputed: {
    nextEpisode: getAdjacentEpisode(-1),
    permalink,
    previousEpisode: getAdjacentEpisode(+1),
    title,
  },
}
