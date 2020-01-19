---
sidebarDepth: 2
---

# 数据库 (Database)

一个数据库对象代理了 Koishi 上下文绑定的应用实例有关的所有数据库访问。同时它具有注入特性，任何插件都可以自己定义数据库上的方法。本章主要介绍数据库的官方接口。注意：**它们并不由 Koishi 自身实现，而是由每个数据库分别实现的**。Koishi 只是提供了一套标准。

## db.getUser(userId, defaultAuthority?, fields?)

向数据库请求用户数据。其中的后两个参数可以写任意一个，都可以识别。如果对应的用户不存在，且默认权限非负，则立即生成一个用户对象返回；如果默认权限为正数，则将生成的用户对象写入数据库。

- **userId:** `number` 用户 ID
- **defaultAuthority:** `number` 默认权限，默认值为 `0`
- **fields:** `UserField[]` 请求的字段，默认为全部字段
- 返回值: `Promise<Partial<UserData>>` 用户数据

::: tip 提示
尽管这里我们提供了 `fields` 参数用于对特定的数据库进行优化，但是如果你是数据库开发者，也完全可以忽略这个参数。只需要保证返回的数据满足用户数据格式，且包含在 `fields` 中的字段都存在即可。
:::

## db.observeUser(userId, defaultAuthority?, fields?)

上一个方法的监视器版本。

- **userId:** `number` 用户 ID
- **defaultAuthority:** `number` 默认权限，默认值为 `0`
- **fields:** `UserField[]` 请求的字段，默认为全部字段
- 返回值: `Promise<Partial<User>>` 用户数据

## db.getUsers(ids?, fields?)

向数据库请求多位用户数据。如果数据不存在，则不会在返回的列表中。

- **ids:** `number[]` 用户 ID 列表，默认为全部用户
- **fields:** `UserField[]` 请求的字段，默认为全部字段
- 返回值: `Promise<Partial<UserData>[]>` 用户数据列表

::: tip 提示
这里的两个参数可以写任意一个，都可以识别。虽然这两个参数都是数组类型，但是可以利用 `ids` 中的元素一定是数字而 `fields` 中的元素一定是字符串进行判断。
:::

## db.setUser(id, data)

向数据库写入用户数据。

- **id:** `number` 用户 ID
- **data:** `Partial<UserData>` 要修改的数据
- 返回值: `Promise<any>`

## db.getUserCount()

向数据库请求用户总数。

- 返回值: `Promise<number>`


## db.getGroup(groupId, assignee?, fields?)

向数据库请求群数据。其中的后两个参数可以写任意一个，都可以识别。如果对应的群不存在，则立即生成一个群对象返回；且如果默认代理者为正数，则将生成的群对象写回数据库。

- **groupId:** `number` 群 ID
- **assignee:** `number` 默认代理者，默认为 `0`
- **fields:** `GroupField[]` 请求的字段，默认为全部字段
- 返回值: `Promise<Partial<GroupData>>` 群数据

## db.observeGroup(groupId, assignee?, fields?)

上一个方法的监视器版本。

- **groupId:** `number` 群 ID
- **assignee:** `number` 默认代理者，默认为 `0`
- **fields:** `GroupField[]` 请求的字段，默认为全部字段
- 返回值: `Promise<Partial<Group>>` 群数据

## db.getAllGroups(fields?, assignees?)

向数据库请求被特定机器人管理的所有群数据。这里的两个参数可以写任意一个，都可以识别。

- **fields:** `GroupField[]` 请求的字段，默认为全部字段
- **assignees:** `number[]` 机器人 ID 列表，默认为当前进程全部机器人
- 返回值: `Promise<Partial<GroupData>[]>` 群数据列表

::: warning 注意
请注意这个方法和上面的 `db.getUsers` 方法的区别。除了名字不同以外，这个方法的 `fields` 是第一个参数，且 `assignees` 代表的是机器人 ID 列表；而上面的 `db.getUsers()` 方法的第一个参数是 `ids`，且代表的是用户 ID 列表。
:::

## db.setGroup(id, data)

向数据库写入群数据。

- **id:** `number` 群 ID
- **data:** `Partial<GroupData>` 要修改的数据
- 返回值: `Promise<any>`

## db.getGroupCount()

向数据库请求群总数。

- 返回值: `Promise<number>`
