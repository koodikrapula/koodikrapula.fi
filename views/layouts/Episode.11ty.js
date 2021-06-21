const { html } = require('htm/preact')

const Base = require('../components/Base')
const EpisodeMeta = require('../components/EpisodeMeta')
const Link = require('../components/Link')
const Markdown = require('../components/Markdown')
const MaxWidth = require('../components/MaxWidth')
const Player = require('../components/Player')

module.exports = (data) => {
  const {
    date,
    description,
    duration,
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
            <${EpisodeMeta}
              date=${date}
              duration=${duration}
              large
              recorded=${recorded}
            />
            <p>${description}</p>
          </div>
          <aside><${Player} /></aside>
          <${Markdown} content=${content} />
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
