---
sidebarDepth: 2
---

# 插件与上下文

在 [编写配置文件](./config-file.md) 一章中，我们已经了解了一部分有关插件的知识。而本章将会深入 Koishi 的插件系统，介绍插件的内部机制和运作方式。

## 使用插件 (plugin)

首先让我们回顾一下你已经了解到的插件使用方法：

```js koishi.config.js
module.exports = {
  plugins: [
    './foo',            // 安装本地插件 foo
    'bar',              // 安装插件 bar
    ['baz', options],   // 安装带配置的插件 baz
  ],
}
```

对应着下面的代码：

```js
app
  .plugin(require('./foo'))
  .plugin(require('koishi-plugin-bar'))
  .plugin(require('koishi-plugin-baz'), options)
```

那么，如果我希望其中的一部分插件只对部分群生效，这又应该如何实现呢？这就牵扯到另一个重要概念，也就是上下文。

## 上下文 (context)

一个**上下文**描述了机器人的一种可能的运行环境。例如，如果一个接收器或中间件被绑定在了上面例子中的上下文，那么只有该环境下的事件才会触发对应的回调函数。之前介绍过的 `receiver`, `sender`, `middleware` 以及 `plugin` 这些 API 本质上都是上下文所提供的方法，而我们能在 `app` 上调用这些方法只是因为 `App` 对象本身也是一个上下文而已。

除去 `App` 本身外，我们还可以通过 `App` 原型链上的方法创建新的上下文：

```js
app.users // 由全部好友构成的上下文
app.groups // 由全部群构成的上下文
app.discusses // 由全部讨论组构成的上下文

app.user(123) // 由好友 123 构成的上下文
app.group(123) // 由群 123 构成的上下文
app.discuss(123) // 由讨论组 123 构成的上下文

app.users.except(123) // 由除了 123 以外的所有好友构成的上下文
app.groups.except(123) // 由除了 123 以外的所有群构成的上下文
app.discusses.except(123) // 由除了 123 以外的所有讨论组构成的上下文
```

利用上下文，你可以非常方便地对每个环境进行分别配置：

```js
// 在所有环境注册中间件
app.middleware(callback)

// 当有人申请加群 123 时触发 listener
app.group(123).receiver.on('request/add', listener)

// 安装插件对除了 987 以外的所有讨论组生效
app.discusses.except(987).plugin(require('koishi-plugin-tools'))
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

### 在配置文件中声明上下文 <Badge text="beta" type="warn"/>

你也可以在配置文件中声明插件所在的上下文，不过这就牵扯到一种字符串语法。用分号分隔不同类型的上下文，每个类型后面可以通过“+”或者“-”表示包含和排除，再之后是用逗号隔开的 ID 列表。就像这样：

```js koishi.config.js
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

```js detect-space.js
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

```js koishi.config.js
module.exports = {
  plugins: [
    // 这里是其他插件
    ['detect-space'],
  ],
}
```

调用 `koishi run`，你就可以看到这个插件在正常运行了。

### 嵌套插件

Koishi 的插件也是可以嵌套的。你可以将你编写的插件解耦成多个独立的子插件，再用一个父插件作为入口，就像这样：

```js koishi-plugin-foo/index.js
// 在 a.js, b.js 中编写两个不同的插件
const pluginA = require('./a')
const pluginB = require('./b')

// 将这两个插件输出
module.exports.pluginA = pluginA
module.exports.pluginB = pluginB

// 在 apply 函数中安装 a, b 两个插件
module.exports.apply = (ctx) => {
  ctx.plugin(pluginA)
  ctx.plugin(pluginB)
}
```

这样别人就可以这样使用你的插件了：

```js
// 如果希望同时使用你的插件的全部功能
ctx.plugin(require('koishi-plugin-foo'))

// 如果只希望启用一部分功能
ctx.plugin(require('koishi-plugin-foo').pluginA)
```

Koishi 的官方插件 koishi-plugin-common 也使用了这种写法。
