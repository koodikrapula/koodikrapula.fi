const { html } = require('htm/preact')

const char = require('$/data/char')
const Base = require('../components/Base')
const EpisodeMeta = require('../components/EpisodeMeta')
const Link = require('../components/Link')
const MaxWidth = require('../components/MaxWidth')
const Player = require('../components/Player')

const LatestEpisode = ({
  data: { description, duration, recorded, title },
  date,
  url,
}) => html`
  <article
    aria-label=${`Viimeisin jakso; jakso ${title}`}
    class="mb-12 -mx-6 px-6 py-8 bg-gray-100"
  >
    <${MaxWidth} class="prose prose-lg">
      <h3>
        <${Link} aria-label="Jakso ${title}" href=${url}>${title}<//>
      </h3>
      <${EpisodeMeta}
        date=${date}
        duration=${duration}
        large
        recorded=${recorded}
      />
      <p>${description}</p>
      <aside><${Player} /></aside>
      <p>
        <${Link} href=${url}>Jaksomuikkarit ${char.rarr}<//>
      </p>
    <//>
  </article>
`

const Episode = ({
  data: { description, duration, recorded, title },
  date,
  url,
}) => html`
  <article aria-label=${`Jakso ${title}`} class="pt(8 md:0)">
    <h3 class="mt-0!">
      <${Link} aria-label="Jakso ${title}" href=${url}>${title}<//>
    </h3>
    <${EpisodeMeta} date=${date} duration=${duration} recorded=${recorded} />
    <p class="mb-0!">${description}</p>
  </article>
`

module.exports = (data) => {
  const {
    collections: { episodes },
    title,
  } = data
  const latestEpisode = episodes[0]
  const pastEpisodes = episodes.slice(1)

  return html`
    <${Base} ...${data}>
      <main>
        <h1 class="sr-only">${title}</h1>

        <h2 class="sr-only">Viimeisin jakso</h2>
        <${LatestEpisode} ...${latestEpisode} />

        <${MaxWidth} class="prose">
          <h2 class="mb-0! md:mb-8!">Aiemmat jaksot</h2>

          ${pastEpisodes.length === 0
            ? html`<p>Oletpa aikaisin täällä! Tule maanantaina takaisin. 😎</p>`
            : html`
                <div
                  class="grid grid-cols-1 gap-8 divide(y-2 dashed) md:(grid-cols-2 divide-y-0)"
                >
                  ${pastEpisodes.map(
                    (episode) => html`<${Episode} ...${episode} />`
                  )}
                </div>
              `}
        <//>
      </main>
    <//>
  `
}
