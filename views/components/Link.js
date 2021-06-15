const { html } = require('htm/preact')

module.exports = ({ children, class: classes = '', href }) => html`
  <a
    class="underline text-red(hover:500 active:700) ${classes}"
    href=${href}
    style="text-decoration-thickness: 1px"
  >
    ${children}
  </a>
`
