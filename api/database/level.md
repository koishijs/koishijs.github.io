---
title: 数据库：Level
sidebarDepth: 2
---

# koishi-database-level

::: tip 注意
本页显示的版本号都表示对应的 koishi-database-level 版本号（而不是对应的 koishi 版本号）。
:::

## db.level.create(table, data)

使用自增 ID 创建一个新的数据行。

- **table:** `string` 表名
- **data:** `any` 数据行
- 返回值: `Promise<any>` 带 ID 的数据行

## db.level.remove(table, id)

删除一个数据行。

- **table:** `string` 表名
- **id:** `string | number` 索引
- 返回值: `Promise<any>`

## db.level.update(table, id, data)

更新一个数据行。

- **table:** `string` 表名
- **id:** `string | number` 索引
- **data:** `any` 数据行
- 返回值: `Promise<any>`

## db.level.count(table)

获取表中的行数。

- **table:** `string` 表名
- 返回值: `Promise<number>` 行数
