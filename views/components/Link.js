const { html } = require('htm/preact')
const { apply, tw } = require('twind')

module.exports = ({ children, class: classes = '', href, ...rest }) => html`
  <a
    class=${tw(classes, apply('underline text-red(hover:600 active:700)'))}
    href=${href}
    style="text-decoration-thickness: 1px"
    ...${rest}
  >
    ${children}
  </a>
`
