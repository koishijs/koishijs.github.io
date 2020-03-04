---
sidebarDepth: 2
---

# 快速上手

## 起步

Koishi 基于 NodeJS，CoolQ 和 CQHTTP，因此你需要先安装它们。

- NodeJS：[https://nodejs.org](https://nodejs.org/)
- CoolQ：[https://cqp.cc](https://cqp.cc)
- CQHTTP：[https://cqhttp.cc](https://cqhttp.cc)

进行相应的配置并运行 CoolQ 和 CQHTTP 后，你就可以愉快地使用 Koishi 了。

::: tip 提示
Koishi 要求您的 Node.js 的版本不小于 10，CQHTTP 的版本不小于 3.0。如果使用 WebSocket，Koishi 要求 CQHTTP 版本不小于 4.6。
:::

::: tip 提示
CoolQ Air 和 CoolQ Pro 是两个不同的版本，它们都能配合 Koishi 运行。后者需要收取一定的费用，但同时比前者增加了一些功能（例如可以发图）。因此，如果你发现你的机器人无法发图，请先确保自己使用的是可以发图的版本。详情参见 [CoolQ Air / Pro 功能对比](https://cqp.cc/t/23290)。
:::

## 全局安装

创建并进入一个机器人目录：

<Terminal :content="[
  { content: [{ text: 'cd', class: 'input' }, ' my-bot'] },
]" static></Terminal>

安装 Koishi：

<Terminal :content="[
  { content: [{ text: 'npm', class: 'input' }, ' i koishi -g'] },
  { content: [{ text: '# 或者 yarn global add koishi', class: 'hint' }] },
]" static></Terminal>

利用 `koishi init` 指令迅速创建一个 `koishi.config.js` 文件：

<Terminal :content="[
  { content: [{ text: 'koishi', class: 'input' }, ' init'] },
]" static></Terminal>

```js koishi.config.js
module.exports = {
  type: 'http',
  port: 8080,
  server: 'http://localhost:5700',
  // 其他生成的配置项
}
```

最后运行程序：

<Terminal :content="[
  { content: [{ text: 'koishi', class: 'input' }, ' start'] },
]" static></Terminal>

现在可以对你的机器人说话了：

<panel-view title="聊天记录">
<chat-message nickname="Alice" color="#cc0066">echo 你好</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png">你好</chat-message>
</panel-view>

## 调用 Koishi

如果你对 JavaScript 和 Node.js 非常熟悉，你或许也希望在 Node.js 中直接调用 Koishi——没问题，我们也提供了这样一套方案。

首先初始化你的机器人目录：

<Terminal :content="[
  { content: [{ text: 'npm', class: 'input' }, ' init'] },
  { content: [{ text: '# 或者 yarn init', class: 'hint' }] },
]" static></Terminal>

安装 Koishi：

<Terminal :content="[
  { content: [{ text: 'npm', class: 'input' }, ' i koishi -D'] },
  { content: [{ text: '# 或者 yarn add koishi -D', class: 'hint' }] },
]" static></Terminal>

新建 `index.js`，并写下这段代码：

```js index.js
const { App } = require('koishi')

const app = new App({
  // 这里的配置项与上面的 koishi.config.js 作用相同
  type: 'http',
  port: 8080,
  server: 'http://localhost:5700',
})

app.start()
```

最后运行这个文件：

<Terminal :content="[
  { content: [{ text: 'node', class: 'input' }, ' .'] },
]" static></Terminal>

这样也能运行你的机器人。尽管这显得稍微麻烦一点，并且相比调用 CLI 会缺少一些特性，但是你的机器人也因此获得了更高的自由度。在下一章我们会简单对比这两种方法。

## 添加插件

你可以像这样添加一个插件：

```js koishi.config.js
module.exports = {
  plugins: [
    './foo',
    ['bar'],
    ['baz', {
      // 传给 koishi-plugin-baz 的选项
    }]
  ],
}
```

`plugins` 是一个数组，其中的每一项可以是字符串或数组。如果是字符串，Koishi 会直接解析字符串为插件的路径；如果是数组，Koishi 会将数组的第一项解析为插件的路径，第二项将作为插件的选项。其中 `foo` 会被解析为 `koishi-plugin-foo`，`./foo.js`，`./foo/index.js` 等多个路径，会按照先后顺序进行匹配。因此，如果你想要向你的机器人添加这三种路径的插件，你都只需要写 `foo` 即可。当然，你仍然可以显式地书写 `koishi-plugin-foo`，`./foo.js`，`./foo/index.js` 等路径进行配置。

上面的写法使用 API 可以写成：

```js index.js
app
  .plugin(require('./foo'))
  .plugin(require('koishi-plugin-bar'))
  .plugin(require('koishi-plugin-baz'), options)
```

你可以在 [**插件与上下文**](./plugin-and-context.md) 一章中了解更多有关插件的细节。

## 添加数据库

你可以像这样添加一个数据库：

```js koishi.config.js
module.exports = {
  database: {
    mysql: {
      host: '[your-host]',
      port: 3306,
      user: 'root',
      password: '[your-password]',
      database: '[your-database]',
    },
  },
}
```

对应的 API 写法则是直接在 App 的构造参数中加一个 `database` 字段，与上面没有本质区别。

`database` 是一个键值对，键为数据库的类型，指为数据库的配置信息。Koishi 并不会默认支持一个数据库，但它会对 `database` 的键进行检测，同时加载对应的模块作为数据库支持，模块的解析方式与插件类似。例如，`level` 会被解析为 `koishi-database-level`，`./level.js`，`./level/index.js` 等多个路径，会按照先后顺序进行匹配。

从这种写法中，我们也不难看出 Koishi 是支持多数据库的。这一点将在 [**使用数据库**](./using-database.md) 一章详细阐释。

## 使用多机器人

你可以像这样使用多个机器人：

```js koishi.config.js
module.exports = [{
  // 第一个机器人的配置
}, {
  // 第二个机器人的配置
}]
```

如果这两个机器人的配置有较高的重合度，你也可以先设置一个共享配置，再对每个机器人进行覆盖：

```js koishi.config.js
const shared = {
  // 共享配置
}

module.exports = [{
  ...shared,
  // 第一个机器人的特有配置
}, {
  ...shared,
  // 第二个机器人的特有配置
}]
```

对应的使用 API 的写法则是分别构造两个 App 实例。

有关多机器人的详细使用方法，可以参见 [**多机器人开发**](./multiple-bots.md) 一章。
