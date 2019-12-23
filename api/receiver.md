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

## notice 系列事件

notice 系列事件发生于机器人收到提醒时，会在相应的上下文触发。所有这些事件的回调函数都会传入一个 [`Meta` 对象](../guide/receive-and-send.md#深入-meta-对象)。这些事件的共同点是 `meta.postType` 都为 `notice`。

### 事件：friend_add

新增好友事件，会在好友上下文触发。

### 事件：group_increase

群成员增加事件，会在群上下文触发。拥有下面的子事件：

- group_increase/approve: 通过申请加群
- group_increase/invite: 通过邀请加群

### 事件：group_decrease

群成员减少事件，会在群上下文触发。拥有下面的子事件：

- group_decrease/leave: 主动退群
- group_decrease/kick: 非登录号被踢出群
- group_decrease/kick_me: 登录号被踢出群

### 事件：group_upload

群文件上传事件，会在群上下文触发。

### 事件：group_admin

群管理员变动事件，会在群上下文触发。拥有下面的子事件：

- group_admin/set: 设置管理员
- group_admin/unset: 取消管理员

### 事件：group_ban

群禁言变动事件，会在群上下文触发。拥有下面的子事件：

- group_admin/ban: 禁言
- group_admin/lift_ban: 解除禁言

## meta_event 系列事件

meta_event 系列事件对应这 CQHTTP 插件本身的元事件，**只会在 App 实例触发**。所有这些事件的回调函数都会传入一个 [`Meta` 对象](../guide/receive-and-send.md#深入-meta-对象)。这些事件的共同点是 `meta.postType` 都为 `meta_event`。

### 事件：heartbeat

心跳元事件，**仅对 WebSocket 生效**。产生此事件需要通过将配置项 `enable_heartbeat` 设置为 `true`，并可通过 `heartbeat_interval` 配置心跳间隔（单位毫秒）。

### 事件：lifecycle

生命周期事件，**仅对 HTTP 生效**。拥有下面的子事件：

- lifecycle/enable: CQHTTP 插件启用
- lifecycle/disable: CQHTTP 插件停用

## Koishi 内部事件

以下事件与 CQHTTP 无关，是 Koishi 内部的事件。

### 事件：send

成功发送信息时会在对应的上下文触发。调用时会传入一个“伪 Meta 对象”，拥有与 [`Meta` 对象](../guide/receive-and-send.md#深入-meta-对象) 类似的结构，但是 `postType` 字段为 `send`。

### 事件：error

在做了（

### 事件：warning

产生运行时警告时在 App 实例触发。调用时传入一个 [Error](https://nodejs.org/api/errors.html#errors_class_error) 对象。

### 事件：connect

成功连接到服务器时在 App 实例触发。

### 事件：connected

connect 事件的别名。
