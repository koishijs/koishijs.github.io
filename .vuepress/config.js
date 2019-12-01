module.exports = {
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: 'API', link: '/api.html' },
    ],
    sidebar: {
      '/api': [
        '/api',
      ],
      '/guide/': [
        '/guide/',
        '/guide/receive-send',
        '/guide/command-system',
        '/guide/plugin-development',
        '/guide/using-database',
        '/guide/official-plugins',
      ],
    },
  },
}
