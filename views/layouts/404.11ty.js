const { html } = require('htm/preact')

const loadComponent = require('../loadComponent')

const Base = loadComponent('Base')
const Markdown = loadComponent('Markdown')
const MaxWidth = loadComponent('MaxWidth')

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
    <//>
  `
}
