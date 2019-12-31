---
sidebarDepth: 2
---

# 配置文件

Koishi CLI 只提供了两个命令：`koishi init` 和 `koishi run`。前者用于初始化一个配置文件，后者用于运行一个配置文件。可见，理解这个配置文件是理解 Koishi 工作原理的关键。本节就简单介绍这样一个配置文件是如何编写和运行的。

## 基本结构

一个 Koishi 配置文件，通常是 `koishi.config.js`，是一个 Node.js 模块。打开一个由下面的指令生成的文件，你可以看到下面的属性：

```sh
koishi init
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

`plugins` 是一个数组，其中的每一项可以是字符串或数组。如果是字符串，Koishi 会直接解析字符串为插件的路径；如果是数组，Koishi 会将数组的第一项解析为插件的路径，第二项将作为插件的选项。其中 `foo` 会被解析为 `koishi-plugin-foo`，`./foo.js`，`./foo/index.js` 等多个路径，会按照先后顺序进行匹配。因此，如果你想要向你的机器人添加这三种路径的插件，你都只需要写 `foo` 即可。当然，你仍然可以显式地书写 `koishi-plugin-foo`，`./foo.js`，`./foo/index.js` 等路径进行配置。

此外，你还可以对特定的上下文进行配置：

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

你可以在 [**插件与上下文**](./plugin-and-context.md) 一章中了解更多有关插件的细节。

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

从这种写法中，我们也不难看出 Koishi 是支持多数据库的。这一点将在 [**使用数据库**](./using-database.md) 一章详细阐释。

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

有关多机器人的详细使用方法，可以参见 [**多机器人开发**](./multiple-bots.md) 一章。

## 配置列表

本节列举出了目前所有的配置。大部分配置既可以用于 `koishi.config.js`，也可以传入 `App` 的构造函数中，但标有 <Badge text="CLI" vertical="baseline"/> 表示只能在配置文件中使用。

### type

机器人的通信方式，目前支持 `'http'` 和 `'ws'` 两种。特别地，如果这个配置缺省，Koishi 也会读取你的 `server` 选项，根据你配置的服务器 URL 进行适配。

::: tip 有关 HTTPS/WSS
由于目前 CoolQ HTTP API 本身不支持直接配置 SSL/TLS 证书，因此如果要使用 HTTPS/WSS 需要使用第三方软件进行代理。这里有一篇 [相关文档](https://github.com/richardchien/coolq-http-api/wiki/HTTPS) 可供参考。
:::

### port

服务器监听的端口。

CQHTTP 上报信息的默认值为 `http://localhost:8080`，但 Koishi 中不会提供默认行为，你需要在构造函数中显式的配置它或使用 `koishi init` 命令生成含该配置的文件。

相关 CQHTTP 配置：`post_url`。

### server

如果使用了 HTTP，则该配置将作为发送信息的服务端；如果使用了 WebSocket，则该配置将作为监听事件和发送信息的服务端。

CQHTTP 的 HTTP 服务器默认监听 5700 端口，WebSocket 服务器默认监听 6700 端口，但 Koishi 中不会提供默认行为，你需要在构造函数中显式的配置它或使用 `koishi init` 命令生成含该配置的文件。

相关 CQHTTP 配置：`host`, `port`, `ws_host`, `ws_port`。

### token

发送信息时用于验证的字段，应与 CQHTTP 的 `access_token` 配置保持一致。

### secret

接收信息时用于验证的字段，应与 CQHTTP 的 `secret` 配置保持一致。

### selfId

机器人自己的 QQ 号。这个选项通常是可选的，因为 Koishi 在大部分情况下可以自动获取机器人的 QQ 号。但是在 CQHTTP 版本低于 3.4 的情况下，你需要手动配置它。此外，预先配置 selfId 对安装了特定插件的应用可能拥有更快的启动速度。参见 [**QQ 号自动获取**](./multiple-bots.md#qq-号自动获取) 一节。

### database

要安装的数据库配置信息。参见 [**使用数据库**](./using-database.md) 一章。

### plugins <Badge text="CLI"/>

要安装的插件列表。如果传入一个列表，则依次安装列表中的插件；如果传入一个对象，则以对象的键为上下文依次注册对应的值中的插件。参见 [**插件与上下文**](./plugin-and-context.md) 一章。

### nickname

机器人的昵称，可以是字符串或字符串数组。将用于指令前缀的匹配。例如，如果配置该选项为 `'恋恋'`，则你可以通过 `恋恋，help` 来进行 help 指令的调用。参见 [**指令前缀**](./command-system.md#指令前缀) 一节。

### commandPrefix

指令前缀字符，可以是字符串或字符串数组。将用于指令前缀的匹配。例如，如果配置该选项为 `.`，则你可以通过 `.help` 来进行 help 指令的调用。参见 [**指令前缀**](./command-system.md#指令前缀) 一节。

### maxMiddlewares

最大中间件的数量。如果超过这个数量，Koishi 会认定为发生了内存泄漏，将产生一个错误事件，并停止新中间件的安装。默认值为 `64`。

### similarityCoefficient

用于模糊匹配的相似系数，应该是一个 0 到 1 之间的数值。数值越高，模糊匹配越严格。设置为 1 可以完全禁用模糊匹配。默认值为 `0.4`。参见 [**模糊匹配**](./command-system.md#模糊匹配) 一节。

### quickOperationTimeout

快捷操作的时间限制，单位为毫秒。如果配置了这个选项且使用了 HTTP 通信方式，则在这段时间内的首次调用 `meta.$send()` 或类似的方法将不产生新的 HTTP 请求。默认值为 `0`。参见 [**快捷操作**](./receive-and-send.md#快捷操作) 一节。
