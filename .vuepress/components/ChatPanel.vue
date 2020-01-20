<template>
  <div class="chat-panel">
    <div class="controls">
      <svg xmlns="http://www.w3.org/2000/svg" width="52" height="12" viewBox="0 0 52 12">
        <circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle>
        <circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle>
        <circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle>
      </svg>
      <div class="title">{{ title }}</div>
    </div>
    <div class="content"><slot/></div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: '聊天记录',
    },
  },
}

</script>

<style lang="stylus" scoped>

.chat-panel
  position relative
  background-color #f3f6f9
  border-radius 6px
  margin 1rem 0

  .controls
    display initial
    position absolute
    top 0.75rem
    width 100%
    > svg
      margin-top 4px
      margin-left 1.25rem
      position absolute
    > .title
      text-align center
      width 100%
      font-size 0.9rem

  .content
    padding 2rem 1.2rem 0.2rem

</style>
