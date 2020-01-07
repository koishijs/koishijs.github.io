---
sidebarDepth: 2
---

# 消息处理

`koishi-plugin-common` 包含了目前使用的全部内置插件，其中有许多指令可以用于处理消息。

## 发送消息到特定的上下文

你可以使用 echo 指令发送消息到特定的上下文：

```sh
echo [-u ids] [-g ids] [-d ids] <text>
echo foo bar              # 向你发送 foo bar
echo -u 123 foo bar       # 向用户 123 私聊发送 foo bar
echo -g 456,789 foo bar   # 向群 456 和 789 同时发送 foo bar
```

::: tip 提示
echo 指令的消息是一个 [长参数](../command-system.md#长参数)，因此你应该把所有的选项写到消息前面，否则会被认为是消息的一部分。
:::

## 向所有群广播消息

broadcast 指令用于向所有 Bot 所在的群发送一段文本。你可以这样调用它：

```sh
broadcast foo bar baz     # 向所有群发送 foo bar baz
```

这看起来只是 echo 的一个简写版本，但实际上这两个指令有下面的差别：

- 对于多个 App 实例同时运行的情况，echo 只会让收到调用的 Bot 发送信息，broadcast 会同时控制所有 Bot 发送信息
- echo 的发送信息是几乎同时的，而 broadcast 会让每个要发送信息的 Bot 按照一定的时间间隔发送，这个时间间隔可以显式地设置：

```js
module.exports = {
  plugins: ['common', {
    broadcast: {
      broadcastInterval: 1000, // 默认值为 1s
    },
  }],
}
```
