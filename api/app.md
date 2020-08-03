---
sidebarDepth: 2
---

# 应用 (App)

::: danger 注意
这里是**正在施工**的 koishi v2 的文档。要查看 v1 版本的文档，请前往[**这里**](https://koishijs.github.io/v1/)。
:::

**应用 (App)** 是 [Context](./context.md) 的一个子类，它管理着一个 QQ 号下面的全部信息。除了上面提到的属性和方法以外，App 还提供了下面的属性和方法：

## app.selfId

## app.server

当前 App 绑定的 Server 对象。可以通过手动调用 `app.server.stop()` 停止服务器的运行。

## app.options

当前 App 创建时传入的配置。参见 [配置文件](../guide/config-file.md)。

## app.users

由当前 App 内所有用户事件构成的上下文。特别地，你可以使用 `app.users.exclude(...ids)` 创建除去某些用户外所有用户的上下文。

## app.groups

由当前 App 内所有群事件构成的上下文。特别地，你可以使用 `app.groups.exclude(...ids)` 创建除去某些群外所有群的上下文。

## app.discusses

由当前 App 内所有讨论组事件构成的上下文。特别地，你可以使用 `app.discusses.exclude(...ids)` 创建除去某些讨论组外所有讨论组的上下文。

## app.user(...userIds)

创建对特定用户的上下文。

- **userIds:** `number[]` 用户 ID
- 返回值: [`Context`](./context.md) 新的上下文

## app.group(...groupIds)

创建对特定群的上下文。

- **groupIds:** `number[]` 群 ID
- 返回值: [`Context`](./context.md) 新的上下文

## app.discuss(...discussIds)

创建对特定讨论组的上下文。

- **discussIds:** `number[]` 讨论组 ID
- 返回值: [`Context`](./context.md) 新的上下文

## app.start()

启动此应用。

- 返回值: `Promise<void>`

## app.stop()

停止此应用。

- 返回值: `Promise<void>`

## app.emitEvent(meta, event, ...payloads)

在元信息相关联的上下文触发一个事件。

- **meta:** `Meta` 元信息
- **event:** `string` 事件名
- **payloads:** `any[]` 事件参数
- 返回值: `void`

::: tip 提示
如果你只希望该事件在 `App` 本身触发，应该直接使用 `app.receiver.emit()` 方法。
:::

## app.parseCommandLine(message, meta)

解析一段指令调用文本。

- **message:** `string` 要解析的文本（开头不要包含指令名和前缀）
- **meta:** [`Meta`](../guide/message.md#深入-meta-对象) 元信息对象
- 返回值: [`ParsedCommandLine`](../guide/command-system.md#parsedcommandline-对象) 解析结果

## app.executeCommandLine(message, meta, next?) <Badge text="1.1.0+"/>

执行一段指令调用文本。

- **message:** `string` 要执行的文本（开头不要包含指令名和前缀）
- **meta:** [`Meta`](../guide/message.md#深入-meta-对象) 元信息对象
- **next:** [`NextFunction`](../guide/message.md#中间件) 所处的中间件的 `next` 回调函数
- 返回值: `any` 执行结果

## app.getSelfIds()

获取所有机器人的 QQ 号。已经获取到的将不再获取。无法连接的服务器的账号将不会返回。

- 返回值: `Promise<number[]>` 所有机器人的 QQ 号
