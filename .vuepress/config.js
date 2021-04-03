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
    [require('./markdown/github')],
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
        .replace(/\(.+\)(?=\s|$)/, '')
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
      { text: '指南', link: '/guide/starter.html' },
      { text: 'API', link: '/api/' },
      { text: '官方插件', link: '/plugins/' },
      { text: 'GitHub', link: 'https://github.com/koishijs/koishi' },
    ],
    sidebar: {
      '/guide/': [{
        title: '入门',
        collapsable: false,
        children: [
          '/guide/about',
          '/guide/starter',
          '/guide/cli',
          '/guide/docker',
          '/guide/faq',
        ],
      }, {
        title: '进阶',
        collapsable: false,
        children: [
          '/guide/message',
          '/guide/context',
          '/guide/command',
          '/guide/execute',
          '/guide/help',
          '/guide/manage',
          '/guide/database',
          '/guide/lifecycle',
          '/guide/adapter',
          '/guide/logger',
          '/guide/unit-tests',
        ],
      }],
      '/api': [['/api/', '总览'], {
        title: '核心 API',
        collapsable: false,
        children: [
          '/api/context',
          '/api/app',
          '/api/bot',
          '/api/events',
          '/api/session',
          '/api/command',
          '/api/segment',
          '/api/database',
          '/api/adapter',
        ],
      }, {
        title: '其他官方包',
        collapsable: false,
        children: [
          '/api/utils',
          '/api/test-utils',
          '/api/adapter/onebot',
          '/api/adapter/telegram',
          '/api/adapter/discord',
          '/api/adapter/kaiheila',
          '/api/database/mongo',
          '/api/database/mysql',
        ],
      }, {
        title: '更新与迁移',
        collapsable: false,
        children: [
          '/api/changelog',
          '/api/migration',
        ],
      }],
      '/plugins/': [['/plugins/', '总览'], {
        title: '常用功能 (Common)',
        collapsable: false,
        children: [
          '/plugins/common/',
          '/plugins/common/message',
          '/plugins/common/handler',
          '/plugins/common/admin',
          '/plugins/common/debug',
        ],
      }, {
        title: '教学系统 (Teach)',
        collapsable: false,
        children: [
          '/plugins/teach/',
          '/plugins/teach/interp',
          '/plugins/teach/prob',
          '/plugins/teach/regexp',
          '/plugins/teach/context',
          // '/plugins/teach/prev-succ',
          '/plugins/teach/misc',
          '/plugins/teach/config',
        ],
      }, {
        title: '执行脚本 (Eval)',
        collapsable: false,
        children: [
          '/plugins/eval/',
          '/plugins/eval/sandbox',
          '/plugins/eval/addon',
          '/plugins/eval/extension',
          '/plugins/eval/config',
        ],
      }, {
        title: '其他官方插件',
        collapsable: false,
        children: [
          '/plugins/other/assets',
          '/plugins/other/chess',
          '/plugins/other/github',
          '/plugins/other/image-search',
          '/plugins/other/puppeteer',
          // '/plugins/other/rss',
          '/plugins/other/schedule',
          '/plugins/other/tools',
          '/plugins/other/webui',
        ],
      }],
    },
    lastUpdated: '上次更新',
    docsRepo: 'koishijs/koishijs.github.io',
    docsBranch: 'docs',
    editLinks: true,
    editLinkText: '帮助我们改善此页面',
  },

  evergreen: () => !context.isProd,
})
