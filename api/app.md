---
sidebarDepth: 2
---

# 应用 (App)

**应用 (App)** 是 [Context](./context.md) 的一个子类，它管理着一个 QQ 号下面的全部信息。除了上面提到的属性和方法以外，App 还提供了下面的属性和方法：

## app.selfId

当前 App 绑定的 QQ 号，是 `app.options.selfId` 的简写形式。

## app.server

当前 App 绑定的 Server 对象。可以通过手动调用 `app.server.stop()` 停止服务器的运行。

## app.options

当前 App 创建时传入的配置。参见 [配置文件](../guide/config-file.md)。

## app.version

当前 App 的版本信息。参见 [`VersionInfo`](./sender.md#sender-getsersioninfo)。

## app.users

由当前 App 内所有用户事件构成的上下文。特别地，你可以使用 `app.users.exclude(...ids)` 创建除去某些用户外所有用户的上下文。

## app.groups

由当前 App 内所有群事件构成的上下文。特别地，你可以使用 `app.groups.exclude(...ids)` 创建除去某些群外所有群的上下文。

## app.discusses

由当前 App 内所有讨论组事件构成的上下文。特别地，你可以使用 `app.discusses.exclude(...ids)` 创建除去某些讨论组外所有讨论组的上下文。

## app.user(...userIds)

创建对特定用户的上下文。

- userIds: `number[]` 用户 ID
- 返回值: [`Context`](./context.md) 新的上下文

## app.group(...groupIds)

创建对特定群的上下文。

- groupIds: `number[]` 群 ID
- 返回值: [`Context`](./context.md) 新的上下文

## app.discuss(...discussIds)

创建对特定讨论组的上下文。

- discussIds: `number[]` 讨论组 ID
- 返回值: [`Context`](./context.md) 新的上下文

## app.start()

启动此应用。

- 返回值: `Promise<void>`

## app.stop()

停止此应用。

- 返回值: `Promise<void>`

## app.emitWarning(error)

生成一个运行时警告。如果使用了 Koishi 的命令行工具将会被显示在控制台。

- error: `Error` 一个错误
- 返回值: `void`

## app.parseCommandLine(message, meta)

解析一段指令调用文本。

- message: `string` 要解析的文本（开头不要包含指令名和前缀）
- meta: [`Meta`](../guide/receive-and-send.md#深入-meta-对象) 元信息对象
- 返回值: [`ActionConfig`](../guide/command-system.md#actionconfig-对象) 解析结果
