<template>
  <div class="panel-view" :class="[type, { mini: !controls && !titleText }]">
    <div class="controls">
      <div class="circle red"/>
      <div class="circle yellow"/>
      <div class="circle green"/>
      <div class="title">
        <span class="title-text">{{ titleText }}</span>
        <template v-if="tabs.length > 1">
          <span :class="['tab', { active: tab === name }]" @click="tab = name"
            v-for="(name, index) in tabs" :key="index">{{ name }}</span>
        </template>
      </div>
    </div>
    <div class="content">
      <template v-if="messages">
        <template v-for="(message, index) of messages">
          <p v-if="typeof message === 'string'" :key="index">{{ message }}</p>
          <chat-message v-else :nickname="message[0]" :key="index">
            <template v-for="(content, index) in message.slice(1)">
              <p v-if="typeof content === 'string'" :key="index">{{ content }}&nbsp;</p>
              <component v-else :key="index" :is="content.tag" v-bind="content.attrs"/>
            </template>
          </chat-message>
        </template>
      </template>
      <slot v-else :name="tab"/>
    </div>
  </div>
</template>

<script>

const titleMap = {
  manager: '命令行',
}

export default {
  props: {
    controls: Boolean,
    title: String,
    messages: Array,
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
    titleText() {
      if (this.messages) return '聊天记录'
      return this.title || titleMap[this.type]
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

  &.manager
    background-color #032f62

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
        transition .3s ease

      .tab.active
        color white
        cursor default

      .title-text + .tab::before
        color gray
        content " - "

      .tab + .tab::before
        cursor default
        content " | "
        color gray

  .content
    padding 0.2rem 1.2rem
  
    > p
      font-size 0.8rem
      color #909399
      text-align center

  &.mini .controls
    display none
  &:not(.mini) .content
    padding-top 2rem

</style>
