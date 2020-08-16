---
sidebarDepth: 2
---

# 应用 (App)

**应用 (App)** 是 [Context](./context.md) 的一个子类，它是程序的入口，管理着全部机器人的信息。除了 Context 中已有的属性和方法以外，App 还提供了下面的属性和方法：

## 构造函数选项

通过 `new App(options)` 创建一个 App 实例。

### options.type

- 类型：`string`

机器人的通信方式，对应你所使用的上游协议，例如 `cqhttp` 或 `atri` 等。

### options.port

- 类型：`number`

服务器监听的端口。

### options.bots

- 类型：`BotOptions[]`

账号相关配置。如果你使用多个账号，这里应该传入一个数组。例如下面的写法是等价的：

```ts
new App({ selfId: 123 })

new App({
  bots: [{ selfId: 123 }],
})
```

### options(.bots[]).selfId

- 类型：`number`

机器人自己的 QQ 号。

### options.nickname

- 类型：`string | string[]`

机器人的昵称，可以是字符串或字符串数组。将用于指令前缀的匹配。例如，如果配置该选项为 `'恋恋'`，则你可以通过 `恋恋，help` 来进行 help 指令的调用。参见 [**指令前缀**](./command-system.md#指令前缀) 一节。

### options.prefix

- 类型：`string | string[]`

指令前缀字符，可以是字符串或字符串数组。将用于指令前缀的匹配。例如，如果配置该选项为 `.`，则你可以通过 `.help` 来进行 help 指令的调用。参见 [**指令前缀**](./command-system.md#指令前缀) 一节。

### options.maxListeners

- 类型：`number`

每种钩子的最大数量。如果超过这个数量，Koishi 会认定为发生了内存泄漏，将产生一个警告。默认值为 `64`。

### options.processMessage

- 类型：`(message: string) => string`

对消息进行提前处理的方式，它将直接作用与 `session.message`。默认值为 `message => simplify(message.trim())`。

### options.defaultAuthority

- 类型：`number | ((session: Session) => number)`

当获取不到用户数据时默认使用的权限等级。

### options.queueDelay

- 类型：`number | ((message: string, session: Session) => number)`

`session.$sendQueued` 的默认延迟时间，单位为毫秒。默认值为 `100`。

### options.promptTimeout

- 类型：`number`

`session.$prompt` 的默认等待时间，单位为毫秒。默认值为 `60000`。

### options.prettyErrors

- 类型：`boolean`

启用报错优化模式。在此模式下 Koishi 会对程序抛出的异常进行整理，过滤掉框架内部的调用记录，输出更易读的提示信息。默认值为 `true`。

### options.similarityCoefficient

- 类型：`number`

用于模糊匹配的相似系数，应该是一个 0 到 1 之间的数值。数值越高，模糊匹配越严格。设置为 1 可以完全禁用模糊匹配。参见 [**模糊匹配**](./command-system.md#模糊匹配) 一节。

## CQHTTP 选项

下面的配置项来自 koishi-adapter-cqhttp。你需要将你的 [`type`](#options-type) 字段配置为 `cqhttp`, `cqhttp:http`, `cqhttp:ws` 或 `cqhttp:ws-reverse` 中的一种。如果缺省或使用了 `cqhttp`，Koishi 会读取你的 `server` 选项，根据你配置的服务器 URL 进行适配。

相关 CQHTTP 配置：`use_http`, `use_ws`。

### options.path

- 类型：`string`

服务器监听的路径。相关 CQHTTP 配置：`post_url`。

### options.secret

- 类型：`string`

接收信息时用于验证的字段，应与 CQHTTP 的 `secret` 配置保持一致。

### options(.bots[]).server

- 类型：`string`

如果使用了 HTTP，则该配置将作为发送信息的服务端；如果使用了 WebSocket，则该配置将作为监听事件和发送信息的服务端。

相关 CQHTTP 配置：`host`, `port`, `ws_host`, `ws_port`。

### options(.bots[]).token

- 类型：`string`

发送信息时用于验证的字段，应与 CQHTTP 的 `access_token` 配置保持一致。

### options.retryTimes

- 类型：`number`

WebSocket 允许重新连接的次数。默认值为 `0`。

### options.retryInterval

- 类型：`number`

WebSocket 重新尝试连接前的等待时间，单位为毫秒。默认值为 `5000`。

### options.quickOperation

- 类型：`number`

快捷操作的时间限制，单位为毫秒。如果配置了这个选项且使用了 HTTP 通信方式，则在这段时间内的首次调用 `meta.$send()` 或类似的方法将不产生新的 HTTP 请求。默认值为 `100`。参见 [**快捷操作**](./message.md#快捷操作) 一节。

## CLI 选项

下面的配置项来自 koishi 的命令行工具。

### options.plugins

- 类型：`[Plugin<T>, T][]`

要安装的插件列表。如果传入一个列表，则依次安装列表中的插件；如果传入一个对象，则以对象的键为上下文依次注册对应的值中的插件。参见 [**插件与上下文**](./plugin-and-context.md) 一章。

### options.logLevel

- 类型：`number`

默认的输出等级。默认值为 `2`。参见 [**设置输出等级**](./logger.md#设置输出等级) 一节。

### options.logFilter

- 类型：`Record<string, number>`

用于在某些范围覆盖默认的输出等级。参见 [**过滤输出**](./logger.md#过滤输出) 一节。

## app.options

当前 App 创建时传入的配置。

## app.status

当前 App 的运行状态。它可能是下列数值中的一个：

- Status.closed = 0
- Status.opening = 1
- Status.open = 2
- Status.closing = 3

## app.start()

启动此应用。

- 返回值: `Promise<void>`

## app.stop()

停止此应用。

- 返回值: `Promise<void>`

## app.getSelfIds()

获取所有机器人的 QQ 号。已经获取到的将不再获取。无法连接的服务器的账号将不会返回。

- 返回值: `Promise<number[]>` 所有机器人的 QQ 号
