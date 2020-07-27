---
sidebarDepth: 2
---

# 常见问题

## 关于消息

### CQ 码是什么？应该如何使用 CQ 码？

CQ 码，是指在 CoolQ 的消息中，以 `[CQ:` 开头、`]` 结尾的，可以实现特殊功能的代码。我们利用 CQ 码发送图片，语音，表情等普通文本无法表达的消息。下面是一些参考资料：

- [CQ 码官方文档](https://d.cqp.me/Pro/CQ%E7%A0%81)
- [CQHTTP 的增强功能](https://cqhttp.cc/docs/4.13/#/CQCode?id=%E5%A2%9E%E5%BC%BA%E5%8A%9F%E8%83%BD%E5%88%97%E8%A1%A8)
- [CQ 码的坑](https://github.com/richardchien/coolq-http-api/wiki/CQ-%E7%A0%81%E7%9A%84%E5%9D%91)

### autoEscape 参数是干什么的？什么时候需要设置这个参数？

`autoEscape` 参数决定了消息内容是否作为纯文本发送（即不解析 CQ 码）。举个例子，如果你要 @ 某个人，你应该调用的方法相当于：

```js
sender.sendGroupMsg(123, '[CQ:at,qq=456]')
```

如果这个时候传入第三个参数 `true`，则相当于直接发送一串 `[CQ:at,qq=456]`，在大部分情况下这都不是你期望的结果。因此，**在大部分情况下我们都不建议你设置这个参数**。如果你真的需要避免 CQ 码转义，你可以使用 `CQCode.escape()` 函数：

```js
const { CQCode } = require('koishi-utils')
sender.sendGroupMsg(123, CQCode.escape('[CQ:at,qq=456]'))
```

### 发送信息时如果抛出 SenderError，应该如何理解 retcode？

retcode 是一个整数，大于 0 表示是 CQHTTP 发出的错误，小于 0 表示是 CoolQ 发出的错误。它们分别在下面定义：

- [CQHTTP 响应数据](https://cqhttp.cc/docs/4.13/#/API?id=%E5%93%8D%E5%BA%94%E8%AF%B4%E6%98%8E)
- [CoolQ 错误代码](https://docs.cqp.im/dev/v9/errorcode/)

上面是官方文档中描述的代码，但是实际应用中你更可能碰到下面的代码，它们都没有文档，因此我只给出自己的推测：

| retcode | 推测意义 |
|:-:|:--|
| -1 | 账号已下线 |
| -3 | 尝试发送不支持的 CQ 码 |
| -11 | 无法下载图片导致发送失败 |
| -14 | 无法发送匿名消息 |
| -26 | 发送消息内容超长 |
| -30 | 消息被服务器拒绝 |
| -34 | 帐号在该群内被禁言 |

如果有错误或想补充，欢迎 [完善此页面](https://github.com/koishijs/koishijs.github.io/edit/docs/guide/faq.md)。

## 关于插件和上下文

### 一个插件可以被注册多次吗？

可以。插件本身就是一个函数，插件被多次注册简单来说就是函数被多次调用。每一次自然也可以传入不同的上下文和选项。

特别地，如果插件内注册的是监听器或者中间件，那么将插件在多个上下文中注册则相当于将一个监听器或中间件分别注册到这些上下文（这并没有任何问题）；而如果插件内注册的是指令，由于同名指令只能拥有一个，因此后注册的会覆盖先注册的。这一点需要注意。

## 关于生命周期

### 应该如何保证一段代码在成功完成初始化之后执行？

可以有很多种方式。你可以利用 `app.start()` 或者 `startAll()` 返回的 `Promise` 对象：

```js
app.start().then(() => app.sender.sendPrivateMsg(1234567, '你的机器人上线了'))
```

特别地，如果你使用了 `startAll()` 方法，你也可以使用 `onStart()` 钩子：

```js
onStart(() => app.sender.sendPrivateMsg(1234567, '你的机器人上线了'))
startAll()
```

当然，你还可以利用 `connect` 事件：

```js
app.receiver.on('connect', () => app.sender.sendPrivateMsg(1234567, '你的机器人上线了'))
```

### 配置文件中和传入 App 的选项是完全等价的吗？

不是。App 的构造函数不支持 `plugin` 选项，而配置文件支持。App 的构造函数的 `database` 选项不会自动从依赖中注册数据库，而配置文件会。具体的区别请参见 [**使用插件**](./plugin-and-context.md#使用插件) 和 [**安装数据库**](./using-database.md#安装数据库) 两章。

除此以外，还有一些 CLI 特有的功能，比如 [**输出日志**](./logger.md) 等，其相关的配置项也是只支持写入配置文件的。

## 关于通信方式

### HTTP 和 WebSocket 有什么区别？应该如何选择？

目前 Koishi 已经完全实现了 CQHTTP 提供的 HTTP 和 WebSocket 通信方式，因此它们之间**不存在任何功能上的差别**。

但是，HTTP 需要 Koishi 和 CQHTTP 所处于同一台机器，或所处的机器都拥有公网 IP；而 WebSocket 只需要 Koishi 和 CQHTTP 所处于同一台机器，或运行 CQHTTP 的机器拥有公网 IP。因此如果你在服务端运行 CoolQ，同时在个人电脑上调试你的 Koishi 应用，你应当选择使用 WebSocket 模式。

从性能上说，WebSocket 占用的资源会更少（因为不需要每次都建立连接），但是响应速度可能不如 HTTP；另一方面，当一个 Koishi 应用同时管理着多个机器人时，HTTP 能通过快捷调用和服务器复用的方式来提高性能，但是 WebSocket 并没有这些机制。
