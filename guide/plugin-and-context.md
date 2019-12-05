---
sidebarDepth: 2
---

# 插件与上下文

在 [编写配置文件](./config-file.md) 一章中，我们已经了解了一部分有关插件的知识。而本章将会深入 Koishi 的插件系统，介绍插件的内部机制和运作方式。

## 使用插件 API

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
    '/group/123456789/': [
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

## 创建上下文

一个**上下文**描述了机器人的一种可能的运行环境。例如，如果一个接收器或中间件被绑定在了上面例子中的上下文，那么只有该环境下的事件才会触发对应的回调函数。之前介绍过的 `receiver`, `sender`, `middleware`, `premiddleware` 以及 `plugin` 这些 API 本质上都是上下文所提供的方法，而我们能在 `app` 上调用这些方法只是因为 `createApp` 函数的返回值本身也是一个上下文而已。

除去 `App` 本身外，我们还可以通过 `App` 原型链上的方法创建新的上下文：

```js
app.users // 由全部好友构成的上下文
app.groups // 由全部群构成的上下文
app.discusses // 由全部讨论组构成的上下文

app.user(123456789) // 由好友 123456789 构成的上下文
app.group(123456789) // 由群 123456789 构成的上下文
app.discuss(123456789) // 由讨论组 123456789 构成的上下文
```

利用上下文，你可以非常方便地对每个环境进行分别配置：

```js
// 在所有环境注册中间件
app.middleware(callback)

// 安装插件仅对所有讨论组生效
app.discusses.plugin(require('koishi-plugin-teach'))

// 当有人申请加群 123456789 时触发 listener
app.group(123456789).receiver.on('request/add', listener)
```

是不是非常方便呢？

## 上下文路径

看到这里，你可能会有些好奇：当你创建了一个上下文时，发生了什么？Koishi 是如何实现让某些功能只对特定上下文生效的？本节就来简单解释一下这两个问题。

首先，对于每个接收到的元信息对象，系统都会生成一个特殊的属性 `meta.$path`。这个属性是一个字符串，标识着信息的类型和来源。例如，一个在群 123456789 上触发的取消管理员事件将被标注为 `/group/123456789/group_admin/unset`。

同时，你每创建一个上下文，系统也会生成一个属性 `ctx.path`，同样标识着该上下文能够控制的范围。对于 `app` 是 `/`，对于 `app.groups` 是 `/group/`，对于 `app.group(123456789)` 则是 `/group/123456789/`。

因此，当接收到信息时，只需将 `meta.$path` 与 `ctx.path` 进行比对，即可判断出该信息是否应该发送给 `ctx.receiver` 了。这就成功解决了接收器的问题。

而对于中间件和指令，Koishi 则采用了另一种做法。与接收器不同的是，中间件和指令在 Koishi 中是被统一管理的。因此，每注册一个中间件和指令，系统都会记录相应中间件或指令被注册时所在的上下文。而在需要触发回调函数前，系统也会检查上下文是否满足触发要求。

最后，由于插件内部的逻辑无非是接收器、中间件和指令的调用，因此只要后者都能实现上下文绑定，那么插件的上下文绑定也就顺理成章地完成了。

## 开发插件

一个**插件**的本质是以下两个之一：

- 一个接受两个参数的函数，第一个参数是所在的上下文，第二个参数是传入的选项
- 一个对象，其中的 apply 方法是上面所说的函数

因此，下面的三种写法是等价的：

```js
ctx.middleware(callback)

ctx.plugin(ctx => ctx.middleware(callback))

ctx.plugin({
  apply: ctx => ctx.middleware(callback),
})
```

插件化的写法能够帮助我们将多个逻辑组合在一起并模块化，同时可以在插件内部对所需的选项进行初始化，这些都能极大地提高了代码的可维护性。这是因为每个人都可以直接将代码以插件的形式导出成模块，之后插件名又可以被直接写在 `koishi.config.js` 文件中。

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
