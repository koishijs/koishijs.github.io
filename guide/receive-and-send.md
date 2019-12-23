---
sidebarDepth: 2
---

# 接收和发送信息

从本节开始，我们开始深入研究如何利用 Koishi 的来接收和发送信息。如果你不是一个插件开发者，你可以选择跳过本节和接下来的几个章节。但如果你对如何开发 Koishi 感兴趣，那么真正有趣的部分才刚刚开始。

::: tip 提示
接下来的教程可能会涉及对 Koishi API 的调用。如果你不知道如何用这些 API 运行你的机器人，你可能需要查看 [调用 Koishi](./getting-started.md#调用-koishi) 一节。如果你想获得某个 API 的具体用法，你可以参考 [API 文档](../api/) 。
:::

## 接收器 (receiver)

一个**接收器**是一个 [EventEmitter](https://nodejs.org/api/events.html)，你可以像这样调用它：

```js
app.receiver.on('message', (meta) => {
  // 如果收到“人有多大胆”
  if (meta.message === '人有多大胆') {
    // 就回应“地有多大产”
    meta.$send('地有多大产')
  }
})
```

在这个简单的示例中，这里有两件事你需要了解：

上面的 `meta` 对象被称为**元信息**。元信息具有通用的结构，只要是来自 [CQHTTP 的事件](https://cqhttp.cc/docs/4.12/#/Post)，无论类型都会被解析成这个统一结构。你可以在本节的最后查看 [Meta 对象的详细结构](#meta-对象)。

上面的 `message` 字符串被称为**事件名称**。Koishi 的事件名和 `meta.postType` 字段进行对应。同时，根据 postType 的不同，Koishi 会相应地添加二级事件。二级事件和一级事件会被同时触发，因此你只需要根据具体的需求监听其中的一个即可。例如，一个 postType 为 `notice`，noticeType 为 `group_upload` 的事件会同时触发 `notice` 和 `notice/group_upload` 两个监听器。

除去由 CQHTTP 提供的事件外，Koishi 自身也提供了一批事件，你可以在 [接收器](../api/receiver.md) 一章中看到目前支持的所有事件名。

## 发送器 (sender)

一个**发送器**封装了一套 [CQHTTP API](https://cqhttp.cc/docs/4.12/#/API)。你可以像这样调用它：

```js
// 向服务器发送信息
await app.sender.sendPrivateMsg(123456789, 'Hello world')

// 从服务器获取信息
const groupInfo = await app.sender.getGroupInfo(987654321)
```

如果你熟悉 CQHTTP API 的话，这对你一定不陌生。没错，这套接口和 CQHTTP 提供的接口是一一对应的。除此以外，由于 Koishi 全部使用 TypeScript 编写，我们还提供了完整的类型定义，让你在编写代码时再也不无需查看 CQHTTP 文档。

## 中间件 (middleware)

有了接收器和发送器，似乎你就能完成一切工作了——很多机器人框架也的确是这么想的。但是从 Koishi 的角度，这还远远不够。当载入的功能越来越多后，另一些严重的问题将逐渐浮现出来：如何限制信息能触发的应答次数？如何进行权限管理？如何提高机器人的性能？这些问题的答案将我们引向另一套更高级的系统——这也就是**中间件**的由来。

中间件是对信息事件处理流程的再封装。你注册的所有中间件将会由一个事件监听器进行统一管理，数据流向下游，控制权流回上游——这可以有效确保了任意信息都只被处理一次。被认定为无需继续处理的信息不回进入下游的中间件——这让我们能够轻易地实现权限管理。与此同时，Koishi 的中间件也支持异步调用，这使得你可以在中间件函数中实现任何逻辑。事实上，相比更加底层地调用 receiver，**使用中间件处理信息才是 Koishi 更加推荐的做法**。

### 注册和取消中间件

使用 `app.middleware` 注册中间件。这个方法接受一个回调函数，其第一个参数为一个 Meta 对象，第二个参数是 `next` 函数，只有调用了它才会进入接下来的流程。如果自始至终都没有调用 `next` 函数的话，之后的中间件都将不会被执行。

```js
app.middleware((meta, next) => {
  if (meta.message.includes(`[CQ:at,qq=${app.options.selfId}]`)) {
    // 仅当接收到的信息包含 at 机器人时才继续处理
    return next()
  }
})
```

你也可以显式地取消一个中间件：

```js
// callback 是之前传入 app.middleware 的回调函数
app.removeMiddleware(callback)
```

### 注册异步中间件

下面给出一个异步的中间件作为示例：

```js
app.middleware(async (meta, next) => {
  // 获取数据库中的用户信息
  // 这里只是示例，事实上 Koishi 会自动获取数据库中的信息并存放在 meta.$user 中
  const user = await app.database.getUser(meta.userId)
  if (user.authority === 0) {
    return meta.$send('抱歉，你没有权限访问机器人。')
  } else {
    return next()
  }
})
```

::: warning 注意
上述代码中 next 前面的 return 是必须的。如果删去将可能会导致时序错误，这在 Koishi 中将会抛出一个运行时警告。
:::

### 注册前置中间件

从上面的两个例子中不难看出，中间件是一种信息过滤的利器。但是反过来，当你需要的恰恰是捕获全部信息时，中间件反而不会是最佳选择——因为前置的中间件可能会将信息过滤掉，导致你注册的回调函数根本不被执行。因此在这种情况下，我们更推荐使用接收器。然而，还存在着这样一种情况：你既需要捕获全部的信息，又要对其中的一些加以回复，这又该怎么处理呢？

听起来这种需求有些奇怪，让我们举个具体点例子吧：假如你写的是一个复读插件，它需要在每次连续接收到 3 条相同信息时进行复读。我们不难使用接收器实现这种逻辑：

```js
let times = 0 // 复读次数
let message = '' // 当前信息

app.receiver.on('message', (meta) => {
  // 这里其实有个小问题，因为来自不同群的信息都会触发这个回调函数
  // 因此理想的做法应该是分别记录每个群的当前信息和复读次数
  // 但这里我们假设机器人只处理一个群，这样可以简化逻辑
  if (meta.message === message) {
    times += 1
    if (times === 3) meta.$send(message)
  } else {
    times = 0
    message = meta.message
  }
})
```

但是这样写出的机器人就存在所有用接收器写出的机器人的通病——如果这条信息本身可以触发其他回应，机器人就会多次回应。更糟糕的是，你无法预测哪一次回应先发生，因此这样写出的机器人就会产生延迟复读的迷惑行为。为了避免这种情况发生，Koishi 对这种情况也有对应的解决方案，那就是前置中间件：

```js
let times = 0 // 复读次数
let message = '' // 当前信息

app.premiddleware((meta, next) => {
  if (meta.message === message) {
    times += 1
    if (times === 3) return meta.$send(message)
  } else {
    times = 0
    message = meta.message
    return next()
  }
})
```

### 注册临时中间件

有的时候，你也可能需要实现这样一种逻辑：你的中间件产生了一个响应，但你认为这个响应优先级较低，希望等后续中间件执行完毕后，如果信号仍然未被截取，就执行之前的响应。这当然可以通过注册新的中间件并取消的方法来实现，但是由于这个新注册的中间件可能不被执行，你需要手动处理许多的边界情况。

为了应对这种问题 Koishi 提供了更加方便的写法：你只需要在调用 `next` 时再次传入一个回调函数即可！这个回调函数只接受一个 `next` 参数，且只会加入当前的中间件执行队列；无论这个回调函数执行与否，在本次中间件解析完成后，它都会被清除。下面是一个例子：

```js
app.middleware((meta, next) => {
  if (meta.message === 'hlep') {
    // 如果该 meta 没有被截获，则这里的回调函数将会被执行
    return next(() => meta.$send('你想说的是 help 吗？'))
  } else {
    return next()
  }
})
```

除此以外，临时中间件还有下面的用途。让我们先回到上面介绍的前置中间件。它虽然能够成功解决问题，但是如果有两个插件都注册了类似的前置中间件，就仍然可能发生一个前置中间件截获了信息，导致另一个前置中间件获取不到信息的情况发生。但是，借助临时中间件，我们便有了更好的解决方案：

```js
let times = 0 // 复读次数
let message = '' // 当前信息

app.premiddleware((meta, next) => {
  if (meta.message === message) {
    times += 1
    if (times === 3) return next(() => meta.$send(message))
  } else {
    times = 0
    message = meta.message
    return next()
  }
})
```

搭配使用上面几种中间件，你的机器人便拥有了无限可能。在 `koishi-plugin-common` 库中，就有着一个官方实现的复读功能，它远比上面的示例所显示的更加强大。如果想深入了解中间件机制，可以去研究一下这个功能的 [源代码](https://github.com/koishijs/koishi-plugin-common/blob/master/src/repeater.ts)。

## 深入 Meta 对象

本节将深入介绍 Meta 对象的全部属性。除了所有属性都会被转换成 camelCase 以外，Meta 对象的属性与 CQHTTP 事件上报的属性是一一对应的。其中，以 `$` 开头的是 Koishi 添加的属性。

### 基本属性

- postType: `'message' | 'notice' | 'request'| 'meta_event'`
- selfId: `number` 机器人自身 ID
- userId: `number` 涉及的用户 ID
- groupId: `number` 涉及的群 ID
- discussId: `number` 涉及的讨论组 ID

### message 型元数据属性

- messageType: `'private' | 'group' | 'discuss'`
- subType:
  - 如果是私聊消息：`'friend' | 'group' | 'discuss' | 'other'`
  - 如果是群消息：`'normal' | 'anonymous' | 'notice'`
- messageId: `number` 信息 ID，用于撤回等
- message: `string` 消息内容
- rawMessage: `string` 原始消息内容
- font: `number` 字体
- sender: `SenderInfo` 发送人信息
  - userId: `number` 用户 ID
  - nickname: `string` 昵称
  - sex: `'male' | 'female' | 'unknown'`
  - age: `number` 年龄
  - title: `string` 专属头衔（仅限群消息）
  - card: `string` 群名片 / 备注（仅限群消息）
  - area: `string` 地区（仅限群消息）
  - level: `string` 成员等级（仅限群消息）
  - role: `'owner' | 'admin' | 'member'`（仅限群消息）
- anonymous: `AnonymousInfo` 匿名信息
  - id: `number` 匿名用户 ID
  - name: `string` 用户名称
  - flag: `string` 匿名用户 flag，在调用禁言 API 时需要传入

### notice 型元数据属性

- noticeType: `'group_upload' | 'group_admin' | 'group_increase' | 'group_ban' | 'friend_add'`
- subType:
  - 如果是管理员变动：`'set' | 'unset'`
  - 如果是群成员增加：`'approve' | 'invite'`
  - 如果是群成员减少：`'leave' | 'kick' | 'kick_me'`
  - 如果是群禁言：`'ban' | 'lift_ban'`
- operatorId: `number` 操作者 ID
- duration: `number` 禁言时长（秒）
- file: `FileInfo` 文件信息
  - id: `string` 文件 ID
  - name: `string` 文件名
  - size: `number` 文件大小（字节）
  - busid: `number`

### request 型元数据属性

- requestType: `'friend' | 'group'`
- subType: `'add' | 'invite'`（如果是加群请求）
- comment: `string` 验证信息
- flag: `string` 请求 flag，在调用处理请求的 API 时需要传入

### metaEvent 型元数据属性

- metaEventType: `'lifecycle' | 'heartbeat'`
- subType: `'enable' | 'disable'`（如果是生命周期）
- interval: `number` 到下次心跳的间隔（毫秒）
- status: `StatusInfo` 状态信息，请参考 [getStatus](../api/sender.md#sender-getstatus) 的返回值

### Koishi 添加的属性

- $path: `string` 当前上下文的路径，参见 [上下文](./plugin-development.md#上下文)
- $user: `User` 一个观测中的用户数据对象（仅当配置数据库时生效）
- $group: `GroupData` 一个群数据对象（仅当配置数据库时生效）
- $send: `(message: string) => Promise<void>` 向当前上下文发送信息
