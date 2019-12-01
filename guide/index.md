# 指南

## 起步

Koishi 基于 CoolQ 和 CQHTTP，因此你需要先安装它们。

- CoolQ：https://cqp.cc
- CQHTTP：https://cqhttp.cc

进行相应的配置并运行 CoolQ 和 CQHTTP 后，你就可以愉快地使用 Koishi 了。

## 安装

创建并进入一个机器人目录：

```sh
mkdir my-bot
```

安装 Koishi：

```sh
npm i koishi -g
# 或者
yarn add koishi -g
```

在你想要的地方创建 `koishi.config.js`，并在其中输入配置信息：

```js
module.exports = {
  port: 7070,
}
```

最后运行程序：

```sh
koishi .
```

机器人就已经可以运行了。
