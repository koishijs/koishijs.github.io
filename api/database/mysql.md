---
title: 数据库：MySQL
sidebarDepth: 2
---

# koishi-database-mysql

::: tip 注意
本页显示的版本号都表示对应的 koishi-database-mysql 版本号（而不是对应的 koishi 版本号）。

所有功能实现均对应于 MySQL v5.7。
:::

## db.mysql.joinKeys(keys?)

连接字段成字符串。

- **keys:** `string[]` 要连接的字段
- 返回值: `string` 连接后的结果

## db.mysql.query(sql, values?)

发送 SQL 请求。

- **sql:** `string` SQL 字符串
- **value:** `any` 要插入的值
- 返回值: `Promise<any>` 请求结果

## db.mysql.select(table, fields?, conditional?, values?)

搜索表中的数据。

- **table:** `string` 表名
- **fields:** `string[]` 字段列表
- **conditional:** `string` SQL 条件语句
- **values:** `any` 要插入的值
- 返回值: `Promise<any>`

## db.mysql.update(table, id, data)

更新表中的某行。

- **table:** `string` 表名
- **id:** `number` 行号
- **data:** `any` 要更新的数据
- 返回值: `Promise<any>`

## db.mysql.count(table)

计算表中的行数。

- **table:** `string` 表名
- 返回值: `Promise<number>` 表中的行数

## 供参考的 MySQL 初始化代码

```sql
CREATE TABLE `user` (
    `id` BIGINT(20) UNSIGNED NOT NULL,
    PRIMARY KEY (`id`) USING BTREE,
    `flag` INT(11) NOT NULL DEFAULT '0',
    `authority` TINYINT(3) UNSIGNED NOT NULL DEFAULT '0',
    `usage` JSON NOT NULL
);

CREATE TABLE `group` (
    `id` BIGINT(20) UNSIGNED NOT NULL,
    PRIMARY KEY (`id`) USING BTREE,
    `flag` TINYINT(4) UNSIGNED NOT NULL DEFAULT '0',
    `assignee` BIGINT(20) UNSIGNED NOT NULL DEFAULT '0'
);
```
