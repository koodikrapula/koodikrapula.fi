const { html } = require('htm/preact')

const char = require('/data/char')
const loadComponent = require('../loadComponent')

const Link = loadComponent('Link')
const MaxWidth = loadComponent('MaxWidth')

const Header = () => {
  const links = [
    { href: '#', title: 'Info' },
    { href: '#', title: 'Kysy kysymys!' },
  ]

  return html`
    <header>
      <${MaxWidth} as="nav">
        <${Link}
          class="inline-block -mx-1 my-4 px-1 py-px rounded font-mono no-underline text(2xl red-600) hover:bg-gray-100"
          href="/"
        >
          Koodikrapula.fi
        <//>
        <ul class="mb-6 space-x-6">
          ${links.map(
            ({ href, title }) => html`
              <li class="inline">
                <${Link}
                  class="no-underline -mx-1 p-1 rounded hover:bg-gray-100"
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

const Footer = () => html`
  <footer class="mt-auto py-8 text-gray-600">
    <${MaxWidth} class="border-t-2 mt-6 pt-8">${char.copy} Koodikrapula 2021<//>
  </footer>
`

module.exports = ({
  children,
  description,
  metaDescription,
  metaTitle,
  page,
  title,
}) => html`
  <html class="h-full" hidden lang="fi">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>
        ${(metaTitle || title).trim()}
        ${page.url !== '/' && ` ${char.ndash} Koodikrapula`}
      </title>
      <meta
        name="description"
        content=${(metaDescription || description).trim().replace('\n', ' ')}
      />
      <script
        async
        src="https://cdn.skypack.dev/twind/shim"
        type="module"
      ></script>
    </head>

    <body class="h-full overflow-y-scroll">
      <div class="flex flex-col min-h-full px-6">
        <${Header} />
        <main>${children}</main>
        <${Footer} />
      </div>
    </body>
  </html>
`
