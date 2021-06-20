const { html } = require('htm/preact')

const Base = require('../components/Base')
const Markdown = require('../components/Markdown')
const MaxWidth = require('../components/MaxWidth')

module.exports = (data) => {
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
