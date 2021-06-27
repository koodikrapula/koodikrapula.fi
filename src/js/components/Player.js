import { html } from 'htm/preact'

import char from '../data/char'

export default () => html`
  <p class="italic">
    Soitin tulossa pian${char.trade}! Sitä ennen voit kuunnella podia mm.${' '}
    <a href="https://open.spotify.com/show/1st4zWhHxzXn345vqdTfk8">
      Spotifyssa
    </a>
    ${' ja '}
    <a href="https://podcasts.apple.com/us/podcast/koodikrapula/id1572320652">
      Apple Podcastsissa
    </a>
    .
  </p>
`
