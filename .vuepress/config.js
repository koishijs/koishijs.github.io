const { remove: removeDiacritics } = require('diacritics')

module.exports = context => ({
  title: 'Koishi',
  head: [
    ['link', { rel: 'icon', href: `/koishi.png` }],
    // ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#5546a3' }],
    // ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    // ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    // ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#5546a3' }],
    // ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    // ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  plugins: [
    [require('./markdown/highlight')],
    [require('./markdown/link')],
    ['medium-zoom', {
      selector: '.theme-default-content :not(a) > img:not(.no-zooming)',
    }],
    ['@vuepress/back-to-top'],
    ['@vuepress/register-components', {
      componentDir: 'components',
    }],
  ],
  markdown: {
    slugify (str) {
      const rControl = /[\u0000-\u001f]/g
      const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g
      return removeDiacritics(str)
        .replace(rControl, '')
        .replace(/\(.+/, '')
        .replace(rSpecial, '-')
        .replace(/\-{2,}/g, '-')
        .replace(/^\-+|\-+$/g, '')
        .replace(/^(\d)/, '_$1')
        .toLowerCase()
    },
  },
  themeConfig: {
    logo: '/koishi.png',
    nav: [
      { text: '主页', link: '/' },
      { text: '指南', link: '/guide/getting-started.html' },
      { text: 'API', link: '/api/' },
      { text: '官方插件', link: '/plugins/' },
      { text: 'GitHub', link: 'https://github.com/koishijs/koishi' },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          children: [
            '/guide/about-koishi',
            '/guide/getting-started',
            '/guide/config-file',
            '/guide/cli',
            '/guide/faq',
          ],
        }, {
          title: '深入',
          collapsable: false,
          children: [
            '/guide/receive-and-send',
            '/guide/plugin-and-context',
            '/guide/command-system',
            '/guide/using-database',
            '/guide/authorization',
            '/guide/lifecycle',
            '/guide/multiple-bots',
            '/guide/logger',
            '/guide/unit-tests',
          ],
        },
      ],
      '/api': [
        ['/api/', '总览'],
        {
          title: '核心 API',
          collapsable: false,
          children: [
            '/api/global',
            '/api/context',
            '/api/app',
            '/api/receiver',
            '/api/sender',
            '/api/command',
            '/api/database',
          ],
        },
        {
          title: '其他官方包',
          collapsable: false,
          children: [
            '/api/utils',
            '/api/test-utils',
            '/api/database/level',
            '/api/database/memory',
            '/api/database/mysql',
            '/api/database/sqlite',
          ],
        },
        {
          title: '更新日志',
          collapsable: false,
          children: [
            ['/api/changelog/koishi', 'koishi 及其依赖'],
            ['/api/changelog/test-utils', 'koishi-test-utils'],
          ],
        },
      ],
      '/plugins/': [
        ['/plugins/', '总览'],
        {
          title: '常用功能',
          collapsable: false,
          children: [
            '/plugins/common/overview',
            '/plugins/common/help',
            '/plugins/common/message',
            '/plugins/common/reply',
            '/plugins/common/handler',
            '/plugins/common/information',
            '/plugins/common/process',
          ],
        },
        {
          title: '其他核心插件',
          collapsable: false,
          children: [
            '/plugins/schedule',
            '/plugins/teach',
            '/plugins/recorder',
            '/plugins/nlp',
          ],
        },
        {
          title: '其他官方插件',
          collapsable: false,
          children: [
            '/plugins/other/chess',
            '/plugins/other/image-search',
            '/plugins/other/status',
            '/plugins/other/github-webhook',
            '/plugins/other/gitlab-webhook',
            // '/plugins/monitor',
          ],
        },
      ],
    },
    lastUpdated: '上次更新',
    docsRepo: 'koishijs/koishijs.github.io',
    docsBranch: 'docs',
    editLinks: true,
    editLinkText: '帮助我们改善此页面',
  },

  evergreen: () => !context.isProd,
})
