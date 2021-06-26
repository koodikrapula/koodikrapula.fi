import { content } from '@twind/content'
import typography from '@twind/typography'
import { apply } from 'twind'
import { virtualSheet } from 'twind/shim/server'

export const sheet = virtualSheet()

// NOTE: The watch mode must be restarted after modifying the config
// because the config is imported by an 11ty config file.
// (Restarting is needed after modifying any 11ty config file.)

/** @type {import('twind').Configuration} */
export default {
  plugins: {
    ...typography(),
  },
  preflight: {
    // Chrome stupidly hides text underlines behind the bg color,
    // so the color's opacity is reduced
    // to make underlines at least somewhat visible
    '::selection': apply('bg-yellow-300 bg-opacity-50'),

    // Prose styles need to be declared here
    // because of these issues:
    // - https://github.com/tw-in-js/typography/issues/1
    // - https://github.com/tw-in-js/typography/issues/3
    '.prose.prose a': apply('font-normal'),
    '.prose a:hover': apply('text-red-600'),
    '.prose a:active': apply('text-red-700'),
    '.prose ol > li, .prose ul > li': apply('relative'),
    '.prose ol > li::before, .prose ul > li::before': apply(
      content('""'),
      'absolute bg-gray-300 rounded-full'
    ),
  },
  sheet,
}
