<template>
  <panel-view title="terminal" bg-color="#282c34" fg-color="#eeeeee" :padding-v="0.8">
    <div
      v-for="({ type, cursor, value }, index) in lines" :key="index"
      :class="['line', type, { cursor }]"
    >{{ value }}</div>
  </panel-view>
</template>

<script>

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default {
  props: {
    content: {
      type: Array,
      required: true,
    },
    startDelay: {
      type: Number,
      default: 600,
    },
    typeDelay: {
      type: Number,
      default: 90,
    },
    lineDelay: {
      type: Number,
      default: 1500,
    },
  },

  data () {
    return {
      lines: this.content.map(line => ({
        ...line,
        value: '',
        cursor: false,
      })),
    }
  },

  async mounted () {
    while (1) {
      await this.start()
    }
  },

  methods: {
    async start() {
      await sleep(this.startDelay)
      this.lines.forEach(line => line.value = '')
      for (const line of this.lines) {
        const lineDelay = line.lineDelay || this.lineDelay
        if (!line.type) {
          await sleep(lineDelay)
          line.value = line.text
          return
        }
        await this.type(line)
      }
    },

    async type(line) {
      line.cursor = true
      const chars = [...line.text]
      const typeDelay = line.typeDelay || this.typeDelay
      line.value = ''

      for (let char of chars) {
        await sleep(typeDelay)
        line.value += char
      }
      line.cursor = false
    },
  },
}

</script>

<style lang="stylus" scoped>

.chat-panel > .content
  padding 2.8rem 1.2rem 1rem

.line
  line-height 1.6
  font-size 0.85em
  font-family source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace

  &.input::before
    content '$ '
    color #ff7f50
  
  &.cursor::after
    content '▋'
    font-family monospace
    margin-left 0.5em
    animation blink 1s infinite

@keyframes blink
  50%
    opacity 0

</style>
