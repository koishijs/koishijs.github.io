---
sidebarDepth: 2
---

# 接入 GitLab Webhook <Badge text="beta" type="warn"/>

koishi-plugin-gitlab-webhook 支持接收 [GitLab Webhook](https://gitlab.com/help/user/project/integrations/webhooks) 并转发到 QQ。

## 配置

这个插件的配置与 [koishi-plugin-github-webhook](./github-webhook.md) 类似，首先你需要在配置文件或传入 App 的选项中加一个 `gitlabWebhook` 属性，它用来控制服务器信息；而插件的选项则表示接收哪些仓库的 webhook 并转发到哪些群。下面是一个例子：

```js koishi.config.js
module.exports = {
  // 这里是默认值，secret 不能留空
  gitlabWebhook: {
    path: '/',
    port: 12140,
    secret: '',
  },
  plugins: [['gitlab-webhook', {
    // 当检测到 user/repo1 发生的事件时转发到 123，456 两个群
    'user/repo1': [123, 456],
  }]],
}
```
