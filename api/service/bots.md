---
sidebarDepth: 2
---

# 机器人管理 (Bots)

::: warning
本节中介绍的 API 均为实验性功能，可能在后续版本中发生变化。
:::

`ctx.bots` 保存了当前全部 [Bot](../core/bot.md) 实例。它继承了 Array 类，因此你可以使用诸如 `ctx.bots.forEach()` 的写法。除此以外，我们还提供了一些与机器人相关的实用方法。

## 实例方法

### ctx.bots.get(sid)

- **sid:** `string` 机器人的 sid
- 返回值: `Bot` 机器人实例

使用 sid 获取机器人实例。

### ctx.bots.remove(id)

- **sid:** `string` 机器人的 id
- 返回值: `boolean` 机器人实例是否存在

移除一个机器人实例。

### ctx.bots.create(platform, options, constructor?)

- **platform:** `string` 适配器名
- **options:** `object` 配置项
- **constructor:** `Function` 构造函数

新增一个机器人实例。
