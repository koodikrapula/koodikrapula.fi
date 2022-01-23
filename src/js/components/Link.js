import { ExternalLinkIcon } from '@heroicons/react/solid'
import { html } from 'htm/preact'
import { apply, tw } from 'twind'
import { linkClasses } from '../utils/const'

export default ({
  children,
  class: classes = '',
  external = false,
  href,
  ...rest
}) => html`
  <a
    class=${tw(classes, apply(linkClasses))}
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
