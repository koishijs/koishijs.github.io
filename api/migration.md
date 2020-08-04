# 从 v1 迁移

这个页面将包含全部 v1 中修改或删除的 API。

## 钩子函数

Koishi v1 的 `ctx.receiver` 使用了 EventEmitter 来分发事件，而 Koishi v2 则自己实现了一个事件系统。

```ts
ctx.receiver.on(event, callback)    =>  ctx.on(event, callback)
ctx.receiver.emit(event, ...args)   =>  ctx.emit(event, ...args)
ctx.app.emitEvent(...args)          =>  ctx.emit(...args)
app.options.maxMiddlewares          =>  app.options.maxListeners
```

除此以外，Koishi v2 还加入了更多与事件有关的 API：

```ts
ctx.emit()      // 同时触发，返回 void
ctx.bail()      // 依次触发，返回第一个 truthy 的结果
ctx.parallel()  // 同时触发，返回一个全部完成的 Promise
ctx.serial()    // 依次触发，返回第一个 resolve truthy 的结果
```

## 过滤器

```ts
app.groups                      =>  app.group()
ctx.intersect(ctx.app.groups)   =>  ctx.group()
```

## 单一应用实例

Koishi v2 使用单一的 App 实例管理多个机器人账号。因此，如果你使用多个机器人来进行负载均衡，请留意这方面的 API 变化。

### new App() <Badge type="warn" text="修改"/>

请不必担心，如果你只使用一个账号，这里无需做出任何更改。只要不提供 `bots` 选项，Koishi 就会将传入 App 的参数作为唯一一个账号的配置。

```ts
// before
new App({ selfId: 100, server: 'http://localhost:5700', token: 'token1', ...otherOptions })
new App({ selfId: 200, server: 'http://localhost:5800', token: 'token2', ...otherOptions })

// after
new App({
  bots: [
    { selfId: 100, server: 'http://localhost:5700', token: 'token1' },
    { selfId: 200, server: 'http://localhost:5800', token: 'token2' },
  ],
  ...otherOptions,
})
```

### appList, appMap, ctx.sender <Badge type="error" text="移除"/>

现在可以通过 `ctx.bots` 访问当前 App 下的所有机器人，也可以用 `session.$app` 和 `session.$bot` 访问当前会话所在的 App 和 Bot 实例了。

```ts
appMap[selfId].sender   =>  ctx.bots[selfId]
appList.forEach(cb)     =>  ctx.bots.forEach(cb)
ctx.sender.sendMsg()    =>  ctx.bots[selfId].sendMsg()

appMap[selfId]          =>  session.$app
appMap[selfId].sender   =>  session.$bot
ctx.sender.sendMsg()    =>  session.$bot.sendMsg()
```

### startAll(), stopAll(), onStart(), onStop() <Badge type="error" text="移除"/>

出于上述理由，我们也不需要全局的生命周期方法了。直接使用 v1 就有的生命周期方法即可控制所有 Bot 实例。

```ts
startAll()              =>  app.start()
stopAll()               =>  app.stop()

onStart(cb)             =>  ctx.on('connect', cb)
onStop(cb)              =>  ctx.on('disconnect', cb)
```

### app.selfId, getSelfIds() <Badge type="warn" text="移除"/>

与机器人账号相关的 API 也相应做出了调整。

```ts
app.selfId              =>  bot.selfId
getSelfIds()            =>  app.getSelfIds()
```

## 指令操作

### app.parseCommandLine(), app.executeCommandLine(), ctx.runCommand() <Badge type="error" text="移除"/>

我们设计了更强大和便捷的替代品：

```ts
ctx.app.parseCommandLine()    =>  ctx.parse()
ctx.app.executeCommandLine()  =>  ctx.execute()
ctx.runCommand()              =>  ctx.execute()
```

## 数据库相关

### registerDatabase(name, subdatabase) <Badge type="error" text="移除"/>



### injectMethods(name, methods, config?) <Badge type="error" text="移除"/>


