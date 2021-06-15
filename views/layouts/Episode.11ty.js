const { html } = require('htm/preact')

const char = require('/data/char')
const loadComponent = require('../loadComponent')

const Base = loadComponent('Base')
const EpisodeMeta = loadComponent('EpisodeMeta')
const MaxWidth = loadComponent('MaxWidth')

module.exports = (data) => {
  const { date, description, content, recorded, title } = data

  return html`
    <${Base} ...${data}>
      <${MaxWidth} as="article" class="prose mt-8">
        <h1>${title}</h1>
        <div class="prose-lg">
          <${EpisodeMeta} date=${date} large recorded=${recorded} />
          <p>${description}</p>
        </div>
        <p>
          <em>
            Soitin tulossa pian${char.trade}! Sitä ennen löydät äänitteen
            Spotifystä ja Apple Podcastsista.
          </em>
          <!-- TODO: Add links -->
        </p>
        <div dangerouslySetInnerHTML=${{ __html: content }} />
      <//>
    <//>
  `
}
