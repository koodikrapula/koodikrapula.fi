const { html } = require('htm/preact')

module.exports = ({ as = 'div', children, class: classes = '' }) => html`
  <${as} class="max-w(lg md:2xl) mx-auto w-full ${classes}">${children}<//>
`
