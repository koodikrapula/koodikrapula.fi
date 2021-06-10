const char = require('/data/char')

module.exports = {
  layout: 'Episode',
  eleventyComputed: {
    permalink: (data) => `/${data.page.fileSlug}/`,
    title: (data) => `${data.page.fileSlug} ${char.ndash} ${data.title}`,
  },
}
