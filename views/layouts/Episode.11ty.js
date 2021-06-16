const { html } = require('htm/preact')

const char = require('/data/char')
const loadComponent = require('../loadComponent')

const Base = loadComponent('Base')
const EpisodeMeta = loadComponent('EpisodeMeta')
const Link = loadComponent('Link')
const MaxWidth = loadComponent('MaxWidth')

module.exports = (data) => {
  const {
    date,
    description,
    content,
    nextEpisode,
    previousEpisode,
    recorded,
    title,
  } = data

  return html`
    <${Base} ...${data}>
      <main>
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
      </main>

      ${(previousEpisode || nextEpisode) &&
      html`
        <${MaxWidth} as="aside" class="border-t-2 mt-5 pt-8 prose">
          <ul>
            ${nextEpisode &&
            html`
              <li>
                ${'Seuraava jakso: '}
                <${Link}
                  aria-label="Jakso ${nextEpisode.data.title}"
                  href=${nextEpisode.url}
                >
                  ${nextEpisode.data.title}
                <//>
              </li>
            `}
            ${previousEpisode &&
            html`
              <li>
                ${'Edellinen jakso: '}
                <${Link}
                  aria-label="Jakso ${previousEpisode.data.title}"
                  href=${previousEpisode.url}
                >
                  ${previousEpisode.data.title}
                <//>
              </li>
            `}
          </ul>
        <//>
      `}
    <//>
  `
}
