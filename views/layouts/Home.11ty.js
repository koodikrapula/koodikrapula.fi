const { html } = require('htm/preact')

const char = require('/data/char')
const loadComponent = require('../loadComponent')

const Base = loadComponent('Base')
const EpisodeMeta = loadComponent('EpisodeMeta')

const Link = ({ children, href }) => html`
  <a
    class="underline text-red(hover:500 active:700)"
    href=${href}
    style="text-decoration-thickness: 1px"
  >
    ${children}
  </a>
`

const LatestEpisode = ({
  data: { description, recorded, title },
  date,
  url,
}) => html`
  <article
    aria-label=${`Viimeisin jakso; jakso ${title}`}
    class="mb-10 px-6 py-8 rounded -mx-6 bg-gray-100"
  >
    <div class="max-w-2xl mx-auto">
      <h3 class="font-semibold mb-3 text-xl">
        <${Link} href=${url}>${title}<//>
      </h3>
      <${EpisodeMeta} class="mb-4" date=${date} recorded=${recorded} />
      <p class="mb-4 text-lg">${description}</p>
      <p class="mb-2">
        <${Link} href=${url}>Jaksomuikkarit ${char.rarr}<//>
      </p>
      <!-- Player here -->
    </div>
  </article>
`

const Episode = ({ data: { description, recorded, title }, date, url }) => html`
  <article aria-label=${`Jakso ${title}`} class="w-full py-6 md:(w-1/2 pr-6)">
    <div class="mr-3">
      <h3 class="font-semibold mb-2 text-lg underline">
        <${Link} href=${url}>${title}<//>
      </h3>
      <${EpisodeMeta} class="mb-4" date=${date} recorded=${recorded} />
      <p>${description}</p>
    </div>
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

      <div class="max-w-2xl mx-auto">
        <h2 class="font-bold text-xl md:mb-4">Aiemmat jaksot</h2>

        <div class="flex flex-wrap divide-y-2 md:divide-y-0">
          ${pastEpisodes.map((episode) => html`<${Episode} ...${episode} />`)}
        </div>
      </div>
    <//>
  `
}
