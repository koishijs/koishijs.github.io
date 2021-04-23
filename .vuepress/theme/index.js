module.exports = {
  extends: '@vuepress/theme-default',

  markdown: {
    code: false,
  },

  plugins: [
    ['@vuepress/palette', {
      preset: 'sass',
    }],
    [require('../markdown/highlight')],
    [require('../markdown/link')],
    [require('../markdown/github')],
    ['medium-zoom', {
      selector: '.theme-default-content :not(a) > img:not(.no-zooming)',
    }],
  ],
}
