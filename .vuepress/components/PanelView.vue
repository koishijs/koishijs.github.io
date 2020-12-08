<template>
  <div class="panel-view" :class="{ mini: !controls && !title && tabs.length === 1 }">
    <div class="controls">
      <div class="circle red"/>
      <div class="circle yellow"/>
      <div class="circle green"/>
      <div class="title">
        {{ title }}
        <template v-if="tabs.length > 1">
          <span :class="['tab', { active: tab === name }]" @click="tab = name"
            v-for="(name, index) in tabs" :key="index">{{ name }}</span>
        </template>
      </div>
    </div>
    <div class="content"><slot :name="tab"/></div>
  </div>
</template>

<script>

export default {
  props: {
    controls: Boolean,
    title: String,
    type: {
      type: String,
      required: false,
    },
  },

  data: () => ({
    tab: 'default',
  }),

  computed: {
    tabs() {
      return Object.keys(this.$slots)
    },
  },

  mounted() {
    if (!this.type) return
    this.$watch(() => this.$storage[this.type], (val) => {
      this.tab = val
    }, { immediate: true })
    this.$watch('tab', (val) => {
      this.$storage[this.type] = this.tab
    })
  },
}

</script>

<style lang="stylus">

$circleRadius = 6px
$circleSpacing = 19px

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

      .tab
        color gray
        cursor pointer

      .tab.active
        color white
        cursor default

      .tab + .tab::before
        cursor default
        content " | "
        color gray

  .content
    padding 0.2rem 1.2rem
    width fit-content

  &.mini .controls
    display none
  &:not(.mini) .content
    padding-top 2rem

</style>
