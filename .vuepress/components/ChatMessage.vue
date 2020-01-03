<template>
  <div class="chat-message" :class="{ right }">
    <img class="avatar" :src="right ? '/user.svg' : '/bot.svg'"/>
    <div class="message-box"><slot>&nbsp;</slot></div>
  </div>
</template>

<script>

export default {
  props: {
    right: Boolean,
  },
}

</script>

<style lang="stylus" scoped>

$shadowSize = 1px

.chat-message
  position relative
  margin 1rem 4.4rem 1rem 0
  &.right
    margin 1rem 0 1rem 4.4rem

.avatar
  width 3rem
  height 3rem
  position absolute
  border-radius 100%
  transform translateY(-1px)
  user-select none
  pointer-events none

  .chat-message.right &
    right 0

.message-box
  position relative
  margin-left 4.4rem
  width fit-content
  line-height 1.6
  padding 0.6rem 0.8rem
  border-radius 0.5rem
  box-shadow 0 0 $shadowSize $shadowSize transparentify(black, 0.2)

  &::before
    content ""
    position absolute
    width 0.8rem
    height 0.8rem
    left -0.4rem
    top 1rem
    transform rotate(45deg)
    background white
    box-shadow (- $shadowSize) $shadowSize $shadowSize 0 transparentify(black, 0.2)

  .chat-message.right &
    margin-left auto
    margin-right 4.4rem
    &::before
      left unset
      right -0.4rem
      box-shadow $shadowSize (- $shadowSize) $shadowSize 0 transparentify(black, 0.2)

  p
    margin 0

</style>
