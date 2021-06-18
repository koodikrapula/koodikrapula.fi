const char = require('/data/char')

const getAdjacentEpisode = (offset) => (data) => {
  const { episodes } = data.collections
  const { url: currentUrl } = data.page

  const currentIndex = episodes.findIndex(({ url }) => url === currentUrl)
  return episodes[currentIndex + offset]
}

const getPermalink = (data) => `/${data.page.fileSlug}/`

const getTitle = (data) =>
  `${data.page.fileSlug} ${char.ndash} ${data.title}${char.nbsp}${data.emoji}`

module.exports = {
  layout: 'Episode',
  eleventyComputed: {
    nextEpisode: getAdjacentEpisode(-1),
    permalink: getPermalink,
    previousEpisode: getAdjacentEpisode(+1),
    title: getTitle,
  },
}
