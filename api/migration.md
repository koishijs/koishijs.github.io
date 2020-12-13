---
sidebarDepth: 2
---

# 从旧版本迁移

这个页面将介绍 Koishi v3 的新特性和对应的迁移方法。

## 钩子函数

Koishi v1 的 `ctx.receiver` 使用了 EventEmitter 来分发事件，而 Koishi v3 则自己实现了一个事件系统。这样做将带来几点好处：

- 使用统一的事件分发机制，无需对每个上下文构造 EventEmitter 实例，具有更高的性能
- `emit`, `parallel`, `bail`, `serial` 等方法能够妥善处理不同场景下的事件回调

```ts
ctx.emit()      // 同时触发，返回 void
ctx.bail()      // 依次触发，返回第一个 non-nullable 的结果
ctx.parallel()  // 同时触发，返回一个全部完成的 Promise
ctx.serial()    // 依次触发，返回第一个 resolve non-nullable 的结果
```

相关 API 的迁移方法如下：

```ts
ctx.receiver.on(event, callback)    =>  ctx.on(event, callback)
ctx.receiver.emit(event, ...args)   =>  ctx.emit(event, ...args)
ctx.app.emitEvent(...args)          =>  ctx.emit(...args)
app.options.maxMiddlewares          =>  app.options.maxListeners
```

## 会话接口

Koishi v2 新增了会话的概念，它向下兼容大部分 Koishi v1 元信息对象的特性，并增加了大量方法：

```ts
ses.$app              // App 实例
ses.$bot              // Bot 实例

ses.$send()           // 发送消息
ses.$sendQueued()     // 延时发送消息
ses.$cancelQueued()   // 取消延时队列

ses.$use()            // 注册仅对当前会话生效的中间件
ses.$prompt()         // 等待一条消息
ses.$suggest()        // 书写错误提示

ses.$resolve()        // 解析 Argv 对象
ses.$parse()          // 解析指令文本
ses.$execute()        // 指令指令

ses.$observeUser()    // 绑定可观测用户实例
ses.$observeGroup()   // 绑定可观测群实例
```

## 单一应用实例

Koishi v2 使用单一的 App 实例管理多个机器人账号，这将大幅提高程序的启动速度。

现在可以通过 `ctx.bots` 访问当前 App 下的所有机器人，也可以用 `session.$app` 和 `session.$bot` 访问当前会话所在的 App 和 Bot 实例了。

```ts
appMap[selfId].sender       =>  ctx.bots[selfId]
appList.forEach(cb)         =>  ctx.bots.forEach(cb)
ctx.sender.sendGroupMsg()   =>  ctx.bots[selfId].sendGroupMsg()

appMap[selfId]              =>  session.$app
appMap[selfId].sender       =>  session.$bot
ctx.sender.sendGroupMsg()   =>  session.$bot.sendGroupMsg()

app.selfId                  =>  bot.selfId
getSelfIds()                =>  app.getSelfIds()
```

同时我们也不再需要全局的生命周期方法了。直接使用 v1 就有的生命周期方法即可控制所有 Bot 实例。

```ts
startAll()              =>  app.start()
stopAll()               =>  app.stop()

onStart(cb)             =>  ctx.on('connect', cb)
onStop(cb)              =>  ctx.on('disconnect', cb)
```

## 指令选项

Koishi v1 的指令系统对 TypeScript 的类型标注并不友好。为了更好地适应强类型和按需获取数据的程序风格，Koishi v2 修改了指令选项的行为：

```ts
// v1
cmd.option('-f, --foo <arg>', 'description', { default: 123 })
cmd.option('-B, --no-bar', 'description')
cmd.option('--baz <arg>', 'description', { isString: true })

// v2
cmd.option('foo', '-f <arg> description', { fallback: 123 })
cmd.option('bar', '-B description', { value: false })
cmd.option('baz', '<arg> description', { type: 'string' })
```

## 控制台日志

Koishi v2 有了内置的 Logger 实现，结合对错误信息的处理，能够展现更好的控制台日志。
