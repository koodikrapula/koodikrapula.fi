import { html } from 'htm/preact'
import { tw } from 'twind'

import Link from './Link'
import MaxWidth from './MaxWidth'

export default ({ currentUrl }) => {
  const linkClasses =
    'no-underline -mx-1 p-1 rounded hover:bg-gray-100 whitespace-nowrap'
  const links = [
    {
      href: '/info/',
      title: 'Info',
    },
    {
      href: 'https://twitter.com/koodikrapula',
      title: 'Twitter',
      external: true,
    },
    {
      href: 'https://forms.gle/uyh3v8bbQUwnizEw5',
      title: 'Kysy kysymys',
      external: true,
    },
  ]

  return html`
    <header lang="fi">
      <${MaxWidth} as="nav" class="sm:(flex justify-between)">
        <${Link}
          class="${linkClasses} inline-block my-4 font(bold mono) text(2xl gray-800)"
          href="/"
        >
          Koodikrapula
        <//>
        <ul class="mb-6 space-x-6 sm:mt-6">
          ${links.map(
            ({ href, title, external = false }) => html`
              <li class="inline">
                <${Link}
                  aria-current=${currentUrl === href ? 'page' : undefined}
                  class=${tw(
                    linkClasses,
                    currentUrl && currentUrl.startsWith(href) && 'font-bold'
                  )}
                  external=${external}
                  href=${href}
                >
                  ${title}
                <//>
              </li>
            `
          )}
        </ul>
      <//>
    </header>
  `
}
