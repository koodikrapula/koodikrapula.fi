import { setup } from 'https://cdn.skypack.dev/twind/shim'
import typography from 'https://cdn.skypack.dev/@twind/typography'

setup({
  plugins: {
    ...typography(),
  },
})
