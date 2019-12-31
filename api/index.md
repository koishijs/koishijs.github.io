---
sidebarDepth: 2
---

# 全局 API

本章节收录了由包 koishi-core 导出的主要 API。

## new App(options)

机器人实例的构造函数。

- **options:** `AppOptions` 参见 [配置列表](../guide/config-file.md#配置列表)
- 返回值: [`App`](./app.md)

## appList

当前所有 [App](./app.md) 实例构成的数组。

## appMap

当前所有 [App](./app.md) 实例构成的键值对，键为对应的 QQ 号。

::: tip 提示
由于 Koishi 的 QQ 号是一项可选配置，因此当程序未收到任何事件上报，也未主动调用过 [`getSelfIds()`](#getselfids) 时，这个键值对可能并不会包含所有 App 实例的信息。但一旦通过上述两种方式获得了 QQ 号，相应的 App 实例也会立即绑定到这个对象上。
:::

## startAll()

启动所有机器人。

- 返回值: `Promise<void>`

## onStart(callback)

添加启动钩子。

- **callback:** `() => any` 当全部机器人启动完毕后会调用此函数
- 返回值: `void`

## stopAll()

停止所有机器人。

- 返回值: `Promise<void>`

## onStop(callback)

添加停止钩子。

- **callback:** `() => any` 当全部机器人停止运行后会调用此函数
- 返回值: `void`

## Database Related

这里包含了一些数据库相关的全局方法。

### UserFlag

所有用户状态标签构成的枚举类型。参见 [状态标签](../guide/authorization.md#状态标签)。

### userFields

所有用户字段构成的列表。

### extendUser(getter)

扩展用户字段。

- **getter:** `(id: number, authority: number) => object` 新字段的初始化函数，返回值应该是一个由要扩展的字段和它们的默认值构成的键值对
- 返回值: `void`

### createUser(id, authority)

创建一个新用户数据对象。

- **id:** `number` 用户 ID
- **authority:** `number` 权限等级
- 返回值: `UserData`

### GroupFlag

所有群状态标签构成的枚举类型。参见 [状态标签](../guide/authorization.md#状态标签)。

### groupFields

所有群字段构成的列表。

### extendGroup(getter)

扩展群字段。

- **getter:** `(id: number, assignee: number) => object` 新字段的初始化函数，返回值应该是一个由要扩展的字段和它们的默认值构成的键值对
- 返回值: `void`

### createGroup(id, assignee)

创建一个新群数据对象。

- **id:** `number` 用户 ID
- **assignee:** `number` 代理者的 ID
- 返回值: `GroupData`

### registerDatabase(name, subdatabase)

注册一种新数据库。

- **name:** `string` 数据库名
- **subdatabase:** `new (config) => object` 新的数据库类，参见 [定义新的数据库](../guide/using-database.md#定义新的数据库)
- 返回值: `void`

### injectMethods(name, methods, config?)

向某个数据库注入一批方法。

- **name:** `string` 表名
- **methods:** `Record<string, Function>` 要注入的方法
- **config:** `any` 对应表的配置
- 返回值: `void`

## Runtime Utilities

这里包含了一些运行时的工具。

### getSelfIds()

获取所有机器人的 QQ 号。已经获取到的将不再获取。

- 返回值: `Promise<number[]>` 所有机器人的 QQ 号

### getTargetId(target)

获得目标用户 QQ 号。传入一个字符串，可能是 QQ 号本身或是 @ 群内成员。

- **target:** `string` 要解析的字符串
- 返回值: `number` 目标 QQ 号

### getSenderName(meta) <Badge text="experimental" type="warn"/>

获得发言者称呼。当用户在数据库中已经设置了称呼，则使用设置的称呼；否则依次使用用户在群中的群名片和昵称。

- **meta:** `Meta` 元信息对象
- 返回值: `string` 用户称呼

### showSuggestions(options) <Badge text="experimental" type="warn"/>

尝试显示候选输入。

- **options.target:** `string` 源字符串
- **options.items:** `string` 目标字符串列表
- **options.meta:** [`Meta`](../guide/receive-and-send.md#深入-meta-对象) 元信息对象
- **options.next:** [`NextFunction`](../guide/receive-and-send.md#中间件) 回调函数
- **options.prefix:** `string` 显示在候选输入前的文本
- **options.suffix:** `string` 当只有一个选项时，显示在候选输入后的文本
- **options.coefficient:** `number` 用于模糊匹配的相似系数
- **options.command:** `Command | ((suggestion: string) => Command)` 相关指令
- **options.execute:** `(suggestion: string, meta: MessageMeta, next: NextFunction) => void` 确认后执行的操作
- 返回值: `Promise<void>`
