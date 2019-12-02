module.exports = {
  title: 'Koishi',
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: '官方插件', link: '/plugins/common.html' },
      { text: 'GitHub', link: 'https://github.com/koishijs' },
    ],
    sidebar: {
      '/api': [
        '/api/',
        '/api/context',
        '/api/app',
        '/api/receiver',
        '/api/sender',
        '/api/command',
        '/api/utils',
      ],
      '/guide/': [
        '/guide/',
        '/guide/receive-and-send',
        '/guide/command-system',
        '/guide/using-database',
        '/guide/plugin-development',
      ],
      '/plugins/': [
        '/plugins/common',
        '/plugins/teach',
        '/plugins/tools',
        '/plugins/games',
        '/plugins/monitor',
        '/plugins/schedule',
        '/plugins/webhook',
      ],
    },
  },
}
