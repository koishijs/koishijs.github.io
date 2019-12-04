---
sidebarDepth: 2
---

# 发送器 (Sender)

## sender.sendContextMsg(contextId, message, autoEscape?)

向特定上下文发送信息。

- contextId: `string` 上下文 ID，参见 [getContextId](./index.md#getcontextid-meta)
- message: `string` 要发送的内容
- autoEsacpe: `boolean` 消息内容是否作为纯文本发送（即不解析 CQ 码）
- 返回值: `Promise<number>` 新信息的 messageId

## sender.sendPrivateMsg(userId, message, autoEscape?)

发送私聊消息。

- userId: `number` 对方 QQ 号
- message: `string` 要发送的内容
- autoEsacpe: `boolean` 消息内容是否作为纯文本发送（即不解析 CQ 码）
- 返回值: `Promise<number>` 新信息的 messageId

## sender.sendGroupMsg(groupId, message, autoEscape?)

发送群消息。

- groupId: `number` 群号
- message: `string` 要发送的内容
- autoEsacpe: `boolean` 消息内容是否作为纯文本发送（即不解析 CQ 码）
- 返回值: `Promise<number>` 新信息的 messageId

## sender.sendDiscussMsg(discussId, message, autoEscape?)

发送讨论组信息。

- discussId: `number` 讨论组 ID
- message: `string` 要发送的内容
- autoEsacpe: `boolean` 消息内容是否作为纯文本发送（即不解析 CQ 码）
- 返回值: `Promise<number>` 新信息的 messageId

## sender.deleteMsg(messageId)

撤回信息。

- messageId: `number` 消息 ID
- 返回值: `Promise<void>`

## sender.sendLike(userId, times?)

给好友点赞。（注意：只能给好友点赞）

- userId: `number` 好友 QQ 号
- times: `number` 点赞次数
- 返回值: `Promise<void>`

## sender.setGroupKick(groupId, userId, rejectAddRequest?)

踢出群聊或拒绝加群。

- groupId: `number` 群号
- userId: `number` QQ 号
- rejectAddRequest: `boolean` 拒绝此人的加群请求
- 返回值: `Promise<void>`

## sender.setGroupBan(groupId, userId, duration?)

群组单人禁言。

- groupId: `number` 群号
- userId: `number` QQ 号
- duration: `number` 禁言时长（秒），设为 0 表示解除禁言
- 返回值: `Promise<void>`

## sender.setGroupAnonymousBan(groupId, anonymous, duration?)

群组匿名用户禁言。

- groupId: `number` 群号
- anonymous: `object | string` 匿名用户的信息或 flag，参见 [Meta 对象属性](../guide/receive-and-send.md#message-型元数据属性)
- duration: `number` 禁言时长（秒），设为 0 表示解除禁言
- 返回值: `Promise<void>`

## sender.setGroupWholeBan(groupId, enable?)

群组全员禁言。

- groupId: `number` 群号
- enable: `boolean` 是否禁言，默认为 `true`
- 返回值: `Promise<void>`

## sender.setGroupAdmin(groupId, userId, enable?)

群组设置管理员。

- groupId: `number` 群号
- userId: `number` QQ 号
- enable: `boolean` 是否设置为管理员，默认为 `true`
- 返回值: `Promise<void>`

## sender.setGroupAnonymous(groupId, enable?)

群组设置匿名。

- groupId: `number` 群号
- enable: `boolean` 是否允许匿名，默认为 `true`
- 返回值: `Promise<void>`

## sender.setGroupCard(groupId, userId, card?)

设置群名片。

- groupId: `number` 群号
- userId: `number` QQ 号
- card: `string` 群名片
- 返回值: `Promise<void>`

## sender.setGroupLeave(groupId, isDismiss?)

退出群组。

- groupId: `number` 群号
- isDismiss: `boolean` 是否解散群（仅对群主生效）
- 返回值: `Promise<void>`

## sender.setGroupSpecialTitle(groupId, userId, specialTitle?, duration?)

设置群组专属头衔。

- groupId: `number` 群号
- userId: `number` QQ 号
- specialTitle: `string` 专属头衔
- duration: `number` 有效时长（秒，目前可能没用）
- 返回值: `Promise<void>`

## sender.setDiscussLeave(discussId)

退出讨论组。

- discussId: `number` 讨论组 ID
- 返回值: `Promise<void>`

## sender.setFriendAddRequest(flag, approve?, remark?)

处理加好友请求。

- flag: `string` 加好友请求的 flag（需从上报的数据中获得）
- approve: `boolean` 是否同意请求，默认为 `true`
- remark: `string` 好友备注名（仅当同意时有效）

## sender.setGroupAddRequest(flag, subType, approve?, reason?)

处理加群请求或邀请。

- flag: `string` 加群请求的 flag（需从上报的数据中获得）
- subType: `'add' | 'invite'` 参见 [Meta 对象属性](../guide/receive-and-send.md#request-型元数据属性)
- approve: `boolean` 是否同意请求，默认为 `true`
- reason: `string` 拒绝理由（仅当拒绝时有效）

## sender.getLoginInfo()

## sender.getStrangerInfo(userId, noCache?)

## sender.getFriendList()

## sender.getGroupList()

## sender.getGroupInfo(groupId, noCache)

## sender.getGroupMemberInfo(groupId, userId, noCache?)

## sender.getGroupMemberList(groupId)

## sender.getCookies(domain?)

## sender.getCsrfToken()

## sender.getCredentials()

## sender.getRecord(file, outFormat, fullPath?)

## sender.getImage(file)

## sender.canSendImage()

## sender.canSendRecord()

## sender.getStatus()

## sender.getVersionInfo()

## sender.setRestartPlugin(delay?)

## sender.cleanDataDir(dataDir)

## sender.cleanPluginLog()
