import { html } from 'htm/preact'

import Base from '../components/Base'
import Markdown from '../components/Markdown'
import MaxWidth from '../components/MaxWidth'
import { isNetlifyProdEnv } from '../data/utils'

const TrackingScript = () =>
  isNetlifyProdEnv() &&
  html`
    <script>
      // Required for tracking 404 pages: https://plausible.io/docs/404-error-pages-tracking
      window.plausible =
        window.plausible ||
        function () {
          ;(window.plausible.q = window.plausible.q || []).push(arguments)
        }

      plausible('404', { props: { path: document.location.pathname } })
    </script>
  `

export default (data) => {
  const { content, title } = data

  return html`
    <${Base} appendToBody=${html`<${TrackingScript} />`} ...${data}>
      <${MaxWidth} as="main" class="prose mt-8">
        <h1>
          ${title}
          <span> </span>
          <span aria-hidden="true" class="text-gray-400 whitespace-nowrap">
            ¯\\(ツ)/¯
          </span>
        </h1>
        <${Markdown} content=${content} />
      <//>
    <//>
  `
}
