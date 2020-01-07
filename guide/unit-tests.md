---
sidebarDepth: 2
---

# 单元测试

如果你是一位插件开发者，比起让机器人真正运行起来，你或许会更希望使用**单元测试**，因为它具有许多前者所不具有的优点：

- 可以在无网络的情况下运行
- 可以模拟出多用户交互等复杂情况
- 可以在内存中模拟你想要的数据库
- 能够有效避免腾讯风控代理的损失
- 便于调试与错误定位

本章将介绍官方库 `koishi-test-utils`。它一个基于 [Jest](https://jestjs.io/zh-Hans/) 的单元测试工具集，你可以用它来快速检验你编写的 Koishi 插件和数据库实现。

## 准备工作

安装最新版本的 Jest 和 koishi-test-utils：

```sh
npm i jest koishi-test-utils -D
# 或者
yarn add jest koishi-test-utils -D
```

::: tip 提示
你可以在 [这里](../api/test-utils.md) 看到完整的接口列表和所需的最低版本。
:::

### 使用 TypeScript

如果你使用 TypeScript 进行开发，你可能还需要下面这些依赖（当然你可能已经安装了它们）：

```sh
npm i typescript @types/node @types/jest ts-jest -D
# 或者
yarn add typescript @types/node @types/jest ts-jest -D
```

接着编辑你的 `jest.config.js` 文件：

```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
}
```

## 模拟会话 <Badge text="1.1.0+"/>

Koishi 本身不需要会话的概念，因为 Meta 对象本身就具有 [快捷操作](./receive-and-send.md#快捷操作) 功能。但是在单元测试中，我们经常需要让一个用户多次向机器人发送信息，这时一个会话系统就变得非常有用了。

```js
const { App } = require('koishi-core')
const { Session } = require('koishi-test-utils')

// 创建一个无服务端的 App 实例
const app = new App({ selfId: 514 })
const session = new Session(app, 'user', 123)

test('example 1', () => {
  // 将 foo 发送给机器人将会获得 bar 的回复
  await session.shouldHaveResponse('foo', 'bar')

  // 将 foo 发送给机器人将会获得某些回复
  await session.shouldHaveResponse('foo')

  // 将 foo 发送给机器人将不会获得任何回复
  await session.shouldHaveNoResponse('foo')

  // 将 foo 发送给机器人后将会获得与快照一致的回复
  await session.shouldMatchSnapshot('foo')
})
```

## 模拟数据库 <Badge text="1.1.0+"/>

koishi-test-utils 不仅能够模拟会话，还能够模拟数据库。它自带了一种 memory 数据库，你可以像这样使用它：

```js
const { registerDatabase } = require('koishi-core')
const { MemoryDatabase } = require('koishi-test-utils')

// 注册 memory 数据库
registerDatabase('memory', MemoryDatabase)

const app = new App({
  database: { memory: {} },
})
```

## 测试数据库

你可以使用 `testDatabase()` 方法测试你编写的数据库。下面是一个简单的例子，它测试了我们刚刚介绍的 memory 数据库：

```js
const { testDatabase } = require('koishi-test-utils')

// 传入两个参数
// 第一个参数是 App 的构造选项
// 第二个参数是每个测试阶段要执行的钩子函数，这些函数将用于手动清理数据库
testDatabase({ memory: {} }, {
  beforeEachUser: app => app.database.memory.store.user = [],
  beforeEachGroup: app => app.database.memory.store.group = [],
})
```

这个函数将测试所有 [内置的数据库方法](../api/database.md#内置方法) 是否已经被实现。

除此以外，你还可以测试你扩展的数据库接口，就像这样：

```js
const { testDatabase } = require('koishi-test-utils')

// 返回一个 App 实例
const app = testDatabase(options, hooks)

test('other methods', () => {
  // do something with `app`
})
```
