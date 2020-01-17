---
sidebarDepth: 2
---

# 其他功能

::: warning 提示
本章介绍的功能由 koishi-plugin-common 插件提供。**部分功能可能会在未来的版本更新中被移除。**
:::

koishi-plugin-common 包含了一些基本插件，它们在你使用 `koishi` 库时是默认安装的。尽管如此，你仍然可以在 `koishi.config.js` 中显式地配置或禁用其中的一些功能：

```js
module.exports = {
  plugins: ['common', {
    // 禁用此功能
    repeater: false,
    // 配置应答器
    replies: [{
      match: /^(.+)一时爽$/,
      reply: (_, str) => `一直${str}一直爽`,
    }],
  }],
}
```

下面将介绍每个插件的功能。

## 插件：authorize

authorize 插件用于设置特定玩家的权限，以及特定群中默认的玩家的权限：

```js
module.exports = {
  plugins: ['common', {
    authorizeUser: {
      // 设置玩家权限
      123456789: 3,
    },
    authorizeGroup: {
      // 设置全群玩家权限为 2 级
      111222333: 2,
      // 默认行为：全群玩家权限为 1 级
      444555666: {},
      // 分别设置每类成员
      777888999: { member: 1, admin: 2, owner: 3 },
    },
  }],
}
```

这里的权限设置不仅会在机器人每次启动时生效，也会在有人加群时生效。同时，authorizeUser 是强制设置玩家等级，而 authorizeGroup 则是设置最低等级，即当玩家等级低于该值时才进行更新。

::: warning 注意
由于 CoolQ 的机制问题，机器人刚加某个群时可能无法获取成员列表，从而导致插件无法运行。遇到这种情况一般等待 1-2 天即可恢复正常。
:::

## 指令：contextify

contextify 指令可以让你临时切换上下文调用指令。例如这样（假设你在私聊上下文）：

```sh
teach foo bar                       # 无效，因为 teach 指令只对群上下文生效
contextify -g 456 teach foo bar     # 有效，相当于在群 456 调用 teach foo bar
```

尽管切换了调用上下文，但 contextify 指令的输出仍然产生在原上下文中。这在你想调用群指令的时候是很有用的。

## 指令：exit

exit 指令可以让你退出或重启机器人进程：

```sh
Koishi，关机            # 退出进程，相当于 exit -c 0
Koishi，重启            # 重启进程，相当于 exit -c 1
```

::: tip 提示
Koishi 的命令行工具使用**子进程**来实现对机器人的管理。当子进程退出时，主进程可以通过查看 exit code 来确定退出的原因，并执行相应的操作。
:::
