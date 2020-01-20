---
sidebarDepth: 2
---

# 用户信息管理

## 查看用户信息

info 指令可以用于查看用户的信息：

```sh
info                    # 查看自己的用户信息
info qq                 # 查看其他用户的信息
```

你将得到这样的结果：

```
xxx，您的权限为 3 级。
123456789 的权限为 2 级。
```

与许多指令不同的是，info 指令查看个人信息所需的最低权限等级为 0 级，而查看他人信息默认需要 3 级权限。

### 扩展要显示的信息

我们也可以为这个指令添加其他输出结果。假设现在我们向用户数据添加了 money 字段表示用户余额，那么我们可以这样写：

```js
const { commonPlugin } = require('koishi')

// registerUserInfo 传入两个参数
// 第一个参数是回调函数，传入用户数据，返回输出结果
// 第二个参数是需要用到的字段列表（可选）
commonPlugin.registerUserInfo(user => `余额：${user.money}￥`, ['money'])
```

再次运行程序，你会发现输出变成了：

```
xxx，您的权限为 3 级。
余额：100￥
```

### 显式获取用户名 <Badge text="1.5.0+"/>

默认情况下，info 指令会依次尝试使用 `meta.sender.card`, `meta.sender.nickname` 作为你的称呼。换言之，你在不同的上下文中可能得到不同的称呼，同时查看他人信息时将只能使用 QQ 号来称呼。如果想要显示设置获取用户名的方法，你可以使用 `getUserName` 配置项：

```js koishi.config.js
module.exports = {
  plugins: [['common', {
    getUserName (user, meta) {
      // 这里展示的正是默认的行为
      // 这个函数返回的值将作为该用户的称呼
      // 如果没有任何输出则会使用 QQ 号
      if (meta.userId === user.id && meta.sender) {
        return meta.sender.card || meta.sender.nickname
      }
    },
  }]],
}
```

## 修改用户数据

admin 指令可以直接修改数据库中的数据：

```sh
admin show-usage teach          # 输出你今天 teach 指令的调用次数
admin -u 123 set-auth 2         # 将用户 123 的权限更改为 2 级
admin -g                        # 输出可用于群的操作列表
admin -g 456 set-flag no-emit   # 设置群 456 不主动发送任何信息
```

一般的调用格式为 `admin [target] [action <...args>]`，其中：

- `target` 用于指定针对目标，`-u <id>` 表示要修改的是用户，`-g <id>` 表示要修改的是群，`-G` 表示要修改的是本群，缺省表示要修改的是自己
- `action` 用于指定要做的操作，对用户和群是不同的；缺省则会输出可用的操作列表
- `args` 是执行操作所需的参数，由 `action` 决定

调用 admin 指令所需的最低权限为 4 级，同时如果目标为用户，则目标用户的等级必须低于调用者。

### 修改用户和群数据

下面展示了所有内置的用于修改用户数据的操作：

#### set-auth

- 语法：`admin -u <id> set-auth <auth>`
- 功能：修改用户权限，其中 auth 必须小于调用者自身的权限等级

#### set-flag

- 语法：`admin -u <id> set-flag <...flags>`
- 功能：设置用户的状态标签，所有写在 flags 中的状态标签会被设置为真；如果缺省则会显示可用的状态标签列表

#### unset-flag

- 语法：`admin -u <id> unset-flag <...flags>`
- 功能：取消用户的状态标签，所有写在 flags 中的状态标签会被设置为假；如果缺省则会显示可用的状态标签列表

#### show-usage

- 语法：`admin -u <id> show-usage <...commands>`
- 功能：查看用户的 commands 指令调用情况；缺省则会显示全部以使用指令的调用情况

::: tip 提示
如果指令本身不带有 `maxUsage`, `minInterval` 等配置，则不会对调用次数计数，因此也无法查看这类指令的调用情况。
:::

#### clear-usage

- 语法：`admin -u <id> clear-usage <...commands>`
- 功能：清空用户的 commands 指令调用次数；缺省则会清空全部指令的调用次数

### 修改群数据

下面展示了所有内置的用于修改群数据的操作：

#### set-flag

- 语法：`admin -g <id> set-flag <...flags>`
- 功能：设置群的状态标签，所有写在 flags 中的状态标签会被设置为真；如果缺省则会显示可用的状态标签列表

#### unset-flag

- 语法：`admin -g <id> unset-flag <...flags>`
- 功能：取消群的状态标签，所有写在 flags 中的状态标签会被设置为假；如果缺省则会显示可用的状态标签列表

### 添加可用操作

我们也可以为这个指令添加可用的操作。还是以上面的 money 为例，我们可以添加一个 set-money 操作，就像这样：

```js
const { commonPlugin } = require('koishi')

commonPlugin.registerUserAction('set-money', (meta, user, value) => {
  user.money = +value   // 注意这里的 value 原来是字符串
  user._update()        // 如果目标不是自己，则数据不会自动更新，因此这里手动更新了数据
  return meta.$send('余额已更新！')
}, ['money'])
```

## 初始化权限等级

尽管机器人的管理者可以利用 admin 指令方便地在运行时控制他人的权限等级和其他数据，但是当机器人刚刚加群的时候想要批量给群友权限仍然是一件麻烦的事情。因此，koishi-plugin-common 提供了另一项技术用于在机器人初始化时批量初始化权限等级。

```js koishi.config.js
module.exports = {
  plugins: [['common', {
    authorizeUser: {
      // 设置玩家最低权限
      123456789: 3,
    },
    authorizeGroup: {
      // 设置全群玩家最低权限为 2 级
      111222333: 2,
      // 分别设置每类成员的最低权限
      777888999: { member: 1, admin: 2, owner: 3 },
    },
  }]],
}
```

启动你的机器人，插件会在启动后一段时间内完成对上述成员的权限等级初始化。

::: tip 提示
这个插件的功能是设置最低权限等级，因此如果出现账号已经存在，或者多项配置冲突的情况（例如加了多个群），插件会自动选择**最高的权限值**进行设置。
:::

::: warning 注意
由于 CoolQ 的机制问题，机器人刚加某个群时可能无法获取成员列表，从而导致插件无法运行。遇到这种情况一般等待 1-2 天即可恢复正常。
:::
