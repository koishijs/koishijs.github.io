export default ({ Vue }) => {
  Vue.prototype.$storage = new Vue({
    data: {
      manager: 'yarn',
      language: 'ts',
    },
    created() {
      if (this.$isServer) return
      const key = 'koishi.docs.config'
      this.$watch('manager', () => {
        localStorage.setItem(key, JSON.stringify(this._data))
      })
      this.$watch('language', () => {
        localStorage.setItem(key, JSON.stringify(this._data))
      })
      const config = localStorage.getItem(key)
      if (config) Object.assign(this, JSON.parse(config))
    },
  })
}
