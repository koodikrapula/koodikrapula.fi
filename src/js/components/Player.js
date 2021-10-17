import { html } from 'htm/preact'

import char from '../data/char'
import Link from './Link'

export default () => html`
  <p class="italic">
    Soitin tulossa pian${char.trade}! Sitä ennen voit kuunnella podia mm.${' '}
    <${Link} href="https://open.spotify.com/show/1st4zWhHxzXn345vqdTfk8">
      Spotifyssa
    <//>
    ${' ja '}
    <${Link}
      href="https://podcasts.apple.com/us/podcast/koodikrapula/id1572320652"
    >
      Apple Podcastsissa
    <//>
    .
  </p>
`
