import { html } from 'htm/preact'

export default ({ content }) => html`
  <div dangerouslySetInnerHTML=${{ __html: content }} />
`
