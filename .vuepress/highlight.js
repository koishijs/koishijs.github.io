const { getHighlighter } = require('shiki')
const { escapeHtml } = require('markdown-it/lib/common/utils')

let highlighter

module.exports = (options, ctx) => ({
  name: 'highlight',

  async ready () {
    highlighter = await getHighlighter({
      theme: 'monokai',
    })
  },

  chainMarkdown (config) {
    config.plugins.delete('pre-wrapper')

    config.options.highlight((code, lang) => {
      if (!lang) {
        return `<pre><code>${escapeHtml(code)}</code></pre>`
      }
      return `${highlighter.codeToHtml(code, lang)}`
    })

    config.plugin('code-container').use((md) => {
      const fence = md.renderer.rules.fence
      md.renderer.rules.fence = (...args) => {
        const rawCode = fence(...args)
        return `<CodeContainer>${rawCode}</CodeContainer>`
      }
    })
  },
})
