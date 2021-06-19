const {
  CalendarIcon,
  ClockIcon,
  MicrophoneIcon,
} = require('@heroicons/react/outline')
const { html } = require('htm/preact')

const dateFormat = {
  human: (date) => date.toLocaleString('fi', { dateStyle: 'short' }),
  robot: (date) => `${date.toISOString().split('T')[0]}T06:00:00+03:00`, // TODO: Daylight saving time?
}

/**
 * Parses a colon-separated duration (string)
 * to an array of hours, minutes and seconds (numbers).
 *
 * @param {string} duration
 * Colon-separated duration, e.g. `"12:04"` or `"1:03:45"`.
 *
 * @returns {[number, number, number]}
 * E.g. `[0, 12, 4]` or `[1, 3, 45]`
 */
const parseDuration = (duration) => {
  const parts = duration.split(':')
  if (parts.length === 2) parts.unshift(0) // hours
  return parts.map(Number)
}

const durationFormat = {
  human: (duration) => {
    const [hours, minutes, seconds] = parseDuration(duration)
    return [
      hours && `${hours} tunti${hours > 1 ? 'a' : ''}`,
      minutes && `${minutes} minuutti${minutes > 1 ? 'a' : ''}`,
      seconds && `${seconds} sekunti${seconds > 1 ? 'a' : ''}`,
    ]
      .filter(Boolean)
      .join(' ')
  },
  robot: (duration) => {
    const [hours, minutes, seconds] = parseDuration(duration)
    return (
      // P = period, T = time;
      // see https://www.w3.org/TR/2014/REC-html5-20141028/infrastructure.html#valid-duration-string
      'PT' +
      [hours && `${hours}H`, minutes && `${minutes}M`, seconds && `${seconds}S`]
        .filter(Boolean)
        .join('')
    )
  },
}

module.exports = ({ date, duration, large = false, recorded }) => {
  const iconSize = large ? 5 : 4
  const iconProps = {
    'aria-hidden': true,
    class: `align-text-bottom inline h-${iconSize} w-${iconSize} mr-2 mb-0.5 text-gray-400`,
  }

  return html`
    <footer
      class="flex space-x-${large ? 7 : 6} text-gray-${large ? 700 : 600}"
    >
      <p class="my-0!">
        <${CalendarIcon} ...${iconProps} />
        <span class="sr-only">Julkaistu </span>
        <time datetime=${dateFormat.robot(date)}>
          ${dateFormat.human(date)}
        </time>
      </p>

      <p class="my-0!">
        <${MicrophoneIcon} ...${iconProps} />
        <span class="sr-only">Äänitetty </span>
        <time datetime=${dateFormat.robot(recorded)}>
          ${dateFormat.human(recorded)}
        </time>
      </p>

      <p class="my-0!">
        <${ClockIcon} ...${iconProps} />
        <span class="sr-only">Kesto ${durationFormat.human(duration)}</span>
        <time aria-hidden="true" datetime=${durationFormat.robot(duration)}>
          ${duration}
        </time>
      </p>
    </footer>
  `
}
