import { ExternalLinkIcon } from '@heroicons/react/solid'
import { html } from 'htm/preact'
import { tw } from 'twind'

import char from '../data/char'
import { isNetlifyProdEnv } from '../data/utils'
import Link from './Link'
import MaxWidth from './MaxWidth'

export default ({
  appendToBody,
  children,
  description,
  lang,
  metaDescription,
  metaTitle,
  page,
  title,
}) => html`
  <html class="h-full" lang=${lang || 'fi'}>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>
        ${(metaTitle || title).trim()}
        ${page.url !== '/' && ` ${char.ndash} Koodikrapula`}
      </title>
      <link rel="canonical" href="https://koodikrapula.fi${page.url}" />

      ${(metaDescription || description) &&
      html`
        <meta
          name="description"
          content=${(metaDescription || description).trim().replace(/\n/g, ' ')}
        />
      `}

      <!-- Replaced with Twind-generated styles -->
      <style id="__twind"></style>

      ${isNetlifyProdEnv() &&
      html`
        <script
          data-api="/elbisualp/api/event"
          data-domain="koodikrapula.fi"
          defer
          src="/elbisualp/js/script.js"
        ></script>
      `}
    </head>

    <body class="h-full overflow-y-scroll">
      <div class="flex flex-col min-h-full px-6">
        <${Header} currentUrl=${page.url} />
        ${children}
        <${Footer} currentUrl=${page.url} />
      </div>

      ${appendToBody}
    </body>
  </html>
`

function Header({ currentUrl }) {
  const linkClasses =
    'no-underline -mx-1 p-1 rounded hover:bg-gray-100 whitespace-nowrap'
  const links = [
    { href: '/info/', title: 'Info' },
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

  const iconProps = {
    'aria-hidden': true,
    class: 'align-text-bottom inline h-4 w-4 ml-0.5 mb-0.5 text-gray-400',
  }

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
                  href=${href}
                >
                  ${title}
                  ${external && html`<${ExternalLinkIcon} ...${iconProps} />`}
                <//>
              </li>
            `
          )}
        </ul>
      <//>
    </header>
  `
}

function Footer({ currentUrl }) {
  const links = [
    {
      href: '/en/',
      emoji: '🇺🇸',
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
                    href=${href}
                    ...${rest}
                  >
                    <span aria-hidden="true" class="inline-block mr-1">
                      ${emoji}
                    </span>
                    ${text}
                    ${external &&
                    html`
                      <${ExternalLinkIcon}
                        aria-hidden="true"
                        class="inline mb-0.5 ml-1 opacity-70"
                        width="1rem"
                      />
                    `}
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
