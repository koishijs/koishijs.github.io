---
title: 数据库：sqlite
sidebarDepth: 2
---

# koishi-database-sqlite <Badge text="beta" type="warn"/>

::: tip 注意
本页显示的版本号都表示对应的 koishi-database-sqlite 版本号（而不是对应的 koishi 版本号）。
:::

## db.sqlite.joinKeys(keys?)

连接字段成字符串。

- **keys:** `string[]` 要连接的字段
- 返回值: `string` 连接后的结果

## db.sqlite.get(sql, values?)

发送 SQL 请求获取第一个结果。

- **sql:** `string` SQL 字符串
- **value:** `any` 要插入的值
- 返回值: `Promise<any>` 请求结果

## db.sqlite.all(sql, values?)

发送 SQL 请求获取全部结果。

- **sql:** `string` SQL 字符串
- **value:** `any` 要插入的值
- 返回值: `Promise<any[]>` 请求结果

## db.sqlite.select(table, fields?, conditional?, values?)

搜索表中的数据。

- **table:** `string` 表名
- **fields:** `string[]` 字段列表
- **conditional:** `string` SQL 条件语句
- **values:** `any` 要插入的值
- 返回值: `Promise<any>`

## db.sqlite.update(table, id, data)

更新表中的某行。

- **table:** `string` 表名
- **id:** `number` 行号
- **data:** `any` 要更新的数据
- 返回值: `Promise<any>`

## db.sqlite.count(table)

计算表中的行数。

- **table:** `string` 表名
- 返回值: `Promise<number>` 表中的行数
