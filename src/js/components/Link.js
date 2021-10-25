import { ExternalLinkIcon } from '@heroicons/react/solid'
import { html } from 'htm/preact'
import { apply, tw } from 'twind'

export default ({
  children,
  class: classes = '',
  external = false,
  href,
  ...rest
}) => html`
  <a
    class=${tw(
      classes,
      apply(
        'underline text-red(hover:600 active:700) focus-visible:(outline-none ring-2 ring-blue-300 border-transparent)'
      )
    )}
    href=${href}
    style="text-decoration-thickness: 1px"
    ...${rest}
  >
    ${children}
    ${external &&
    html`
      <${ExternalLinkIcon}
        aria-hidden="true"
        class="inline h-4 w-4 ml-1 mb-0.5 text-gray-400"
      />
    `}
  </a>
`
