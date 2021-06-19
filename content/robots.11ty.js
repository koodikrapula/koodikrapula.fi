const dedent = require('dedent')

module.exports = class {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      permalink: '/robots.txt',
    }
  }

  render() {
    return (
      dedent`
        User-agent: *
        Allow: /

        Sitemap: https://koodikrapula.fi/sitemap.txt
      ` + '\n'
    )
  }
}
