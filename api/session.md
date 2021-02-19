---
sidebarDepth: 2
---

# 会话 (Session)

会话来源于 Koishi v1 的元信息对象，并在后续的版本中发展成了专门的类并大幅扩展了功能。你几乎可以利用会话完成所有工作。会话对象的属性分为两类，一类是不以 `$` 开头的，这些属性来源于 CQHTTP 事件；另一类是以 `$` 开头的，它们是 Koishi 的扩展功能。在会话的序列化中，只有前一类属性会被保留。

## 实例属性

你应该已经读过 [事件 (Events)](./events.md) 一章了。由于每个会话都必定表达了一个上报事件，因此上报事件中定义的属性也都可以在 Session 的实例中访问到。此外，也只有来自上报事件的属性才会在序列化中被保留。下面将介绍的实例属性都是无法被序列化的。

### session.$app

当前会话绑定的 [App](./app.md) 实例。

### session.$bot

当前会话绑定的 [Bot](./bot.md) 实例。

### session.$appel

### session.$prefix

### session.$user

一个可观测的用户数据对象。

### session.$channel

一个可观测的群数据对象。

## 实例方法

### session.observeUser(fields?)

观测特定的用户字段，并更新到 [`session.$user`](#session-user) 中。

- **fields:** `Iterable<User.Field>`
- 返回值: `Promise<User.Observed>`

### session.observeChannel(fields?)

观测特定的用户字段，并更新到 [`session.$channel`](#session-channel) 中。

- **fields:** `Iterable<Channel.Field>`
- 返回值: `Promise<Channel.Observed>`

### session.send(message)

在当前上下文发送消息。

- **message:** `string` 要发送的内容
- 返回值: `Promise<void>`

### session.sendQueued(message, delay?)

在当前上下文发送消息，并与下一条通过 `session.sendQueued` 发送的消息之间保持一定的时间间隔。

- **message:** `string` 要发送的内容
- **delay:** `number` 与下一条消息的时间间隔，缺省时会使用 [`$app.options.queueDelay`](./app.md#options-queuedelay)
- 返回值: `Promise<void>`

### session.middleware(middleware)

注册一个仅对当前会话生效的中间件。

- **middleware:** [`Middleware`](../guide/message.md#中间件) 要注册的中间件
- 返回值: `() => void` 取消该中间件的函数

### session.prompt(timeout?) <Badge text="beta" type="warn"/>

等待当前会话的下一次输入，如果超时则会 reject。

- **timeout:** `number` 中间件的生效时间，缺省时会使用 [`$app.options.promptTimeout`](./app.md#options-prompttimeout)
- 返回值: `Promise<string>` 用户输入

### session.suggest(options)

尝试显示候选输入。

- **options.target:** `string` 目标字符串
- **options.items:** `string[]` 源字符串列表
- **options.next:** [`NextFunction?`](../guide/message.md#中间件) 回调函数
- **options.prefix:** `string?` 显示在候选输入前的文本
- **options.suffix:** `string` 当只有一个选项时，显示在候选输入后的文本
- **options.coefficient:** `number` 用于模糊匹配的相似系数，缺省时会使用 [`$app.options.similarityCoefficient`](./app.md#options-similaritycoefficient)
- **options.apply:** `(suggestion: string, next: NextFunction) => void` 确认后执行的操作
- 返回值: `Promise<void>`

### session.resolve(argv)

### session.collect(argv, key, fields)

按照 argv 中的 command 属性向 fields 添加所需的用户字段。它是一个内置的 before-user 监听器。

- **argv:** [`ParsedArgv`](../guide/command.md#parsedargv-对象) 只需确保其中存在 command 属性即可
- **key:** `T extends 'user' | 'group'` 用户字段集合
- **fields:** `Set<keyof Tables[T]>` 用户字段集合
- 返回值: `void`

### session.execute(argv, next?)

执行一个指令。可以传入一个 argv 对象或者指令对应的文本。

- **argv:** `string | ExecuteArgv` 指令文本或参数对象
- **next:** [`NextFunction`](../guide/message.md#中间件) 回调函数
- 返回值: `Promise<void>`
