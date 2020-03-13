---
sidebarDepth: 1
noOutboundLinks: true
# replace: \(#(\d+)\) -> ([#$1](https://github.com/koishijs/koishi/pull/$1))
# replace: \(([0-9a-f]{7})([0-9a-f]{33})\) -> ([$1](https://github.com/koishijs/koishi/commit/$1$2))
---

# koishi 更新日志

本页面包括 koishi 及其依赖的更新日志。

## [1.11.0](https://github.com/koishijs/koishi/releases/tag/1.11.0)

### Features

- **core:** 新增了 `retryTimes` 和 `retryInterval` 配置项，支持 WebSocket 断线重连 ([#27](https://github.com/koishijs/koishi/pull/27)) ([f95f794](https://github.com/koishijs/koishi/commit/f95f794dd5ef9639da85d19518bd332917c06f8e), [c854300](https://github.com/koishijs/koishi/commit/c854300d24cbc15288248ec875a7bb8d63516d6d), [5a3cee4](https://github.com/koishijs/koishi/commit/5a3cee46df2dd4f1674d226065f54dcce31efe17))
- **core:** SenderError 中加入了 `selfId` 字段 ([77efd54](https://github.com/koishijs/koishi/commit/77efd5495e76a0920b0c33ae10185a050cf428ba))
- **core:** 新增了 `defaultAuthority` 配置项，用于配置默认权限等级 ([8b76734](https://github.com/koishijs/koishi/commit/8b76734de9263afec7a635c3d090d9c8586bdfaf))
- **plugin-common:** broadcast 指令默认不对 noEmit 群广播，新增 -f 选项用于对所有群广播 ([24ee7f2](https://github.com/koishijs/koishi/commit/24ee7f222245bd646cfcf41b8066d8ae7b5fc139))

### Bug Fixes

- **plugin-common:** 修复了 welcome 插件可能对自己触发的问题 ([49aee5f](https://github.com/koishijs/koishi/commit/49aee5fd48b9abf9a76bc2cbb412bfa6a4208aa1))

### Dependencies

- **core:** 新增依赖 ms，cac 版本从 6.5.6 更新到 6.5.7，ws 版本从 7.2.1 更新到 7.2.3 ([723e4a2](https://github.com/koishijs/koishi/commit/723e4a2fc954f62da9f7a9f97758cbacedf76328), [e2350d0](https://github.com/koishijs/koishi/commit/e2350d0deeb5b2f0cb46d8f27faba175801a1ccc))
- **plugin-nlp:** nodejiaba 版本从 2.4.0 更新到 2.4.1 ([e2350d0](https://github.com/koishijs/koishi/commit/e2350d0deeb5b2f0cb46d8f27faba175801a1ccc), [052cddb](https://github.com/koishijs/koishi/commit/052cddb5c285157800a7771062e32384813a183e))

## [1.10.1](https://github.com/koishijs/koishi/releases/tag/1.10.1)

### Bug Fixes

- **core:** 修复了同一个 subdatabase 无法注册到多个 DatabaseManager 的问题 ([ccfb687](https://github.com/koishijs/koishi/commit/ccfb687b7c69f4bd5ba7b4a758afa0bbfd4277e3))
- **core:** 指令执行前将确保 `argv.options` 的类型不为 undefined ([03dbe46](https://github.com/koishijs/koishi/commit/03dbe46cee5b5ec3dbfa1db35889747feb44823e))
- **plugin-common:** 修复了 contextify 指令中 `meta.$send` 输出目标错误的问题 ([f1eccdc](https://github.com/koishijs/koishi/commit/f1eccdcd46ec0f3fab6c95f4b8a81bbc0af943dc))

## [1.10.0](https://github.com/koishijs/koishi/releases/tag/1.10.0)

### Features

- **core:** 新增了 `meta.$argv` 属性 ([bbcdab2](https://github.com/koishijs/koishi/commit/bbcdab2cb9ca7039b637d7e648c36c7f890d8c74))
- **core:** 新增了 attach-user 和 attach-group 事件 ([8285c64](https://github.com/koishijs/koishi/commit/8285c646208915aab3d0d616fe05f6459831ad88))
- **core:** send 元信息将附带 time 字段 ([ef8a284](https://github.com/koishijs/koishi/commit/ef8a284498d33ba819569c0c41ff085e58cb9a92))
- **cli:** 优化了类型标注 ([17a6ee9](https://github.com/koishijs/koishi/commit/17a6ee9d441ff94701ff594dcd2943c787dbda13))
- **plugin-common:** 优化了子指令的帮助显示 ([09d9c75](https://github.com/koishijs/koishi/commit/09d9c75d4f769759165d839f225847c0b0e23e37))
- **plugin-common:** broadcast 指令支持 -o 参数 ([baf7f1f](https://github.com/koishijs/koishi/commit/baf7f1f662e6d3684e8c38bd30dc652a0baf0600))

### Bug Fixes

- **utils:** 修复了 `CQCode.parse` 无法处理带回车的文本的问题 ([6013f95](https://github.com/koishijs/koishi/commit/6013f9555c57f59e970668fa851177b5443d62eb), [4dffcf5](https://github.com/koishijs/koishi/commit/4dffcf57954d7163f51e6aa4e29aae32485cdeba))

## [1.9.0](https://github.com/koishijs/koishi/releases/tag/1.9.0)

### Features

- **core:** 优化了类型标注 ([f135818](https://github.com/koishijs/koishi/commit/f1358183a1eb81b02e779ada4ea146fb014845a0), [9318bfa](https://github.com/koishijs/koishi/commit/9318bfa0e8d8001e1d30c9f7ae9032c8ad9c7877), [9821cf7](https://github.com/koishijs/koishi/commit/9821cf739b7f28a1f7af38cd7eec7f078f5555d1))
- **core:** 支持了 CQHTTP 4.14 ([169089e](https://github.com/koishijs/koishi/commit/169089ec0f9b06c0d169f1fe6cd56a625b3f68fa))
- **core:** 重构了 debug logger ([068135e](https://github.com/koishijs/koishi/commit/068135e8ada1705bbca59990465079de0d490070))
- **plugin-common:** contextify 指令支持 at 其他成员了 ([1576873](https://github.com/koishijs/koishi/commit/15768737c4cb8c2c4493382af601eb31081e58e7))
- **plugin-common:** 支持了函数类型的 `commandConfig.usage` ([85cb06b](https://github.com/koishijs/koishi/commit/85cb06bbe4b79f6e118e3875adffe51f708912fb))

### Dependencies

- **cli:** prompts 版本从 2.3.0 更新到 2.3.1 ([03868f1](https://github.com/koishijs/koishi/commit/03868f14a9f99ed35de978d07598c60de0dbe5c8))

## [1.8.1](https://github.com/koishijs/koishi/releases/tag/1.8.1)

### Features

- **core:** 完善了实验性的 Usage API ([797bde2](https://github.com/koishijs/koishi/commit/797bde2ccd69c3ad7c4012e990e50d92814c2c7b))
- **utils:** `getDateNumber` 支持传入数字了 ([57657c0](https://github.com/koishijs/koishi/commit/57657c0860b1016fae4531fb8fb08bb8cd297eb1))

### Bug Fixes

- **core:** 修复了 `usage._date` 不会响应式更新的问题 ([f32a7e8](https://github.com/koishijs/koishi/commit/f32a7e8d4a1378cbf93b6bf96acc6643b085d835))

## [1.8.0](https://github.com/koishijs/koishi/releases/tag/1.8.0)

### Features

- **core:** 指令默认情况下将隐藏 -h, --help 选项 ([a84621d](https://github.com/koishijs/koishi/commit/a84621d61d9cbb8bb1d4322f0662c5eea91866cb))
- **core:** 优化了类型标注 ([2446723](https://github.com/koishijs/koishi/commit/24467231ae7313f680dc90aa6c2df02f7d938bd4))
- **core:** 优化了调用记录检查 ([5f8d8e1](https://github.com/koishijs/koishi/commit/5f8d8e12338d488d26cb06ff8de599878d85353f))
- **core:** 默认情况下将使用 debug 处理 logger 输出 ([ea8c3d1](https://github.com/koishijs/koishi/commit/ea8c3d120ba99f47b092a78cc743dec7ff6bcfa6))
- **cli:** 优化了启动时的报错提示 ([b510600](https://github.com/koishijs/koishi/commit/b51060089d75fdbce3686babdf255527f2a25b0b))
- **plugin-common:** 增加了 authorize 插件的 logger 提示 ([2f36aca](https://github.com/koishijs/koishi/commit/2f36aca21467a4ec5042fa532e90d7d2c2250928), [fb7dbe6](https://github.com/koishijs/koishi/commit/fb7dbe6553271713bc1c3dba7bd7ae5a5212e9fb))

### Bug Fixes

- **core:** 修复了 CommandConfig.disable 选项的无效行为 ([1cffdab](https://github.com/koishijs/koishi/commit/1cffdab6929edb4cb190e854442a2bf9cc83b34a))
- **core:** 修复了 disable 指令仍可以通过错误纠正机制被调用的问题 ([95cf878](https://github.com/koishijs/koishi/commit/95cf8787adeda7ba91b09e93da361178666274d4))
- **core:** 修复了无法处理 heartbeat 事件的问题 ([36a4602](https://github.com/koishijs/koishi/commit/36a460236acf114d760a05fbc9c2102718b17a86))
- **cli:** 修复了错误的路径解析 ([06d59b8](https://github.com/koishijs/koishi/commit/06d59b83a49b4d299a0422139102c23e64dca80e))
- **plugin-common:** 选项的显示将不考虑隐藏选项 ([6b1530a](https://github.com/koishijs/koishi/commit/6b1530a58594b1fd5b95da8f2c319e7eb0e75782))
- **plugin-common:** 修复了 authorization 的错误行为 ([76663bc](https://github.com/koishijs/koishi/commit/76663bcd82c1472cf4a4c3353c4614550eeb7be4))

### Dependencies

- **cli:** cac 版本从 6.5.5 更新至 6.5.6
- 所有官方数据库支持都将 koishi-core 改为 peerDependency

## [1.7.0](https://github.com/koishijs/koishi/releases/tag/1.7.0)

### Features

- **cli:** 输出日志时会显示 scope ([a245fa3](https://github.com/koishijs/koishi/commit/a245fa325b80a8925c06c751bc37cf715289e814))
- **core:** before-user, before-group, attach 三个事件将在对应的上下文触发 ([658944a](https://github.com/koishijs/koishi/commit/658944a5fcce5fcabae0731b4c62a97401b4ab3e))
- **plugin-common:** `registerUserInfo()` 支持传入第三个参数 ([7119a58](https://github.com/koishijs/koishi/commit/7119a584e1d3ef81b6e3dabc07c3ca45343dee95))
- **plugin-common:** 新增 `contextify --member` 选项 ([7eb6d20](https://github.com/koishijs/koishi/commit/7eb6d206b0e216f2198fd582e18fa917fb6244ed))
- **plugin-nlp:** 使用 `meta.$parsed.message` 取代 `meta.message` ([5d4d7fe](https://github.com/koishijs/koishi/commit/5d4d7fe0c6a0c20c81114f215ce2fa44730f59b9))
- **plugin-nlp:** `cmd.intend()` 将返回 `this` 以便链式调用 ([8036e02](https://github.com/koishijs/koishi/commit/8036e02c93098242119ee0d7c5fbfeac499957f2))

### Bug Fixes

- **core:** 快捷调用的 message 将自动去除头部空格 ([abb7498](https://github.com/koishijs/koishi/commit/abb749850f3d883105dec45f127ab8008948cc04), [f72ba21](https://github.com/koishijs/koishi/commit/f72ba21de418a7b71efc92821eb4aecbd42b066b))

### Dependencies

- **database-mysql**: mysql 版本从 2.18.0 更新到 2.18.1 ([dd2fbe3](https://github.com/koishijs/koishi/commit/dd2fbe3784303184d9cb4698f24d2be92275f447))

## [1.6.0](https://github.com/koishijs/koishi/releases/tag/1.6.0)

### Features

- **core:** 新增 `ctx.onceMiddleware()` ([7a1dd94](https://github.com/koishijs/koishi/commit/7a1dd9426bee8fc3440a7226aa93199482063dc4))
- **core:** 新增 `getUsage()` 和 `updateUsage()` 方法 ([1527159](https://github.com/koishijs/koishi/commit/15271593097cf80b9b94de5f9968f2124b7637a8))
- **core:** `meta.$stripped` 更改为 `meta.$parsed` ([c3b0b50](https://github.com/koishijs/koishi/commit/c3b0b5094a6776050fcabf4f0d51b7231225f6de))
- **core:** 新增 `sender.sendMsg()` 和 `sender.sendMsgAsync()` 方法 ([1c3cfee](https://github.com/koishijs/koishi/commit/1c3cfeee3d3231d4904fadbc0d27da30a3d8f1d7))
- **cli:** optimize ecosystem module resolution ([ed505b1](https://github.com/koishijs/koishi/commit/ed505b1c9413121f26dfb42a692706124a3e71c4))

### Bug Fixes

- **core:** `app.users` 等特殊上下文现在将按需生成了 ([3ae7e70](https://github.com/koishijs/koishi/commit/3ae7e7044d06daa2ea76e24af15358c5764b9887))
- **core:** 异步发送消息现在会触发 before-send 事件了 ([1c3cfee](https://github.com/koishijs/koishi/commit/1c3cfeee3d3231d4904fadbc0d27da30a3d8f1d7))

### Dependencies

- **core**: axios 版本从 0.19.1 更新到 0.19.2 ([6889e5d](https://github.com/koishijs/koishi/commit/6889e5ded06996b5e3e0cebbeaf0a8200937c5a7))
- **database-mysql**: mysql 版本从 2.17.1 更新到 2.18.0 ([6889e5d](https://github.com/koishijs/koishi/commit/6889e5ded06996b5e3e0cebbeaf0a8200937c5a7))

## [1.5.0](https://github.com/koishijs/koishi/releases/tag/1.5.0)

### Features

- **core:** 新增 after-middleware 事件 ([bb67894](https://github.com/koishijs/koishi/commit/bb678943188392705eddad03525eed993d147604))
- **core:** 内置运行时警告改为使用 `logger().warn()` 输出 ([d33781c](https://github.com/koishijs/koishi/commit/d33781c29166da397d051c6813c1573dc91a934c))
- **cli:** 优化了输出的提示 ([59052bb](https://github.com/koishijs/koishi/commit/59052bb0a6e7225cde00120cd6b240f53bb6233f))
- **cli:** 优化了错误处理函数 ([34ebc6e](https://github.com/koishijs/koishi/commit/34ebc6ee84c909eaa6a5e636eaa442d7af88ff64))
- **cli:** 支持在配置文件中使用对象/函数式的插件 ([37e4bdd](https://github.com/koishijs/koishi/commit/37e4bdda24eec669758f301ef3d72e9ff69fa503))

### Dependencies

- **cli:** cac 版本从 6.5.4 更新至 6.5.5 ([dfd279c](https://github.com/koishijs/koishi/commit/dfd279ceb95c2da1fe44e6fa7fb73bac36085417))

### Common Plugin 2.0.0

#### Breaking Changes

- 重构了传入的选项列表 ([c5c4283](https://github.com/koishijs/koishi/commit/c5c4283b14e7fbbb057655373972428d6d84fe67))
- 移除了 repeater 和 request-handler 插件的默认行为 ([117b12e](https://github.com/koishijs/koishi/commit/117b12efe3a9087a5cf1ca88d10cd4f2cc681f48))

#### Features

- 新增了 exec 指令 ([bf36c71](https://github.com/koishijs/koishi/commit/bf36c713cb7178d10a5c45db4963debfceeadd4f))
- authorize 指令优化与修复 ([e67243d](https://github.com/koishijs/koishi/commit/e67243deb309232c26d1e6feec05a680df31f5dc), [45f83ee](https://github.com/koishijs/koishi/commit/45f83ee069be04f71610080996ce79b8b4a54b4d))
- contextify 指令优化与修复 ([7769a50](https://github.com/koishijs/koishi/commit/7769a5097b4b2003866010a8bdae6b74a27a90bf))
- echo 指令优化与修复 ([fd2973f](https://github.com/koishijs/koishi/commit/fd2973fc0d98097823bf16e50668e468c2428901))
- info 指令优化与修复 ([e84d700](https://github.com/koishijs/koishi/commit/e84d7005282319e3bd930ee8f807895923a218f8))

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
