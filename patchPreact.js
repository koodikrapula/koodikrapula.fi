// Alias React to Preact.
// Needed for 3rd party React libraries (e.g. `@heroicons/react`) to work properly.

// Code taken from here and simplified:
// https://preactjs.com/guide/v8/switching-to-preact/#aliasing-in-node-using-module-alias
// This is about Preact v8, but seems to work with v10 too.
// The v10 docs don't have similar instructions for some reason.

const React = require('react')
const Preact = require('preact/compat')

const Module = module.constructor
Module._cache[require.resolve('react')].exports = Preact
