module.exports = class {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      permalink: '/sitemap.txt',
    }
  }

  render(data) {
    return (
      data.collections.all
        .map((page) => page.url)

        // The order doesn't matter (https://stackoverflow.com/q/1274974/1079869),
        // but sorted lines look neater
        .sort()

        .join('\n') + '\n'
    )
  }
}
