const { html } = require('htm/preact')

const char = require('/data/char')

const Header = () => {
  const links = [
    { href: '#', title: 'Info' },
    { href: '#', title: 'Kysy kysymys!' },
  ]

  return html`
    <header>
      <nav class="max-w-2xl mx-auto">
        <a
          href="/"
          class="inline-block font(mono) my-4 -mx-1 px-1 py-px rounded text(2xl red-600) hover:(bg-gray-100 text-red-500) active:text-red-700"
        >
          Koodikrapula.fi
        </a>
        <ul class="mb-6 space-x-6">
          ${links.map(
            ({ href, title }) => html`
              <li class="inline">
                <a
                  href=${href}
                  class="p-1 -mx-1 rounded hover:(bg-gray-100 text-red-500) active:text-red-700"
                >
                  ${title}
                </a>
              </li>
            `
          )}
        </ul>
      </nav>
    </header>
  `
}

const Footer = () => html`
  <footer class="mt-auto py-8 text-gray-600">
    <div class="border-t-2 max-w-2xl mx-auto pt-8">
      ${char.copy} Koodikrapula 2021
    </div>
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

    <body class="h-full">
      <div class="flex flex-col min-h-full px-6">
        <${Header} />
        <main>${children}</main>
        <${Footer} />
      </div>
    </body>
  </html>
`
