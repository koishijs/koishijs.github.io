const { getHighlighter, loadTheme } = require('shiki')
const { escapeHtml } = require('markdown-it/lib/common/utils')
const { resolve } = require('path')

let highlighter1, highlighter2

const cliAliases = ['npm', 'yarn']
const tomorrow = loadTheme(resolve(__dirname, 'tomorrow.json'))

module.exports = (options, ctx) => ({
  name: 'enhanced-highlight',

  async ready () {
    highlighter1 = await getHighlighter({
      theme: 'monokai',
    })

    highlighter2 = await getHighlighter({
      theme: tomorrow,
      langs: [{
        id: 'cli',
        scopeName: 'source.batchfile',
        path: resolve(__dirname, 'batch.json'),
        aliases: cliAliases,
      }],
    })
  },

  chainMarkdown (config) {
    config.plugins.delete('pre-wrapper')

    config.options.highlight((code, lang) => {
      if (!lang) {
        return `<pre><code>${escapeHtml(code)}</code></pre>`
      }
      const h = lang === 'cli' || cliAliases.includes(lang) ? highlighter2 : highlighter1
      return h.codeToHtml(code, lang)
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
        if (cliAliases.includes(token.info)) return `<template #${token.info}>${rawCode}</template>`
        let style = ''
        if (token.info === 'cli') style += `; background-color: ${tomorrow.bg}`
        return `<panel-view class="code" title=${JSON.stringify(token.title)} style="${style.slice(2)}">${rawCode}</panel-view>`
      }
    })
  },
})
