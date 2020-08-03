# 从 v1 迁移

这个页面将包含全部 v1 中修改或删除的 API。

## 单一 App 实例

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

现在可以通过 `ctx.bots` 访问当前 App 下的所有机器人，也可以用 `meta.$app` 和 `meta.$bot` 访问当前会话所在的 App 和 Bot 实例了。

```ts
appMap[selfId]          =>  ctx.app
appMap[selfId].sender   =>  ctx.bots[selfId]
appList.forEach(cb)     =>  ctx.bots.forEach(cb)
ctx.sender.sendMsg()    =>  ctx.bots[selfId].sendMsg()

appMap[selfId]          =>  meta.$app
appMap[selfId].sender   =>  meta.$bot
ctx.sender.sendMsg()    =>  meta.$bot.sendMsg()
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

## 数据库相关

### registerDatabase(name, subdatabase) <Badge type="error" text="移除"/>



### injectMethods(name, methods, config?) <Badge type="error" text="移除"/>


