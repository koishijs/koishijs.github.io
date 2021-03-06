---
sidebarDepth: 1
noOutboundLinks: true
---

# v3 更新日志

## [Koishi 3.0.1](https://github.com/koishijs/koishi/releases/tag/3.0.1)

### Features

- **core:** 检测插件副作用和允许显式声明依赖 (=63956992afd49156cd7da528133cab1c9cdf520b, =2ec250f14f48a1d58cbc835d09166607562c86b7)
- **core:** 优化了 Database.extend 的类型标注 (=04ac3393412e15202a015796ce15a1cd32b12f39)
- **core:** 群组会话中，无前缀无称呼的消息将不会触发建议 (=d5a6f4e5f61fb6716e9a1cc6b15f9aeefa3501d8)
- **utils:** 新增了 `random.digits()` 方法 (=0ba42f9f92e75843dd1ed3419e4d8f7a0a1b77bd)
- **adventure:** 优化了编码逻辑，不再直接访问 mysql 插件 (=d5cb6a33b7950549b5fb9565925f8e4bacfcd5b2)
- **common:** 新增了 `config.generateToken` 配置项 (=e25588622ef16cce84c91a1a09e74c6b6c8c0a57)
- **common:** 优化了复读机的配置，并撰写了相关单元测试 (=4280a42346ea908c7e646f92a8e874936cc4df4c)
- **discord:** 优化了 embed 相关特性 (#145) (=f49073282e8bfbc0796249978db1f42b4fb79bc1)
- **puppeteer:** 支持了对特定选择器截图 (=278f85de9da74ec97679017e62a680cffe62f679)
- **test-utils:** 优化了断言方法的错误提示 (=bc53e08cafe8d95b2404d2cd00a989e3c960fdb6)
- **webui:** 实现了多级插件列表的显示 (=b338c445a7e731d42c8379426e5ce47a02024763)

### Bug Fixes

- **schedule:** 修复了热重载时可能发生内存泄漏的问题 (=1483031793fe0f62adc80d88f1ac3c9caaa48aa0)
- **test-utils:** 修复了错误的 MemoryDatabase 实现 (=e71590d5d2cf23a48a9f121dddd379d0558564f5)
