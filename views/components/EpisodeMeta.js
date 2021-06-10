const { CalendarIcon } = require('@heroicons/react/outline')
const { html } = require('htm/preact')

module.exports = ({ class: classes, date }) => html`
  <footer class="text-gray-500 ${classes}">
    <p>
      <${CalendarIcon} class="align-top inline h-4 w-4 mr-1 mt-1" />
      <span class="sr-only">Julkaistu</span>
      <time datetime=${date.toISOString().split('T')[0]}>
        ${date.toLocaleString('fi', { dateStyle: 'short' })}
      </time>
    </p>
  </footer>
`
