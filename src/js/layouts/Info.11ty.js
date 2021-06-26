import { html } from 'htm/preact'

import Base from '../components/Base'
import Markdown from '../components/Markdown'
import MaxWidth from '../components/MaxWidth'

export default (data) => {
  const { content, description, title } = data

  return html`
    <${Base} ...${data}>
      <${MaxWidth} as="main" class="mt-8 prose">
        <h1>${title}</h1>
        <p class="lead">${description}</p>
        <${Markdown} content=${content} />
      <//>
    <//>
  `
}
