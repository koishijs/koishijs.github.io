---
sidebarDepth: 2
---

# 发送器 (Sender)

一个发送器封装了一套标准的 [CQHTTP API](https://cqhttp.cc/docs/4.12/#/API)。

::: tip 提示
1. 尽管 Koishi 总体支持 CQHTTP 3.0，但是部分接口需要更高的 CQHTTP 版本才能进行调用，所需的版本会标在对应 API 的后面。
2. 用黄色的版本标识标识这是一个实验性 API，可能在未来发生变动。
:::

## 消息相关

### sender.sendPrivateMsg(userId, message, autoEscape?)

发送私聊消息。

- **userId:** `number` 对方 QQ 号
- **message:** `string` 要发送的内容
- **autoEsacpe:** `boolean` 消息内容是否作为纯文本发送（即不解析 CQ 码）
- 返回值: `Promise<number>` 新信息的 messageId

### sender.sendPrivateMsgAsync(userId, message, autoEscape?)

发送私聊消息，不等待发送结果。

- **userId:** `number` 对方 QQ 号
- **message:** `string` 要发送的内容
- **autoEsacpe:** `boolean` 消息内容是否作为纯文本发送（即不解析 CQ 码）
- 返回值: `Promise<void>`

### sender.sendGroupMsg(groupId, message, autoEscape?)

发送群消息。

- **groupId:** `number` 群号
- **message:** `string` 要发送的内容
- **autoEsacpe:** `boolean` 消息内容是否作为纯文本发送（即不解析 CQ 码）
- 返回值: `Promise<number>` 新信息的 messageId

### sender.sendGroupMsgAsync(groupId, message, autoEscape?)

发送群消息，不等待发送结果。

- **groupId:** `number` 群号
- **message:** `string` 要发送的内容
- **autoEsacpe:** `boolean` 消息内容是否作为纯文本发送（即不解析 CQ 码）
- 返回值: `Promise<void>`

### sender.sendDiscussMsg(discussId, message, autoEscape?)

发送讨论组信息。

- **discussId:** `number` 讨论组 ID
- **message:** `string` 要发送的内容
- **autoEsacpe:** `boolean` 消息内容是否作为纯文本发送（即不解析 CQ 码）
- 返回值: `Promise<number>` 新信息的 messageId

### sender.sendDiscussMsgAsync(discussId, message, autoEscape?)

发送讨论组信息，不等待发送结果。

- **discussId:** `number` 讨论组 ID
- **message:** `string` 要发送的内容
- **autoEsacpe:** `boolean` 消息内容是否作为纯文本发送（即不解析 CQ 码）
- 返回值: `Promise<void>`

### sender.deleteMsg(messageId) <Badge text="CQHTTP 3.3"/>

撤回信息。

- **messageId:** `number` 消息 ID
- 返回值: `Promise<void>`

### sender.deleteMsgAsync(messageId) <Badge text="CQHTTP 3.3"/>

撤回信息，不等待处理完成。

- **messageId:** `number` 消息 ID
- 返回值: `Promise<void>`

### sender.sendLike(userId, times?)

给好友点赞。

- **userId:** `number` 好友 QQ 号
- **times:** `number` 点赞次数
- 返回值: `Promise<void>`

::: warning 注意
由于 CoolQ 的限制，本方法和下面的方法只能由四季酱的好友使用。
:::

### sender.sendLikeAsync(userId, times?)

给好友点赞，不等待处理完成。

- **userId:** `number` 好友 QQ 号
- **times:** `number` 点赞次数
- 返回值: `Promise<void>`

### sender.sendGroupNotice(groupId, title, content) <Badge text="CQHTTP 4.9" type="warn"/>

发布群公告。

- **groupId:** `number` 群号
- **title:** `string` 标题
- **content:** `string` 内容
- 返回值: `Promise<void>`

### sender.sendGroupNoticeAsync(groupId, title, content) <Badge text="CQHTTP 4.9" type="warn"/>

发布群公告，不等待处理完成。

- **groupId:** `number` 群号
- **title:** `string` 标题
- **content:** `string` 内容
- 返回值: `Promise<void>`

## 操作群和讨论组

### sender.setGroupKick(groupId, userId, rejectAddRequest?)

踢出群聊或拒绝加群。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **rejectAddRequest:** `boolean` 拒绝此人的加群请求
- 返回值: `Promise<void>`

### sender.setGroupKickAsync(groupId, userId, rejectAddRequest?)

踢出群聊或拒绝加群，不等待处理完成。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **rejectAddRequest:** `boolean` 拒绝此人的加群请求
- 返回值: `Promise<void>`

### sender.setGroupBan(groupId, userId, duration?)

群组单人禁言。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **duration:** `number` 禁言时长（秒），设为 0 表示解除禁言
- 返回值: `Promise<void>`

### sender.setGroupBanAsync(groupId, userId, duration?)

群组单人禁言，不等待处理完成。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **duration:** `number` 禁言时长（秒），设为 0 表示解除禁言
- 返回值: `Promise<void>`

### sender.setGroupAnonymousBan(groupId, anonymous, duration?) <Badge text="CQHTTP 4.2"/>

群组匿名用户禁言。

- **groupId:** `number` 群号
- **anonymous:** `object | string` 匿名用户的信息或 flag，参见 [Message 型元数据属性](../guide/receive-and-send.md#message-型元数据属性)
- **duration:** `number` 禁言时长（秒），设为 0 表示解除禁言
- 返回值: `Promise<void>`

### sender.setGroupAnonymousBanAsync(groupId, anonymous, duration?) <Badge text="CQHTTP 4.2"/>

群组匿名用户禁言，不等待处理完成。

- **groupId:** `number` 群号
- **anonymous:** `object | string` 匿名用户的信息或 flag，参见 [Message 型元数据属性](../guide/receive-and-send.md#message-型元数据属性)
- **duration:** `number` 禁言时长（秒），设为 0 表示解除禁言
- 返回值: `Promise<void>`

### sender.setGroupWholeBan(groupId, enable?)

群组全员禁言。

- **groupId:** `number` 群号
- **enable:** `boolean` 是否禁言，默认为 `true`
- 返回值: `Promise<void>`

### sender.setGroupWholeBanAsync(groupId, enable?)

群组全员禁言，不等待处理完成。

- **groupId:** `number` 群号
- **enable:** `boolean` 是否禁言，默认为 `true`
- 返回值: `Promise<void>`

### sender.setGroupAdmin(groupId, userId, enable?)

群组设置管理员。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **enable:** `boolean` 是否设置为管理员，默认为 `true`
- 返回值: `Promise<void>`

### sender.setGroupAdminAsync(groupId, userId, enable?)

群组设置管理员，不等待处理完成。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **enable:** `boolean` 是否设置为管理员，默认为 `true`
- 返回值: `Promise<void>`

### sender.setGroupAnonymous(groupId, enable?)

群组设置匿名。

- **groupId:** `number` 群号
- **enable:** `boolean` 是否允许匿名，默认为 `true`
- 返回值: `Promise<void>`

### sender.setGroupAnonymousAsync(groupId, enable?)

群组设置匿名，不等待处理完成。

- **groupId:** `number` 群号
- **enable:** `boolean` 是否允许匿名，默认为 `true`
- 返回值: `Promise<void>`

### sender.setGroupCard(groupId, userId, card?)

设置群名片。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **card:** `string` 群名片
- 返回值: `Promise<void>`

### sender.setGroupCardAsync(groupId, userId, card?)

设置群名片，不等待处理完成。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **card:** `string` 群名片
- 返回值: `Promise<void>`

### sender.setGroupLeave(groupId, isDismiss?)

退出群组。

- **groupId:** `number` 群号
- **isDismiss:** `boolean` 是否解散群（仅对群主生效）
- 返回值: `Promise<void>`

### sender.setGroupLeaveAsync(groupId, isDismiss?)

退出群组，不等待处理完成。

- **groupId:** `number` 群号
- **isDismiss:** `boolean` 是否解散群（仅对群主生效）
- 返回值: `Promise<void>`

### sender.setGroupSpecialTitle(groupId, userId, specialTitle?, duration?)

设置群组专属头衔。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **specialTitle:** `string` 专属头衔
- **duration:** `number` 有效时长（秒，目前可能没用）
- 返回值: `Promise<void>`

### sender.setGroupSpecialTitleAsync(groupId, userId, specialTitle?, duration?)

设置群组专属头衔，不等待处理完成。

- **groupId:** `number` 群号
- **userId:** `number` QQ 号
- **specialTitle:** `string` 专属头衔
- **duration:** `number` 有效时长（秒，目前可能没用）
- 返回值: `Promise<void>`

### sender.setDiscussLeave(discussId)

退出讨论组。

- **discussId:** `number` 讨论组 ID
- 返回值: `Promise<void>`

### sender.setDiscussLeaveAsync(discussId)

退出讨论组，不等待处理完成。

- **discussId:** `number` 讨论组 ID
- 返回值: `Promise<void>`

## 处理请求

### sender.setFriendAddRequest(flag, approve?, remark?)

处理加好友请求。

- **flag:** `string` 加好友请求的 flag（需从上报的数据中获得）
- **approve:** `boolean` 是否同意请求，默认为 `true`
- **remark:** `string` 好友备注名（仅当同意时有效）
- 返回值: `Promise<void>`

### sender.setFriendAddRequestAsync(flag, approve?, remark?)

处理加好友请求，不等待处理完成。

- **flag:** `string` 加好友请求的 flag（需从上报的数据中获得）
- **approve:** `boolean` 是否同意请求，默认为 `true`
- **remark:** `string` 好友备注名（仅当同意时有效）
- 返回值: `Promise<void>`

### sender.setGroupAddRequest(flag, subType, approve?, reason?) <Badge text="CQHTTP 4.2"/>

处理加群请求或邀请。

- **flag:** `string` 加群请求的 flag（需从上报的数据中获得）
- **subType:** `'add' | 'invite'` 子类型，参见 [Request 型元数据属性](../guide/receive-and-send.md#request-型元数据属性)
- **approve:** `boolean` 是否同意请求，默认为 `true`
- **reason:** `string` 拒绝理由（仅当拒绝时有效）
- 返回值: `Promise<void>`

### sender.setGroupAddRequestAsync(flag, subType, approve?, reason?) <Badge text="CQHTTP 4.2"/>

处理加群请求或邀请，不等待处理完成。

- **flag:** `string` 加群请求的 flag（需从上报的数据中获得）
- **subType:** `'add' | 'invite'` 子类型，参见 [Request 型元数据属性](../guide/receive-and-send.md#request-型元数据属性)
- **approve:** `boolean` 是否同意请求，默认为 `true`
- **reason:** `string` 拒绝理由（仅当拒绝时有效）
- 返回值: `Promise<void>`

## 获取账号信息

### sender.getLoginInfo()

获取登录号信息。

- 返回值: `Promise<AccountInfo>` 登录号信息

```ts
export interface AccountInfo {
  userId: number
  nickname: string
}
```

### sender.getVipInfo() <Badge text="CQHTTP 4.3.1" type="warn"/>

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

### sender.getStrangerInfo(userId, noCache?)

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

### sender.getFriendList() <Badge text="CQHTTP 4.12"/>

获取好友列表。

- 返回值: `Promise<FriendInfo[]>` 好友列表

```ts
export interface FriendInfo extends AccountInfo {
  remark: string
}
```

### sender.getGroupList()

获取群列表。

- 返回值: `Promise<ListedGroupInfo[]>` 群信息列表

```ts
export interface ListedGroupInfo {
  groupId: number
  groupName: string
}
```

### sender.getGroupInfo(groupId, noCache?) <Badge text="CQHTTP 4.12"/>

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

### sender.getGroupMemberInfo(groupId, userId, noCache?)

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

### sender.getGroupMemberList(groupId)

获取群成员列表。

- **groupId:** `number` 目标群号
- 返回值: `Promise<GroupMemberInfo[]>` 群成员列表

### sender.getGroupNotice(groupId) <Badge text="CQHTTP 4.9" type="warn"/>

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

### sender.getCookies(domain?)

获取 Cookies。

- **domain:** `string` 需要获取 cookies 的域名 <Badge text="CQHTTP 4.11"/>
- 返回值: `Promise<string>` cookies

### sender.getCsrfToken()

获取 CSRF Token。

- 返回值: `Promise<string>` CSRF Token

### sender.getCredentials() <Badge text="CQHTTP 4.3"/>

获取 QQ 相关接口凭证，相当于上面两个接口的合并。

- **domain:** `string` 需要获取 cookies 的域名 <Badge text="CQHTTP 4.13"/>
- 返回值: `Promise<Credentials>` 接口凭证

```ts
export interface Credentials {
  cookies: string
  csrfToken: number
}
```

## 其他操作

### sender.getRecord(file, outFormat, fullPath?) <Badge text="CQHTTP 3.3"/>

获取语音：并不是真的获取语音，而是转换语音到指定的格式，然后返回 `data/record` 目录下的语音文件名。注意，要使用此接口，需要安装 CoolQ 的 [语音组件](https://cqp.cc/t/21132)。

- **file:** `string` 语音文件名
- **outFormat:** `'mp3' | 'amr' | 'wma' | 'm4a' | 'spx' | 'ogg' | 'wav' | 'flac'`
- **fullPath:** `boolean` 是否返回文件的绝对路径 <Badge text="CQHTTP 4.8"/>
- 返回值: `Promise<string>` 语音文件名

### sender.getImage(file) <Badge text="CQHTTP 4.8"/>

获取图片：与上面类似，不过返回 `data/image` 目录下的图片路径。

- **file:** `string` 图片文件名
- 返回值: `Promise<string>` 图片的完整路径

### sender.canSendImage() <Badge text="CQHTTP 4.8"/>

检查是否可以发送图片。

- 返回值: `Promise<boolean>` 是否可以发送图片

### sender.canSendRecord() <Badge text="CQHTTP 4.8"/>

检查是否可以发送语音。

- 返回值: `Promise<boolean>` 是否可以发送语音

### sender.getStatus()

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

### sender.getVersionInfo()

获取 CoolQ 及 CQHTTP 插件的版本信息。

- 返回值: `Promise<VersionInfo>` 插件版本信息

```ts
export interface VersionInfo {
  coolqDirectory: string
  coolqEdition: 'air' | 'pro'
  pluginVersion: string
  pluginMajorVersion: number
  pluginMinorVersion: number
  pluginPatchVersion: number
  pluginBuildNumber: number
  pluginBuildConfiguration: 'debug' | 'release'
}
```

### sender.setRestart(cleanLog?, cleanCache?, cleanEvent?) <Badge text="CQHTTP 3.0.2" type="warn"/>

重启 CoolQ，并以当前登录号自动登录（需勾选快速登录）。

- **cleanLog:** `boolean` 是否在重启时清空 CoolQ 的日志数据库（log*.db）
- **cleanCache:** `boolean` 是否在重启时清空 CoolQ 的缓存数据库（cache.db）
- **cleanEvent:** `boolean` 是否在重启时清空 CoolQ 的事件数据库（eventv2.db）
- 返回值: `Promise<void>`

::: warning 警告
由于强行退出可能导致 CoolQ 数据库损坏而影响功能，此接口除非必要请尽量避免使用。
:::

### sender.setRestartPlugin(delay?) <Badge text="CQHTTP 3.2"/>

重启 HTTP API 插件。

- **delay:** `string` 要延迟的毫秒数，如果默认情况下无法重启，可以尝试设置延迟为 2000 左右
- 返回值: `Promise<void>`

### sender.cleanDataDir(dataDir) <Badge text="CQHTTP 3.3.4"/>

清理积攒了太多旧文件的数据目录。

- **dataDir:** `'image' | 'record' | 'show' | 'bface'` 要清理的目录名
- 返回值: `Promise<void>`

### sender.cleanDataDirAsync(dataDir) <Badge text="CQHTTP 3.3.4"/>

清理积攒了太多旧文件的数据目录，不等待清理完成。

- **dataDir:** `'image' | 'record' | 'show' | 'bface'` 要清理的目录名
- 返回值: `Promise<void>`

### sender.cleanPluginLog() <Badge text="CQHTTP 4.1"/>

清空插件的日志文件。

- 返回值: `Promise<void>`

### sender.cleanPluginLogAsync() <Badge text="CQHTTP 4.1"/>

清空插件的日志文件，不等待清理完成。

- 返回值: `Promise<void>`
