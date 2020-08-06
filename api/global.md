---
sidebarDepth: 2
---

# 全局 API

::: danger 注意
这里是**正在施工**的 koishi v2 的文档。要查看 v1 版本的文档，请前往[**这里**](https://koishijs.github.io/v1/)。
:::

本章节收录了由包 koishi-core 导出的主要 API。

## Command 静态方法

这里包含了 [Command](./command.md) 类的静态方法。

### Command.attachUserFields(fields, argv)

按照 argv 中的 command 属性向 fields 添加所需的用户字段。它是一个内置的 before-user 监听器。

- **fields:** `Set<UserField>` 用户字段集合
- **argv:** [`ParsedCommandLine`](../guide/command-system.md#parsedcommandline-对象) 只需确保其中存在 command 属性即可
- 返回值: `void`

### Command.attachGroupFields(fields, argv)

按照 argv 中的 command 属性向 fields 添加所需的群字段。它是一个内置的 before-group 监听器。

- **fields:** `Set<GroupField>` 群字段集合
- **argv:** [`ParsedCommandLine`](../guide/command-system.md#parsedcommandline-对象) 只需确保其中存在 command 属性即可
- 返回值: `void`

## 运行时工具

这里包含了一些运行时的工具。

### getTargetId(target)

获得目标用户 QQ 号。传入一个字符串，可能是 QQ 号本身或是 @ 群内成员。

- **target:** `string` 要解析的字符串
- 返回值: `number` 目标 QQ 号

### getUsage(name, user) <Badge text="beta" type="warn"/> <Badge text="1.6.0+" type="warn"/>

获得用户的使用数据（如果不存在则会创建）。

- **name:** `string` 标识符（如果是指令的话就是指令名）
- **user:** `UserData` 用户数据
- 返回值: `Usage`

```ts
export interface Usage {
  // 最后一次调用的时间戳
  last?: number
  // 当日已经调用的次数
  count?: number
}
```

### updateUsage(name, user, maxUsage?, minInterval?) <Badge text="beta" type="warn"/> <Badge text="1.6.0+" type="warn"/>

更新用户的使用数据（如果不存在则会创建）。

- **name:** `string` 标识符（如果是指令的话就是指令名）
- **user:** `UserData` 用户数据
- **maxUsage:** `number` 每天最大调用次数，默认为 `Infinity`
- **minInterval:** `number` 调用最小时间间隔，默认为 `0`
- 返回值: `string` 如果无法调用则返回错误信息，如果可以调用则没有返回值
