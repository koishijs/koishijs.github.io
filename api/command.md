---
sidebarDepth: 2
---

# 指令 (Command)

指令系统是 Koishi 的核心功能之一。通过 `ctx.command()` 方法获得的是指令的实例，它含有下面的方法：

## cmd.option(name, desc?, config?)

为指令添加一个选项。

- **name:** `string` 选项的名字
- **desc:** `string` 选项的描述
- **config:** `OptionConfig`
  - **config.fallback:** `any` 选项的[默认值](../guide/command/basic.md#选项的默认值)
  - **config.value:** `any` 选项的[重载值](../guide/command/basic.md#选项的重载)
  - **config.type:** `DomainType` 选项的[类型定义](../guide/command/basic.md#选项的临时类型)
  - **config.hidden:** `boolean` 是否[隐藏选项](../guide/command/basic.md#隐藏指令和选项)
  - **config.notUsage:** `boolean` 是否[计入调用]()
  - **config.authority:** `number` 选项的[权限等级]()
- 返回值: `this`

```js
type DomainType = string | RegExp | ((source: string) => any)
```

## cmd.removeOption(name)

删除一个选项。注意：如果你为一个选项注册了多个别名，则删除任何一个别名都相当于删除整个选项。

- **name**: `string` 指令的名称
- 返回值: `this`

## cmd.usage(text)

为指令添加使用方法。多次调用此方法只会保留最后一次的定义。

- **text:** `string` 使用方法说明
- 返回值: `this`

## cmd.example(example)

为指令添加使用示例。多次调用此方法会一并保留并显示在帮助的最后面。

- **example:** `text` 使用示例
- 返回值: `this`

## cmd.action(action)

为指令添加执行函数。

- **action:** `CommandAction` 执行函数
- 返回值: `this`

```js
type Awaitable<T> = T extends Promise<unknown> ? T : T | Promise<T>
type CommandAction = (argv: Argv, ...args: any[]) => Awaitable<string | void>
```

## cmd.userFields(fields)

如果指令需要用到用户数据，你可以提前声明，这样有助于合并多次请求，从而提高性能。

- **fields:** `FieldCollector<UserField>` 要请求的用户字段
- 返回值: `this`

```js
type FieldCollector<K extends string> =
  | Iterable<K>
  | ((argv: Argv, fields: Set<K>) => void)
```

## cmd.channelFields(fields)

如果指令需要用到频道数据，你可以提前声明，这样有助于合并多次请求，从而提高性能。

- **fields:** `FieldCollector<ChannelField>` 要请求的频道字段
- 返回值: `this`

## cmd.alias(...names)

设置指令别名。

- **names:** `string[]` 要设置的别名
- 返回值: `this`

## cmd.shortcut(name, config?)

设置快捷方式。

- **name:** `string | RegExp` 快捷方式名
- **config:** `ShortcutConfig`
  - **config.prefix:** `boolean` 调用时要求保留前缀
  - **config.fuzzy:** `boolean` 允许在快捷方式后带参数
  - **config.greedy:** `boolean` 将所有后面的内容解析成一个参数
  - **config.args:** `any[]` 要带的参数列表，将与传入的参数合并
  - **config.options:** `Record<string, any>` 要带的选项列表，将与传入的选项合并
- 返回值: `this`

## cmd.subcommand(name, desc?, config?)

注册或修改子指令。子指令会继承当期指令的上下文。

- **name:** `string` 指令名以及可能的参数
- **desc:** `string` 指令的描述
- **config:** [`CommandConfig`](./context.md#ctx-command) 指令的配置
- 返回值：`Command` 注册或修改的指令

## cmd.parse(input)

解析一段指令调用文本。

- **input:** `Argv` 令牌化的输入，通常是 `Argv.parse()` 的返回值
- 返回值: `Argv` 解析结果，包含了 `args` 和 `options` 等属性

## cmd.execute(argv, next?)

执行当前指令。

- **argv:** `Argv` 执行配置
  - **argv.args:** `any[]` 指令的参数列表
  - **argv.options:** `Record<string, any>` 指令的选项
  - **argv.session:** [`Session`](./session.md) 当前的会话对象
- **next:** [`NextFunction`](../guide/message.md#中间件) 所处的中间件的 `next` 回调函数
- 返回值: `Promise<string>` 执行函数的返回结果，可用于指令插值

## cmd.dispose()

移除当前指令及其所有子指令。

- 返回值: `void`

## 静态属性和方法

这里包含了与 Command 类相关的静态属性和方法。

### Command.defaultConfig

默认的指令配置。

### Command.defaultOptionConfig

默认的选项配置。

### Command.userFields(fields)

如果所有指令都需要用到用户数据，你可以提前声明，这样有助于合并多次请求，从而提高性能。

- **fields:** `FieldCollector<UserField>` 要请求的用户字段

### Command.channelFields(fields)

如果所有指令都需要用到频道数据，你可以提前声明，这样有助于合并多次请求，从而提高性能。

- **fields:** `FieldCollector<ChannelField>` 要请求的频道字段
