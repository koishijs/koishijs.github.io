---
sidebarDepth: 1
noOutboundLinks: true
# replace: \(#(\d+)\) -> ([#$1](https://github.com/koishijs/koishi/pull/$1))
# replace: \(([0-9a-f]{7})([0-9a-f]{33})\) -> ([$1](https://github.com/koishijs/koishi/commit/$1$2))
---

# koishi-test-utils 更新日志

本页面包括 koishi-test-utils 的更新日志。

## 2.0.0 (koishi 1.5.0)

### Breaking Changes

- `mockedApp.receive()` 改为同步函数 ([dd851f8](https://github.com/koishijs/koishi/commit/dd851f84888478040d8092807adb4f4bc486a529))
- `MemoryDatabase` 成为独立的包 koishi-database-memory ([e06b98e](https://github.com/koishijs/koishi/commit/e06b98ee0d71cf8bf806f196e1c830f418550154))

### Features

- MockedServer API ([2c5ab8f](https://github.com/koishijs/koishi/commit/2c5ab8fb864ca247bfa8cb37fd79e32f5d24b6fa))
- MemoryDatabase API ([2c94ac6](https://github.com/koishijs/koishi/commit/2c94ac6f827929c95b79bfcd8e085e1636b62732))

### Bug Fixes

- 修复了调用 `sender.sendPrivateMsgAsync()` 时没有自动去除 `_async` 后缀的问题 ([8c3f3cc](https://github.com/koishijs/koishi/commit/8c3f3cc7e264e35c505b3aa80906572c493bbf61))

### Dependencies

- get-port 版本从 5.1.0 更新至 5.1.1 ([dfd279c](https://github.com/koishijs/koishi/commit/dfd279ceb95c2da1fe44e6fa7fb73bac36085417))

## 1.2.2 (koishi 1.4.0)

## 1.2.1 (koishi 1.3.1)

## 1.2.0 (koishi 1.3.0)

### Features

- `mockedApp` 内置 logger 将输出到 debug ([0365842](https://github.com/koishijs/koishi/commit/036584297359bf63a4e7b0458502bb89f3c2533f))
- 新增 `mockedApp.receiveMessage()` 等方法 ([3fc34bd](https://github.com/koishijs/koishi/commit/3fc34bdb4b486d19f18419f7621957b5648cb47a))

### Bug Fixes

- 修复了 `mockedApp.shouldHaveLastRequests()` 的类型批注 ([a3c8494](https://github.com/koishijs/koishi/commit/a3c8494c62fc5089493e931a8b1186ad55f0bab4))

## 1.1.0 (koishi 1.2.0)

### Features

- `testDatabase()` 第二个参数改为必选
- 新增 `createHttpServer()` 和 `createWsServer()`，用于模拟 CQHTTP 服务器
- 新增类 `MemoryDatabase`，用于在内存中模拟数据库
- 新增类 `MockedApp`，用于在无网络环境下测试

### Dependencies

- 将 jest 和 koishi-core 设为同版本依赖
- 新增了 get-port 依赖，移除了 express 依赖
- axios 版本从 0.19.0 更新至 0.19.1
