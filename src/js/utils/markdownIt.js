import markdownIt from 'markdown-it'
import markdownItLinkAttributes from 'markdown-it-link-attributes'
import { linkClasses } from './const'

export default markdownIt({ html: true }).use(markdownItLinkAttributes, {
  attrs: {
    class: linkClasses,
  },
})
