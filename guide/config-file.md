---
sidebarDepth: 2
---

# 编写配置文件

Koishi CLI 只提供了两个命令：`koishi init` 和 `koishi run`。前者用于初始化一个配置文件，后者用于运行一个配置文件。可见，理解这个配置文件是理解 Koishi 工作原理的关键。本节就简单介绍这样一个配置文件是如何编写和运行的。

## 基本结构

一个 Koishi 配置文件，通常是 `koishi.config.js`，是一个 Node.js 模块。打开一个由下面的指令生成的文件，你可以看到下面的属性：

```sh
koishi init --secret my-secret --token my-token
```

```js
module.exports = {
  type: 'http',
  port: 7070,
  token: 'my-token',
  secret: 'my-secret',
  server: 'http://localhost:5700',
  plugins: [
    ['common'],
  ],
}
```

- `type` 是你的机器人的类型，目前支持 `http` 和 `ws`
- `port` 是你的机器人服务器要监听的端口号，默认为 `8080`（这也是 CQHTTP 的默认值）
- `server` 是你的 CQHTTP 服务器的网址，默认为 `http://localhost:5700`（这也是 CQHTTP 的默认值）
- `token` 是你的 CQHTTP 配置中的 `token` 项，如果不一致则 CQHTTP 服务器不会处理你的信息发送
- `secret` 是你的 CQHTTP 配置中的 `secret` 项，如果不一致则 Koishi 不会处理来自 CQHTTP 服务器的信息
- `plugins` 是 Koishi 要安装的插件列表。默认情况下会包含一个 `common`，你也可以手动去掉这个插件或者添加其他插件

## 添加插件

你可以像这样添加一个插件：

```js
module.exports = {
  plugins: [
    'foo',
    ['bar'],
    ['baz', {
      // some options
    }]
  ],
}
```

`plugins` 是一个数组，其中的每一项可以是字符串或数组。如果是字符串，Koishi 会直接解析字符串为插件的路径；如果是数组，Koishi 会将数组的第一项解析为插件的路径，第二项将作为插件的选项。其中 `foo` 会被解析为 `koishi-plugin-foo`，`./foo.js`，`./foo/index.js` 等多个路径，会按照先后顺序进行匹配。因此，如果你想要向你的机器人添加这三种路径的插件，你都只需要写 `foo` 即可。当然，你仍然可以显式地书写 `koishi-plugin-foo`，`./foo.js`，`./foo/index.js`。

## 添加数据库

你可以像这样添加一个数据库：

```js
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

`database` 是一个键值对，键为数据库的类型，指为数据库的配置信息。Koishi 并不会默认支持一个数据库，但它会对 `database` 的键进行检测，同时加载对应的模块作为数据库支持，模块的解析方式与插件类似。例如，`level` 会被解析为 `koishi-database-level`，`./level.js`，`./level/index.js` 等多个路径，会按照先后顺序进行匹配。

从这种写法中，我们也不难看出 Koishi 是支持多数据库的。这一点将在 [使用数据库](./using-database.md) 一节详细阐释。

## 使用多机器人

你可以像这样使用多个机器人：

```js
module.exports = [{
  // 第一个机器人的配置
}, {
  // 第二个机器人的配置
}]
```

如果这两个机器人的配置有较高的重合度，你也可以先设置一个共享配置，再对每个机器人进行覆盖：

```js
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

有关多机器人的详细使用方法，可以参见 [多机器人开发](./multiple-bots.md) 一章。
