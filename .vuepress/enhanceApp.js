export default ({ Vue }) => {
  Vue.prototype.$storage = new Vue({
    data: { ['package-manager']: null },
    created() {
      if (this.$isServer) return
      const key = 'koishi.package-manager'
      this.$watch(() => this['package-manager'], (val) => {
        localStorage.setItem(key, val)
      })
      this['package-manager'] = localStorage.getItem(key) || 'yarn'
    },
  })
}
