---
sidebarDepth: 2
---

# 数据库 (Database)

## 用户字段

| 字段名 | 类型 | 描述 |
|:=:|:=:|:=:|
| id | number | 数据库自动生成的 ID |
| cqhttp | string | QQ 号（由 adapter-cqhttp 提供） |
| tomon | string | Tomon ID（由 adapter-tomon 提供） |
| authority | number | 权限等级 |
| flag | number | 状态标签 |
| usage | `Record<string, number>` | 调用记录 |
| timers | `Record<string, number>` | 计时器 |

## 群字段

| 字段名 | 类型 | 描述 |
|:=:|:=:|:=:|
| id | string | 群标识符 |
| type | string | 适配器名（如 cqhttp） |
| flag | number | 状态标签 |
| assignee | string | 代理者 |

## 频道字段

待定。

## 全局接口

### User.Flag

所有用户状态标签构成的枚举类型。参见 [状态标签](../guide/authorization.md#状态标签)。

### User.fields

所有用户字段构成的列表。

### User.extend(getter)

扩展用户字段。

- **getter:** `(kind: string, id: number, authority: number) => object` 新字段的初始化函数，返回值应该是一个由要扩展的字段和它们的默认值构成的键值对
- 返回值: `void`

### User.create(id, authority)

创建一个新用户数据对象。

- **id:** `number` 用户 ID
- **authority:** `number` 权限等级
- 返回值: `User`

### Group.Flag

所有群状态标签构成的枚举类型。参见 [状态标签](../guide/authorization.md#状态标签)。

### Group.fields

所有群字段构成的列表。

### Group.extend(getter)

扩展群字段。

- **getter:** `(id: number, assignee: number) => object` 新字段的初始化函数，返回值应该是一个由要扩展的字段和它们的默认值构成的键值对
- 返回值: `void`

### Group.create(id, assignee)

创建一个新群数据对象。

- **id:** `number` 用户 ID
- **assignee:** `number` 代理者的 ID
- 返回值: `Group`

### extendDatabase(database, extension)

扩展一个数据库的方法。

- **database:** `string | (new () => Database)` 要扩展的数据库类；如果传入一个字符串，则会将这个模块的默认导出作为目标类
- **extension:** `Partial<Database>` 要添加到原型链的方法

## 数据库对象

一个 Database 对象代理了 Koishi 上下文绑定的应用实例有关的所有数据库访问。同时它具有注入特性，任何插件都可以自己定义数据库上的方法。本章主要介绍数据库的官方接口。注意：**它们并不由 Koishi 自身实现，而是由每个数据库分别实现的**。Koishi 只是提供了一套标准。

### db.getUser(type, id, fields?)

向数据库请求用户数据。如果传入的 id 是一个列表，则返回值也应当是一个列表。

- **type:** `string` 平台名
- **id:** `string | string` 用户标识符
- **fields:** `UserField[]` 请求的字段，默认为全部字段
- 返回值: `Promise<User | User[]>` 用户数据

::: tip 提示
尽管这里我们提供了 `fields` 参数用于对特定的数据库进行优化，但是如果你是数据库开发者，也完全可以忽略这个参数。只需要保证返回的数据满足用户数据格式，且包含在 `fields` 中的字段都存在即可。
:::

### db.getUsers(type, ids?, fields?)

向数据库请求多位用户数据。如果数据不存在，则不会在返回的列表中。

- **type:** `string` 平台名
- **ids:** `string[]` 用户标识符列表，默认为全部用户
- **fields:** `UserField[]` 请求的字段，默认为全部字段
- 返回值: `Promise<User[]>` 用户数据列表

### db.setUser(type, id, data)

向数据库写入用户数据。

- **type:** `string` 平台名
- **id:** `string` 用户标识符
- **data:** `User` 要修改的数据（如果设置为 `null` 则清除该用户数据）
- 返回值: `Promise<void>`

### db.getGroup(type, id, fields?)

向数据库请求群数据。如果传入的 id 是一个列表，则返回值也应当是一个列表。

- **type:** `string` 平台名
- **id:** `string | string[]` 群标识符
- **fields:** `GroupField[]` 请求的字段，默认为全部字段
- 返回值: `Promise<Group | Group[]>` 群数据

### db.getGroupList(fields?, type?, assignees?)

向数据库请求被特定机器人管理的所有群数据。这里的两个参数可以写任意一个，都可以识别。

- **fields:** `GroupField[]` 请求的字段，默认为全部字段
- **type:** `string` 平台名，默认为全平台
- **assignees:** `string[]` 代理者列表，默认为当前运行的全部机器人
- 返回值: `Promise<Group[]>` 群数据列表

### db.setGroup(type, id, data)

向数据库写入群数据。

- **type:** `string` 平台名
- **id:** `number` 群标识符
- **data:** `Group` 要修改的数据
- 返回值: `Promise<void>`
