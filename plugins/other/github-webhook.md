---
sidebarDepth: 2
---

# 接入 Github Webhook <Badge text="beta" type="warn"/>

koishi-plugin-github-webhook 支持接收 [GitHub Webhook](https://developer.github.com/webhooks/) 并转发到 QQ。

## 配置

这个插件的配置分为两部分。首先你需要在配置文件或传入 App 的选项中加一个 `githubWebhook` 属性，它用来控制服务器信息；而插件的选项则表示接收哪些仓库的 webhook 并转发到哪些群。下面是一个例子：

```js koishi.config.js
module.exports = {
  // 这里是默认值，secret 不能留空，否则 @octokit/webhooks 会报错
  githubWebhook: {
    path: '/',
    port: 12140,
    secret: '',
  },
  plugins: [['github-webhook', {
    // 当检测到 user/repo1 发生的事件时转发到 123，456 两个群
    'user/repo1': [123, 456],
  }]],
}
```

## 示例

这一节展示了目前本插件支持的事件。全部取自真正触发的事件。

### Push

#### Normal Push

<chat-panel mini>
<chat-message nickname="Koishi" avatar="/koishi.png">
<p>[GitHub] Push (<em>koishijs/koishi</em>)</p>
<p>Ref: <em>master</em></p>
<p>User: <em>Shigma</em></p>
<p>Compare: <em>https://github.com/koishijs/koishi/compare/976c6e8f09a4...3ae7e7044d06</em></p>
<p><em>chore: adjust</em></p>
<p><em>fix(core): create major context at demand</em></p>
</chat-message>
</chat-panel>

#### Release Tag

<chat-panel mini>
<chat-message nickname="Koishi" avatar="/koishi.png">
<p>[GitHub] <em>koishijs/koishi</em> published tag <em>1.5.0</em></p>
</chat-message>
</chat-panel>

#### Commit Comment

### Issue

#### Issue Open

<chat-panel mini>
<chat-message nickname="Koishi" avatar="/koishi.png">
<p>[GitHub] Issue Opened (<em>koishijs/koishi#19</em>)</p>
<p>Title: <em>Wie kann man um das Koishi zu installieren?</em></p>
<p>User: <em>simon300000</em></p>
<p>URL: <em>https://github.com/koishijs/koishi/issues/19</em></p>
<p><em>Ich verstecke Englisch und Chinesisch nicht! Gab es Personen, die mir helfen kann?</em></p>
</chat-message>
</chat-panel>

#### Issue Comment

<chat-panel mini>
<chat-message nickname="Koishi" avatar="/koishi.png">
<p>[GitHub] Issue Comment (<em>koishijs/koishi#19</em>)</p>
<p>User: <em>simon300000</em></p>
<p>URL: <em>https://github.com/koishijs/koishi/issues/19#issuecomment-576277946</em></p>
<p><em>Mich würde auch interessieren, was ist „CoolQ“?</em></p>
</chat-message>
</chat-panel>

### Pull Request

#### Pull Request Open

#### Pull Request Comment

#### Pull Request Review

#### Pull Request Review Comment
