---
sidebarDepth: 2
---

# 接入 GitHub (GitHub)

::: tip
要启用授权和快速响应相关功能，你需要安装数据库支持。
:::

::: tip
要启用屏幕截图相关功能，你需要安装 [koishi-plugin-puppeteer](./puppeteer.md)。
:::

koishi-plugin-github 封装了一系列 GitHub 相关的功能。

## 基本用法

Koishi 会监听 [GitHub Webhooks](https://developer.github.com/webhooks/)，将收到的事件进行处理后发送到特定频道中。你还可以直接回复某条推送，通过快捷指令来实现进一步的功能，例如查看链接、进行评论、合并 PR 等等。

<panel-view title="聊天记录">
<chat-message nickname="Koishi" avatar="/koishi.png">
<p>[GitHub] Shigma pushed to koishijs/koishi:develop</p>
<p>[d7ff34] chore: adjust</p>
<p>[3ae7e7] fix(core): create major context at demand</p>
</chat-message>
<chat-message nickname="Alice" color="#cc0066">
<blockquote>
<p>[GitHub] Shigma pushed to koishijs/koishi:develop</p>
<p>[d7ff34] chore: adjust</p>
<p>[3ae7e7] fix(core): create major context at demand</p>
</blockquote>
<p>.link</p>
</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png">https://github.com/koishijs/koishi/compare/976c6e8f09a4...3ae7e7044d06</chat-message>
</panel-view>

## 指令：github.authorize

## 指令：github.recent

## 支持的事件

- commit_comment
- create
- delete
- fork
- issues (opened/closed)
- issue_comment
- milestone (created)
- pull_request (opened/closed)
- pull_request_review (submitted)
- pull_request_review_comment
- push
- star (created)

## 配置项

### secret

- 类型: `string`

提供给 GitHub 的密钥。

### webhook

- 类型: `string`
- 默认值: `'/github/webhook'`

GitHub Webhooks 服务的路径。

### authorize

- 类型: `string`
- 默认值: `'/github/authorize'`

GitHub 授权服务的路径。

### messagePrefix

- 类型: `string`
- 默认值: `'[GitHub] '`

显示在每条消息前的文本。

### appId

- 类型: `string`

### appSecret

- 类型: `string`

### redirect

- 类型: `string`

### promptTimeout

- 类型: `number`

### replyTimeout

- 类型: `number`

### requestTimeout

- 类型: `number`

### repos

- 类型: `Record<string, string[]>`

### events

- 类型: `EventConfig`


