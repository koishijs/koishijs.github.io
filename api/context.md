---
sidebarDepth: 2
---

# 上下文 (Context)

**上下文 (Context)** 是 Koishi 的重要概念。你的每一个插件，中间件，监听器和指令都被绑定在上下文上。

## 实例属性

下面的属性为了访问方便而绑定，严格上它们对一个 App 实例下的所有上下文都是相同的。

### ctx.database

当前应用的 [Database](./database.md#数据库对象) 对象。

### ctx.router

如果你配置了 [port](./app.md#option-port) 选项，则这个属性将作为一个 [KoaRouter](https://github.com/koajs/router/blob/master/API.md) 实例。你可以在上面自定义新的路由：

```js
ctx.router.get('/path', (ctx, next) => {
  // handle request
})
```

### ctx.bots

一个键值对，保存了当前应用下的所有 Bot 实例。

## 过滤器

### ctx.self(...values)
### ctx.user(...values)
### ctx.group(...values)
### ctx.channel(...values)
### ctx.platform(...values)

选取当前上下文的子集，限定机器人 / 用户 / 群组 / 频道 / 平台名称为所给定的值。

- **values:** `string[]` 允许的机器人 / 用户 / 群组 / 频道 / 平台名称构成的数组
- 返回值: `Context` 新的上下文

### ctx.{type}.except(...values)

选取当前上下文的子集，排除机器人 / 用户 / 群组 / 频道 / 平台名称为所给定的值。这里的 type 同上文。

- **values:** `string[]` 禁止的机器人 / 用户 / 群组 / 频道 / 平台名称构成的数组
- 返回值: `Context` 新的上下文

### ctx.select(key, ...values)

选取当前上下文的子集，限定会话对象的 key 属性所对应的值。

- **values:** `string[]` 如果非空则表示允许的 key 属性可选值；否则只需 key 属性为 truthy 即可
- 返回值: `Context` 新的上下文

### ctx.unselect(key, ...values)

选取当前上下文的子集，排除会话对象的 key 属性所对应的值。

- **values:** `string[]` 如果非空则表示允许的 key 属性禁用值；否则只需 key 属性为 falsy 即可
- 返回值: `Context` 新的上下文

### ctx.union(filter)

给出当前上下文和其他上下文的并集。

- **context:** `Context | ((session: Session) => boolean)` 另一个上下文或者过滤器函数
- 返回值: `Context` 新的上下文

### ctx.intersect(filter)

给出当前上下文和其他上下文的交集。

- **context:** `Context | ((session: Session) => boolean)` 另一个上下文或者过滤器函数
- 返回值: `Context` 新的上下文

### ctx.match(session)

测试上下文能否匹配会话对象。

- **session:** [`Session`](./session.md) 会话对象
- 返回值: `boolean` 匹配结果

## 钩子与中间件

### ctx.emit(session?, event, ...param)
### ctx.parallel(session?, event, ...param)

同时触发所有 event 事件的能够匹配 session 对象的回调函数。emit 为同步，parallel 为异步。

- **session:** [`Session`](./session.md) 会话对象
- **event:** `string` 事件名称
- **param:** `any[]` 事件的参数
- 返回值: `boolean` 匹配结果

### ctx.bail(session?, event, ...param)
### ctx.serial(session?, event, ...param)

依次触发所有 event 事件的能够匹配 session 对象的回调函数。当返回一个 false, null, undefined 以外的值时将这个值作为结果返回。bail 为同步，serial 为异步。

- **session:** [`Session`](./session.md) 会话对象
- **event:** `string` 事件名称
- **param:** `any[]` 事件的参数
- 返回值: `boolean` 匹配结果

### ctx.chain(session?, event, ...param)
### ctx.waterfall(session?, event, ...param)

依次触发所有 event 事件的能够匹配 session 对象的回调函数。每次用得到的返回值覆盖下一轮调用的第一个参数，并在所有函数执行完后返回最终结果。chain 为同步，waterfall 为异步。

- **session:** [`Session`](./session.md) 会话对象
- **event:** `string` 事件名称
- **param:** `any[]` 事件的参数
- 返回值: `boolean` 匹配结果

### ctx.on(event, listener, prepend?)

监听一个事件。

- **event:** `string` 事件名称
- **listener:** `Function` 回调函数
- **prepend:** `boolean` 是否前置
- 返回值: `() => boolean` 取消这个监听器

### ctx.once(event, listener, prepend?)

监听一个事件，且确保回调函数只会被执行一次。

- **event:** `string` 事件名称
- **listener:** `Function` 回调函数
- **prepend:** `boolean` 是否前置
- 返回值: `() => boolean` 取消这个监听器

### ctx.before(event, listener, append?)

监听一个以 `before-` 开头的事件。

- **event:** `string` 事件名称
- **listener:** `Function` 回调函数
- **append:** `boolean` 是否后置
- 返回值: `() => boolean` 取消这个监听器

### ctx.middleware(middleware, prepend?)

当前上下文中注册一个中间件。

- **middleware:** [`Middleware`](../guide/message.md#使用中间件) 要注册的中间件
- **prepend:** `boolean` 是否前置
- 返回值: `() => boolean` 取消这个中间件

## 指令与插件

### ctx.plugin(plugin, options?)

当前上下文中安装一个插件。

- **plugin:** `Plugin` 要安装的插件
- **options:** `any` 要传入插件的参数，如果为 `false` 则插件不会被安装
- 返回值: `this`

```js
type PluginFunction<U> = (ctx: Context, options: U) => void
type PluginObject<U> = { apply: PluginFunction<T, U> }
type Plugin<U> = PluginFunction<T, U> | PluginObject<T, U>
```

### ctx.command(def, desc?, config?)

在当前上下文中注册或修改一个指令。

- **def:** `string` 指令名以及可能的参数
- **desc:** `string` 指令的描述
- **config:** `CommandConfig` 指令的配置
  - **checkUnknown:** `boolean` 是否对未知选项进行检测，默认为 `false`
  - **checkArgCount:** `boolean` 是否对参数个数进行检测，默认为 `false`
  - **authority:** `number` 最低调用权限，默认为 `1`
  - **maxUsage:** `number` 每天最多调用次数，默认为 `Infinity`
  - **minInterval:** `number` 每次调用最短时间间隔，默认为 `0`
  - **showWarning:** `boolean` 当小于最短间隔时是否进行提醒，默认为 `false`
  - **usageName:** `string` 调用标识符，默认为指令名，如果多个指令使用同一个标识符，则它们的调用次数将合并计算
- 返回值：[`Command`](./command.md) 注册或修改的指令

### ctx.logger(scope?)

根据 namespace 生成一个 [Logger 对象](../guide/logger.md#使用-logger)。

- **scope:** `string` 要指定的类型，默认为 `''`
- 返回值: [`Logger`](../guide/logger.md#使用-logger)

### ctx.dispose()

移除当前插件中所注册的钩子、中间件和指令。

- 返回值: `void`
