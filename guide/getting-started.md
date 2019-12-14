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
Koishi 要求您的 Node.js 的版本不小于 10，CQHTTP 的版本不小于 3.4。如果使用 WebSocket，Koishi 要求 CQHTTP 版本不小于 4.6。
:::

::: tip 提示
CoolQ Air 和 CoolQ Pro 是两个不同的版本，它们都能配合 Koishi 运行。后者需要收取一定的费用，但同时比前者增加了一些功能（例如可以发图）。因此，如果你发现你的机器人无法发图，请先确保自己使用的是可以发图的版本。
:::

## 全局安装

创建并进入一个机器人目录：

```sh
cd my-bot
```

安装 Koishi：

```sh
npm i koishi -g
# 或者 yarn add koishi -g
```

利用 `koishi init` 指令迅速创建一个 `koishi.config.js` 文件：

```sh
koishi init
```

最后运行程序：

```sh
koishi run
```

机器人就已经可以运行了。

## 调用 Koishi

如果你对 JavaScript 和 Node.js 非常熟悉，你或许也希望在 Node.js 中直接调用 Koishi——没问题，我们也提供了这样一套方案。

首先初始化你的机器人目录：

```sh
npm init -y
# 或者 yarn init -y
```

安装 Koishi：

```sh
npm i koishi -D
# 或者 yarn add koishi -D
```

新建 `index.js`，并写下这段代码：

```js
const { App } = require('koishi')

const app = new App({
  type: 'http',
  port: 7070,
  server: 'http://localhost:5700',
  // 在这里加上其他配置信息
})

app.start()
```

最后运行这个文件：

```sh
node .
```

这样也能运行你的机器人。尽管这显得稍微麻烦一点，并且相比调用 CLI 会缺少一些特性，但是你的机器人也因此获得了更高的自由度。之后我们会简单对比这两种方法。
