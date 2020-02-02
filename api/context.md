---
sidebarDepth: 2
---

# 上下文 (Context)

**上下文 (Context)** 是 Koishi 的重要概念。你的每一个插件，中间件，监听器和指令都被绑定在上下文上。

## ctx.database

当前 App 的数据库对象。参见 [数据库](./database.md)。

## ctx.sender

当前 App 的发送器对象。参见 [发送器](./sender.md)。

## ctx.receiver

当前上下文的接收器对象。参见 [接收器](./receiver.md)。

## ctx.plus(context)

在已有上下文的基础上加上其他上下文。

- **context:** `Context` 要加上的上下文
- 返回值: `Context` 新的上下文

## ctx.minus(context)

在已有上下文的基础上除去其他上下文。

- **context:** `Context` 要除去的上下文
- 返回值: `Context` 新的上下文

## ctx.intersect(context)

给出当前上下文和其他上下文的交集

- **context:** `Context` 要求交集的上下文
- 返回值: `Context` 新的上下文

## ctx.inverse()

求出当前上下文的补集。

- 返回值: `Context` 新的上下文

## ctx.match(meta)

测试上下文能否匹配元信息对象。

- **meta:** `Meta` 元信息对象
- 返回值: `boolean` 匹配结果

## ctx.contain(context)

判断当前上下文是否完全包含了另一个上下文。

- **context:** `Context` 要比较的上下文
- 返回值: `boolean` 比较结果

## ctx.plugin(plugin, options?)

当前上下文中安装一个插件。

- **plugin:** `Plugin<T, U>` 要安装的插件
- **options:** `U` 要传入插件的参数，如果为 `false` 则插件不会被安装
- 返回值: `this`

```ts
type PluginFunction <T extends Context, U> = (ctx: T, options: U) => void
type PluginObject <T extends Context, U> = { apply: PluginFunction<T, U> }
type Plugin <T extends Context, U> = PluginFunction<T, U> | PluginObject<T, U>
```

## ctx.middleware(middleware)

当前上下文中注册一个中间件。

- **middleware:** [`Middleware`](../guide/receive-and-send.md#中间件) 要注册的中间件
- 返回值: `this`

## ctx.prependMiddleware(middleware)

当前上下文中注册一个前置中间件。

- **middleware:** [`Middleware`](../guide/receive-and-send.md#中间件) 要注册的前置中间件
- 返回值: `this`

## ctx.removeMiddleware(middleware)

移除当前上下文中一个已注册的中间件。

- **middleware:** [`Middleware`](../guide/receive-and-send.md#中间件) 要移除的中间件
- 返回值: `boolean` 是否存在该中间件

## ctx.command(rawName, description?, config?)

在当前上下文中注册或修改一个指令。

- **rawName:** `string` 指令名以及可能的参数
- description?: `string` 指令的描述
- config?: [`CommandConfig`](../guide/command-system.md#commandconfig-对象) 指令的配置
- 返回值：[`Command`](./command.md) 注册或修改的指令

## ctx.getCommand(name, meta?)

在当前上下文中获取一个指令。如果提供了 `meta`，将会检测指令是否可以匹配 `meta.$path`；否则将使用 `this.path` 进行匹配。

- **name:** `string` 指令名
- **meta:** [`Meta`](../guide/receive-and-send.md#深入-meta-对象) 元信息对象
- 返回值：[`Command`](./command.md) 匹配的指令

## ctx.runCommand(name, meta, args?, options?, rest?)

在当前上下文中执行一个指令。

- **name:** `string` 指令名
- **meta:** [`Meta`](../guide/receive-and-send.md#深入-meta-对象) 元信息对象
- **args:** `string[]` 参数列表
- **options:** `Record<string, any>` 选项列表
- **rest:** `string` 剩余参数，参见 [剩余参数](../guide/command-system.md#剩余参数)
- 返回值: `Promise<void>`

## ctx.logger(scope?) <Badge text="1.3.0+"/>

根据 scope 生成一个 [Logger 对象](../guide/logger.md#使用-logger)。

- **scope:** `string` 要指定的类型，默认为 `''`
- 返回值: [`Logger`](../guide/logger.md#使用-logger)

## ctx.end()

返回当前上下文所在的 App 实例，可用于链式调用。

- 返回值: [`App`](./app.md) 当前上下文所在的 App 实例
