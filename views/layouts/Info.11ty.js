const { html } = require('htm/preact')

const Base = require('../components/Base')
const Markdown = require('../components/Markdown')
const MaxWidth = require('../components/MaxWidth')

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
