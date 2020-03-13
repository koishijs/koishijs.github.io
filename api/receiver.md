---
sidebarDepth: 2
---

# 接收器 (Receiver)

一个接收器是一个 [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) 实例，其上封装了所有 [CQHTTP 事件](https://cqhttp.cc/docs/4.12/#/Post)，并添加了一些专用于 Koishi 的事件。不同的事件可能触发在不同的上下文上。

## 事件：message

message 事件发生在机器人收到信息时，它会在相应的上下文触发。例如，一个发生在群 123 的 message 事件会有以下的触发效果：

```js
app.receiver.on('message', callback) // 触发
app.group(123).receiver.on('message', callback) // 触发
app.groups.except(456).receiver.on('message', callback) // 触发

app.group(456).receiver.on('message', callback) // 不触发
app.user(123).receiver.on('message', callback) // 不触发
app.discusses.receiver.on('message', callback) // 不触发
```

message 事件还拥有以下的子事件：

- message/normal: 普通群聊天信息
- message/anonymous: 匿名群聊天信息
- message/notice: 群提醒信息
- message/friend: 好友私聊信息
- message/group: 群友私聊信息
- message/discuss: 讨论组私聊信息
- message/other: 其他私聊信息

所有的 message 事件的回调函数都会传入一个 [`Meta` 对象](../guide/receive-and-send.md#深入-meta-对象)。

::: tip 注意
message/group 表示**由非好友的群友发起的私聊信息，并不是群聊信息**，请注意区分。群聊信息与其他信息的区分直接通过上下文而不是子事件实现。message/discuss 同理。
:::

## 事件：request

request 事件发生于机器人收到请求时，会在相应的上下文触发。所有的 request 事件的回调函数都会传入一个 [`Meta` 对象](../guide/receive-and-send.md#深入-meta-对象)。这个事件**本身不会触发**，只会通过以下子事件的形式触发：

- request/friend: 好友申请
- request/group/add: 加群申请
- request/group/invite: 群邀请

::: tip 注意
如果与 [Sender API](./sender.md) 进行比对，你会发现这里有一个小坑：request/friend 事件对应着 `sender.setFriendAddRequest()`，而两种 request/group 事件都对应着 `sender.setGroupAddRequest()`，并没有 `sender.setGroupInviteRequest()` 这个方法，也就是说 Sender API 中的 add 与这里的 subType 是没有关系的！
:::

## notice 系列事件

notice 系列事件发生于机器人收到提醒时，会在相应的上下文触发。所有这些事件的回调函数都会传入一个 [`Meta` 对象](../guide/receive-and-send.md#深入-meta-对象)。这些事件的共同点是 `meta.postType` 都为 `'notice'`。

### 事件：friend-add

新增好友事件，会在好友上下文触发。

### 事件：group-increase

群成员增加事件，会在群上下文触发。拥有下面的子事件：

- group-increase/approve: 通过申请加群
- group-increase/invite: 通过邀请加群

### 事件：group-decrease

群成员减少事件，会在群上下文触发。拥有下面的子事件：

- group-decrease/leave: 主动退群
- group-decrease/kick: 非登录号被踢出群
- group-decrease/kick-me: 登录号被踢出群

### 事件：group-upload

群文件上传事件，会在群上下文触发。

### 事件：group-admin

群管理员变动事件，会在群上下文触发。拥有下面的子事件：

- group-admin/set: 设置管理员
- group-admin/unset: 取消管理员

### 事件：group-ban

群禁言变动事件，会在群上下文触发。拥有下面的子事件：

- group-admin/ban: 禁言
- group-admin/lift-ban: 解除禁言

## metaEvent 系列事件

metaEvent 系列事件对应这 CQHTTP 插件本身的元事件，**只会在 App 实例触发**。所有这些事件的回调函数都会传入一个 [`Meta` 对象](../guide/receive-and-send.md#深入-meta-对象)。这些事件的共同点是 `meta.postType` 都为 `'meta_event'`。

### 事件：heartbeat

心跳元事件，**仅对 WebSocket 生效**。产生此事件需要通过将配置项 `enable_heartbeat` 设置为 `true`，并可通过 `heartbeat_interval` 配置心跳间隔（单位毫秒）。

### 事件：lifecycle

生命周期事件，**仅对 HTTP 生效**。拥有下面的子事件：

- lifecycle/enable: CQHTTP 插件启用
- lifecycle/disable: CQHTTP 插件停用
- lifecycle/connect: 成功建立 WebSocket 连接

## Koishi 内部事件

以下事件与 CQHTTP 无关，是 Koishi 内部的事件。

### 事件：before-connect

开始连接到服务器时在 App 实例触发。

### 事件：connect

成功连接到服务器时在 App 实例触发。

### 事件：ready

成功连接到服务器且已经获得 QQ 号时触发。参见 [ready 事件](../guide/lifecycle.md#ready-事件)。

### 事件：error

运行时产生错误时在 App 实例触发。调用时传入一个 [Error](https://nodejs.org/api/errors.html#errors_class_error) 对象。拥有下面的子事件：

- error/command: 指令调用出错
- error/middleware: 中间件调用出错

### 事件：before-group

当 Koishi 试图从数据库获取群信息前触发。调用时会传入一个 `Set<GroupField>` 对象和一个 [`ParsedCommandLine`](../guide/command-system.md#parsedcommandline-对象) 对象。如果当前没有正在解析的指令，则该对象只会有一个 `meta` 属性。你可以在回调函数中修改传入的字段集合，增加的字段将可以被之后的中间件获取到。

如果没有配置数据库，则该事件不会触发。

### 事件：before-user

当 Koishi 试图从数据库获取用户信息前触发。调用时会传入一个 `Set<UserField>` 对象和一个 [`ParsedCommandLine`](../guide/command-system.md#parsedcommandline-对象) 对象。如果当前没有正在解析的指令，则该对象只会有一个 `meta` 属性。你可以在回调函数中修改传入的字段集合，增加的字段将可以被之后的中间件获取到。

如果没有配置数据库，则该事件不会触发。

### 事件：attach <Badge type="error" text="deprecated"/>

请使用 [attach-user](#事件：attach-user) 事件。

### 事件：attach-group <Badge text="1.10.0+"/>

当 Koishi 完成群数据获取后触发。调用时会传入一个 Meta 对象，将会拥有 `$group` 属性。你可以在回调函数中对这两个属性做同步的修改（注意：只能是同步的修改）。这些修改会在后续过程中自动更新到数据库。

如果没有配置数据库或不是群聊消息，则该事件不会触发。

### 事件：attach-user <Badge text="1.10.0+"/>

当 Koishi 完成用户数据获取后触发。调用时会传入一个 Meta 对象，将会拥有 `$user` 属性（如果是群消息则还会拥有 `$group` 属性）。你可以在回调函数中对这两个属性做同步的修改（注意：只能是同步的修改）。这些修改会在后续过程中自动更新到数据库。

如果没有配置数据库，则该事件不会触发。

### 事件：before-send

准备发送信息时会在对应的上下文触发。调用时会传入一个伪 Meta 对象，拥有与 [`Meta`](../guide/receive-and-send.md#深入-meta-对象) 对象类似的结构，但是 `postType` 字段为 `send`。

### 事件：send

成功发送信息时会在对应的上下文触发。调用时会传入一个伪 Meta 对象，比 `before-send` 事件传入的对象多出一个 `messageId` 属性。

::: tip 提示
注意只有非异步 Sender API 成功调用会触发此事件，而异步调用和快速回复都只会触发 `before-send` 事件，因此你在实际使用中可能更需要上一个事件。
:::

### 事件：before-command

调用指令前会在对应的上下文触发。此时指令的可用性还未经检测，因此可能出现参数错误、权限不足、超过使用次数等情况。调用时传入一个 [`ParsedCommandLine`](../guide/command-system.md#parsedcommandline-对象) 对象。

### 事件：command

执行指令的 `action` 回调函数前会在对应的上下文触发。调用时传入一个 [`ParsedCommandLine`](../guide/command-system.md#parsedcommandline-对象) 对象。

### 事件：after-command

成功调用指令后会在对应的上下文触发。如果调用过程出错或者在指令内部触发 `next` 则不会触发。调用时传入一个 [`ParsedCommandLine`](../guide/command-system.md#parsedcommandline-对象) 对象。

### 事件：after-middleware

在执行完全部中间件后会在对应的上下文触发。调用时传入一个 [`Meta`](../guide/receive-and-send.md#深入-meta-对象) 对象。

### 事件：before-disconnect

关闭服务器前在 App 实例触发。

### 事件：disconnect

成功关闭服务器时在 App 实例触发。

### 事件：logger <Badge text="1.3.0+"/>

当调用 Logger 方法时在 App 实例触发。拥有下面的子事件，分别在对应的方法被调用时触发：

- logger/success
- logger/error
- logger/info
- logger/warn
- logger/debug

调用时传入的第一个参数是字符串，表示产生输出的来源；第二个参数也是字符串，表示输出的内容。logger 事件本身还会产生第三个字符串参数表示输出的类型，如 `info` 等等。
