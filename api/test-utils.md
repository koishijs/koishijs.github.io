---
sidebarDepth: 2
---

# 测试工具 (Test Utils)

包含了被 Koishi 使用的测试工具，它们由 `koishi-test-utils` 包提供。

::: tip 注意
本页显示的版本号都表示对应的 koishi-test-utils 版本号（而不是对应的 koishi 版本号）。
:::

## MemoryDatabase <Badge text="1.1.0+"/>

内存数据库类。参见 [模拟数据库](../guide/unit-tests.md#模拟数据库)。

## testDatabase(options, hooks)

测试全部内置数据库方法。

- **options:** `AppOptions` App 的构造函数选项，参见 [配置列表](../guide/config-file.md#配置列表)
- **hooks:** `TestDatabaseOptions` 测试中执行的钩子函数
- 返回值: [`App`](./app.md) 用于测试的 App 实例

```ts
type TestHook = (app: App) => any

export interface TestDatabaseOptions {
  beforeEachUser?: TestHook
  afterEachUser?: TestHook
  beforeEachGroup?: TestHook
  afterEachGroup?: TestHook
}
```

## createHttpServer(token?) <Badge text="1.1.0+"/>

模拟一个 CQHTTP HTTP 服务器。

- **token:** `string` 验证字段
- 返回值: [`Promise<HttpServer>`](#类：httpserver)

## createWsServer(token?) <Badge text="1.1.0+"/>

模拟一个 CQHTTP WebSocket 服务器。

- **token:** `string` 验证字段
- 返回值: [`Promise<WsServer>`](#类：wsserver)

## 类：MockedApp <Badge text="1.1.0+"/>

### new MockedApp(options?)

创建一个无网络 App 实例。参见 [模拟事件上报](../guide/unit-tests.md#模拟事件上报)

- **options:** `AppOptions` 参见 [配置列表](../guide/config-file.md#配置列表)
- 返回值: [`MockedApp`](#类：mockedapp)

### mocked.receive(meta)

模拟一次事件上报。

- **meta:** `Meta` 事件元信息对象
- 返回值: `Promise<void>`

### mocked.shouldHaveLastRequest(method, params?)

断言最后发送的请求，并清空请求列表。

- **method:** `string` 请求名称，不用写 async
- **params:** `Record<string, any>` 请求参数，可以略去部分
- 返回值: `void`

### mocked.shouldHaveLastRequests(requests)

按从先往后的顺序断言最后发送的多个请求，并清空请求列表。

- **requests:** `[string, Record<string, any>?][]` 请求内容列表
- 返回值: `void`

### mocked.shouldHaveNoRequests()

断言没有发送任何请求。

- 返回值: `void`

### mocked.clearRequests()

并清空请求列表。

- 返回值: `void`

### mocked.createSession(ctxType, userId, ctxId?)

- **ctxType:** `'user' | 'group' | 'discuss'` 上下文类型
- **userId:** `number` 发言用户 ID
- **ctxId:** `number` 群号或讨论组号（如果是私聊则不需要这个参数）
- 返回值: [`Session`](#类：session) 会话对象

## 类：Session <Badge text="1.1.0+"/>

### session.send(message)

模拟发送一条消息。

- **message:** `string` 要发送的信息
- 返回值: `Promise<ResponsePayload>` 收到的第一个回复，如果没有则为 `null`

```ts
export interface ResponsePayload {
  delete?: boolean
  ban?: boolean
  banDuration?: number
  kick?: boolean
  reply?: string
  autoEscape?: boolean
  atSender?: boolean
  approve?: boolean
  remark?: string
  reason?: string
}
```

### session.shouldHaveReply(message, reply?)

断言某条信息应存在某些回复。

- **message:** `string` 要发送给机器人的信息
- **reply:** `string` 应有的回复，如果略去则不会进行比较
- 返回值: `Promise<void>`

### session.shouldMatchSnapshot(message)

断言某条信息应存在与快照一致的回复。

- **message:** `string` 要发送给机器人的信息
- 返回值: `Promise<void>`

### session.shouldHaveNoResponse(message)

断言某条信息不应存在任何回复。

- **message:** `string` 要发送给机器人的信息
- 返回值: `Promise<void>`

## 类：TestServer <Badge text="1.1.0+"/>

HttpServer 和 WsServer 共同的父类，上面封装了一些用于测试的方法。

### server.shouldHaveLastRequest(method, params)

断言最后发送的请求，并清空请求列表。

- **method:** `string` 请求名称，不用写 async
- **params:** `Record<string, any>` 请求参数，可以略去部分
- 返回值: `void`

### server.shouldHaveNoRequests()

断言没有发送任何请求。

- 返回值: `void`

### server.clearRequests()

并清空请求列表。

- 返回值: `void`

### server.setResponse(method, data, retcode?)

预先设置客户端请求的结果。

- **method:** `string` 请求名称
- **data:** `Record<string, any>` 返回数据
- **retcode:** `number` 返回的错误码，默认为 `0`
- 返回值: `void`

### server.createBoundApp(options?)

创建一个与当前服务器相关联的 App 实例。

- **options:** `AppOptions` 参见 [配置列表](../guide/config-file.md#配置列表)
- 返回值: [`App`](./app.md)

### server.close()

关闭服务端和所有关联的 App 实例。

- 返回值: `Promise<void>`

## 类：HttpServer <Badge text="1.1.0+"/>

用于测试的 CQHTTP HTTP 服务器。

### server.post(meta?)

向 Koishi 上报事件。

- **meta:** `Meta` 事件元信息对象
- 返回值: `Promise<AxiosResponse<any>>`

## 类：WsServer <Badge text="1.1.0+"/>

用于测试的 CQHTTP WebSocket 服务器。

### server.post(meta?)

向 Koishi 上报事件。

- **meta:** `Meta` 事件元信息对象
- 返回值: `Promise<void>`

### server.nextTick()

等待任意一条请求。由于 WsServer 的 `post` 方法无法得知访问结果，因此最好与之结合使用。

- 返回值: `Promise<void>`
