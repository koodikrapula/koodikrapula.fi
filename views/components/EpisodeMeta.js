const { CalendarIcon, MicrophoneIcon } = require('@heroicons/react/outline')
const { html } = require('htm/preact')

module.exports = ({ class: classes, date, recorded }) => {
  const iconProps = {
    'aria-hidden': true,
    class: 'align-top inline h-4 w-4 mr-1 mt-1 text-gray-400',
  }
  const format = {
    human: (date) => date.toLocaleString('fi', { dateStyle: 'short' }),
    robot: (date) => `${date.toISOString().split('T')[0]}T06:00:00+03:00`, // TODO: Daylight saving time?
  }

  return html`
    <footer class="text-gray-600 ${classes}">
      <p>
        <span>
          <${CalendarIcon} ...${iconProps} />
          <span class="sr-only">Julkaistu </span>
          <time datetime=${format.robot(date)}> ${format.human(date)} </time>
        </span>
        <span class="ml-3">
          <${MicrophoneIcon} ...${iconProps} />
          <span class="sr-only"> ja äänitetty </span>
          <time datetime=${format.robot(recorded)}>
            ${format.human(recorded)}
          </time>
        </span>
      </p>
    </footer>
  `
}
