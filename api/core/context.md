---
sidebarDepth: 2
---

# 上下文 (Context)

**上下文 (Context)** 是 Koishi 的重要概念。你的每一个插件，中间件，监听器和指令都被绑定在上下文上。

## 实例属性

### ctx.command(def, desc?, config?)

- **def:** `string` 指令名以及可能的参数
- **desc:** `string` 指令的描述
- **config:** `CommandConfig` 指令的配置
  - **checkUnknown:** `boolean` 是否对未知选项进行检测，默认为 `false`
  - **checkArgCount:** `boolean` 是否对参数个数进行检测，默认为 `false`
  - **authority:** `number` 最低调用权限，默认为 `1`
  - **showWarning:** `boolean` 当小于最短间隔时是否进行提醒，默认为 `false`
- 返回值：[`Command`](./command.md) 注册或修改的指令

在当前上下文中注册或修改一个指令。

### ctx.getSelfIds(type?, assignees?)

- **type:** `Platform` 平台名称，如果不写就对应全部平台
- **assignees:** `string[]` 机器人 ID 列表，如果不写就对应当前平台的全部机器人
- 返回值: `Record<string, readonly string[]>` 平台名到机器人 ID 列表的键值对

按平台名称对机器人分类。

### ctx.broadcast(channels?, content, forced?)

- **channels:** `string[]` 频道列表
- **content:** `string` 要发送的内容
- **forced:** `boolean` 是否无视 silent 标记
- 返回值: `Promise<string[]>` 成功发送的消息 ID 列表

所有机器人向自己分配的频道广播消息，存在标记 silent 的频道除外。如有失败不会抛出错误。参见 [发送广播消息](../../guide/message.md#发送广播消息)。

### ctx.logger(scope?)

- **scope:** `string` 要指定的类型，默认为 `''`
- 返回值: [`Logger`](../../guide/logger.md#使用-logger)

根据 namespace 生成一个 [Logger 对象](../../guide/logger.md#使用-logger)。

## 静态属性和方法

### Context.static

- 类型: `symbol`

### Context.filter

- 类型: `symbol`

### Context.source

- 类型: `symbol`

### Context.current

- 类型: `symbol`

特殊的键值，可以在通用上下文属性对象的方法上访问。参见 [声明通用上下文属性](../../guide/context.md#声明通用上下文属性)。

### Context.service(name)

- **name:** `string` 属性名称

声明一个通用上下文属性。参见 [声明通用上下文属性](../../guide/context.md#声明通用上下文属性)。
