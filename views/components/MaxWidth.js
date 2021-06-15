const { html } = require('htm/preact')

module.exports = ({ as = 'div', children, class: classes = '' }) => html`
  <${as} class="mx-auto max-w(lg md:2xl) ${classes}">${children}<//>
`
