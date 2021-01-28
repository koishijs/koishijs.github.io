---
sidebarDepth: 2
---

# 快速上手

## 准备工作

Koishi 需要 [NodeJS](https://nodejs.org/) (v12 以上) 运行环境，你需要自己安装它。同时，我们还强烈建议您安装 [yarn](https://classic.yarnpkg.com/lang/en/) 作为包管理器。在下面的文档中，我们将默认使用 yarn。

Koishi 支持多个聊天平台，对于不同的平台，你也需要做好相应的准备工作。

### OneBot (QQ)

[OneBot](https://github.com/howmanybots/onebot) 是一个聊天机器人应用接口标准，目前可用于 QQ 聊天机器人的实现。你可以使用下列实现该协议的框架：

- [Mrs4s/go-cqhttp](https://github.com/Mrs4s/go-cqhttp)（推荐）
- [yyuueexxiinngg/cqhttp-mirai](https://github.com/yyuueexxiinngg/cqhttp-mirai)
- [richardchien/coolq-http-api](https://github.com/richardchien/coolq-http-api)（配合 [iTXTech/mirai-native](https://github.com/iTXTech/mirai-native) 使用）

请注意：尽管 Koishi 使用的协议是 [MIT](https://choosealicense.com/licenses/mit/) 协议，但上面陈述的三种途径的相关框架都使用了基于 [AGPL 3.0](https://choosealicense.com/licenses/agpl-3.0/) 的协议。**因此如果你使用 koishi-adapter-onebot 运行你的机器人，你将可能受到 AGPL 3.0 协议的限制，必须将你的代码开源并保持同协议**。Koishi 及其作者对使用上述框架或违反上述限制的行为所可能造成的一切后果概不负责。

### Kaiheila (开黑啦)

TODO

## 使用命令行工具

创建并进入一个机器人目录：

```cli
mkdir my-bot && cd my-bot
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

新建入口文件 `index.js`，并写下这段代码：

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

## 编写并调用你的插件

在机器人目录中添加文件 `my-plugin.js`：

```js
module.exports = (ctx) => {
  ctx.on('message', (session) => {
    if (session.content === '天王盖地虎') {
      session.$send('宝塔镇河妖')
    }
  })
}
```

修改你的配置文件或入口文件：

```js koishi.config.js
module.exports = {
  plugins: {
    'my-plugin': {},
  },
}
```

```js index.js
app.plugin(require('./my-plugin'))
```

然后重新运行你的项目：

<panel-view title="聊天记录">
<chat-message nickname="Alice" color="#cc0066">天王盖地虎</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png">宝塔镇河妖</chat-message>
</panel-view>

## 配置数据库

## 配置多机器人

你可以像这样使用多个机器人：

```js koishi.config.js
module.exports = {
  port: 7070,
  cqhttp: {
    // onebot 服务将在 http://localhost:7070/onebot 进行处理
    path: '/event',
    secret: 'my-secret',
  },
  kaiheila: {
    // kaiheila 服务将在 http://localhost:7070/kaiheila 进行处理
    path: '/kaiheila',
  },
  bots: [
    // 在这里写上不同的机器人配置
    { type: 'onebot:http', selfId: 123456789, server: 'http://onebot-server' },
    { type: 'onebot:ws', selfId: 987654321, token: 'my-onebot-token' },
    { type: 'kaiheila:ws', selfId: 'aAbBcCdD', token: 'my-kaiheila-token' },
  ],
}
```

运行程序后，Koishi 将同时登陆三个机器人。有关多机器人的详细使用方法，可以参见 [**多机器人开发**](./multiple-bots.md) 一章。
