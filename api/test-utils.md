---
sidebarDepth: 2
---

# 测试工具 (Test Utils)

包含了被 Koishi 使用的测试工具，它们由 `koishi-test-utils` 包提供。

::: tip 注意
本页显示的版本号都表示对应的 koishi-test-utils 版本号（而不是对应的 koishi 版本号）。
:::

## MemoryDatabase <Badge text="1.1.0+"/>

一个将数据存在内存中的数据库。你应该这样使用它：

```js
const { registerDatabase } = require('koishi-core')
const { MemoryDatabase } = require('koishi-test-utils')

registerDatabase('memory', MemoryDatabase)

const app = new App({
  database: { memory: {} },
})
```

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

## 会话 (Session) <Badge text="1.1.0+"/>

### new Session(app, type, userId, ctxId?)

创建一个新的会话对象。

- **app:** [`App`](./app.md) 绑定的 App 实例
- **type:** `'user' | 'group' | 'discuss'` 上下文类型
- **userId:** `number` 发言用户 ID
- **ctxId:** `number` 群号或讨论组号（如果是私聊则不需要）

### ses.shouldHaveReply(message, reply?)

断言某条信息应存在某些回复。

- **message:** `string` 要发送给机器人的信息
- **reply:** `string` 应有的回复，如果略去则不会进行比较
- 返回值: `Promise<void>`

### ses.shouldMatchSnapshot(message)

断言某条信息应存在与快照一致的回复。

- **message:** `string` 要发送给机器人的信息
- 返回值: `Promise<void>`

### ses.shouldHaveNoResponse(message)

断言某条信息不应存在任何回复。

- **message:** `string` 要发送给机器人的信息
- 返回值: `Promise<void>`
