---
sidebarDepth: 1
noOutboundLikes: true
---

# v3 更新日志

## [Koishi 3.0.1](https://github.com/koishijs/koishi/releases/tag/3.0.1)

### Features

- **core:** side effect detection (63956992afd49156cd7da528133cab1c9cdf520b)
- **discord:** improvements (#145) (f49073282e8bfbc0796249978db1f42b4fb79bc1)
- **adventure:** use extendDatabase instead of directly calling mysql (d5cb6a33b7950549b5fb9565925f8e4bacfcd5b2)
- **core:** better database extend typings (04ac3393412e15202a015796ce15a1cd32b12f39)
- **core:** support ctx.addDependency (2ec250f14f48a1d58cbc835d09166607562c86b7)
- **webui:** setup plugin list (b338c445a7e731d42c8379426e5ce47a02024763)
- **puppeteer:** support selector (278f85de9da74ec97679017e62a680cffe62f679)
- **utils:** support random.digits() (0ba42f9f92e75843dd1ed3419e4d8f7a0a1b77bd)
- **test-utils:** optimize assertion output (bc53e08cafe8d95b2404d2cd00a989e3c960fdb6)
- **core:** empty prefix in group context do not trigger suggestion (d5a6f4e5f61fb6716e9a1cc6b15f9aeefa3501d8)
- **common:** support config.generateToken (e25588622ef16cce84c91a1a09e74c6b6c8c0a57)
- **common:** enhance repeater config (4280a42346ea908c7e646f92a8e874936cc4df4c)

### Bug Fixes

- **schedule:** 修复了热重载时可能发生内存泄漏的问题 (1483031793fe0f62adc80d88f1ac3c9caaa48aa0)
- **test-utils:** 修复了错误的 MemoryDatabase 实现 (e71590d5d2cf23a48a9f121dddd379d0558564f5)
