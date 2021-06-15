const { html } = require('htm/preact')

const char = require('/data/char')
const loadComponent = require('../loadComponent')

const Base = loadComponent('Base')
const EpisodeMeta = loadComponent('EpisodeMeta')
const Link = loadComponent('Link')
const MaxWidth = loadComponent('MaxWidth')

const LatestEpisode = ({
  data: { description, recorded, title },
  date,
  url,
}) => html`
  <article
    aria-label=${`Viimeisin jakso; jakso ${title}`}
    class="mb-10 -mx-6 px-6 py-8 bg-gray-100"
  >
    <${MaxWidth} class="prose prose-lg">
      <h3>
        <${Link} aria-label="Jakso ${title}" href=${url}>${title}<//>
      </h3>
      <${EpisodeMeta} date=${date} large recorded=${recorded} />
      <p>${description}</p>
      <p>
        <${Link} href=${url}>Jaksomuikkarit ${char.rarr}<//>
      </p>
      <!-- Player here -->
    <//>
  </article>
`

const Episode = ({ data: { description, recorded, title }, date, url }) => html`
  <article aria-label=${`Jakso ${title}`} class="pt(8 md:0)">
    <h3>
      <${Link} aria-label="Jakso ${title}" href=${url}>${title}<//>
    </h3>
    <${EpisodeMeta} date=${date} recorded=${recorded} />
    <p>${description}</p>
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
      <h1 class="sr-only">${title}</h1>

      <h2 class="sr-only">Viimeisin jakso</h2>
      <${LatestEpisode} ...${latestEpisode} />

      <${MaxWidth} class="prose">
        <h2>Aiemmat jaksot</h2>

        <div
          class="grid grid-cols-1 gap-8 divide-y-2 md:(grid-cols-2 divide-y-0)"
        >
          ${pastEpisodes.map((episode) => html`<${Episode} ...${episode} />`)}
        </div>
      <//>
    <//>
  `
}
