---
sidebarDepth: 2
---

# 事件 (Events)

::: danger 注意
这里是**正在施工**的 koishi v3 的文档。要查看 v1 版本的文档，请前往[**这里**](/v1/)。
:::

一个接收器是一个 [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) 实例，其上封装了所有 [CQHTTP 事件](https://cqhttp.cc/docs/4.12/#/Post)，并添加了一些专用于 Koishi 的事件。不同的事件可能触发在不同的上下文上。

## 上报事件

### 基本会话属性

以下属性对所有会话都有：

- **type:** `string` 事件名称
- **subtype:** `string` 一级子事件名称
- **subsubtype:** `string` 二级子事件名称
- **platform:** `string` 产生事件的平台
- **selfId:** `string` 收到事件的机器人的平台 ID
- **userId:** `string` 触发事件的用户的平台 ID
- **groupId:** `string` 触发事件的群组的平台 ID
- **channelId:** `string` 触发事件的频道的平台 ID
- **timestamp:** `number` 收到事件的 UNIX 时间，单位为毫秒

### 消息类事件

跟消息有关的几种事件统称为消息事件，共有以下几种：

- message: 收到新消息
- message-deleted: 消息被删除
- message-updated: 消息被修改
- send: 机器人发出消息

这些事件都还拥有以下的子事件：

- private: 该消息是私聊消息
- group: 该消息是群组消息

与此类事件相关的属性有：

- **messageId:** `string` 消息 ID
- **content:** `string` 消息内容
- **author:** 发送者信息
  - **author.userId:** `string` 发送者的平台 ID
  - **author.username:** `string` 发送者的平台昵称
  - **author.nickname:** `string` 发送者在当前群组中的昵称

::: tip
通常情况下 `author.userId` 应该与 `userId` 相同，但也有例外。如果是你发送的消息被管理员删除了，那么这两个字段就会是不同的了。
:::

### 成员类事件

跟群组、好友有关的事件统称为成员事件，共有以下几种：

- group-added: 加入了群组
- group-deleted: 退出了群组
- group-request: 收到了群组邀请
- group-member-added: 群组成员增加
- group-member-deleted: 群组成员减少
- group-member-request: 收到了入群申请
- friend-added: 好友数量增加
- friend-deleted: 好友数量减少
- friend-request: 收到了好友请求

其中形如 group(-member)?-(added|deleted) 的事件都还拥有以下的子事件：

- active: 该操作是由加入或退出方发起的
- passive: 该操作是群组方发起的

与此类事件相关的属性有：

- **operatorId:** `string` 操作者 ID

### 操作类事件

上报事件中最主要的一部分都有着统一的结构：**事件主体** + **操作类型**。例如好友请求事件是 friend-request，群组文件更新事件是 group-file-updated 等。目前支持的事件主体包括以下几种：

- friend
- channel
- group
- group-member
- group-role
- group-file
- group-emoji

操作类型包含以下几种：

- added
- removed
- deleted

与此类事件相关的属性有：

<!-- - **file:** 文件信息 -->
- TODO

### 通知类事件

由系统在频道中发送的各种通知构成了通知事件，共有以下几种：

- notice/poke: 戳一戳
- notice/lucky-king: 运气王
- notice/honor: 群荣誉

与此类事件相关的属性有：

- **targetId:** `string` 戳一戳的目标用户 ID，运气王的获得者 ID
- **honorType:** `string` 荣誉类型，可能为 talkative, performer, emotion

## Koishi 内部事件

以下事件与 CQHTTP 无关，是 Koishi 内部的事件。

### 事件：before-connect

开始连接到服务器时在 App 实例触发。

### 事件：connect

成功连接到服务器时在 App 实例触发。

### 事件：ready

成功连接到服务器且已经获得 QQ 号时触发。参见 [ready 事件](../guide/lifecycle.md#ready-事件)。

### 事件：before-group

当 Koishi 试图从数据库获取群信息前触发。调用时会传入一个 `Set<GroupField>` 对象和一个 [`ParsedCommandLine`](../guide/command-system.md#parsedcommandline-对象) 对象。如果当前没有正在解析的指令，则该对象只会有一个 `meta` 属性。你可以在回调函数中修改传入的字段集合，增加的字段将可以被之后的中间件获取到。

如果没有配置数据库，则该事件不会触发。

### 事件：before-user

当 Koishi 试图从数据库获取用户信息前触发。调用时会传入一个 `Set<UserField>` 对象和一个 [`ParsedCommandLine`](../guide/command-system.md#parsedcommandline-对象) 对象。如果当前没有正在解析的指令，则该对象只会有一个 `meta` 属性。你可以在回调函数中修改传入的字段集合，增加的字段将可以被之后的中间件获取到。

如果没有配置数据库，则该事件不会触发。

### 事件：attach <Badge type="error" text="deprecated"/>

请使用 [attach-user](#事件：attach-user) 事件。

### 事件：attach-channel <Badge text="1.10.0+"/>

当 Koishi 完成群数据获取后触发。调用时会传入一个 Meta 对象，将会拥有 `$group` 属性。你可以在回调函数中对这两个属性做同步的修改（注意：只能是同步的修改）。这些修改会在后续过程中自动更新到数据库。

如果没有配置数据库或不是群聊消息，则该事件不会触发。

### 事件：attach-user <Badge text="1.10.0+"/>

当 Koishi 完成用户数据获取后触发。调用时会传入一个 Meta 对象，将会拥有 `$user` 属性（如果是群消息则还会拥有 `$group` 属性）。你可以在回调函数中对这两个属性做同步的修改（注意：只能是同步的修改）。这些修改会在后续过程中自动更新到数据库。

如果没有配置数据库，则该事件不会触发。

### 事件：before-send

准备发送信息时会在对应的上下文触发。调用时会传入一个伪 Meta 对象，拥有与 [`Meta`](../guide/message.md#深入-meta-对象) 对象类似的结构，但是 `postType` 字段为 `send`。

### 事件：send

成功发送信息时会在对应的上下文触发。调用时会传入一个伪 Meta 对象，比 `before-send` 事件传入的对象多出一个 `messageId` 属性。

::: tip 提示
注意只有非异步 Sender API 成功调用会触发此事件，而异步调用和快速回复都只会触发 `before-send` 事件，因此你在实际使用中可能更需要上一个事件。
:::

### 事件：before-command

调用指令前会在对应的上下文触发。此时指令的可用性还未经检测，因此可能出现参数错误、权限不足、超过使用次数等情况。调用时传入一个 [`ParsedCommandLine`](../guide/command-system.md#parsedcommandline-对象) 对象。

### 事件：command

执行指令的 `action` 回调函数前会在对应的上下文触发。调用时传入一个 [`ParsedCommandLine`](../guide/command-system.md#parsedcommandline-对象) 对象。

### 事件：after-middleware

在执行完全部中间件后会在对应的上下文触发。调用时传入一个 [`Meta`](../guide/message.md#深入-meta-对象) 对象。

### 事件：before-disconnect

关闭服务器前在 App 实例触发。

### 事件：disconnect

成功关闭服务器时在 App 实例触发。
