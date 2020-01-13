---
sidebarDepth: 1
noOutboundLinks: true
# replace: \(#(\d+)\) -> ([#$1](https://github.com/koishijs/koishi/pull/$1))
# replace: \(([0-9a-f]{7})([0-9a-f]{33})\) -> ([$1](https://github.com/koishijs/koishi/commit/$1$2))
---

# Koishi 更新日志

本页面包括 koishi 及其依赖的更新日志。

## 1.2.0

### Features

- **core:** 移除了 `meta.$path` 属性
- **core:** 优化了一些类型标注 ([c8f01f8](https://github.com/koishijs/koishi/commit/c8f01f8cc9afde1b20bd202f914d7e3c8b523be0), [f8e1c1b](https://github.com/koishijs/koishi/commit/f8e1c1b686e75b0ccc4e5fce85b53563b1b22404))
- **plugin-common:** respondent 插件支持简繁体模糊匹配 ([cb58388](https://github.com/koishijs/koishi/commit/cb5838833edda734570b24d3d350b7dcc128df96))

### Bug Fixes

- **core:** `server.listen()` 失败后将自动调用 `server.close()` ([ea5c2c9](https://github.com/koishijs/koishi/commit/ea5c2c933f1fb0a6f4c52a8dccab5ec3e7e63b6d))
- **core:** 允许 `injectMethods()` 在 `registerDatabase()` 之前调用 ([9540892](https://github.com/koishijs/koishi/commit/9540892c34007f36cde147ef64bae5fd27773d0f))
- **core:** 修复了 `showSuggestions` 在非私聊上下文出错的问题 ([8253522](https://github.com/koishijs/koishi/commit/8253522eba27099520838857353ed2933bef028b))
- **plugin-common:** 修复了 requestHandler 插件在无数据库环境下报错的问题 ([cb58388](https://github.com/koishijs/koishi/commit/cb5838833edda734570b24d3d350b7dcc128df96))
- **plugin-common:** 修复了 welcome 插件在无数据库环境下报错的问题 ([ea5c2c9](https://github.com/koishijs/koishi/commit/ea5c2c933f1fb0a6f4c52a8dccab5ec3e7e63b6d))

### Dependencies

- **core:** axios 版本从 0.19.0 更新至 0.19.1 ([01bebe0](https://github.com/koishijs/koishi/commit/01bebe0a234601b85197c1cd1200bf6c2e441863))

## 1.1.1

### Features

- **core:** 支持数组结构的[消息格式](https://cqhttp.cc/docs/4.13/#/Message) ([766ba8e](https://github.com/koishijs/koishi/commit/766ba8efcd724717d89608a692c68a00059aa1cd))
- **utils:** 新增 `CQCode.stringifyAll()` 和 `CQCode.parseAll()` ([764b816](https://github.com/koishijs/koishi/commit/764b816b50a84c09e577cb6b315ebdf584156747))

### Bug Fixes

- **core:** 在 `cmd.execute()` 中等待错误提示的发送 ([3783f42](https://github.com/koishijs/koishi/commit/3783f42bc9df8afb0d83dc187cd756b89eb5ef0a))

## 1.1.0

### Features

- **core:** ready 事件总是在 connect 事件之后触发 ([21197df](https://github.com/koishijs/koishi/commit/21197dfef3092cd0c5ea3c38922ff32ecefb234c))
- **core:** `cmd.option()` 允许略去 description 参数 ([1c3b203](https://github.com/koishijs/koishi/commit/1c3b203de92944ef04f20ccdc2dbda300ca08fdf))
- **core:** 新增 `app.executeCommandLine()` 用于直接运行指令 ([#9](https://github.com/koishijs/koishi/pull/9)) ([bcd3ed6](https://github.com/koishijs/koishi/commit/bcd3ed6a515f33cb6e440cff5bb0d12b719a1e43))

### Bug Fixes

- **core:** `ctx.command()` 未传入 description 参数时，不会覆盖已有的值 ([f1c3605](https://github.com/koishijs/koishi/commit/f1c360547370c7161754163d881a5df69a4c5fa8))
- **utils:** 优化了 `CQCode.unescape()` 中的替换顺序 ([1c8e33c](https://github.com/koishijs/koishi/commit/1c8e33cf939af6159c956d72447615adf319ff3e))
- **plugin-common:** help 指令将不会将指令名显示为别名 ([e22653b](https://github.com/koishijs/koishi/commit/e22653b227cc8e373b2df47a0c908b1c0d9a6cbc))

### Dependencies

- **core:** ws 版本从 7.2.0 更新至 7.2.1 ([25a6359](https://github.com/koishijs/koishi/commit/25a635954802be9caf0b48a4a440908503e42ca5))
- **database-level:** 将 @types/leveldown, @types/levelup 加入依赖 ([3e53e9e](https://github.com/koishijs/koishi/commit/3e53e9ef037002500fbaa16708579f1cafc7bb16))

## 1.0.1

### Bug Fixes

- **cli:** koishi init 指令被 SIGINT 打断输入时自动取消文件写入 ([1c59df5](https://github.com/koishijs/koishi/commit/1c59df5bdd9db1b5b67e4ee376826793f34747ab))
- **utils:** observe 传入的 update 函数应该覆盖过去的版本 ([7f9756c](https://github.com/koishijs/koishi/commit/7f9756cf0996440c743464dd359cffc91ae6442e), [126cb03](https://github.com/koishijs/koishi/commit/126cb03cc0576cac8e4916437fbe5fd524d265de))

