import { html } from 'htm/preact'

// TODO (#88): Rename this component e.g. to "Html"
// because it takes HTML, not Markdown
export default ({ content, inline = false }) => html`
  <${inline ? 'span' : 'div'} dangerouslySetInnerHTML=${{ __html: content }} />
`
