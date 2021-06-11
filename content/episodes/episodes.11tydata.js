module.exports = {
  layout: 'episode',
  eleventyComputed: {
    permalink: (data) => `/${data.page.fileSlug}/`,
    title: (data) => `${data.page.fileSlug} &ndash; ${data.title}`,
  },
}
