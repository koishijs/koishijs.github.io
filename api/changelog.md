---
sidebarDepth: 1
noOutboundLinks: true
---

# v3 更新日志

## [Koishi 3.2.1](https://github.com/koishijs/koishi/releases/tag/3.2.1)

## Notable Changes

- 下一代 status 插件支持了沙箱和登录功能，并提供了 mongo 数据库支持

## Features

- **database:** 支持了自定义表，允许不同数据库对统一功能提供不同实现 (=875f75b16e0205ae0492823c8cab61014e5f5e71)
- **status:** 加入了路由，导航栏和侧边栏，优化了页面样式 (=89583a357814ce286637da45e8d1f25d99d5fb23, =c8df0fa9f27e6373603d5fa0c5ed02ae3b4dbe72, =86043a4ac33e2ac2ccf7f53e6c4969f79ae9ef67, =1cf52be1b6c11136d16e44fb2917427efc40db39, =42381c5d5752d9af63525ec5b34945a4e587f973, =5ff956f8cc6f2e2ff22f471a4de34d0e02afc2dd, =bd33be6536a6a33f18e6f754f8186f9ddd49c775)
- **status:** 实现了沙箱和登录功能，增加了 token 机制 (=bf99513a04e7199e71ede2a22cc66ff7b8b17bb5, =c50ba31962e8ae53bf251ed858c1ef5e565439ed, =064810cf22b89131feb4b7ef86a9d52e79b07514, =bbfac8af45384f3e2f8f4b31857bf4e14fdb98a2, =2e03e5d3dc01627d62820f74d4b1248965d98a19)
- **status:** 优化了数据传输接口，并支持显示数据库大小 (=d17428e25b82248e0ff428554da25d3db30a4659, =dfdba08a6c913c97b8edf44db89274401e715998)
- **status:** 提供了 mongo 数据库支持 (#160) (=6956c815bfa2522b5e47619b425e4dd2c8e953ae)
- **utils:** 新增了 `remove()` 帮助函数 (=e50017899232a6772133fec94bc6c8e8438b4854)

## Bug Fixes

- **core:** 将 disable 设置为指令所需字段，修复了定时指令报错的问题 (#155) (=97d8732cf6f0be32057dde4ef14ae51d6aff151d)
- **status:** 修复了仪表盘中图表溢出界面问题，在沙箱中提供了自动滚动至底部的功能 (#157) (=a9760356c02698733b7ac05364462187bae03239)
- **discord:** 回退了上个版本更新的 embed segment，采用会话属性的方式重新实现 (=7da07841c18dd3c83e42f60e0e0750f7dd66bb78)
- **core:** 修复了快捷调用不会受到上下文限制的问题 (#159) (=49c2c398c956cd6365e3462a5c38168a8011ba97)

## [Koishi 3.2.0](https://github.com/koishijs/koishi/releases/tag/3.2.0)

### Notable Changes

- koishi-plugin-chess@3.0.0 正式发布
- 发布了下一代 status 插件的第一个 alpha 版本，新版本将包含一个网页 UI，整合了丰富的数据统计功能，包括消息数量统计、指令调用统计和问答文字云等等

### Features

- **core:** 优化了 `ctx.dispose()` 发生错误时的处理逻辑 (=bf1801146ba183f904e228aa8db50643436f732e)
- **core:** 支持了非 apply 形式的 Database 成员 (=e90bf73c54d0f367fafff9cf85585bd50c2ce68b)
- **adventure:** 支持了 disposable 协议 (=1e91ae599cb383c66c4472ba0bd8fdf7f6651d1d)
- **common:** 优化了 switch 指令的提示文本 (=389341f67175168aa9e510ae4ae73bfa98a7b6f4)
- **discord:** 在消息中添加了 embed segment (=22dc77439c7fec81b2c1bf545fb8f136112aeebd)
- **image-search:** 优化了错误处理 (=14a2aeeb4aacdc91af36b733e358487d2ac0cefd)
- **status:** 支持了网页端和数据统计功能 (=9dcdd694735a12ee767c379594446f29e867e41a, =10e9bf696fe861e1e96c86b960fac53dfdd09dc4, =964390b59953c75623baf185fd35e5c972f42f54, =1f8b1adbfda2f6b1d973f8d33c63fc736b45caaf, =2c91f87fba9ac2df58245622ac5f4fababe5c973, =fbd767a29a52b299595199c4a3227f732d4600ec, =66a46a64a1f990cb0db17462aacaf84e8da74727, =b3b4711240ebe5b1f574089e73f0bc7b61d5bfa2, =b3d8b70a66a7998cd92b5723ab0225d5096681ad, =00f9c469f9207ebcfc9a5cdf47050ebc4c7bc26c, =cbe38c34e2ed0e2b353aefc8b8b8bfcf369cd954, =5ddf07bf2e5d1aa2ab24ba356cb6dd1adaa6cfec, =c539454acd48ca0663b664bba06d87fab525ced6, =ee112cf0296e8a8a42d16033146dc6f2e37c5f80, =db6f80876cc48789f5e582117968c22ae37aad06, =593f3e94b6903f47c2032bbd486fed7f62dec65f, =0a83138bc041c33d038eca7d993f3b874e75671d)
- **tools:** 新增了百度百科支持 (#153) (=ae3f004e8ffc7ca6c1dfb02893e0bc83a47e308d)

### Bug Fixes

- **chess:** 修复了发起者首先落子时会导致 @全体成员 的问题 (=763e9750b9772bb1d17fd6258101d29c3f5b74c1)
- **common:** 绑定用户前将删除原账号，防止键冲突 (#152) (=de3baaac5ba8156ba771d7ae437f48e554da85ea)

## [Koishi 3.1.1](https://github.com/koishijs/koishi/releases/tag/3.1.1)

### Notable Changes

- koishi-plugin-mongo@2.0.0 正式发布
- koishi-plugin-mysql@3.0.0 正式发布
- koishi-plugin-teach@2.0.0 正式发布

### Features

- **core:** 优化了 Command API 的类型标注 (=2b783453d7c2c39ba8da26993c9398457b9f7590)
- **core:** 当注册了重复的插件时将显示 stack trace (=30ea75072e08d376b17f9a01ebadd4f8986c84ec)
- **teach:** 重新支持了 substitute 选项 (#147) (=b42773b7e890e89de2c7c67bc70d070d3270df32)

### Bug Fixes

- **core:** 修复了指令解析中的错误行为 (=2029ad5a35b1ff333b60dd03d906c88b320f8884, =feb75cbfb775da844337e59d9426ba34c1e87729)
- **core:** 为 `Adapter.WsClient` 提供了默认的重连机制 (=1654831314c703451e78e1dfbc911e750c842061)
- **common:** 修复了错误的 `repeatState.user` 类型标注 (=84fe7e42fa10121d56e08aa4dfde9561c5710b8c)

## [Koishi 3.1.0](https://github.com/koishijs/koishi/releases/tag/3.1.0)

### Notable Changes

- koishi-plugin-image-search@3.0.0 正式发布
- koishi-plugin-tools@2.0.0 正式发布
- 新增了 switch 功能，允许运行时在特定的频道禁用某指令

### Features

- **core:** 指令定义中的展开语法现在也有正确的代码提示了 (=c6893857ab49ea9fa212c919870e10f6be9aff5a)
- **core:** 优化了 Domain 的错误提示，新增了 date, posint 等内置类型 (=e2bc85608d8b57223ee4f36e11d49a9cdbb91b36, =c4d84b36539f374fdabcdd0081bb068aa5406ae9)
- **core:** 新增了 `bot.avatar`, `bot.discriminator` 属性 (=a6ec223810d36b995217a2c5bea0471b2c5c383a)
- **common:** 新增了 switch 功能，允许运行时在特定的频道禁用某指令 (=7b5948d45a582bf583b558c0c578d5093a6d1ba4, =16204823c83843f2ebe160a98d67265663a8b5d6)
- **common:** 加入了更多模板，进一步提高了可扩展性 (=f5e018f34dcc6afa7fde226a6be04c9b07a5f4db)
- **discord:** 消息处理优化和更好的 embed 支持 (=c517bf0cf1226f80c815b526ca4a83cc864e4cfe, =29ee7d196316956aa26d3ad5f7017c7aaad75233, =dfcb7dad62f97b532099ee105c99fbdb078417dd, =3aa2b9411b93179b03d2a4af0c1fbd0a27bec0da, =07dbd6692a92ef8a0dcf0ce54f615c443d9fb4a0, =7c9706f218396c4bba93c3de3ea48210886277fb, =963d4a6fa7623e54940abdb11f57284501e93491)
- **image-search:** 支持了 iqdb 搜索 (#143) (=9cd9abba68436517c7d67ff08bed601011bebcd6)
- **tools:** 新增了 bilibili 链接解析功能 (=9a37afef7b9f85a5f53b53935190cea94a075029)

### Bug Fixes

- **core:** 修复了 `ctx.setInterval()` 的内存泄漏问题 (=42f9fa4f6f7b6acb5783b9d199f15c4f57f31890)
- **core:** 修复了 help 指令描述文本错误的问题 (#148) (=a1b8b9820d8083a99ff373ba8c576f11ff7b509d)
- **core:** 修复了指令选项中的空格数量错误的问题 (#148) (=72eb3621131b1f4ed33dd7233e13accb113d8a53)

## [Koishi 3.0.1](https://github.com/koishijs/koishi/releases/tag/3.0.1)

### Notable Changes

- koishi-plugin-common@4.0.0 正式发布
- koishi-plugin-puppeteer@2.0.0 正式发布
- koishi-plugin-schedule@3.0.0 正式发布

### Features

- **core:** 检测插件副作用和允许显式声明依赖 (=63956992afd49156cd7da528133cab1c9cdf520b, =2ec250f14f48a1d58cbc835d09166607562c86b7)
- **core:** 优化了 `Database.extend` 的类型标注 (=04ac3393412e15202a015796ce15a1cd32b12f39)
- **core:** 群组会话中，无前缀无称呼的消息将不会触发建议 (=d5a6f4e5f61fb6716e9a1cc6b15f9aeefa3501d8)
- **adventure:** 优化了编码逻辑，不再直接访问 mysql 插件 (=d5cb6a33b7950549b5fb9565925f8e4bacfcd5b2)
- **common:** 新增了 `config.generateToken` 配置项 (=e25588622ef16cce84c91a1a09e74c6b6c8c0a57)
- **common:** 优化了复读机的配置，并撰写了相关单元测试 (=4280a42346ea908c7e646f92a8e874936cc4df4c)
- **discord:** 优化了 embed 相关特性 (#145) (=f49073282e8bfbc0796249978db1f42b4fb79bc1)
- **puppeteer:** 支持了对特定选择器截图 (=278f85de9da74ec97679017e62a680cffe62f679)
- **test-utils:** 优化了断言方法的错误提示 (=bc53e08cafe8d95b2404d2cd00a989e3c960fdb6)
- **utils:** 新增了 `random.digits()` 方法 (=0ba42f9f92e75843dd1ed3419e4d8f7a0a1b77bd)
- **webui:** 实现了多级插件列表的显示 (=b338c445a7e731d42c8379426e5ce47a02024763)

### Bug Fixes

- **schedule:** 修复了热重载时可能发生内存泄漏的问题 (=1483031793fe0f62adc80d88f1ac3c9caaa48aa0)
- **test-utils:** 修复了错误的 `MemoryDatabase` 实现 (=e71590d5d2cf23a48a9f121dddd379d0558564f5)
