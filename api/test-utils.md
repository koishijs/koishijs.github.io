---
sidebarDepth: 2
---

# 测试工具 (Test Utils)

包含了被 Koishi 使用的测试工具，它们由 `koishi-test-utils` 包提供。

::: tip 注意
本页显示的版本号都表示对应的 koishi-test-utils 版本号（而不是对应的 koishi 版本号）。
:::

## testDatabase(options, hooks)

测试全部内置数据库方法。

- **options:** `AppOptions` App 的构造函数的 database 字段，参见 [使用数据库](../guide/using-database.md)
- **hooks:** 测试中执行的钩子函数，每一个函数都传入一个 App 实例作为参数：
  - **hooks.beforeEachUser:** 当每个用户测试执行前调用
  - **hooks.afterEachUser:** 当每个用户测试执行后调用
  - **hooks.beforeEachGroup:** 当每个群测试执行前调用
  - **hooks.afterEachGroup:** 当每个群测试执行后调用
- 返回值: [`App`](./app.md) 用于测试的 App 实例

## createHttpServer(token?) <Badge text="1.1.0+"/>

模拟一个 CQHTTP HTTP 服务器。

- **token:** `string` 验证字段
- 返回值: [`Promise<HttpServer>`](#类：httpserver)

## createWsServer(token?) <Badge text="1.1.0+"/>

模拟一个 CQHTTP WebSocket 服务器。

- **token:** `string` 验证字段
- 返回值: [`Promise<WsServer>`](#类：wsserver)

## 类：MockedServer <Badge text="2.0.0+"/>

封装了一些用于测试的 API。上面所说的 HttpServer, WsServer 都是它的子类，而下面要介绍的 MockedApp 也实现了它的所有方法。

### mocked.shouldHaveLastRequest(method, params?)

断言最后发送的请求，并清空请求列表。

- **method:** `string` 请求名称，不用写 async
- **params:** `Record<string, any>` 请求参数，可以略去部分
- 返回值: `void`

### mocked.shouldHaveLastRequests(requests)

按时间顺序断言最后发送的若干个请求，并清空请求列表。

- **requests:** `[string, Record<string, any>?][]` 请求的名称和参数
- 返回值: `void`

### mocked.shouldHaveNoRequests()

断言没有发送任何请求。

- 返回值: `void`

### mocked.shouldMatchSnapshot(name?) <Badge text="3.0.0+"/>

断言发送的请求与快照相符。

- **name:** `string` 快照名
- 返回值: `void`

### mocked.clearRequests()

清空请求列表。

- 返回值: `void`

### mocked.setResponse(method, data, retcode?)

预先设置客户端请求的结果。

- **method:** `string` 请求名称
- **data:** 响应数据，支持以下两种格式：
  - `Record<string, any>` 响应的 data 字段
  - `(params: Record<string, any>) => Partial<CQResponse>` 传入请求参数，返回的对象将作为响应本身 <Badge text="2.0.0+" vertical="baseline"/>
- **retcode:** `number` 返回的错误码，默认为 `0`（仅对 data 不是函数的时候有效）
- 返回值: `void`

## 类：MockedApp <Badge text="1.1.0+"/>

MockedApp 是最常用的测试工具类。它是一个无需网络的 App 实例。借助它你可以方便地创建到 Koishi 的上报数据和处理 Koishi 发出的请求，从而完成对业务代码的测试工作。

MockedApp 会截获从 Sender API 发出的所有请求，因而实现了 MockedServer 的方法。

### new MockedApp(options?)

创建一个无网络 App 实例。参见 [模拟事件上报](../guide/unit-tests.md#模拟事件上报)。

- **options:** `AppOptions` 参见 [配置列表](../guide/config-file.md)
- 返回值: [`MockedApp`](#类：mockedapp)

### app.receive(meta) <Badge text="2.0.0+"/>

模拟一次事件上报。

- **meta:** `Meta` 事件元信息对象
- 返回值: `void`

### app.receiveMessage(type, message, userId, ctxId?) <Badge text="2.0.0+"/>

模拟一次 message 事件上报。当这个消息对应的 [after-middleware](./receiver.md#事件：after-middleware) 事件触发时返回。

- **type:** `'private' | 'group' | 'discuss'` 事件的类型
- **message:** `string` 消息文本
- **userId:** `number` 发消息者 QQ 号
- **ctxId:** `number` 上下文 ID（如果是群消息这里就是群号；如果是讨论组消息这里就是讨论组号；如果是私聊则这个参数不用写）
- 返回值: `Promise<void>`

此外，你也可以直接向这个方法传入一个等价的 Meta 对象，效果相同。

### app.receiveFriendRequest(userId, flag?) <Badge text="2.0.0+"/>

模拟一次 request/friend 事件上报。

- **userId:** `number` 用户 QQ 号
- **flag:** `string` 请求 flag，默认为 `flag`
- 返回值: `void`

### app.receiveGroupRequest(type, userId, groupId?, flag?) <Badge text="3.0.0+"/>

模拟一次 request/group 事件上报。

- **userId:** `number` 用户 QQ 号
- **type:** `'add' | 'invite'` 事件的子类型
- **groupId:** `number` 群号
- **flag:** `string` 请求 flag，默认为 `flag`
- 返回值: `void`

### app.receiveGroupUpload(file, userId, groupId?) <Badge text="3.0.0+"/>

模拟一次 group-upload 事件上报。

- **groupId:** `number` 群号
- **userId:** `number` 上传者 QQ 号
- **groupId:** `number` 群号
- 返回值: `void`

### app.receiveGroupAdmin(subType, userId, groupId?) <Badge text="3.0.0+"/>

模拟一次 group-admin 事件上报。

- **subType:** `'set' | 'unset'` 事件的子类型
- **userId:** `number` 目标 QQ 号
- **groupId:** `number` 群号
- 返回值: `void`

### app.receiveGroupIncrease(subType, userId, groupId?, operatorId?) <Badge text="3.0.0+"/>

模拟一次 group-increase 事件上报。

- **subType:** `'approve' | 'invite'` 事件的子类型
- **userId:** `number` 目标 QQ 号
- **groupId:** `number` 群号
- **operatorId:** `number` 操作者 QQ 号
- 返回值: `void`

### app.receiveGroupDecrease(subType, userId, groupId?, operatorId?) <Badge text="3.0.0+"/>

模拟一次 group-decrease 事件上报。

- **subType:** `'leave' | 'kick' | 'kick_me'` 事件的子类型
- **userId:** `number` 目标 QQ 号
- **groupId:** `number` 群号
- **operatorId:** `number` 操作者 QQ 号
- 返回值: `void`

### app.receiveGroupBan(subType, duration, userId, groupId?, operatorId?) <Badge text="3.0.0+"/>

模拟一次 group-ban 事件上报。

- **subType:** `'ban' | 'lift_ban'` 事件的子类型
- **duration:** `number` 禁言时长
- **userId:** `number` 目标 QQ 号
- **groupId:** `number` 群号
- **operatorId:** `number` 操作者 QQ 号
- 返回值: `void`

### app.receiveFriendAdd(userId) <Badge text="3.0.0+"/>

模拟一次 friend-add 事件上报。

- **userId:** `number` 目标 QQ 号
- 返回值: `void`

### app.createSession(ctxType, userId, ctxId?)

创建一个会话。

- **ctxType:** `'user' | 'group' | 'discuss'` 上下文类型
- **userId:** `number` 发言用户 ID
- **ctxId:** `number` 群号或讨论组号（如果是私聊则不需要这个参数）
- 返回值: [`Session`](#类：session) 会话对象

## 类：Session <Badge text="1.1.0+"/>

**会话**是对同一上下文的多次消息的一个抽象。它使用 `app.createSession()` 方法创建，并借助 `app.receiveMessage()` 实现其功能。因此，这个类下的大部分方法的返回都基于 [after-middleware](./receiver.md#事件：after-middleware) 事件。在提供了极大方便的同时，会话也存在一些限制。

::: tip 注意
严格上说 after-middleware 事件不能够代表一条信息被处理完成，因为存在以下几种特殊情况：

- 异步的 message 事件监听器可能仍未处理完成
- 中间件和指令中可能存在未阻塞的异步操作

因此，如果你的插件存在上面的某种情况，这个类的方法可能会返回预料之外的结果。你可以通过手动调用 [`sleep()`](./utils.md#sleep) 函数，让测试等待一段时间，来完成剩下的操作。
:::

::: tip 注意
会话的另一个限制是它的实现基于 Meta 方法和 [快捷操作](../guide/receive-and-send.md#快捷操作) 技术。因此它无法用于测试下列两种行为：

- 通过直接调用 Sender API 而非 Meta 方法的行为
- 对单一信息可能存在多条回复的行为

在这两种情况下，你仍然可以使用上面所述的 MockedServer API 来解决你的问题。
:::

### session.send(message) <Badge text="3.0.0+"/>

模拟发送一条消息。

- **message:** `string` 要发送的信息
- 返回值: `Promise<string[]>` 收到的回复列表

### session.shouldHaveReply(message, reply?)

断言某条信息应存在某些回复。

- **message:** `string` 要发送给机器人的信息
- **reply:** `string` 应有的回复，如果略去则不会进行比较
- 返回值: `Promise<void>`

### session.shouldMatchSnapshot(message)

断言某条信息应存在与快照一致的回复。

- **message:** `string` 要发送给机器人的信息
- 返回值: `Promise<void>`

### session.shouldHaveNoReply(message) <Badge text="3.0.0+"/>

断言某条信息不应存在任何回复。

- **message:** `string` 要发送给机器人的信息
- 返回值: `Promise<void>`

## 类：HttpServer <Badge text="1.1.0+"/>

用于测试的 CQHTTP HTTP 服务器。

### server.post(meta?)

向 Koishi 上报事件。

- **meta:** `Meta` 事件元信息对象
- 返回值: `Promise<AxiosResponse<any>>`

### server.createBoundApp(options?)

创建一个与当前服务器相关联的 App 实例。

- **options:** `AppOptions` 参见 [配置列表](../guide/config-file.md)
- 返回值: [`App`](./app.md)

### server.close()

关闭服务端和所有关联的 App 实例。

- 返回值: `Promise<void>`

## 类：WsServer <Badge text="1.1.0+"/>

用于测试的 CQHTTP WebSocket 服务器。

### server.post(meta?)

向 Koishi 上报事件。

- **meta:** `Meta` 事件元信息对象
- 返回值: `Promise<void>`

### server.nextTick()

等待任意一条请求。由于 WsServer 的 `post` 方法无法得知访问结果，因此最好与之结合使用。

- 返回值: `Promise<void>`

### server.createBoundApp(options?)

创建一个与当前服务器相关联的 App 实例。

- **options:** `AppOptions` 参见 [配置列表](../guide/config-file.md)
- 返回值: [`App`](./app.md)

### server.close()

关闭服务端和所有关联的 App 实例。

- 返回值: `Promise<void>`

## koishi-utils <Badge text="3.0.0+"/>

koishi-test-utils 导出了一个 `utils` 对象作为 koishi-utils 的副本，同时增加了手动控制其中部分函数返回值的机制。所有的 random 函数和 sleep 函数都将是 mockFn 实例，你可以在 [**这里**](https://jestjs.io/docs/zh-Hans/mock-function-api) 看到它们的详细文档。

除此以外，koishi-test-utils 还扩展了以下几个方法：

### utils.randomPick.mockIndex(index)

控制此后 randomPick 函数返回的数组元素。

- **index:** `number`  元素下标
- 返回值: `this` randomPick 函数本身

### utils.randomPick.mockIndexOnce(index)

控制下一次 randomPick 函数返回的数组元素。

- **index:** `number`  元素下标
- 返回值: `this` randomPick 函数本身

### utils.randomSplice.mockIndex(index)

控制此后 randomSplice 函数返回的数组元素。

- **index:** `number`  元素下标
- 返回值: `this` randomSplice 函数本身

### utils.randomSplice.mockIndexOnce(index)

控制下一次 randomSplice 函数返回的数组元素。

- **index:** `number`  元素下标
- 返回值: `this` randomSplice 函数本身

### utils.randomMultiPick.mockIndices(...indices)

控制此后 randomMultiPick 函数返回的数组元素。

- **indices:** `number`  元素下标列表
- 返回值: `this` randomMultiPick 函数本身

### utils.randomMultiPick.mockIndicesOnce(...indices)

控制下一次 randomMultiPick 函数返回的数组元素。

- **indices:** `number`  元素下标列表
- 返回值: `this` randomMultiPick 函数本身
