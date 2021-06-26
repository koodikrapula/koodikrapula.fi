import dedent from 'dedent'

export default class {
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
