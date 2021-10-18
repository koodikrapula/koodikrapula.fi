import { html } from 'htm/preact'

import md from '../utils/markdownIt'

export default ({ content }) => html`
  <div dangerouslySetInnerHTML=${{ __html: md.render(content) }} />
`
