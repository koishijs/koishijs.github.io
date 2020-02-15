<template>
  <div class="panel-view" :class="{ mini: !controls && !title }">
    <div class="controls">
      <div class="circle red"/>
      <div class="circle yellow"/>
      <div class="circle green"/>
      <div class="title">{{ title }}</div>
    </div>
    <div class="content"><slot/></div>
  </div>
</template>

<script>

export default {
  props: {
    controls: Boolean,
    title: String,
  },
}

</script>

<style lang="stylus">

$circleRadius = 7px
$circleSpacing = 22px

.panel-view
  position relative
  border-radius 6px
  margin 1rem 0
  overflow-x auto
  background-color #f3f6f9

  .controls
    display initial
    position absolute
    top 0.8rem
    width 100%

    .circle
      position absolute
      top 8px - $circleRadius
      width 2 * $circleRadius
      height 2 * $circleRadius
      border-radius $circleRadius
      &.red
        left 17px
        background-color #ff5f56
      &.yellow
        left 17px + $circleSpacing
        background-color #ffbd2e
      &.green
        left 17px + 2 * $circleSpacing
        background-color #27c93f

    .title
      text-align center
      width 100%
      font-size 0.9rem
      line-height 1rem

  .content
    padding 0.2rem 1.2rem
    width fit-content

  &.mini .controls
    display none
  &:not(.mini) .content
    padding-top 2rem

</style>
