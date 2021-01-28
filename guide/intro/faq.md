---
sidebarDepth: 2
---

# 常见问题

## 关于生命周期

### 应该如何保证一段代码在成功完成初始化之后执行？

可以有很多种方式。你可以利用 `app.start()` 返回的 `Promise` 对象：

```js
app.start().then(() => {
  app.servers.onebot.bots.forEach((bot) => {
    bot.sendPrivateMsg('123456789', '你的机器人上线了')
  })
})
```

此外，你还可以利用 `connect` 事件：

```js
app.on('connect', () => {
  app.servers.onebot.bots.forEach((bot) => {
    bot.sendPrivateMsg('123456789', '你的机器人上线了')
  })
})

// 先注册回调函数，再启动应用
app.start()
```

## 关于多平台

### 为什么其他平台的适配器名字都与平台一致，只有 QQ 对应 OneBot？

这是由多方原因共同导致的。

首先，许多平台都公开了自己的机器人接口，只有腾讯官方对机器人采取封杀的态度。因此只有 QQ 的适配器是基于第三方协议实现的，OneBot 正是这个协议的名字。而第三方协议远远不止一个，所以不应该用 QQ 这个笼统的名称。在未来也可能出现其他面向 QQ 的适配器。

反过来，OneBot 作为一个协议，未来也可能支持更多的聊天平台。届时只需有 koishi-adapter-onebot，Koishi 也相当于支持了这些平台。一旦出现了这样的情况，用 QQ 作为适配器名反而显得以偏概全了，这也是不妥当的。

但尽管这么说，从目前来看，当我们在讨论用 Koishi 实现 QQ 机器人时，都默认采用这个协议。
