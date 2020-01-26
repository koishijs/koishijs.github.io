---
sidebarDepth: 2
---

# 消息的发送

## 发送消息到特定的上下文

你可以使用 echo 指令发送消息到特定的上下文：

```sh
echo [-u ids] [-g ids] [-d ids] <text...>
echo foo bar              # 向你发送 foo bar
echo -u 123 foo bar       # 向用户 123 私聊发送 foo bar
echo -g 456,789 foo bar   # 向群 456 和 789 同时发送 foo bar
```

::: tip 提示
echo 指令的消息是一个 [长参数](../../guide/command-system.md#长参数)，因此你应该把所有的选项写到消息前面，否则会被认为是消息的一部分。
:::

## 向所有群广播消息

broadcast 指令用于按照 `assignee` 字段向所有 Bot 所负责的群发送一段文本。你可以这样调用它：

```sh
broadcast foo bar baz     # 向所有群发送 foo bar baz
```

这看起来只是 echo 的一个简写版本，但实际上这两个指令有下面的差别：

| 指令 | echo | broadcast |
|:-:|:-:|:-:|
| 输出上下文 | 可自行指定任意上下文 | 所有 Bot 负责的所有群 |
| 需要数据库 | 否 | 是 |
| 支持多 App | 否 | 是 |
| 发送间隔 | 同时 | 可自行指定时间间隔 |

### 指定发送间隔

如果你的机器人加了很多群，你可能希望指定发送间隔以避免封号：

```js koishi.config.js
module.exports = {
  plugins: [['common', {
    broadcastInterval: 1000, // 默认值为 1s
  }]],
}
```

## 模拟其他上下文发送信息

与上面的两个指令相反，contextify 指令可以让你临时切换上下文调用指令。例如你在私聊上下文：

```sh
teach foo bar                       # 无效，因为 teach 指令只对群上下文生效
contextify -g 456 teach foo bar     # 有效，相当于在群 456 调用 teach foo bar
```

除此以外，你还可以模拟其他上下文调用（假设你现在在群 123 中调用指令）：

```sh
ctxf -g 456 command                 # 模拟你在群 456 的上下文
ctxf -d 456 command                 # 模拟你在讨论组 456 的上下文
ctxf -u 789 command                 # 模拟用户 789 的私聊上下文
ctxf -m 789 command                 # 模拟用户 789 在当前群的上下文
ctxf -u 789 -g 456 command          # 模拟用户 789 在群 456 的上下文
ctxf -u 789 -d 456 command          # 模拟用户 789 在讨论组 456 的上下文
```

尽管切换了调用上下文，但 contextify 指令的输出仍然产生在原上下文中。这在你想调用群指令的时候是很有用的。

::: tip 提示
为了安全性考虑，contextify 命令设计的最低使用权限为 3 级，同时切换的用户等级不能高于或等于调用者自身。
:::
