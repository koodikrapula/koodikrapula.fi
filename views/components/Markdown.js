const { html } = require('htm/preact')

module.exports = ({ content }) => html`
  <div dangerouslySetInnerHTML=${{ __html: content }} />
`
