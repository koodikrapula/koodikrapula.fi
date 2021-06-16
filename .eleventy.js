require('sexy-require')

module.exports = (config) => {
  config.addCollection('episodes', (collectionApi) =>
    collectionApi
      .getFilteredByGlob('./content/episodes/*.md')
      // Newest first
      .reverse()
  )

  // See https://browsersync.io/docs/options for all options
  config.setBrowserSyncConfig({
    // > Clicks, scrolls & form inputs on any device
    // > will be mirrored to all others.
    // Annoying feature
    ghostMode: false,

    // Enable to create a public URL (`https://something-random.loca.lt/`);
    // useful when testing on mobile devices
    tunnel: false,

    // > Browsersync includes a user-interface
    // > that is accessed via a separate port.
    // > The UI allows to controls all devices,
    // > push sync updates
    // > and much more.
    // Not needed
    ui: false,
  })

  // Defaults to true in Eleventy 1.0
  config.setDataDeepMerge(true)

  return {
    dir: {
      input: 'content',

      // These are relative to the input dir
      data: '../data',
      includes: '../layouts',
    },
  }
}
