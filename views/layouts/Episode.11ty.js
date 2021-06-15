const { html } = require('htm/preact')

const loadComponent = require('../loadComponent')

const Base = loadComponent('Base')
const EpisodeMeta = loadComponent('EpisodeMeta')
const MaxWidth = loadComponent('MaxWidth')

module.exports = (data) => {
  const { date, description, content, recorded, title } = data

  return html`
    <${Base} ...${data}>
      <${MaxWidth} as="article">
        <h1 class="font-semibold mb-3 mt-8 text-2xl">${title}</h1>
        <${EpisodeMeta} class="mb-4" date=${date} recorded=${recorded} />
        <p class="mb-8 text-lg">${description}</p>
        <div dangerouslySetInnerHTML=${{ __html: content }} />
      <//>
    <//>
  `
}
