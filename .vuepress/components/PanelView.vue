<template>
  <div class="chat-panel" :class="{ mini: !title }" :style="{ backgroundColor: bgColor, color: fgColor }">
    <div class="controls">
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="16" viewBox="0 0 60 16">
        <circle cx="8" cy="8" r="7" fill="#FF5F56"></circle>
        <circle cx="30" cy="8" r="7" fill="#FFBD2E"></circle>
        <circle cx="52" cy="8" r="7" fill="#27C93F"></circle>
      </svg>
      <div class="title">{{ title }}</div>
    </div>
    <div class="content" :style="{ padding }"><slot/></div>
  </div>
</template>

<script>

export default {
  props: {
    title: String,
    fgColor: {
      type: String,
      default: 'inherit',
    },
    bgColor: {
      type: String,
      default: '#f3f6f9',
    },
    paddingV: {
      type: Number,
      default: 0.2,
    },
    paddingH: {
      type: Number,
      default: 1.2,
    },
  },

  computed: {
    padding () {
      return `${this.paddingV + 1.8 * (!!this.title)}rem ${this.paddingH}rem ${this.paddingV}rem`
    },
  },
}

</script>

<style lang="stylus" scoped>

.chat-panel
  position relative
  border-radius 6px
  margin 1rem 0

  .controls
    display initial
    position absolute
    top 0.8rem
    width 100%
    > svg
      margin-left 1rem
      position absolute
    > .title
      text-align center
      width 100%
      font-size 0.9rem
      line-height 1rem

  &.mini
    .controls
      display none

</style>
