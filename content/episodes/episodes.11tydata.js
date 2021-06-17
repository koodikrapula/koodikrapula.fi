const char = require('/data/char')

function getAdjacentEpisode(episodes, currentUrl, offset) {
  const currentIndex = episodes.findIndex(({ url }) => url === currentUrl)
  return episodes[currentIndex + offset]
}

module.exports = {
  layout: 'Episode',
  eleventyComputed: {
    nextEpisode: (data) =>
      getAdjacentEpisode(data.collections.episodes, data.page.url, -1),
    permalink: (data) => `/${data.page.fileSlug}/`,
    previousEpisode: (data) =>
      getAdjacentEpisode(data.collections.episodes, data.page.url, +1),
    title: (data) =>
      `${data.page.fileSlug} ${char.ndash} ${data.title}${char.nbsp}${data.emoji}`,
  },
}
