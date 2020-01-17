---
sidebarDepth: 1
noOutboundLinks: true
# replace: \(#(\d+)\) -> ([#$1](https://github.com/koishijs/koishi/pull/$1))
# replace: \(([0-9a-f]{7})([0-9a-f]{33})\) -> ([$1](https://github.com/koishijs/koishi/commit/$1$2))
---

# koishi 更新日志

本页面包括 koishi 及其依赖的更新日志。

## [1.4.0](https://github.com/koishijs/koishi/releases/tag/1.4.0)

### Features

- **cli:** 支持 ts 作为配置文件后缀名 ([f551d44](https://github.com/koishijs/koishi/commit/f551d44e59351c60d12255b641407aa201505c8d))
- **cli:** koishi init 命令将自动创建文件所在的目录 ([644c6b3](https://github.com/koishijs/koishi/commit/644c6b36274a8fdc3c3b76c0e92bb266ca0302e3))
- **cli:** 内置插件将直接被 koishi 导出 ([e9c3b9c](https://github.com/koishijs/koishi/commit/e9c3b9cb68d2b2db48cf7cc399f041baf162ef94))
- **core:** 新增 `app.status` 属性表示应用状态 ([75c64b3](https://github.com/koishijs/koishi/commit/75c64b3db2b8527dce0d5a19be6c84aa6f620e27))
- **core:** send 事件的元信息对象将带有 `userId` 属性 ([edee314](https://github.com/koishijs/koishi/commit/edee314c6e13ba8488e21c4912b8b02625f8a41d))
- 移除已经废弃的 `user.name` 属性和 `rank`, `callme`, `likeme` 指令 ([9674079](https://github.com/koishijs/koishi/commit/96740791da106eec7c828e941368134ee00413fd), [87be3c1](https://github.com/koishijs/koishi/commit/87be3c1d5219c22f2390b214419bcf0a8e71d5ab), [20ebbae](https://github.com/koishijs/koishi/commit/20ebbae66e975f73c5e00edc8eb538df62cc5286), [ce4feb1](https://github.com/koishijs/koishi/commit/ce4feb16f9aa692da62bc4f6c102815db9d74a37), [9293540](https://github.com/koishijs/koishi/commit/9293540991161d466d5b5090d6f6d4d6cda6662b))

### Bug Fixes

- **cli:** 修复了 `PluginConfig` 的类型 ([b3501a6](https://github.com/koishijs/koishi/commit/b3501a607ea4d450be388896b2c6e40c5fa2350b))
- **core:** `getTargetId` 函数将检测输入的类型 ([00ab2ce](https://github.com/koishijs/koishi/commit/00ab2cec270d4fa439c50a5672c1dd2f5344e443))

## [1.3.1](https://github.com/koishijs/koishi/releases/tag/1.3.1)

### Features

- **cli:** 支持向子进程传入 execArgv ([3bb9f5a](https://github.com/koishijs/koishi/commit/3bb9f5afa1b89c2718d24ea5ddace2f50dc9b193))
- **plugin-common:** 支持 requestHandler 传入字符串 ([936c871](https://github.com/koishijs/koishi/commit/936c871919f2ffbe2d421da2c92ae3c10139e87e))
- **plugin-common:** 优化了 admin 指令的调用，增加了一些操作方式 ([0cc58cf](https://github.com/koishijs/koishi/commit/0cc58cffa6ed750124963f65b8c1cfaf82da752f))

### Bug Fixes

- **cli:** 修复了错误的输出等级设置 ([ab967c4](https://github.com/koishijs/koishi/commit/ab967c4c465e957106ea1b3c1a4f5f8faf8c70d4), [38cc1e1](https://github.com/koishijs/koishi/commit/38cc1e14d681239746dd84f72e4868241521203b))
- **core:** 修复了同时使用长参数和 oneArg 选项时的错误行为 ([71a0174](https://github.com/koishijs/koishi/commit/71a0174835170304883dbfb146b17edc38fcd78b), [1932845](https://github.com/koishijs/koishi/commit/1932845ff3962bce16e2454fb40ff64b6c0b9725))
- **database-sqlite:** 修复了 sqlite 注入类型错误 ([f592c6c](https://github.com/koishijs/koishi/commit/f592c6cca9143f87e4e311262cd01ea5b0825a3e))
- **plugin-common:** 为 help 执行添加了 userFields ([c7650cb](https://github.com/koishijs/koishi/commit/c7650cbc4df2772ce609b33bc8f9a1025efb4cef))

## [1.3.0](https://github.com/koishijs/koishi/releases/tag/1.3.0)

### Features

- **core:** 支持了 `ctx.logger()` 方法和 `logger` 事件 ([5e5e93e](https://github.com/koishijs/koishi/commit/5e5e93e0f8ed112ddbdf14f2ec1205c466b3ab03), [1e0848e](https://github.com/koishijs/koishi/commit/1e0848e05d4f136dee6689d03657c7bbde4660c6), [fa5c46e](https://github.com/koishijs/koishi/commit/fa5c46e13ed5f179aca0624e20e3894359c4be2b))
- **cli:** 支持通过 logLevel, logFilter 等控制输出等级 ([befca0f](https://github.com/koishijs/koishi/commit/befca0fd39bde6fddb2319d13fa2f3f320335810))
- **cli:** 处理 `unhandledRejection` 事件并输出 ([8f6d6fa](https://github.com/koishijs/koishi/commit/8f6d6fababd9ee4534eff17853182f2b8a80d6d8))
- **cli:** 支持 yaml/yml 作为配置文件类型 ([27645a4](https://github.com/koishijs/koishi/commit/27645a4803af77257f544bbd709c62f2dc2cd11d))
- **plugin-common:** repeater 插件的部分选项支持 `message` 参数 ([e67b817](https://github.com/koishijs/koishi/commit/e67b81749b731574f2fdbfd36bb3a150165d8c9b))
- **plugin-schedule:** 正式发布 koishi-plugin-schedule 1.0.0 版本，并作为 koishi 的内置插件 ([27645a4](https://github.com/koishijs/koishi/commit/27645a4803af77257f544bbd709c62f2dc2cd11d))

### Bug Fixes

- **plugin-common:** 修复了 authorize 插件无法使用的问题 ([5a777a9](https://github.com/koishijs/koishi/commit/5a777a964b6fb2906ca85e1c833d0fd277d71578))
- **database-mysql:** 修复了 `db.getGroup()` 报错的问题 ([#16](https://github.com/koishijs/koishi/pull/16)) ([3ce0c70](https://github.com/koishijs/koishi/commit/3ce0c70b771e74fc93dd41cc0ec08a0952a42174))

### Dependencies

- **core:** cac 版本从 6.5.3 更新至 6.5.4 ([ed9d61b](https://github.com/koishijs/koishi/commit/ed9d61bd77eef52c85c9b2037a282b67fb8c2151))

## [1.2.0](https://github.com/koishijs/koishi/releases/tag/1.2.0)

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

## [1.1.1](https://github.com/koishijs/koishi/releases/tag/1.1.1)

### Features

- **core:** 支持数组结构的[消息格式](https://cqhttp.cc/docs/4.13/#/Message) ([766ba8e](https://github.com/koishijs/koishi/commit/766ba8efcd724717d89608a692c68a00059aa1cd))
- **utils:** 新增 `CQCode.stringifyAll()` 和 `CQCode.parseAll()` ([764b816](https://github.com/koishijs/koishi/commit/764b816b50a84c09e577cb6b315ebdf584156747))

### Bug Fixes

- **core:** 在 `cmd.execute()` 中等待错误提示的发送 ([3783f42](https://github.com/koishijs/koishi/commit/3783f42bc9df8afb0d83dc187cd756b89eb5ef0a))

## [1.1.0](https://github.com/koishijs/koishi/releases/tag/1.1.0)

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

## [1.0.1](https://github.com/koishijs/koishi/releases/tag/1.0.1)

### Bug Fixes

- **cli:** koishi init 指令被 SIGINT 打断输入时自动取消文件写入 ([1c59df5](https://github.com/koishijs/koishi/commit/1c59df5bdd9db1b5b67e4ee376826793f34747ab))
- **utils:** observe 传入的 update 函数应该覆盖过去的版本 ([7f9756c](https://github.com/koishijs/koishi/commit/7f9756cf0996440c743464dd359cffc91ae6442e), [126cb03](https://github.com/koishijs/koishi/commit/126cb03cc0576cac8e4916437fbe5fd524d265de))
