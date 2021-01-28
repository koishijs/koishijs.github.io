---
title: 平台：OneBot
sidebarDepth: 2
---

# koishi-adapter-onebot

[OneBot](https://github.com/howmanybots/onebot) (旧名 CQHTTP) 是一个聊天机器人应用接口标准，目前可用于 QQ 机器人。要使用 koishi-adapter-onebot，你需要首先下载一个实现该协议的框架：

- [Mrs4s/go-cqhttp](https://github.com/Mrs4s/go-cqhttp)（推荐）
- [yyuueexxiinngg/cqhttp-mirai](https://github.com/yyuueexxiinngg/cqhttp-mirai)
- [richardchien/coolq-http-api](https://github.com/richardchien/coolq-http-api)（配合 [iTXTech/mirai-native](https://github.com/iTXTech/mirai-native) 使用）

上述框架也在 OneBot 的基础上扩展了各自的接口，而这些扩展的功能也被包含在了 koishi-adapter-onebot 中。

- 标有 <Badge vertical="baseline" text="go-cqhttp" type="warn"/> 的 API 只能基于 go-cqhttp 运行

## 机制说明

### 异步调用

OneBot 提出了**异步调用**的概念，当 OneBot 服务器受到异步调用请求时，如果调用正确，将直接返回 200。这样做的好处是，如果某些操作有较长的耗时（例如发送含有大量图片的消息或清空数据目录等）或你不关心调用结果，使用异步调用可以有效防止阻塞。下面说明了异步调用和普通调用的关系：

![async-method](/async-method.png)

但是另一方面，你也无法得知异步调用是否成功被执行。与此同时，没有副作用的异步调用也毫无意义（因为这些调用本身就是为了获取某些信息，但是异步调用是无法获取调用结果的）。因此，Koishi 为除此以外的所有异步调用都提供了 API，它们的调用接口与非异步的版本除了在方法后面加了一个 `Async` 外没有任何区别：

```js
// 普通版本
const messageId = await app.sender.sendPrivateMsg(123456789, 'Hello world')

// 异步版本，无法获得调用结果
await app.sender.sendPrivateMsgAsync(123456789, 'Hello world')
```

::: tip 提示
虽然异步调用方法的名字以 Async 结尾，但是其他方法也是**异步函数**，它们都会返回一个 `Promise` 对象。取这样的名字只是为了与 OneBot 保持一致。
:::

### HTTP 和 WebSocket 应该如何选择？

目前 Koishi 已经完全实现了 OneBot 提供的 HTTP 和 WebSocket 通信方式，因此它们之间**不存在任何功能上的差别**。

但是，HTTP 需要 Koishi 和 OneBot 所处于同一台机器，或所处的机器都拥有公网 IP；而 WebSocket 只需要 Koishi 和 OneBot 所处于同一台机器，或运行 OneBot 的机器拥有公网 IP。因此如果你在服务端运行 CoolQ，同时在个人电脑上调试你的 Koishi 应用，你应当选择使用 WebSocket 模式。

从性能上说，WebSocket 占用的资源会更少（因为不需要每次都建立连接），但是响应速度可能不如 HTTP；另一方面，当一个 Koishi 应用同时管理着多个机器人时，HTTP 能通过快捷调用和服务器复用的方式来提高性能，但是 WebSocket 并没有这些机制。

## App 构造函数选项

下面的配置项来自 koishi-adapter-cqhttp。你需要将你的 [`type`](#options-type) 字段配置为 `cqhttp`, `cqhttp:http`, `cqhttp:ws` 或 `cqhttp:ws-reverse` 中的一种。如果缺省或使用了 `cqhttp`，Koishi 会读取你的 `server` 选项，根据你配置的服务器 URL 进行适配。

相关 OneBot 配置：`use_http`, `use_ws`。

### options.path

- 类型：`string`

服务器监听的路径。相关 OneBot 配置：`post_url`。

### options.secret

- 类型：`string`

接收信息时用于验证的字段，应与 OneBot 的 `secret` 配置保持一致。

### options(.bots[]).server

- 类型：`string`

如果使用了 HTTP，则该配置将作为发送信息的服务端；如果使用了 WebSocket，则该配置将作为监听事件和发送信息的服务端。

相关 OneBot 配置：`host`, `port`, `ws_host`, `ws_port`。

### options(.bots[]).token

- 类型：`string`

发送信息时用于验证的字段，应与 OneBot 的 `access_token` 配置保持一致。

### options.retryTimes

- 类型：`number`

WebSocket 允许重新连接的次数。默认值为 `0`。

### options.retryInterval

- 类型：`number`

WebSocket 重新尝试连接前的等待时间，单位为毫秒。默认值为 `5000`。

### options.quickOperation

- 类型：`number`

快捷操作的时间限制，单位为毫秒。如果配置了这个选项且使用了 HTTP 通信方式，则在这段时间内的首次调用 `meta.send()` 或类似的方法将不产生新的 HTTP 请求。默认值为 `100`。参见 [**快捷操作**](../guide/message.md#快捷操作) 一节。

## 发送消息

### bot.sendGroupMsg(groupId, message, autoEscape?)

发送群消息。

- **groupId:** `number` 群号
- **message:** `string` 要发送的内容
- **autoEsacpe:** `boolean` 消息内容是否作为纯文本发送（即不解析 CQ 码）
- 返回值: `Promise<number>` 新信息的 messageId

### bot.sendGroupForwardMsg(groupId, nodes) <Badge text="go-cqhttp" type="warn"/>

发送群批量转发消息。

- **groupId:** `number` 群号
- **nodes:** `CQNode[]` 消息节点列表
- 返回值: `Promise<void>`

```js
interface CQNode {
  type: 'node'
  data: {
    id: number
  } | {
    name: string
    uin: number
    content: string
  }
}
```

### bot.sendLike(userId, times?)

给好友点赞。

- **userId:** `number` 好友 QQ 号
- **times:** `number` 点赞次数
- 返回值: `Promise<void>`

::: warning 注意
本接口仅限**对好友**使用。
:::

### bot.getGroupMsg(messageId) <Badge text="go-cqhttp" type="warn"/>

发送群批量转发消息。

- **messageId:** `number` 消息编号
- 返回值: `Promise<GroupMessage>`

```js
export interface GroupMessage {
  messageId: number
  realId: number
  sender: AccountInfo
  time: number
  content: string
}
```

### bot.getForwardMsg(messageId) <Badge text="go-cqhttp" type="warn"/>

发送群批量转发消息。

- **messageId:** `number` 消息编号
- 返回值: `Promise<ForwardMessage>`

```js
export interface ForwardMessage {
  messages: {
    sender: AccountInfo
    time: number
    content: string
  }[]
}
```

## 群相关

### bot.setGroupKick(groupId, userId, rejectAddRequest?)

踢出群聊或拒绝加群。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **rejectAddRequest:** `boolean` 拒绝此人的加群请求
- 返回值: `Promise<void>`

### bot.setGroupBan(groupId, userId, duration?)

群组单人禁言。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **duration:** `number` 禁言时长（秒），设为 0 表示解除禁言
- 返回值: `Promise<void>`

### bot.setGroupAnonymousBan(groupId, anonymous, duration?)

群组匿名用户禁言。

- **groupId:** `number` 群号
- **anonymous:** `object | string` 匿名用户的信息或 flag，参见 [Message 型元数据属性](../guide/message.md#message-型元数据属性)
- **duration:** `number` 禁言时长（秒），设为 0 表示解除禁言
- 返回值: `Promise<void>`

### bot.setGroupWholeBan(groupId, enable?)

群组全员禁言。

- **groupId:** `number` 群号
- **enable:** `boolean` 是否禁言，默认为 `true`
- 返回值: `Promise<void>`

### bot.setGroupAdmin(groupId, userId, enable?)

群组设置管理员。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **enable:** `boolean` 是否设置为管理员，默认为 `true`
- 返回值: `Promise<void>`

### bot.setGroupAnonymous(groupId, enable?)

群组设置匿名。

- **groupId:** `number` 群号
- **enable:** `boolean` 是否允许匿名，默认为 `true`
- 返回值: `Promise<void>`

### bot.setGroupCard(groupId, userId, card?)

设置群名片。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **card:** `string` 群名片
- 返回值: `Promise<void>`

### bot.setGroupLeave(groupId, isDismiss?)

退出群组。

- **groupId:** `number` 群号
- **isDismiss:** `boolean` 是否解散群（仅对群主生效）
- 返回值: `Promise<void>`

### bot.setGroupSpecialTitle(groupId, userId, specialTitle?, duration?)

设置群组专属头衔。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **specialTitle:** `string` 专属头衔
- **duration:** `number` 有效时长（秒，目前可能没用）
- 返回值: `Promise<void>`

### bot.sendGroupNotice(groupId, title, content)

发布群公告。

- **groupId:** `number` 群号
- **title:** `string` 标题
- **content:** `string` 内容
- 返回值: `Promise<void>`

### bot.setGroupName(groupId, name) <Badge text="go-cqhttp" type="warn"/>

修改群名称。

- **groupId:** `number` 群号
- **name:** `string` 群名称
- 返回值: `Promise<void>`

## 处理请求

### bot.setFriendAddRequest(flag, approve?, remark?)

处理加好友请求。

- **flag:** `string` 加好友请求的 flag（需从上报的数据中获得）
- **approve:** `boolean` 是否同意请求，默认为 `true`
- **remark:** `string` 好友备注名（仅当同意时有效）
- 返回值: `Promise<void>`

### bot.setGroupAddRequest(flag, subType, approve?, reason?)

处理加群请求或邀请。

- **flag:** `string` 加群请求的 flag（需从上报的数据中获得）
- **subType:** `'add' | 'invite'` 子类型，参见 [Request 型元数据属性](../guide/message.md#request-型元数据属性)
- **approve:** `boolean` 是否同意请求，默认为 `true`
- **reason:** `string` 拒绝理由（仅当拒绝时有效）
- 返回值: `Promise<void>`

## 账号信息

### bot.getLoginInfo()

获取登录号信息。

- 返回值: `Promise<AccountInfo>` 登录号信息

```js
export interface AccountInfo {
  userId: number
  nickname: string
}
```

### bot.getVipInfo()

获取会员信息。

- 返回值: `Promise<VipInfo>` 会员信息

```js
export interface VipInfo extends AccountInfo {
  level: number
  levelSpeed: number
  vipLevel: number
  vipGrowthSpeed: number
  vipGrowthTotal: string
}
```

### bot.getStrangerInfo(userId, noCache?)

获取陌生人信息。

- **userId:** `number` 目标 QQ 号
- **noCache:** `boolean` 是否不使用缓存，默认为 `false`
- 返回值: `Promise<StrangerInfo>` 陌生人信息

```js
export interface StrangerInfo extends AccountInfo {
  sex: 'male' | 'female' | 'unknown'
  age: number
}
```

### bot.getFriendList()

获取好友列表。

- 返回值: `Promise<FriendInfo[]>` 好友列表

```js
export interface FriendInfo extends AccountInfo {
  remark: string
}
```

### bot.getGroupList()

获取群列表。

- 返回值: `Promise<ListedGroupInfo[]>` 群信息列表

```js
export interface ListedGroupInfo {
  groupId: number
  groupName: string
}
```

### bot.getGroupInfo(groupId, noCache?)

获取群信息。

- **groupId:** `number` 目标群号
- **noCache:** `boolean` 是否不使用缓存，默认为 `false`
- 返回值: `Promise<GroupInfo>` 群信息

```js
export interface GroupInfo extends ListedGroupInfo {
  memberCount: number
  maxMemberCount: number
}
```

### bot.getGroupMemberInfo(groupId, userId, noCache?)

获取群成员信息。

- **groupId:** `number` 目标群号
- **userId:** `number` 目标 QQ 号
- **noCache:** `boolean` 是否不使用缓存，默认为 `false`
- 返回值: `Promise<GroupMemberInfo>` 群成员信息

```js
export interface SenderInfo extends StrangerInfo {
  area?: string
  card?: string
  level?: string
  role?: 'owner' | 'admin' | 'member'
  title?: string
}

export interface GroupMemberInfo extends SenderInfo {
  cardChangeable: boolean
  groupId: number
  joinTime: number
  lastSentTime: number
  titleExpireTime: number
  unfriendly: boolean
}
```

### bot.getGroupMemberList(groupId)

获取群成员列表。

- **groupId:** `number` 目标群号
- 返回值: `Promise<GroupMemberInfo[]>` 群成员列表

### bot.getGroupNotice(groupId)

获取群公告列表。部分字段具体含义可能需要自行理解。

- **groupId:** `number` 目标群号
- 返回值: `Promise<GroupNoticeInfo[]>` 群公告列表

```js
export interface GroupNoticeInfo {
  cn: number
  fid: string
  fn: number
  msg: {
    text: string
    textFace: string
    title: string
  }
  pubt: number
  readNum: number
  settings: {
    isShowEditCard: number
    remindTs: number
  }
  u: number
  vn: number
}
```

## 其他操作

### bot.getCookies(domain?)

获取 Cookies。

- **domain:** `string` 需要获取 cookies 的域名
- 返回值: `Promise<string>` cookies

### bot.getCsrfToken()

获取 CSRF Token。

- 返回值: `Promise<string>` CSRF Token

### bot.getCredentials()

获取 QQ 相关接口凭证，相当于上面两个接口的合并。

- **domain:** `string` 需要获取 cookies 的域名
- 返回值: `Promise<Credentials>` 接口凭证

```js
export interface Credentials {
  cookies: string
  csrfToken: number
}
```

### bot.getRecord(file, outFormat, fullPath?)

获取语音：并不是真的获取语音，而是转换语音到指定的格式，然后返回 `data/record` 目录下的语音文件名。注意，要使用此接口，需要安装 CoolQ 的 [语音组件](https://cqp.cc/t/21132)。

- **file:** `string` 语音文件名
- **outFormat:** `'mp3' | 'amr' | 'wma' | 'm4a' | 'spx' | 'ogg' | 'wav' | 'flac'`
- **fullPath:** `boolean` 是否返回文件的绝对路径
- 返回值: `Promise<RecordInfo>`

```js
export interface RecordInfo {
  file: string
}
```

### bot.getImage(file)

获取图片：与上面类似，不过返回 `data/image` 目录下的图片路径。

- **file:** `string` 图片文件名
- 返回值: `Promise<ImageInfo>`

```js
export interface ImageInfo {
  file: string

  // go-cqhttp 特有
  size: number
  filename: string
  url: string
}
```

### bot.canSendImage()

检查是否可以发送图片。

- 返回值: `Promise<boolean>` 是否可以发送图片

### bot.canSendRecord()

检查是否可以发送语音。

- 返回值: `Promise<boolean>` 是否可以发送语音

### bot.getStatus()

获取插件运行状态。

- 返回值: `Promise<StatusInfo>` 插件运行状态

```js
export interface StatusInfo {
  appInitialized: boolean
  appEnabled: boolean
  pluginsGood: boolean
  appGood: boolean
  online: boolean
  good: boolean
}
```

### bot.getVersionInfo()

获取 OneBot 的版本信息。

- 返回值: `Promise<VersionInfo>` 插件版本信息

```js
export interface VersionInfo {
  coolqDirectory: string
  coolqEdition: 'air' | 'pro'
  pluginVersion: string
  pluginBuildNumber: number
  pluginBuildConfiguration: 'debug' | 'release'

  // go-cqhttp 特有
  goCqhttp: boolean
  runtimeVersion: string
  runtimeOs: string
}
```

### bot.setRestart(cleanLog?, cleanCache?, cleanEvent?)

重启 CoolQ，并以当前登录号自动登录（需勾选快速登录）。

- **cleanLog:** `boolean` 是否在重启时清空 CoolQ 的日志数据库（log*.db）
- **cleanCache:** `boolean` 是否在重启时清空 CoolQ 的缓存数据库（cache.db）
- **cleanEvent:** `boolean` 是否在重启时清空 CoolQ 的事件数据库（eventv2.db）
- 返回值: `Promise<void>`

::: warning 警告
由于强行退出可能导致 CoolQ 数据库损坏而影响功能，此接口除非必要请尽量避免使用。
:::

### bot.setRestartPlugin(delay?)

重启 HTTP API 插件。

- **delay:** `string` 要延迟的毫秒数，如果默认情况下无法重启，可以尝试设置延迟为 2000 左右
- 返回值: `Promise<void>`

### bot.cleanDataDir(dataDir)

清理积攒了太多旧文件的数据目录。

- **dataDir:** `'image' | 'record' | 'show' | 'bface'` 要清理的目录名
- 返回值: `Promise<void>`

### bot.cleanPluginLog()

清空插件的日志文件。

- 返回值: `Promise<void>`
