---
sidebarDepth: 2
---

# 处理请求

## 处理好友申请、加群邀请和申请

当使用了 koishi-plugin-common 并配置了数据库时，默认情况下 Koishi 会通过所有 1 级以上用户的好友申请，忽略所有群申请。你可以手动设置忽略和通过的函数：

```js koishi.config.js
module.exports = {
  plugins: [['common', {
    handleFriend: true, // 通过所有好友申请
    handleGroupAdd: undefined, // 忽略所有加群申请（当然这没必要写出来）
    async handleGroupInvite (meta) {
      // 拒绝所有来自 1 级以下，通过所有来自 3 级或以上权限用户的加群邀请，其他不处理
      const user = await ctx.database.getUser(meta.userId, 0, ['authority'])
      if (user.authority >= 3) {
        return true
      } else if (user.authority <= 1) {
        return false
      }
    },
  }]],
}
```

在上面的例子中，`handleFriend`, `handleGroupAdd` 和 `handleGroupInvite` 分别用于处理好友申请，加群申请和加群邀请。每个选项的值都可以是下面几种类型：

- true: 表示通过申请
- false: 表示拒绝申请
- undefined: 表示不做处理
- 字符串
  - 如果是好友申请，则表示通过，并使用该字符串作为该好友的备注名
  - 如果是群申请或邀请，则表示拒绝，并使用该字符串作为拒绝的理由
- 函数: 将传入两个参数，第一个是请求对应的元信息 Meta 对象，第二个是所在的 App 实例，返回值同样可以是 true, false, undefined, 字符串或对应的 Promise，将按照上面所说的方式来解读

## 欢迎新成员

welcome 选项可以用于欢迎群中的新成员。欢迎信息默认是“欢迎新大佬 @XXX！”。你也可以手动设置欢迎信息的内容：

```js
module.exports = {
  plugins: [['common', {
    // 传入一个 Meta 对象
    // 返回值应该是 string | Promise<string>
    welcomeMessage: ({ userId }) => `欢迎新大佬 [CQ:at,qq=${userId}]！群地位-1`,
  }]],
}
```
