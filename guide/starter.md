---
sidebarDepth: 2
---

# 快速上手

::: danger 注意
这里是**正在施工**的 koishi v3 的文档。要查看 v1 版本的文档，请前往[**这里**](/v1/)。
:::

## 准备工作

Koishi 需要 [NodeJS](https://nodejs.org/) (v12 以上) 运行环境，你需要自己安装它。同时，我们还强烈建议您安装 [yarn](https://classic.yarnpkg.com/lang/en/) 作为包管理器。在下面的文档中，我们将默认使用 yarn。

Koishi 支持多个聊天平台，对于不同的平台，你也需要做好相应的准备工作。

### OneBot (QQ)

[OneBot](https://github.com/howmanybots/onebot) 是一套可用于 QQ 聊天机器人的协议，你可以使用下列实现该协议的框架：

- [Mrs4s/go-cqhttp](https://github.com/Mrs4s/go-cqhttp)（荐）
- [yyuueexxiinngg/cqhttp-mirai](https://github.com/yyuueexxiinngg/cqhttp-mirai)
- [richardchien/coolq-http-api](https://github.com/richardchien/coolq-http-api)（配合 [iTXTech/mirai-native](https://github.com/iTXTech/mirai-native) 使用）

请注意：尽管 Koishi 使用的协议是 [MIT](https://choosealicense.com/licenses/mit/) 协议，但上面陈述的三种途径的相关框架都使用了基于 [AGPL 3.0](https://choosealicense.com/licenses/agpl-3.0/) 的协议。**因此如果你使用 koishi-adapter-onebot 运行你的机器人，你将可能受到 AGPL 3.0 协议的限制，必须将你的代码开源并保持同协议**。Koishi 及其作者对使用上述框架或违反上述限制的行为所可能造成的一切后果概不负责。

### Kaiheila (开黑啦)

TODO

## 使用命令行工具

创建并进入一个机器人目录：

```cli
cd my-bot
```

然后输入下面的命令行：

<panel-view class="code" type="package-manager">

```npm
# 初始化项目
npm init

# 安装 koishi
npm i koishi -D

# 生成配置文件，注意这里是 npx 而不是 npm
npx koishi init

# 补全依赖
npm i
```

```yarn
# 初始化项目
yarn init

# 安装 koishi
yarn add koishi -D

# 生成配置文件
yarn koishi init

# 补全依赖
yarn
```

</panel-view>

此时，你会看到在你刚刚创建的目录下多了一些文件，包括 `package.json` 和 `koishi.config.js`。后者应该大概长这样：

```js koishi.config.js
module.exports = {
  // 协议类型
  type: 'onebot:http',
  // 机器人自己的账号
  selfId: 123456789,
  // 插件列表
  plugins: {
    common: {},
  },
}
```

最后运行程序：

<panel-view class="code" type="package-manager">

```npm
npx koishi start
```

```yarn
yarn koishi start
```

</panel-view>

现在可以对你的机器人说话了：

<panel-view title="聊天记录">
<chat-message nickname="Alice" color="#cc0066">echo 你好</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png">你好</chat-message>
</panel-view>

## 通过脚本调用 Koishi

如果你对 JavaScript 和 Node.js 非常熟悉，你或许也希望在 Node.js 中直接调用 Koishi——没问题，我们也提供了这样一套方案。

首先初始化你的机器人目录并安装 Koishi 和所需的插件（这里以 koishi-adapter-onebot 和 koishi-plugin-common 为例）：

<panel-view class="code" type="package-manager">

```npm
# 初始化项目
npm init

# 安装 koishi 和相关库
npm i koishi koishi-adapter-onebot koishi-plugin-common -D
```

```yarn
# 初始化项目
yarn init

# 安装 koishi 和相关库
yarn add koishi koishi-adapter-onebot koishi-plugin-common -D
```

</panel-view>

新建 `index.js`，并写下这段代码：

```js index.js
const { App } = require('koishi')

// 你需要手动安装适配器
require('koishi-adapter-onebot')

const app = new App({
  // 这部分与上面的配置文件作用基本相同
  type: 'onebot:http',
  selfId: 123456789,
})

// 注册插件，作用相当于上面配置文件中的 plugins 部分
app.plugin(require('koishi-plugin-common'))

// 启动应用
app.start()
```

最后运行这个文件：

```cli
node .
```

这样也能运行你的机器人。尽管这显得稍微麻烦一点，但是你的机器人也因此获得了更高的自由度。在下一章我们会简单对比这两种方法。

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
