import markdownIt from 'markdown-it'
import markdownItLinkAttributes from 'markdown-it-link-attributes'

export default () => {
  const md = markdownIt({ html: true })

  md.use(markdownItLinkAttributes, {
    attrs: {
      class:
        'underline text-red(hover:600 active:700) focus-visible:(outline-none ring-2 ring-blue-300 border-transparent)',
    },
  })

  return md
}
