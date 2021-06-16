const { CalendarIcon, MicrophoneIcon } = require('@heroicons/react/outline')
const { html } = require('htm/preact')

module.exports = ({ date, large = false, recorded }) => {
  const iconSize = large ? 5 : 4
  const iconProps = {
    'aria-hidden': true,
    class: `align-text-bottom inline h-${iconSize} w-${iconSize} mr-2 mb-0.5 text-gray-400`,
  }
  const format = {
    human: (date) => date.toLocaleString('fi', { dateStyle: 'short' }),
    robot: (date) => `${date.toISOString().split('T')[0]}T06:00:00+03:00`, // TODO: Daylight saving time?
  }

  return html`
    <footer class="text-gray-${large ? 700 : 600}">
      <p class="my-0!">
        <${CalendarIcon} ...${iconProps} />
        <span class="sr-only">Julkaistu </span>
        <time datetime=${format.robot(date)}>${format.human(date)}</time>

        <span class="ml-${large ? 7 : 6}">
          <${MicrophoneIcon} ...${iconProps} />
          <span class="sr-only">, äänitetty </span>
          <time datetime=${format.robot(recorded)}>
            ${format.human(recorded)}
          </time>
        </span>
      </p>
    </footer>
  `
}
