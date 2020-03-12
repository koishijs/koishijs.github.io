---
sidebarDepth: 2
noOutboundLinks: true
---

# 介绍

Koishi 是一个在 Node.js 环境下运行，基于 CoolQ 和 CQHTTP 的 QQ 机器人框架。

它的名字和图标来源于东方 Project 中的角色古明地恋（Komeiji Koishi）。

## 特性

### 开箱即用的 CLI

Koishi 高度配置化的 CLI 命令可以让你无需写代码就搭建属于你的机器人。与此同时，CLI 还配备了丰富和人性化的提示，进一步提高调试体验。

参见：[快速上手](./getting-started.md) / [配置文件](./config-file.md)

### 功能强大的 API

Koishi 的 API 包括下面几个部分：

- [Receiver](./receive-and-send.md#接收器)：将收到的信息转化为事件进行分发，且同时支持 HTTP 和 WebSocket
- [Sender](./receive-and-send.md#发送器)：完美契合 CQHTTP API 的一套异步发送器，同样支持 HTTP 和 WebSocket
- [Middleware](./receive-and-send.md#中间件)：支持异步操作的中间件系统，可以让你高效地处理每一条信息
- [Context](./plugin-and-context.md#创建上下文)：用上下文描述了机器人可能的运行环境，让你得以对不同的群进行不同的处理
- [Plugin](./plugin-and-context.md#使用插件)：将逻辑以插件的形式封装，可以实现更好的模块化和配置化
- [Command](./command-system.md)：Koishi 的核心功能之一，使用链式调用轻松创建指令，同时提供了大量的实用特性
- [Database](./using-database.md)：内置的数据库系统，但并不依赖具体的数据库实现，无论何种数据库都可以在 Koishi 中使用

每一个部分都经过了精心的编写，可以让你轻松实现任何需求。

参见：[API 文档](../api/index.md)

### 丰富的生态系统

Koishi 在编写时，也同样编写了大量的官方插件作为补充。它们有些 Koishi 的基础功能，有些则为 Koishi 的使用提供了许多便利。更重要的是，这数十个插件都可以作为 Koishi 插件开发的极好示范。

参见：[官方插件](../plugins/common.md)

### 多机器人支持

Koishi 原生地支持了多机器人开发，同时为这些机器人之间互通数据、共用服务器、保证数据安全提供了原生的解决方案，这有助于在保持高性能的同时，将腾讯风控造成的影响降低到最小。

参见：[多机器人开发](./multiple-bots.md)

### 类型与单元测试

Koishi 在开发时借助了下面的工具：

- 使用 [TypeScript](http://www.typescriptlang.org/) 编写
- 使用 [Jest](https://jestjs.io/) 进行单元测试
- 使用 [Eslint](https://eslint.org/) 进行代码风格检查
- 使用 [GitHub Actions](https://github.com/features/actions) 进行持续集成

这保证了其代码的正确性和可读性。

## 为什么选择 Koishi

读到这里，可能有些人会产生这样的疑问：为什么不使用其他的 CoolQ SDK 呢？因此，本节将对 Koishi 和其他基于 Node.js 的机器人实现进行一些简单的对比。

| 特性 | [koishi<br>1.10.0](https://www.npmjs.com/package/koishi/v/1.10.0) | [cqhttp<br>1.2.0](https://www.npmjs.com/package/cqhttp/v/1.2.0) | [cq-websocket<br>2.0.2](https://www.npmjs.com/package/cq-websocket/v/2.0.2) | [lemon-bot<br>0.6.0](https://www.npmjs.com/package/lemon-bot/v/0.6.0) | [@ionjs/core<br>0.6.5](https://www.npmjs.com/package/@ionjs/core/v/0.6.5) |
|:--:|:--:|:--:|:--:|:--:|:--:|
| 依赖数量 | [10](http://npm.anvaka.com/#/view/2d/koishi-core/1.10.0) / [21](http://npm.anvaka.com/#/view/2d/koishi/1.10.0) | [62](http://npm.anvaka.com/#/view/2d/cqhttp/1.1.1) | [37](http://npm.anvaka.com/#/view/2d/cq-websocket/2.0.2) | [65](http://npm.anvaka.com/#/view/2d/lemon-bot/0.6.0) | [73](http://npm.anvaka.com/#/view/2d/%2540ionjs%252Fcore/0.6.5) |
| 安装体积 (MB) | [0.78](https://packagephobia.now.sh/result?p=koishi-core@1.10.0) / [2.28](https://packagephobia.now.sh/result?p=koishi@1.10.0) | [1.86](https://packagephobia.now.sh/result?p=cqhttp@1.1.1) | [2.82](https://packagephobia.now.sh/result?p=cq-websocket) | [2.56](https://packagephobia.now.sh/result?p=lemon-bot) | [2.32](https://packagephobia.now.sh/result?p=@ionjs/core) |
| HTTP | ✔️ | ✔️ | ❌ | ✔️ | ✔️ |
| WebSocket | ✔️ | ❌ | ✔️ | ❌ | ❌ |
| 反向 WebSocket | ❌ | ❌ | ❌ | ❌ | ❌ |
| 监听器 | ✔️ | ✔️ | ✔️ | ❌ | ✔️ |
| 上下文 | ✔️ | ❌ | ❌ | ✔️ | ✔️ |
| 中间件 | ✔️ | ❌ | ❌ | ❌ | ✔️ |
| 命令行 | ✔️ | ❌ | ❌ | ❌ | ❌ |
| 指令 | ✔️ | ❌ | ❌ | ✔️ | ❌ |

注：依赖数量如果表示为 X/Y，则 X 表示核心库依赖数量，Y 表示命令行工具依赖数量。
