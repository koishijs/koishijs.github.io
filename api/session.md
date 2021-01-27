---
sidebarDepth: 2
---

# 会话 (Session)

会话来源于 Koishi v1 的元信息对象，并在 Koishi v2 中大幅扩展了功能。你几乎可以利用会话完成所有工作。会话对象的属性分为两类，一类是不以 `$` 开头的，这些属性来源于 CQHTTP 事件；另一类是以 `$` 开头的，它们是 Koishi 的扩展功能。在会话的序列化中，只有前一类属性会被保留。

## CQHTTP 原生属性

### 基本属性

- **postType:** `'message' | 'notice' | 'request'| 'meta_event'`
- **selfId:** `number` 机器人自身 ID
- **userId:** `number` 涉及的用户 ID
- **discussId:** `number` 涉及的讨论组 ID

### message 型元数据属性

- **messageType:** `'private' | 'group'`
- **subType:**
  - 如果是私聊消息：`'friend' | 'group' | 'other'`
  - 如果是群消息：`'normal' | 'anonymous' | 'notice'`
- **messageId:** `number` 消息 ID，用于撤回等
- **message:** `string` 消息内容
- **rawMessage:** `string` 原始消息内容
- **font:** `number` 字体
- **sender:** `SenderInfo` 发送人信息
  - **userId:** `number` 用户 ID
  - **nickname:** `string` 昵称
  - **sex:** `'male' | 'female' | 'unknown'`
  - **age:** `number` 年龄
  - **title:** `string` 专属头衔（仅限群消息）
  - **card:** `string` 群名片 / 备注（仅限群消息）
  - **area:** `string` 地区（仅限群消息）
  - **level:** `string` 成员等级（仅限群消息）
  - **role:** `'owner' | 'admin' | 'member'`（仅限群消息）
- **anonymous:** `AnonymousInfo` 匿名信息
  - **id:** `number` 匿名用户 ID
  - **name:** `string` 用户名称
  - **flag:** `string` 匿名用户 flag，在调用禁言 API 时需要传入

### notice 型元数据属性

- **noticeType:** `'group_upload' | 'group_admin' | 'group_increase' | 'group_ban' | 'friend_add'`
- **subType:**
  - 如果是管理员变动：`'set' | 'unset'`
  - 如果是群成员增加：`'approve' | 'invite'`
  - 如果是群成员减少：`'leave' | 'kick' | 'kick_me'`
  - 如果是群禁言：`'ban' | 'lift_ban'`
- **operatorId:** `number` 操作者 ID
- **duration:** `number` 禁言时长（秒）
- **file:** `FileInfo` 文件信息
  - **id:** `string` 文件 ID
  - **name:** `string` 文件名
  - **size:** `number` 文件大小（字节）
  - **busid:** `number`

### request 型元数据属性

- **requestType:** `'friend' | 'group'`
- **subType:** `'add' | 'invite'`（如果是加群请求）
- **comment:** `string` 验证信息
- **flag:** `string` 请求 flag，在调用处理请求的 API 时需要传入

### metaEvent 型元数据属性

- **metaEventType:** `'lifecycle' | 'heartbeat'`
- **subType:** `'enable' | 'disable'`（如果是生命周期）
- **interval:** `number` 到下次心跳的间隔（毫秒）
- **status:** `StatusInfo` 状态信息，请参考 [getStatus](../api/bot.md#bot-getstatus) 的返回值

## Koishi 扩展属性

::: tip 注意
尽管下面的大部分属性和方法都存在于 Session 对象的原型链上，但你需要明白部分功能仅对于特定的事件生效。例如，假设 session 是一个心跳事件，那么试图调用 `session.$send()` 将会导致异常。
:::

### session.$app

当前会话绑定的 [App](./app.md) 实例。

### session.$bot

当前会话绑定的 [Bot](./bot.md) 实例。

### session.$appel

### session.$prefix

### session.$user

一个可观测的用户数据对象。

### session.$observeUser(fields?)

观测特定的用户字段，并更新到 [`session.$user`](#session-user) 中。

- **fields:** `Iterable<User.Field>`
- 返回值: `Promise<User.Observed>`

### session.$channel

一个可观测的群数据对象。

### session.$observeChannel(fields?)

观测特定的用户字段，并更新到 [`session.$channel`](#session-channel) 中。

- **fields:** `Iterable<Channel.Field>`
- 返回值: `Promise<Channel.Observed>`

### session.$send(message)

在当前上下文发送消息。

- **message:** `string` 要发送的内容
- 返回值: `Promise<void>`

### session.$sendQueued(message, delay?)

在当前上下文发送消息，并与下一条通过 `session.$sendQueued` 发送的消息之间保持一定的时间间隔。

- **message:** `string` 要发送的内容
- **delay:** `number` 与下一条消息的时间间隔，缺省时会使用 [`$app.options.queueDelay`](./app.md#options-queuedelay)
- 返回值: `Promise<void>`

### session.$use(middleware) <Badge text="beta" type="warn"/>

注册一个仅对当前会话生效的中间件。

- **middleware:** [`Middleware`](../guide/message.md#中间件) 要注册的中间件
- 返回值: `() => void` 取消该中间件的函数

### session.$prompt(timeout?) <Badge text="beta" type="warn"/>

等待当前会话的下一次输入，如果超时则会 reject。

- **timeout:** `number` 中间件的生效时间，缺省时会使用 [`$app.options.promptTimeout`](./app.md#options-prompttimeout)
- 返回值: `Promise<string>` 用户输入

### session.$suggest(options) <Badge text="beta" type="warn"/>

尝试显示候选输入。

- **options.target:** `string` 目标字符串
- **options.items:** `string[]` 源字符串列表
- **options.next:** [`NextFunction?`](../guide/message.md#中间件) 回调函数
- **options.prefix:** `string?` 显示在候选输入前的文本
- **options.suffix:** `string` 当只有一个选项时，显示在候选输入后的文本
- **options.coefficient:** `number` 用于模糊匹配的相似系数，缺省时会使用 [`$app.options.similarityCoefficient`](./app.md#options-similaritycoefficient)
- **options.apply:** `(suggestion: string, next: NextFunction) => void` 确认后执行的操作
- 返回值: `Promise<void>`

### session.$parse(message) <Badge text="beta" type="warn"/>

### session.collect(argv, key, fields)

按照 argv 中的 command 属性向 fields 添加所需的用户字段。它是一个内置的 before-user 监听器。

- **argv:** [`ParsedArgv`](../guide/command.md#parsedargv-对象) 只需确保其中存在 command 属性即可
- **key:** `T extends 'user' | 'group'` 用户字段集合
- **fields:** `Set<keyof Tables[T]>` 用户字段集合
- 返回值: `void`

### session.$execute(argv, next?) <Badge text="beta" type="warn"/>

执行一个指令。可以传入一个 argv 对象或者指令对应的文本。

- **argv:** `string | ExecuteArgv` 指令文本或参数对象
- **next:** [`NextFunction`](../guide/message.md#中间件) 回调函数
- 返回值: `Promise<void>`
