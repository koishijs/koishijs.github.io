---
sidebarDepth: 2
---

# 指令 (Command)

指令系统是 Koishi 的核心功能之一。通过 `ctx.command()` 方法获得的是指令的实例，它含有下面的方法：

## cmd.option(name, description?, config?)

为指令添加一个选项。

- **name:** `string` 选项的名字
- **description:** `string` 选项的描述
- **config:** [`OptionConfig`](../guide/command.md#optionconfig-对象)
- 返回值: `this`

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

- **action:** `(config: ParsedArgv, ...args: string[]) => any` 执行函数。这个函数的第一个参数是 [`ParsedArgv`](../guide/command.md#parsedargv-对象) 对象，之后的每个参数都是字符串，表示从指令调用中解析出来的参数
- 返回值: `this`

## cmd.userFields(fields)

如果指令需要用到用户数据，你可以提前声明，这样有助于合并多次请求，从而提高性能。

- **fields:** `Iterator<User.Field>` 要请求的用户字段
- 返回值: `this`

## cmd.groupFields(fields)

如果指令需要用到群数据，你可以提前声明，这样有助于合并多次请求，从而提高性能。

- **fields:** `Iterator<Group.Field>` 要请求的群字段
- 返回值: `this`

## cmd.alias(...names)

设置指令别名。

- **names:** `string[]` 要设置的别名
- 返回值: `this`

## cmd.shortcut(name, config?)

设置快捷方式。

- **name:** `string` 快捷方式名
- **config:** [`ShortcutConfig`](../guide/command.md#shortcutconfig-对象)
- 返回值: `this`

## cmd.subcommand(name, description?, config?)

注册或修改子指令。子指令会继承当期指令的上下文。

- **rawName:** `string` 指令名以及可能的参数
- **description:** `string` 指令的描述
- **config:** [`CommandConfig`](./command.md#commandconfig) 指令的配置
- 返回值：[`Command`](./command.md) 注册或修改的指令

## cmd.parse(message)

解析一段指令调用文本。

- **message:** `string` 要解析的文本（开头不要包含指令名和前缀）
- 返回值: `ParseResult` 解析结果。包含 [`ParsedArgv` 对象](../guide/command.md#parsedargv-对象) 的 `args` 和 `options` 四个属性

## cmd.execute(config, next?)

执行本指令。

- **config:** [`ParsedArgv`](../guide/command.md#parsedargv-对象) 执行配置
- **next:** [`NextFunction`](../guide/message.md#中间件) 所处的中间件的 `next` 回调函数
- 返回值: `any` 执行函数的返回结果

## 静态方法

这里包含了 Command 类的静态属性和方法。

### Command.defaultConfig

默认的配置选项。

### Command.defaultOptionConfig

默认的配置选项。

### Command.userFields(fields)

如果所有指令都需要用到用户数据，你可以提前声明，这样有助于合并多次请求，从而提高性能。

- **fields:** `Iterator<User.Field>` 要请求的用户字段

### Command.groupFields(fields)

如果所有指令都需要用到群数据，你可以提前声明，这样有助于合并多次请求，从而提高性能。

- **fields:** `Iterator<Group.Field>` 要请求的群字段

### Command.collect(argv, key, fields)

按照 argv 中的 command 属性向 fields 添加所需的用户字段。它是一个内置的 before-user 监听器。

- **argv:** [`ParsedArgv`](../guide/command.md#parsedargv-对象) 只需确保其中存在 command 属性即可
- **key:** `T extends 'user' | 'group'` 用户字段集合
- **fields:** `Set<keyof Tables[T]>` 用户字段集合
- 返回值: `void`
