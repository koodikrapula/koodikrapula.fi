const { html } = require('htm/preact')
const { tw } = require('twind')

const char = require('$/data/char')
const loadComponent = require('../loadComponent')

const Link = loadComponent('Link')
const MaxWidth = loadComponent('MaxWidth')

const Header = ({ currentUrl }) => {
  const linkClasses = 'no-underline -mx-1 p-1 rounded hover:bg-gray-100'
  const links = [{ href: '/info/', title: 'Info' }]

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
            ({ href, title }) => html`
              <li class="inline">
                <${Link}
                  class=${tw(
                    linkClasses,
                    currentUrl.startsWith?.(href) && 'font-bold'
                  )}
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
    <${MaxWidth} class="border-t-2 pt-8">${char.copy} Koodikrapula 2021<//>
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
  <!-- The 'hidden' attribute prevents FOUC (flash of unstyled content)
       and is removed by Twind once it has generated all styles. -->
  <html class="h-full" hidden lang="fi">
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

      <script async src="/assets/twind.js" type="module"></script>
      <link rel="stylesheet" href="/assets/main.css" />

      <!-- The CONTEXT environment variable is Netlify's deploy context:
           production, deploy-preview or branch-deploy.
           https://docs.netlify.com/configure-builds/environment-variables/#build-metadata -->
      ${process.env.CONTEXT === 'production' &&
      html`
        <script
          data-api="/elbisualp/api/event"
          data-domain="koodikrapula.fi"
          defer
          src="/elbisualp/js/script.js"
        ></script>

        <!-- Required for tracking 404 pages. https://plausible.io/docs/404-error-pages-tracking -->
        <!-- prettier-ignore -->
        <script>
          window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
        </script>
      `}
    </head>

    <body class="h-full overflow-y-scroll">
      <div class="flex flex-col min-h-full px-6">
        <${Header} currentUrl=${page.url} />
        ${children}
        <${Footer} />
      </div>
    </body>
  </html>
`
