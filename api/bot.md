---
sidebarDepth: 2
---

# 机器人 (Bot)

::: danger 注意
这里是**正在施工**的 koishi v2 的文档。要查看 v1 版本的文档，请前往[**这里**](https://koishijs.github.io/v1/)。
:::

Bot 相当于 Koishi v1 的 Sender，它封装了一套标准的 [cqhttp API](https://cqhttp.cc/docs/4.15/#/API)。[go-cqhttp](https://github.com/Mrs4s/go-cqhttp) 进一步扩展了一些接口，这些扩展的功能也被 Koishi 实现了。

::: warning 有关异步 API
对于存在 [**异步版本**](../guide/receive-and-send.md#异步调用) 的 API，返回值均为 `Promise<void>`。
:::

## 消息相关

### bot.sendPrivateMsg(userId, message, autoEscape?)
### bot.sendPrivateMsgAsync(userId, message, autoEscape?)

发送私聊消息。

- **userId:** `number` 对方 QQ 号
- **message:** `string` 要发送的内容
- **autoEsacpe:** `boolean` 消息内容是否作为纯文本发送（即不解析 CQ 码）
- 返回值: `Promise<number>` 新信息的 messageId

### bot.sendGroupMsg(groupId, message, autoEscape?)
### bot.sendGroupMsgAsync(groupId, message, autoEscape?)

发送群消息。

- **groupId:** `number` 群号
- **message:** `string` 要发送的内容
- **autoEsacpe:** `boolean` 消息内容是否作为纯文本发送（即不解析 CQ 码）
- 返回值: `Promise<number>` 新信息的 messageId

### bot.deleteMsg(messageId)
### bot.deleteMsgAsync(messageId)

撤回信息。

- **messageId:** `number` 消息 ID
- 返回值: `Promise<void>`

### bot.sendLike(userId, times?)
### bot.sendLikeAsync(userId, times?)

给好友点赞。

- **userId:** `number` 好友 QQ 号
- **times:** `number` 点赞次数
- 返回值: `Promise<void>`

::: warning 注意
本接口仅能**在搭载 CoolQ 的账号上对好友**使用。
:::

### bot.sendGroupNotice(groupId, title, content)
### bot.sendGroupNoticeAsync(groupId, title, content)

发布群公告。

- **groupId:** `number` 群号
- **title:** `string` 标题
- **content:** `string` 内容
- 返回值: `Promise<void>`

## 操作群和讨论组

### bot.setGroupKick(groupId, userId, rejectAddRequest?)
### bot.setGroupKickAsync(groupId, userId, rejectAddRequest?)

踢出群聊或拒绝加群。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **rejectAddRequest:** `boolean` 拒绝此人的加群请求
- 返回值: `Promise<void>`

### bot.setGroupBan(groupId, userId, duration?)
### bot.setGroupBanAsync(groupId, userId, duration?)

群组单人禁言。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **duration:** `number` 禁言时长（秒），设为 0 表示解除禁言
- 返回值: `Promise<void>`

### bot.setGroupAnonymousBan(groupId, anonymous, duration?)
### bot.setGroupAnonymousBanAsync(groupId, anonymous, duration?)

群组匿名用户禁言。

- **groupId:** `number` 群号
- **anonymous:** `object | string` 匿名用户的信息或 flag，参见 [Message 型元数据属性](../guide/receive-and-send.md#message-型元数据属性)
- **duration:** `number` 禁言时长（秒），设为 0 表示解除禁言
- 返回值: `Promise<void>`

### bot.setGroupWholeBan(groupId, enable?)
### bot.setGroupWholeBanAsync(groupId, enable?)

群组全员禁言。

- **groupId:** `number` 群号
- **enable:** `boolean` 是否禁言，默认为 `true`
- 返回值: `Promise<void>`

### bot.setGroupAdmin(groupId, userId, enable?)
### bot.setGroupAdminAsync(groupId, userId, enable?)

群组设置管理员。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **enable:** `boolean` 是否设置为管理员，默认为 `true`
- 返回值: `Promise<void>`

### bot.setGroupAnonymous(groupId, enable?)
### bot.setGroupAnonymousAsync(groupId, enable?)

群组设置匿名。

- **groupId:** `number` 群号
- **enable:** `boolean` 是否允许匿名，默认为 `true`
- 返回值: `Promise<void>`

### bot.setGroupCard(groupId, userId, card?)
### bot.setGroupCardAsync(groupId, userId, card?)

设置群名片。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **card:** `string` 群名片
- 返回值: `Promise<void>`

### bot.setGroupLeave(groupId, isDismiss?)
### bot.setGroupLeaveAsync(groupId, isDismiss?)

退出群组。

- **groupId:** `number` 群号
- **isDismiss:** `boolean` 是否解散群（仅对群主生效）
- 返回值: `Promise<void>`

### bot.setGroupSpecialTitle(groupId, userId, specialTitle?, duration?)
### bot.setGroupSpecialTitleAsync(groupId, userId, specialTitle?, duration?)

设置群组专属头衔。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **specialTitle:** `string` 专属头衔
- **duration:** `number` 有效时长（秒，目前可能没用）
- 返回值: `Promise<void>`

## 处理请求

### bot.setFriendAddRequest(flag, approve?, remark?)
### bot.setFriendAddRequestAsync(flag, approve?, remark?)

处理加好友请求。

- **flag:** `string` 加好友请求的 flag（需从上报的数据中获得）
- **approve:** `boolean` 是否同意请求，默认为 `true`
- **remark:** `string` 好友备注名（仅当同意时有效）
- 返回值: `Promise<void>`

### bot.setGroupAddRequest(flag, subType, approve?, reason?)
### bot.setGroupAddRequestAsync(flag, subType, approve?, reason?)

处理加群请求或邀请。

- **flag:** `string` 加群请求的 flag（需从上报的数据中获得）
- **subType:** `'add' | 'invite'` 子类型，参见 [Request 型元数据属性](../guide/receive-and-send.md#request-型元数据属性)
- **approve:** `boolean` 是否同意请求，默认为 `true`
- **reason:** `string` 拒绝理由（仅当拒绝时有效）
- 返回值: `Promise<void>`

## 获取账号信息

### bot.getLoginInfo()

获取登录号信息。

- 返回值: `Promise<AccountInfo>` 登录号信息

```ts
export interface AccountInfo {
  userId: number
  nickname: string
}
```

### bot.getVipInfo()

获取会员信息。

- 返回值: `Promise<VipInfo>` 会员信息

```ts
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

```ts
export interface StrangerInfo extends AccountInfo {
  sex: 'male' | 'female' | 'unknown'
  age: number
}
```

### bot.getFriendList()

获取好友列表。

- 返回值: `Promise<FriendInfo[]>` 好友列表

```ts
export interface FriendInfo extends AccountInfo {
  remark: string
}
```

### bot.getGroupList()

获取群列表。

- 返回值: `Promise<ListedGroupInfo[]>` 群信息列表

```ts
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

```ts
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

```ts
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

```ts
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

```ts
export interface Credentials {
  cookies: string
  csrfToken: number
}
```

## 其他操作

### bot.getRecord(file, outFormat, fullPath?)

获取语音：并不是真的获取语音，而是转换语音到指定的格式，然后返回 `data/record` 目录下的语音文件名。注意，要使用此接口，需要安装 CoolQ 的 [语音组件](https://cqp.cc/t/21132)。

- **file:** `string` 语音文件名
- **outFormat:** `'mp3' | 'amr' | 'wma' | 'm4a' | 'spx' | 'ogg' | 'wav' | 'flac'`
- **fullPath:** `boolean` 是否返回文件的绝对路径
- 返回值: `Promise<string>` 语音文件名

### bot.getImage(file)

获取图片：与上面类似，不过返回 `data/image` 目录下的图片路径。

- **file:** `string` 图片文件名
- 返回值: `Promise<string>` 图片的完整路径

### bot.canSendImage()

检查是否可以发送图片。

- 返回值: `Promise<boolean>` 是否可以发送图片

### bot.canSendRecord()

检查是否可以发送语音。

- 返回值: `Promise<boolean>` 是否可以发送语音

### bot.getStatus()

获取插件运行状态。

- 返回值: `Promise<StatusInfo>` 插件运行状态

```ts
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

获取 CoolQ 及 CQHTTP 插件的版本信息。

- 返回值: `Promise<VersionInfo>` 插件版本信息

```ts
export interface VersionInfo {
  coolqDirectory: string
  coolqEdition: 'air' | 'pro'
  pluginVersion: string
  pluginBuildNumber: number
  pluginBuildConfiguration: 'debug' | 'release'
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
### bot.cleanDataDirAsync(dataDir)

清理积攒了太多旧文件的数据目录。

- **dataDir:** `'image' | 'record' | 'show' | 'bface'` 要清理的目录名
- 返回值: `Promise<void>`

### bot.cleanPluginLog()
### bot.cleanPluginLogAsync()

清空插件的日志文件。

- 返回值: `Promise<void>`
