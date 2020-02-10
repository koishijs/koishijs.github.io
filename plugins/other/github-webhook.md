---
sidebarDepth: 2
---

# 接入 GitHub Webhook <Badge text="beta" type="warn"/>

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

这一节展示了目前本插件支持的事件。全部取自真正触发在 koishijs/koishi 仓库的事件。

### Push

#### Normal Push

<panel-view mini>
<chat-message nickname="Koishi" avatar="/koishi.png">
<p>[GitHub] Push (<em>koishijs/koishi</em>)</p>
<p>Ref: <em>refs/heads/develop</em></p>
<p>User: <em>Shigma</em></p>
<p>Compare: <em>https://github.com/koishijs/koishi/compare/976c6e8f09a4...3ae7e7044d06</em></p>
<p><em>chore: adjust</em></p>
<p><em>fix(core): create major context at demand</em></p>
</chat-message>
</panel-view>

#### Release Tag

<panel-view mini>
<chat-message nickname="Koishi" avatar="/koishi.png">
<p>[GitHub] <em>koishijs/koishi</em> published tag <em>1.5.0</em></p>
</chat-message>
</panel-view>

#### Commit Comment

<panel-view mini>
<chat-message nickname="Koishi" avatar="/koishi.png">
<p>[GitHub] Commit Comment (<em>koishijs/koishi</em>)</p>
<p>User: <em>Shigma</em></p>
<p>URL: <em>https://github.com/koishijs/koishi/commit/bff469eabe14d42683a4f7c3ccb659daec5e1c00#commitcomment-36878220</em></p>
<p><em>This will introduce a failure in test.</em></p>
</chat-message>
</panel-view>

### Issue

#### Issue Open

<panel-view mini>
<chat-message nickname="Koishi" avatar="/koishi.png">
<p>[GitHub] Issue Opened (<em>koishijs/koishi#19</em>)</p>
<p>Title: <em>Wie kann man um das Koishi zu installieren?</em></p>
<p>User: <em>simon300000</em></p>
<p>URL: <em>https://github.com/koishijs/koishi/issues/19</em></p>
<p><em>Ich verstecke Englisch und Chinesisch nicht! Gab es Personen, die mir helfen kann?</em></p>
</chat-message>
</panel-view>

#### Issue Comment

<panel-view mini>
<chat-message nickname="Koishi" avatar="/koishi.png">
<p>[GitHub] Issue Comment (<em>koishijs/koishi#19</em>)</p>
<p>User: <em>simon300000</em></p>
<p>URL: <em>https://github.com/koishijs/koishi/issues/19#issuecomment-576277946</em></p>
<p><em>Mich würde auch interessieren, was ist „CoolQ“?</em></p>
</chat-message>
</panel-view>

### Pull Request

#### Pull Request Open

<panel-view mini>
<chat-message nickname="Koishi" avatar="/koishi.png">
<p>[GitHub] Pull Request Opened (<em>koishijs/koishi#364852707</em>)</p>
<p><em>koishijs:develop <- koishijs:experimental</em></p>
<p>User: <em>simon300000</em></p>
<p>URL: <em>https://github.com/koishijs/koishi/pull/20</em></p>
<p><em>Das ist wichtig!</em></p>
</chat-message>
</panel-view>

#### Pull Request Comment

<panel-view mini>
<chat-message nickname="Koishi" avatar="/koishi.png">
<p>[GitHub] Pull Request Comment (<em>koishijs/koishi#20</em>)</p>
<p>User: <em>Kouchya</em></p>
<p>URL: <em>https://github.com/koishijs/koishi/pull/20#issuecomment-576291300</em></p>
<p><em>C'est important!</em></p>
</chat-message>
</panel-view>

#### Pull Request Review

<panel-view mini>
<chat-message nickname="Koishi" avatar="/koishi.png">
<p>[GitHub] Pull Request Review (<em>koishijs/koishi#364852707</em>)</p>
<p><em>User: Kouchya</em></p>
<p><em>URL: https://github.com/koishijs/koishi/pull/20#pullrequestreview-345349537</em></p>
<p><em>LGTM</em></p>
</chat-message>
</panel-view>

#### Pull Request Review Comment

<panel-view mini>
<chat-message nickname="Koishi" avatar="/koishi.png">
<p>[GitHub] Pull Request Review (<em>koishijs/koishi#364852707</em>)</p>
<p>Path: <em>packages/test-utils/src/mocks.ts</em></p>
<p>User: <em>Shigma</em></p>
<p>URL: <em>https://github.com/koishijs/koishi/pull/20#discussion_r368570320</em></p>
<p><em>Naming is so hard......</em></p>
</chat-message>
</panel-view>
