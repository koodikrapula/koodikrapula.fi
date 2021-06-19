const { html } = require('htm/preact')

const loadComponent = require('../loadComponent')

const Base = loadComponent('Base')
const Markdown = loadComponent('Markdown')
const MaxWidth = loadComponent('MaxWidth')

module.exports = (data) => {
  const { content, description, title } = data

  return html`
    <${Base} ...${data}>
      <${MaxWidth} as="main" class="mt-8 prose">
        <h1>${title}</h1>
        <p class="lead">${description}</p>
        <${Markdown} content=${content} />
      <//>
    <//>
  `
}
