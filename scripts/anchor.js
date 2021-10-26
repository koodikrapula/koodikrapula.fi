/*
 * Convert an episode's show notes to HTML
 * and save the result to `anchor.html`.
 * The HTML can then be easily copy-pasted to Anchor.
 *
 * Usage: `npm run anchor <episode_number>`
 * E.g.:  `npm run anchor 2`
 */

import dedent from 'dedent'
import { existsSync, readFileSync } from 'fs'
import grayMatter from 'gray-matter'

import char from '../src/js/data/char'
import dateFormat from '../src/js/utils/dateFormat'
import markdownIt from '../src/js/utils/markdownIt'

const args = process.argv.slice(2)
const episodeNumber = Number.parseInt(args[0], 10)

if (Number.isNaN(episodeNumber)) {
  console.error(dedent`
    ❗ Invalid episode number given: '${args[0]}'. Must be a number.

    ❕ Usage: \`npm run anchor <episode_number>\`
       E.g.:  \`npm run anchor 2\`
  `)
  process.exit(1)
}

const filePath = new URL(
  `../src/content/episodes/${episodeNumber}.md`,
  import.meta.url
)

if (!existsSync(filePath)) {
  console.error(`❗ Episode file not found at ${filePath}`)
  process.exit(1)
}

const fileContents = readFileSync(filePath, { encoding: 'utf-8' })
const { data: frontMatter, content: markdown } = grayMatter(fileContents)

const description = markdownIt.renderInline(
  frontMatter.description.trim().replace(/\n/g, ' ')
)
const recordedDate = dateFormat.human(frontMatter.recorded)
const content = markdownIt
  .render(markdown)
  // Convert <h2> and <h3> tags to <p>
  // because heading tags might not work in all podcast platforms
  .replace(/<(\/?)h[23]>/g, '<$1p>')
  // Strip <em>, <span> and <strong> tags
  // because they might not work in all podcast platforms
  .replace(/<\/?(em|span|strong).*?>/g, '')
  // Convert e.g. `{{char.trade}}` to ™
  .replace(/{{\s*char\.([a-z]+)\s*}}/gi, (match, charName) => char[charName])

const html = dedent`
  <p>${description}</p>
  <p>Äänitetty ${recordedDate}.</p>
  <p>Jaksomuikkarit myös osoitteessa https://krapu.la/${episodeNumber}</p>
  <p>Kysy meiltä kysymys, vastaamme (saatamme vastata 🤞) siihen jossain jaksossa! https://krapu.la/kysy</p>
  <p><br></p>
  ${content}
`

if (html.length > 4000) {
  console.warn(dedent`
    ❗ HTML's length is ${html.length.toLocaleString('en')} characters;
       should be max    4,000 characters.\n
  `)
}

/* I'd like to use https://github.com/sindresorhus/clipboardy
 * to automatically copy the result to the clipboard,
 * but importing it fails because of https://github.com/standard-things/esm. 🤦‍♂️
 *
 * I'm instead writing the result to stdout
 * so it can be outputted to a file (`anchor.html`)
 * and then manually copied (and then pasted to Anchor). ;_;
 */
console.log(html)

// Using `console.warn` to omit this from stdout and thus also from `anchor.html`
console.warn('🆗 HTML saved to `anchor.html`')
