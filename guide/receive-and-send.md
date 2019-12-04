---
sidebarDepth: 3
---

# 接收和发送信息

从本节开始，我们开始深入研究如何利用 Koishi 的来接收和发送信息。如果你不是一个插件开发者，你可以选择跳过本节和接下来的几个章节。但如果你对如何开发 Koishi 感兴趣，那么真正有趣的部分才刚刚开始。

::: tip 提示
接下来的教程可能会涉及对 Koishi API 的调用。如果你不知道如何用这些 API 运行你的机器人，你可能需要查看 [调用 Koishi](./getting-started.md#调用-koishi) 一节。如果你想获得某个 API 的具体用法，你可以参考 [API 文档](../api/) 。
:::

## 接收器

一个接收器是一个 [EventEmitter](https://nodejs.org/api/events.html)，你可以像这样调用它：

```js
app.receiver.on('message', (meta) => {
  // 当收到信息时打印到控制台
  console.log(meta.message)
})
```

在这个简单的示例中，这里有两件事你需要了解：

上面的 `meta` 对象被称为**元信息**。元信息具有通用的结构，只要是来自 [CQHTTP 的事件](https://cqhttp.cc/docs/4.12/#/Post)，无论类型都会被解析成这个统一结构。你可以在本节的最后查看 [Meta 对象的详细结构](#meta-对象)。

上面的 `message` 字符串被称为**事件名称**。Koishi 的事件名和 `meta.postType` 字段进行对应。同时，根据 postType 的不同，Koishi 会相应地添加二级事件。二级事件和一级事件会被同时触发，因此你只需要根据具体的需求监听其中的一个即可。例如，一个 postType 为 `notice`，noticeType 为 `group_upload` 的事件会同时触发 `notice` 和 `notice/group_upload` 两个监听器。

除去由 CQHTTP 提供的事件外，Koishi 自身也提供了一批事件，你可以在 [接收器](../api/receiver.md) 一章中看到目前支持的所有事件名。

## 发送器

一个发送器封装了一套 [CQHTTP API](https://cqhttp.cc/docs/4.12/#/API)。你可以像这样调用它：

```js
// 向服务器发送信息
app.sender.sendPrivateMessage(123456789, 'Hello world')

// 从服务器获取信息
const groupInfo = await app.sender.getGroupInfo(987654321)
```

如果你熟悉 CQHTTP API 的话，这对你一定不陌生。没错，这套接口和 CQHTTP 提供的接口是一一对应的。除此以外，由于 Koishi 全部使用 TypeScript 编写，我们还提供了完整的类型定义，让你在编写代码时再也不无需查看 CQHTTP 文档。

## 中间件

## Meta 对象

本节将深入介绍 Meta 对象的全部属性。除了所有属性都会被转换成 camelCase 以外，Meta 对象的属性与 CQHTTP 事件上报的属性是一一对应的。其中，以 `$` 开头的是 Koishi 添加的属性。

### 基本属性

- postType: `'message' | 'notice' | 'request'| 'meta_event'`
- selfId: `number` 机器人自身 ID
- userId: `number` 涉及的用户 ID
- groupId: `number` 涉及的群 ID
- discussId: `number` 涉及的讨论组 ID

### message 型元数据属性

- messageType: `'private' | 'group' | 'discuss'`
- subType:
  - 如果是私聊消息：`'friend' | 'group' | 'discuss' | 'other'`
  - 如果是群消息：`'normal' | 'anonymous' | 'notice'`
- messageId: `number` 信息 ID，用于撤回等
- message: `string` 消息内容
- rawMessage: `string` 原始消息内容
- font: `number` 字体
- sender: `SenderInfo` 发送人信息
  - userId: `number` 用户 ID
  - nickname: `string` 昵称
  - sex: `'male' | 'female' | 'unknown'`
  - age: `number` 年龄
  - title: `string` 专属头衔（仅限群消息）
  - card: `string` 群名片 / 备注（仅限群消息）
  - area: `string` 地区（仅限群消息）
  - level: `string` 成员等级（仅限群消息）
  - role: `'owner' | 'admin' | 'member'`（仅限群消息）
- anonymous: `AnonymousInfo` 匿名信息
  - id: `number` 匿名用户 ID
  - name: `string` 用户名称
  - flag: `string` 匿名用户 flag，在调用禁言 API 时需要传入

### notice 型元数据属性

- noticeType: `'group_upload' | 'group_admin' | 'group_increase' | 'group_ban' | 'friend_add'`
- subType:
  - 如果是管理员变动：`'set' | 'unset'`
  - 如果是群成员增加：`'approve' | 'invite'`
  - 如果是群成员减少：`'leave' | 'kick' | 'kick_me'`
  - 如果是群禁言：`'ban' | 'lift_ban'`
- operatorId: `number` 操作者 ID
- duration: `number` 禁言时长（秒）
- file: `FileInfo` 文件信息
  - id: `string` 文件 ID
  - name: `string` 文件名
  - size: `number` 文件大小（字节）
  - busid: `number`

### request 型元数据属性

- requestType: `'friend' | 'group'`
- subType: `'add' | 'invite'`（如果是加群请求）
- comment: `string` 验证信息
- flag: `string` 请求 flag，在调用处理请求的 API 时需要传入

### metaEvent 型元数据属性

- metaEventType: `'lifecycle' | 'heartbeat'`
- subType: `'enable' | 'disable'`（如果是生命周期）
- interval: `number` 到下次心跳的间隔（毫秒）
- status: `StatusInfo` 状态信息，请参考 [getStatus](../api/sender.md#sender-getstatus) 的返回值

### Koishi 添加的属性

- $path: `string` 当前上下文的路径，参见 [上下文](./plugin-development.md#上下文)
- $user: `User` 一个观测中的用户数据对象（仅当配置数据库时生效）
- $group: `GroupData` 一个群数据对象（仅当配置数据库时生效）
- $send: `(message: string) => Promise<void>` 向当前上下文发送信息
