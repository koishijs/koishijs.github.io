import ChatMessage from './components/ChatMessage.vue'
import PanelView from './components/PanelView.vue'
import Terminal from './components/Terminal.vue'

export default ({ app }) => {
  app.component('chat-message', ChatMessage)
  app.component('panel-view', PanelView)
  app.component('terminal', Terminal)
  // Vue.prototype.$storage = new Vue({
  //   data: { ['package-manager']: null },
  //   created() {
  //     if (this.$isServer) return
  //     const key = 'koishi.package-manager'
  //     this.$watch(() => this['package-manager'], (val) => {
  //       localStorage.setItem(key, val)
  //     })
  //     this['package-manager'] = localStorage.getItem(key) || 'yarn'
  //   },
  // })
}
