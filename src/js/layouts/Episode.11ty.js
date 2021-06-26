import { html } from 'htm/preact'

import Base from '../components/Base'
import EpisodeMeta from '../components/EpisodeMeta'
import Link from '../components/Link'
import Markdown from '../components/Markdown'
import MaxWidth from '../components/MaxWidth'
import Player from '../components/Player'

export default (data) => {
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
