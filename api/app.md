---
sidebarDepth: 2
---

# 应用 (App)

**应用 (App)** 是 [Context](./context.md) 的一个子类，它是程序的入口，管理着全部机器人的信息。除了 Context 中已有的属性和方法以外，App 还提供了下面的属性和方法：

## new App(options)

创建一个 App 实例。

### options.type

机器人的通信方式，目前支持 `'http'` 和 `'ws'` 两种。特别地，如果这个配置缺省，Koishi 也会读取你的 `server` 选项，根据你配置的服务器 URL 进行适配。相关 CQHTTP 配置：`use_http`, `use_ws`。

### options.port

服务器监听的端口。相关 CQHTTP 配置：`post_url`。

### options.secret

接收信息时用于验证的字段，应与 CQHTTP 的 `secret` 配置保持一致。

### options.bots

### options(.bots[]).selfId

机器人自己的 QQ 号。这个选项通常是可选的，因为 Koishi 在大部分情况下可以自动获取机器人的 QQ 号。但我们仍然建议你手动配置这个选项。

### options(.bots[]).server

如果使用了 HTTP，则该配置将作为发送信息的服务端；如果使用了 WebSocket，则该配置将作为监听事件和发送信息的服务端。

相关 CQHTTP 配置：`host`, `port`, `ws_host`, `ws_port`。

### options(.bots[]).token

发送信息时用于验证的字段，应与 CQHTTP 的 `access_token` 配置保持一致。

### options.nickname

机器人的昵称，可以是字符串或字符串数组。将用于指令前缀的匹配。例如，如果配置该选项为 `'恋恋'`，则你可以通过 `恋恋，help` 来进行 help 指令的调用。参见 [**指令前缀**](./command-system.md#指令前缀) 一节。

### options.prefix

指令前缀字符，可以是字符串或字符串数组。将用于指令前缀的匹配。例如，如果配置该选项为 `.`，则你可以通过 `.help` 来进行 help 指令的调用。参见 [**指令前缀**](./command-system.md#指令前缀) 一节。

### options.maxListeners

每种钩子的最大数量。如果超过这个数量，Koishi 会认定为发生了内存泄漏，将产生一个错误事件，并停止新钩子的安装。默认值为 `64`。

### options.queueDelay

### options.promptTimeout

### options.similarityCoefficient

用于模糊匹配的相似系数，应该是一个 0 到 1 之间的数值。数值越高，模糊匹配越严格。设置为 1 可以完全禁用模糊匹配。参见 [**模糊匹配**](./command-system.md#模糊匹配) 一节。

### options.quickOperationTimeout

快捷操作的时间限制，单位为毫秒。如果配置了这个选项且使用了 HTTP 通信方式，则在这段时间内的首次调用 `meta.$send()` 或类似的方法将不产生新的 HTTP 请求。默认值为 `0`。参见 [**快捷操作**](./message.md#快捷操作) 一节。

## app.options

当前 App 创建时传入的配置。参见 [配置文件](../guide/config-file.md)。

## app.server

当前 App 绑定的 Server 对象。

### server.app

当前 Server 对象所在的 App 实例。

### server.bots

当前 Server 对象所绑定的全部 [Bot](./bot.md) 实例。你可以将其当做一个 Bot 数组，也可以直接使用 QQ 号作为其索引：

```ts
server.bots[0].selfId                       // 123456789
server.bots[123456789] === server.bots[0]   // true
server.bots.length                          // 1
```

### server.router

如果你使用了 http 或 ws-reverse 模式，则这个属性将作为一个 [Koa-Router](https://github.com/koajs/router/blob/master/API.md) 实例。你可以在上面自定义新的路由：

```ts
app.server.router.get('/path', (ctx, next) => {
  // handle request
})
```

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
