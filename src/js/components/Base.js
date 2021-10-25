import { html } from 'htm/preact'

import char from '../data/char'
import { isNetlifyProdEnv } from '../utils'
import Footer from './Footer'
import Header from './Header'

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

    <body class="h-full overflow-y-scroll" id="top">
      <div class="flex flex-col min-h-full px-6">
        <${Header} currentUrl=${page.url} />
        ${children}
        <${Footer} currentUrl=${page.url} />
      </div>

      ${appendToBody}
    </body>
  </html>
`
