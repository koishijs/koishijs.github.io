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
    bot.sendPrivateMsg(1234567, '你的机器人上线了')
  })
})
```

此外，你还可以利用 `connect` 事件：

```js
app.on('connect', () => app.sender.sendPrivateMsg(1234567, '你的机器人上线了'))

// 先注册回调函数，再启动应用
app.start()
```
