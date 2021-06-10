/**
 * Loads an uncached version of a component.
 *
 * Needed because Node.js aggressively caches `require()`'d files.
 * Otherwise modifying component files might not take effect.
 * Dunno where the problem actually is: in Node.js, Browsersync or 11ty.
 *
 * Adapted from luff's code at https://stackoverflow.com/a/16060619/1079869.
 *
 * @param {string} name The component's (file)name without the file extension.
 *
 * @returns The component function like you'd have loaded it using `require()`.
 *
 * @example
 * // Load the component exported in `/views/components/Base.js`:
 * const Base = loadComponent('Base')
 *
 * // Basically the same as:
 * const Base = require('/views/components/Base')
 * // ...but without cache
 */
module.exports = function loadComponent(name) {
  const module = `./components/${name}`
  delete require.cache[require.resolve(module)]
  return require(module)
}
