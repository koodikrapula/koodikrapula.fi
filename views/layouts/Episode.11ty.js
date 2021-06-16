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

  const episodeLinks = [
    nextEpisode && ['Seuraava jakso', nextEpisode],
    previousEpisode && ['Edellinen jakso', previousEpisode],
  ].filter(Boolean)

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

      ${episodeLinks.length > 0 &&
      html`
        <${MaxWidth} as="aside" class="border-t-2 mt-5 pt-8 prose">
          <ul>
            ${episodeLinks.map(
              ([label, episode]) => html`
                <li>
                  <span>${label}: </span>
                  <${Link}
                    aria-label="Jakso ${episode.data.title}"
                    href=${episode.url}
                  >
                    ${episode.data.title}
                  <//>
                </li>
              `
            )}
          </ul>
        <//>
      `}
    <//>
  `
}
