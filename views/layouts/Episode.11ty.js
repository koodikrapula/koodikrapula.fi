const { html } = require('htm/preact')

const loadComponent = require('../loadComponent')

const Base = loadComponent('Base')

module.exports = (data) => {
  const { content, title } = data

  return html`
    <${Base} ...${data}>
      <h1>${title}</h1>
      <div dangerouslySetInnerHTML=${{ __html: content }} />
    <//>
  `
}
