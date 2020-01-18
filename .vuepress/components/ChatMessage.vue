<template>
  <div class="chat-message">
    <img v-if="avatar" class="avatar" :src="avatar"/>
    <div v-else class="avatar" :style="{ backgroundColor: color }">{{ nickname[0] }}</div>
    <div class="nickname">{{ nickname }}</div>
    <div class="message-box">
      <slot>&nbsp</slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    nickname: String,
    color: String,
    avatar: String,
  },
}

</script>

<style lang="stylus" scoped>

.chat-message
  position relative
  margin 1rem 0

.avatar
  width 3rem
  height 3rem
  position absolute
  border-radius 100%
  transform translateY(-1px)
  user-select none
  pointer-events none
  text-align center
  line-height 3rem
  font-size 1.6rem
  color white
  font-family "Comic Sans MS"

.nickname
  position relative
  margin 0 0 0.5rem 4.4rem
  font-weight bold

.message-box
  position relative
  margin-left 4.4rem
  width fit-content
  line-height 1.6
  border-radius 0.5rem
  background-color white

  > img
    border-radius 0.5rem

  img
    vertical-align middle

  p > img
    margin 0.2rem 0

  .chat-message:not(.no-padding) &
    padding 0.6rem 0.8rem

  &::after
    content ''
    position absolute
    right 100%
    top 0px
    width 12px
    height 12px
    border 0 solid transparent
    border-bottom-width 8px
    border-bottom-color currentColor
    border-radius 0 0 0 32px
    color white

  p
    margin 0
    line-height 1.6

</style>
