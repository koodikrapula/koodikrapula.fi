import { html } from 'htm/preact'

import char from '../data/char'
import Link from './Link'
import MaxWidth from './MaxWidth'

export default ({ currentUrl }) => {
  const links = [
    {
      href: '#top',
      emoji: '☝',
      text: 'Ylös',
      external: false,
    },
    {
      href: '/en/',
      emoji: '🌎',
      text: 'In English',
      external: false,
      rest: { lang: 'en' },
    },
    {
      href: 'https://github.com/koodikrapula/koodikrapula.fi',
      emoji: '🍝',
      text: 'Lähdekoodi',
      external: true,
    },
  ]

  return html`
    <footer class="mt-auto py-8 text-gray-600" lang="fi">
      <${MaxWidth}
        class="border-t-2 pt-8 flex flex-col space-y-4 sm:(flex-row justify-between space-y-0)"
      >
        <p>${char.copy} Koodikrapula 2021</p>
        <nav aria-label="Footer navigation">
          <ul class="space-x-6">
            ${links.map(
              ({ href, emoji, text, external, rest = {} }) => html`
                <li class="inline">
                  <${Link}
                    aria-current=${currentUrl === href ? 'page' : undefined}
                    external=${external}
                    href=${href}
                    ...${rest}
                  >
                    <span aria-hidden="true" class="inline-block mr-1">
                      ${emoji}
                    </span>
                    ${text}
                  <//>
                </li>
              `
            )}
          </ul>
        </nav>
      <//>
    </footer>
  `
}
