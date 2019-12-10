<template>
  <div class="code-container">
    <div class="controls">
      <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14">
        <circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle>
        <circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle>
        <circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle>
      </svg>
    </div>
    <slot/>
  </div>
</template>

<style lang="stylus" scoped>

.code-container
  position relative

  pre
    padding 1rem 1.25rem

  .controls
    display none

  .home &
    padding 2rem
    margin 0 -2rem

    .controls
      display initial
      position absolute
      top 3.85rem
      margin-left 1.25rem

    pre
      padding 2.75rem 1.25rem 1rem
      box-shadow rgba(0, 0, 0, 0.55) 0px 20px 68px

</style>
