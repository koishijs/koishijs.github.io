---
sidebarDepth: 2
---

# 会话选择器 (Selector)

## 实例属性

### ctx.filter

- 类型: `(session: Session) => boolean`

当前上下文绑定的会话选择器。

## 实例方法

有关这里的 API，请参见 [使用上下文](../../guide/plugin/context.md#会话选择器)。

### ctx.any()

- 返回值: `Context` 新的上下文

选取上下文全集。

::: tip
这个方法与 `ctx.app` 的区别在于，后者不受插件管理器控制，容易产生内存泄漏。因此我们建议，除非你已经为你的插件声明了副作用，你应当尽量使用这个方法。参见 [插件热重载](../../guide/plugin/events.md#插件热重载)。
:::

### ctx.never()

- 返回值: `Context` 新的上下文

选取上下文空集。

### ctx.self(...values)
### ctx.user(...values)
### ctx.guild(...values)
### ctx.channel(...values)
### ctx.platform(...values)

- **values:** `string[]` 允许的机器人 / 用户 / 群组 / 频道 / 平台名称构成的数组
- 返回值: `Context` 新的上下文

选取当前上下文的子集，限定机器人 / 用户 / 群组 / 频道 / 平台名称为所给定的值。

### ctx.union(filter)

- **context:** `Context | ((session: Session) => boolean)` 另一个上下文或者过滤器函数
- 返回值: `Context` 新的上下文

给出当前上下文和其他上下文的并集。

### ctx.intersect(filter)

- **context:** `Context | ((session: Session) => boolean)` 另一个上下文或者过滤器函数
- 返回值: `Context` 新的上下文

给出当前上下文和其他上下文的交集。

### ctx.exclude(filter)

- **context:** `Context | ((session: Session) => boolean)` 另一个上下文或者过滤器函数
- 返回值: `Context` 新的上下文

给出当前上下文和其他上下文的差集。

