const { getHighlighter } = require('shiki')
const { escapeHtml } = require('markdown-it/lib/common/utils')
const { resolve } = require('path')

let highlighter

const batchAliases = ['npm', 'yarn']

module.exports = (options, ctx) => ({
  name: 'enhanced-highlight',

  async ready () {
    highlighter = await getHighlighter({
      theme: 'monokai',
      langs: [{
        id: 'custom-batch',
        scopeName: 'source.batchfile',
        path: resolve(__dirname, 'batch.json'),
        aliases: batchAliases,
      }],
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
        const [tokens, idx] = args
        const token = tokens[idx]
        if (!token.title) {
          const rawInfo = token.info || ''
          const [langName, title = ''] = rawInfo.split(/\s+/)
          token.info = langName
          token.title = title.trim()
        }
        const rawCode = fence(...args)
        return batchAliases.includes(token.info) ? `<template #${token.info}>${rawCode}</template>`
          : `<panel-view class="code" title=${JSON.stringify(token.title)}>${rawCode}</panel-view>`
      }
    })
  },
})
