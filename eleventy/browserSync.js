import fs from 'fs'

export default (config) => {
  // See https://browsersync.io/docs/options for all options
  config.setBrowserSyncConfig({
    callbacks: {
      ready(err, browserSync) {
        // Provides the 404 content without redirect. Original source:
        // https://github.com/11ty/eleventy-base-blog/blob/v5.0.2/.eleventy.js#L56-L64
        browserSync.addMiddleware('*', (req, res) => {
          const notFoundContent = fs.readFileSync('./_site/404.html')
          res.write(notFoundContent)
          res.end()
        })
      },
    },

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
}
