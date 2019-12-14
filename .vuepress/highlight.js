const { getHighlighter } = require('shiki')

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
        return `<pre><code>${code}</code></pre>`
      }
      return `${highlighter.codeToHtml(code, lang)}`
    })

    config.plugin('code-container').use((md) => {
      const fence = md.renderer.rules.fence
      md.renderer.rules.fence = (...args) => {
        const [tokens, idx] = args
        const rawCode = fence(...args)
        return `<CodeContainer>${rawCode}</CodeContainer>`
      }
    })
  },

  plugins: ['@vuepress/register-components', {
    componentDir: 'components',
  }],
})
