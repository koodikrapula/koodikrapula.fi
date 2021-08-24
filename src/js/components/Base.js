import { html } from 'htm/preact'
import { tw } from 'twind'

import char from '../data/char'
import { isNetlifyProdEnv } from '../data/utils'
import Link from './Link'
import MaxWidth from './MaxWidth'

const Header = ({ currentUrl }) => {
  const linkClasses = 'no-underline -mx-1 p-1 rounded hover:bg-gray-100'
  const links = [
    { href: '/info/', title: 'Info' },
    {
      href: 'https://twitter.com/koodikrapula',
      title: 'Twitter',
      external: true,
    },
  ]

  return html`
    <header>
      <${MaxWidth} as="nav" class="sm:(flex justify-between)">
        <${Link}
          class="${linkClasses} inline-block my-4 font(bold mono) text(2xl gray-800)"
          href="/"
        >
          Koodikrapula
        <//>
        <ul class="mb-6 space-x-6 sm:mt-6">
          ${links.map(
            ({ href, title, external }) => html`
              <li class="inline">
                <${Link}
                  class=${tw(
                    linkClasses,
                    currentUrl && currentUrl.startsWith(href) && 'font-bold'
                  )}
                  href=${href}
                  target=${external ? '_blank' : '_self'}
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

const Footer = () => html`
  <footer class="mt-auto py-8 text-gray-600">
    <${MaxWidth} class="border-t-2 pt-8 flex justify-between">
      <p>${char.copy} Koodikrapula 2021</p>
      <p>
        <${Link} href="https://github.com/koodikrapula/koodikrapula.fi">
          Lähdekoodi
        <//>
      </p>
    <//>
  </footer>
`

export default ({
  appendToBody,
  children,
  description,
  metaDescription,
  metaTitle,
  page,
  title,
}) => html`
  <html class="h-full" lang="fi">
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
        <${Footer} />
      </div>

      ${appendToBody}
    </body>
  </html>
`
