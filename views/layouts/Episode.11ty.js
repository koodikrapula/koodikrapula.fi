const { html } = require('htm/preact')

const char = require('$/data/char')
const Base = require('../components/Base')
const EpisodeMeta = require('../components/EpisodeMeta')
const Link = require('../components/Link')
const Markdown = require('../components/Markdown')
const MaxWidth = require('../components/MaxWidth')

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
          <p>
            <em>
              Soitin tulossa pian${char.trade}!
              ${' Sitä ennen voit kuunnella podia mm. '}
              <a href="https://open.spotify.com/show/1st4zWhHxzXn345vqdTfk8">
                Spotifyssa
              </a>
              ${' ja '}
              <a
                href="https://podcasts.apple.com/us/podcast/koodikrapula/id1572320652"
              >
                Apple Podcastsissa
              </a>
              .
            </em>
          </p>
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
