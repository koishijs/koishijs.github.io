<template>
  <div class="code-container" :class="{ 'show-title': title }">
    <div class="controls">
      <svg xmlns="http://www.w3.org/2000/svg" width="52" height="12" viewBox="0 0 52 12">
        <circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle>
        <circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle>
        <circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle>
      </svg>
      <div class="title">{{ title }}</div>
    </div>
    <slot/>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: '',
    }
  },
}

</script>

<style lang="stylus" scoped>

.code-container
  position relative

  pre
    padding 1rem 1.25rem

  .controls
    display none

  .home &, &.show-title
    .controls
      display initial
      position absolute
      top 0.85rem
      width 100%
      color white
      > svg
        margin-top 4px
        margin-left 1.25rem
        position absolute
      > .title
        text-align center
        width 100%
        font-size 0.9rem

    pre
      padding 2.75rem 1.25rem 1rem

</style>
