---
sidebarDepth: 2
---

# 插件与上下文

在 [编写配置文件](./config-file.md) 一章中，我们已经了解了一部分有关插件的知识。而本章将会深入 Koishi 的插件系统，介绍插件的内部机制和运作方式。

## 使用插件 (plugin)

首先让我们回顾一下你已经了解到的插件使用方法：

```js
module.exports = {
  plugins: [
    // 安装插件 foo
    ['foo', options],
  ],
}
```

实际上，Koishi 的命令行工具会将这段代码转化成下面的代码：

```js
app.plugin(require('koishi-plugin-foo'), options)
```

因此，反过来，你也可以通过显式地调用 `app.plugin` 函数来安装一个插件。而对于另一种插件的写法：

```js
module.exports = {
  plugins: {
    // 在群 123456789 中安装插件 bar
    'group+123456789': [
      ['bar', options],
    ],
  },
}
```

Koishi 的命令行工具会将这段代码转化成下面的代码：

```js
const ctx = app.group(123456789)
ctx.plugin(require('koishi-plugin-bar'), options)
```

这又是如何实现的呢？这就牵扯到另一个重要概念，也就是上下文。

## 上下文 (context)

一个**上下文**描述了机器人的一种可能的运行环境。例如，如果一个接收器或中间件被绑定在了上面例子中的上下文，那么只有该环境下的事件才会触发对应的回调函数。之前介绍过的 `receiver`, `sender`, `middleware` 以及 `plugin` 这些 API 本质上都是上下文所提供的方法，而我们能在 `app` 上调用这些方法只是因为 `App` 对象本身也是一个上下文而已。

除去 `App` 本身外，我们还可以通过 `App` 原型链上的方法创建新的上下文：

```js
app.users // 由全部好友构成的上下文
app.groups // 由全部群构成的上下文
app.discusses // 由全部讨论组构成的上下文

app.user(123456789) // 由好友 123456789 构成的上下文
app.group(123456789) // 由群 123456789 构成的上下文
app.discuss(123456789) // 由讨论组 123456789 构成的上下文

app.users.except(123456789) // 由除了 123456789 以外的所有好友构成的上下文
app.groups.except(123456789) // 由除了 123456789 以外的所有群构成的上下文
app.discusss.except(123456789) // 由除了 123456789 以外的所有讨论组构成的上下文
```

利用上下文，你可以非常方便地对每个环境进行分别配置：

```js
// 在所有环境注册中间件
app.middleware(callback)

// 当有人申请加群 123456789 时触发 listener
app.group(123456789).receiver.on('request/add', listener)

// 安装插件对除了 987654321 以外的所有讨论组生效
app.discusses.except(987654321).plugin(require('koishi-plugin-tools'))
```

是不是非常方便呢？

### 上下文组合

有的时候，我们也需要将一些上下文组合在一起使用，例如描述两个上下文的并集。为此，Koishi 也提供了相应的方法：

```js
// 返回两个上下文的并集
context1.plus(context2)

// 返回两个上下文的交集
context1.intersect(context2)

// 返回两个上下文的差集
context1.minus(context2)

// 返回一个上下文的补集
context.inverse()

// 判断上下文能否匹配元信息对象
context.match(meta)

// 判断当前上下文是否完全包含了另一个上下文
context1.contain(context2)
```

这些方法会返回一个新的上下文，在其上使用监听器、中间件、指令或是插件就好像同时在多个上下文中使用一样。

你也可以在配置文件中使用上下文组合，不过这就牵扯到一种字符串语法。用分号分隔不同类型的上下文，每个类型后面可以通过“+”或者“-”表示包含和排除，再之后是用逗号隔开的 ID 列表。就像这样：

```js
module.exports = {
  plugins: {
    // 在群 123, 456 上下文，除 789 以外的用户上下文和全部讨论组上下文中安装插件
    'group+123,456;user-789;discuss': [
      ['bar', options],
    ],
  },
}
```

这相当于

```js
app
  .group(123, 456)
  .plus(app.users.except(789))
  .plus(app.discusses)
  .plugin('koishi-plugin-bar', options)
```

### 实现原理

看到这里，你可能会有些好奇：当你创建了一个上下文时，发生了什么？Koishi 是如何实现让某些功能只对特定上下文生效的？本节就来简单解释一下这两个问题。

首先，对于每个接收到的元信息对象，系统都会生成一个特殊的属性 `meta.$path`。这个属性是一个字符串，标识着信息的类型和来源。例如，一个在群 123456789 上触发的取消管理员事件将被标注为 `/group/123456789/group_admin/unset`。

同时，你每创建一个上下文，系统也会生成一个私有属性 `ctx._scope`，同样标识着该上下文能够控制的范围。当接收到信息时，只需将 `meta.$path` 与 `ctx._scope` 进行比对，即可判断出该信息是否应该发送给 `ctx.receiver` 了。这就成功解决了接收器的问题。

而对于中间件和指令，Koishi 则采用了另一种做法。与接收器不同的是，中间件和指令在 Koishi 中是被统一管理的。因此，每注册一个中间件和指令，系统都会记录相应中间件或指令被注册时所在的上下文。而在需要触发回调函数前，系统也会检查上下文是否满足触发要求。

最后，由于插件内部的逻辑无非是接收器、中间件和指令的调用，因此只要后者都能实现上下文绑定，那么插件的上下文绑定也就顺理成章地完成了。

## 开发插件

一个**插件**的本质是以下两个之一：

- 一个接受两个参数的函数，第一个参数是所在的上下文，第二个参数是传入的选项
- 一个对象，其中的 `apply` 方法是上面所说的函数

因此，下面的三种写法是等价的：

```js
ctx.middleware(callback)

ctx.plugin(ctx => ctx.middleware(callback))

ctx.plugin({
  apply: ctx => ctx.middleware(callback),
})
```

插件化的写法能够帮助我们将多个逻辑组合在一起并模块化，同时可以在插件内部对所需的选项进行初始化，这些都能极大地提高了代码的可维护性。这是因为每个人都可以直接将代码以插件的形式导出成模块，之后插件名又可以被直接写在 `koishi.config.js` 文件中。

### 具名插件

除此以外，插件如果使用对象式，那么除了 `apply` 以外，你还可以提供一个 `name` 属性。如果提供了这个属性，命令行工具会将这个名字输出到控制台中。例如，下面给出了一个插件的例子，它实现了检测说话带空格的功能：

```js
// detect-space.js
module.exports.name = 'detect-space'

module.exports.apply = (ctx) => {
  ctx.middleware((meta, next) => {
    if (meta.message.match(/^\s*(\S +){2,}\S\s*$/g)) {
      return meta.$send('说话带空格，有罪！')
    } else {
      return next()
    }
  })
}
```

把它放到你的机器人文件夹，接着向你的 `koishi.config.js` 添加一行：

```js
// koishi.config.js
module.exports = {
  plugins: [
    // 这里是其他插件
    ['detect-space'],
  ],
}
```

调用 `koishi run`，你就可以看到这个插件在正常运行了。

## 生命周期

在本章的最后，我们简单介绍一下 Koishi 的生命周期，以便更好的理解插件中能做的事情。

### 创建阶段

当执行 `new App()` 时，App 的实例创建出来，同时如果配置了相应的字段，`Database`, `Sender`, `Server` 的实例也会被创建并绑定到 App 上，但它们都尚未连接到服务器。在此之后，便是上下文的构造和插件的安装，因此插件能接触到的 App 实例是这个阶段的。在这个阶段中，如果传入的某些参数有误，将会直接抛出错误，从而终止程序。

### 连接阶段

当执行 `app.start()` 或者 `startAll()` 时，App 首先会触发 `before-connect` 事件。接着，App 将尝试连接到所有服务器（包括数据库服务器和 CQHTTP 服务器），如果全部连接成功将会触发 `connected` 事件。在这个阶段中，如果出现错误，将会抛出一个异步错误，同时 App 不会运行。

### 运行阶段

当连接成功后，所有 API 都将可以正常调用。在这个阶段中，如果出现错误，将会触发 `error` 事件（部分情况也可能导致 `unhandledRejection`，这取决于插件的写法，例如如果在同步函数内调用异步方法出错就是无法捕捉的）。

### 生命周期图示

下图大体展示了一个 App 实例的生命周期。你不需要立马弄明白所有的东西，不过随着你的不断学习和使用，它的参考价值会越来越高。

![app-lifecycle](/app-lifecycle.svg)
