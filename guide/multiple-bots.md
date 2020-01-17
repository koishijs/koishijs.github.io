---
sidebarDepth: 2
---

# 多机器人开发

使用多个机器人是**负载均衡**的一个重要部分。一方面，使用多个机器人可以有效地将每个机器人每天发送的信息数量限制在一个范围之内，从而降低因为风控到导致的账号问题出现的概率，同时即使出现了封号等问题，也能通过切换账号来妥善解决；另一方面，使用多个机器人可以将机器人的用户群分离，因为有助于通过配置的区别实现更好的颗粒化控制。使用多个机器人有多种方法：

- 使用多台服务器运行机器人程序
- 在一台服务器的多个进程中运行机器人程序
- 在同一个进程运行多个机器人程序

当然，这三种方法并不是对立的，你完全可以同时使用上述三种方法中的两种或者更多。但是这里需要指出的是，如果使用前两种方法，由于这些机器人的运行程序本身是分离的，并不需要做特殊处理，同时由于数据访问的并发性，你将不能使用 leveldb，sqlite 这类的本地数据库。而对于第三种方法，机器人管理程序可以对每个账号进行妥善的管理，并且能够通过复用连接的形式获得更高的性能。因此，本章节将着重介绍同一进程的多机器人开发。

## 使用多机器人

### 使用配置文件

你可以通过导出一个数组的形式来使用多机器人：

```js koishi.config.js
// 数组的每一个元素对应一个机器人的配置
module.exports = [{
  // 对于 HTTP，通常需要配置 port 和 server 两个属性
  // port 用于监听端口获取事件
  // server 用于向 CQHTTP 发送请求
  type: 'http',
  port: 8080,
  server: 'http://localhost:5700',
  selfId: 10000,
}, {
  // 而对于 WebSocket，通常只需要 server 一个属性
  // 这是因为获取事件和发送请求都通过同一个链接完成
  type: 'ws',
  server: 'ws://localhost:6700',
  selfId: 20000,
}, {
  // 如果配置了 server 字段并且以协议开头
  // Koishi 也可以根据协议判断出 type，因此可以省略
  server: 'ws://localhost:6701',
  selfId: 30000,
  plugins: [
    // 只对第三个机器人生效
    ['foo', options],
  ],
}]
```

### 使用 API

如果你使用 Koishi API，调用的方式会有所不同：

```js
new { App, startAll } = require('koishi')

new App({
  type: 'http',
  port: 8080,
  server: 'http://localhost:5700',
  selfId: 10000,
})

new App({
  type: 'ws',
  server: 'http://localhost:6700',
  selfId: 20000,
})

const app3 = new App({
  type: 'ws',
  server: 'http://localhost:6701',
  selfId: 30000,
})

app3.plugin(require('koishi-plugin-foo'), options)

startAll()
```

## 优化机制

下面将着重介绍 Koishi 对多机器人的优化机制。

### 连接复用

首先让我们简单回顾一下之前提到过的一些概念，以及它们的有效范围：

- **Receiver:** 与 Context 绑定
- **Sender:** 与 App 绑定
- **Server:** 全局自动分配
- **Database:** 全局自动分配

在之前的介绍中，我们只讨论了一个应用的情况，因此看起来 `Sender`, `Server` 和 `Database` 都是与 App 绑定的，但其实不然。当同时有多个应用实例存在时，我们可以通过服用连接的方式来提高性能。而这对于不同类型的服务器和数据库也是有所区别的。对于 HTTP 服务器，我们可以用同一个服务器接收来自多个 CoolQ 实例的上报事件（但对于 WebSocket 客户端并不行）；对于 MySQL 这类基于网络的数据库，我们可以通过复用请求池的方式大幅提高性能；对于 leveldb 这类本地数据库，我们可以通过保持唯一实例的方式确保数据被统一管理，不会发生冲突。因此，只要传入了相同的配置，Koishi 就会用一个 `Server` 和 `Database` 绑定多个应用实例。

下图展示了一个复用 `HttpServer` 实例的例子：

![shared-server](/shared-server.png)

### QQ 号自动获取

我们能够看到，`selfId` 并不是一个必需的配置。那么 Koishi 是如何自动获取这些 QQ 号的呢？同时，既然可以自动获取，为什么还需要这样一个配置项呢？这一节将简单介绍这其中的原理。

首先，Koishi 自动获取 QQ 号的原理来源于 CoolQ 的事件上报信息会包含 `self_id` 字段。因此，只要 Koishi 的服务器接收到了事件，它就能在处理这个事件之前将相应的数据更新到 App 实例中。由于一个服务器可能绑定了多个 App，因此每次收到信息时，Koishi 都会检查收到信息的服务器所绑定的所有 App 实例，如果不存在配置了该 QQ 号的实例存在，则 Koishi 会将此 QQ 号任意分配给一格未配置 QQ 号的 App 实例，这就完美解决了 QQ 号自动获取的问题。

然而另一方面，这个流程需要一定的预热时间。如果一个 App 始终不收到任何事件上报，则该实例的 QQ 号就始终无法获得。如果此时又有获取 QQ 号的需求，我们也提供了一种方法：

```js
const { getSelfIds } = require('koishi')

// 获取全部机器人的 QQ 号
const selfIds = await setSelfIds()
```

不过这个函数的调用总归是需要时间（虽然很短）。因此如果你在编写机器人时确实有在启动短时间内使用 QQ 号的需求，或者需要对每个 QQ 号使用不同的配置，还是推荐手动配置 `selfId`。

::: tip 提示
上面所说的 `self_id` 字段是 CQHTTP 3.4 引入的新字段，因此上面所说的特性对低于 CQHTTP 3.4 的版本是不起作用的。因此，如果你在一个这样的版本中在同一个端口配置了多个不含 `selfId` 的机器人，CQHTTP 会在启动时报错；如果在每个端口都只有不超过 1 个这样的机器人，那么 CQHTTP 会自动通过 [`getLoginInfo()`](../api/sender.md#sender-getlogininfo) 方法获取 `selfId`，并自动附加在每个事件元信息对象上。这也是 Koishi 为确保兼容性所做的一点努力。
:::
