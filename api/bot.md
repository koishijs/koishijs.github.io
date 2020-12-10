---
sidebarDepth: 2
---

# 机器人 (Bot)

**机器人 (Bot)** 是适配器的核心，它将不同平台的 API 封装成统一的格式供 Koishi 使用。而不同的适配器也可以自行扩展 Bot 实例上的属性和方法。

## 属性

### 构造选项

每个 Bot 都会继承你构造 App 时传入的选项，因此下列选项是天生就有的：

- bot.type
- bot.selfId

### bot.app

当前 Bot 所在的 App 实例。

## 消息相关

### bot.sendMessage(channelId, content)

向特定频道发送消息。

- **channelId:** `string` 频道 ID
- **content:** `string` 要发送的内容
- 返回值: `Promise<string>` 发送的消息 ID

### bot.sendPrivateMessage(userId, content)

向特定用户发送私聊消息。

- **userId:** `string` 对方 ID
- **content:** `string` 要发送的内容
- 返回值: `Promise<string>` 发送的消息 ID

### bot.getMessage(messageId)

获取特定消息。

- **messageId:** `string` 消息 ID
- 返回值: `Promise<MessageInfo>`

```js
export interface MessageInfo {
  id: string
  type: 'private' | 'group'
  content: string
  timestamp: number
  sender: SenderInfo
}
```

### bot.deleteMessage(messageId)

撤回特定信息。

- **messageId:** `string` 消息 ID
- 返回值: `Promise<void>`

## 账号信息

### bot.getUser(userId)

获取用户信息。

- **userId:** `string` 目标用户 ID
- 返回值: `Promise<UserInfo>` 陌生人信息

```js
export interface UserInfo {
  id: string
  name: string
}
```

### bot.getGroup(groupId)

获取群信息。

- **groupId:** `string` 目标群 ID
- 返回值: `Promise<GroupInfo>` 群信息

```js
export interface GroupInfo {
  id: string
  name: string
}
```

### bot.getGroupList()

获取群列表。

- 返回值: `Promise<GroupInfo[]>` 群信息列表

### bot.getGroupMember(groupId, userId)

获取群成员信息。

- **groupId:** `string` 目标群 ID
- **userId:** `string` 目标用户 ID
- 返回值: `Promise<GroupMemberInfo>` 群成员信息

```js
export interface GroupMemberInfo extends UserInfo {
  nick: string
}
```

### bot.getGroupMemberList(groupId)

获取群成员列表。

- **groupId:** `string` 目标群 ID
- 返回值: `Promise<GroupMemberInfo[]>` 群成员列表
