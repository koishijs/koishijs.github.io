---
sidebarDepth: 2
---

# 上下文 (Context)

::: danger 注意
这里是**正在施工**的 koishi v2 的文档。要查看 v1 版本的文档，请前往[**这里**](https://koishijs.github.io/v1/)。
:::

**上下文 (Context)** 是 Koishi 的重要概念。你的每一个插件，中间件，监听器和指令都被绑定在上下文上。

## ctx.database

当前应用的 [Database](./database.md#数据库对象) 对象。

## ctx.bots

当前应用所绑定的全部 [Bot](./bot.md) 实例。你可以将其当做一个 Bot 数组，也可以直接使用 QQ 号作为其索引：

```ts
ctx.bots[0].selfId                    // 123456789
ctx.bots[123456789] === ctx.bots[0]   // true
ctx.bots.length                       // 1
```

## 过滤器

### ctx.user(...ids)

在已有上下文的基础上加上其他上下文。

- **context:** `Context` 要加上的上下文
- 返回值: `Context` 新的上下文

### ctx.private(...ids)

在已有上下文的基础上除去其他上下文。

- **context:** `Context` 要除去的上下文
- 返回值: `Context` 新的上下文

### ctx.group(...ids)

给出当前上下文和其他上下文的交集

- **context:** `Context` 要求交集的上下文
- 返回值: `Context` 新的上下文

### ctx.match(meta)

测试上下文能否匹配元信息对象。

- **meta:** `Meta` 元信息对象
- 返回值: `boolean` 匹配结果

### ctx.contain(context)

判断当前上下文是否完全包含了另一个上下文。

- **context:** `Context` 要比较的上下文
- 返回值: `boolean` 比较结果

## 钩子与中间件

### ctx.emit(meta?, event, ...param)

### ctx.parallel(meta?, event, ...param)

### ctx.bail(meta?, event, ...param)

### ctx.serial(meta?, event, ...param)

### ctx.on(event, listener)

### ctx.once(event, listener)

### ctx.before(event, listener)

### ctx.off(event, listener)

### ctx.middleware(middleware)

当前上下文中注册一个中间件。

- **middleware:** [`Middleware`](../guide/message.md#中间件) 要注册的中间件
- 返回值: `this`

### ctx.prependMiddleware(middleware)

当前上下文中注册一个前置中间件。

- **middleware:** [`Middleware`](../guide/message.md#中间件) 要注册的前置中间件
- 返回值: `this`

### ctx.removeMiddleware(middleware)

移除当前上下文中一个已注册的中间件。

- **middleware:** [`Middleware`](../guide/message.md#中间件) 要移除的中间件
- 返回值: `boolean` 是否存在该中间件

## 指令与插件

### ctx.plugin(plugin, options?)

当前上下文中安装一个插件。

- **plugin:** `Plugin<T, U>` 要安装的插件
- **options:** `U` 要传入插件的参数，如果为 `false` 则插件不会被安装
- 返回值: `this`

```ts
type PluginFunction <T extends Context, U> = (ctx: T, options: U) => void
type PluginObject <T extends Context, U> = { apply: PluginFunction<T, U> }
type Plugin <T extends Context, U> = PluginFunction<T, U> | PluginObject<T, U>
```

### ctx.command(rawName, description?, config?)

在当前上下文中注册或修改一个指令。

- **rawName:** `string` 指令名以及可能的参数
- description?: `string` 指令的描述
- config?: [`CommandConfig`](../guide/command-system.md#commandconfig-对象) 指令的配置
- 返回值：[`Command`](./command.md) 注册或修改的指令

### ctx.logger(scope?) <Badge text="1.3.0+"/>

根据 namespace 生成一个 [Logger 对象](../guide/logger.md#使用-logger)。

- **scope:** `string` 要指定的类型，默认为 `''`
- 返回值: [`Logger`](../guide/logger.md#使用-logger)

### ctx.dispose() <Badge text="beta" type="warn"/>

移除当前插件中所注册的钩子、中间件和指令。

- 返回值: `void`
