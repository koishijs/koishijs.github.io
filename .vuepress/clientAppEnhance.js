import ChatMessage from './components/ChatMessage.vue'
import PanelView from './components/PanelView.vue'
import Terminal from './components/Terminal.vue'
import { reactive, watch } from 'vue'
import { defineClientAppEnhance } from '@vuepress/client'

function getStorage(key) {
  const raw = localStorage.getItem(key)
  if (!raw) return
  return JSON.parse(raw)
}

export default defineClientAppEnhance(({ app }) => {
  app.component('chat-message', ChatMessage)
  app.component('panel-view', PanelView)
  app.component('terminal', Terminal)
  console.log(app)
  const key = 'koishi.docs.config'
  const data = { 'package-manager': 'yarn', ...getStorage(key) }
  const storage = reactive(data)
  app.provide('$storage', storage)
  watch(storage, (val) => {
    localStorage.setItem(key, val)
  })
})
