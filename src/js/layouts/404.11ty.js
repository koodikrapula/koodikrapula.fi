import { html } from 'htm/preact'

import Base from '../components/Base'
import Markdown from '../components/Markdown'
import MaxWidth from '../components/MaxWidth'

export default (data) => {
  const { content, title } = data

  return html`
    <${Base} ...${data}>
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
      <script>
        plausible('404', { props: { path: document.location.pathname } })
      </script>
    <//>
  `
}
