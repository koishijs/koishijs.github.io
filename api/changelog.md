---
sidebarDepth: 1
noOutboundLinks: true
---

# v3 更新日志

## [Koishi 3.4.0](https://github.com/koishijs/koishi/releases/tag/3.4.0)

### Notable Changes

- koishi-plugin-github@3.0.0 正式发布，将支持众多新特性 (#174)
- 支持了 [ORM API](../guide/database.md#使用-orm) (#178)，整合了多个插件的重复代码，有效降低了数据库实现的难度

### Features

- **core:** 支持了 ORM API (#179) (=f2e5535df0c82e947c0fd133b366dda8174fa409, =256a04002a1bf4ef55de4580f8ca43accaf53acf)
- **core:** 新增了配置项 `selfUrl`，将被 telegram, github 等功能共用 (=967d3f5f7115c132b8431802c2844f2126b85c9a)
- **github:** 支持了 github.repos 指令，用于安全地添加 webhooks (=9e962dc98d44527e99c3681896df5b6f070f18a3, =c67ffeea691568ff96db60c00878c0f7e5a57cff)
- **github:** 优化了 github 指令，用于在任意频道内订阅已添加的仓库 (=6ef52a53714df877d629710d8a2d9be16c7efcd5)
- **github:** 优化了指令的提示信息，将 github 和 github.repos 指令整合使用 (=53f4e8fe8347ee125f20e0232fc2fe366458ab3d)
- **utils:** `clone()` 方法支持了 RegExp 和 Date 类型的数据 (=f2e5535df0c82e947c0fd133b366dda8174fa409)
- **utils:** 使用内置模板函数来格式化输出的时间以实现不同地区输出的统一 (=f2e5535df0c82e947c0fd133b366dda8174fa409)

### Bug Fixes

- **core:** 修复了当含有插值调用的时候，有小概率不会获取内层指令所需字段的问题 (=f2e5535df0c82e947c0fd133b366dda8174fa409)
- **utils:** 修复了 `clone()` 方法无法处理 undefined 和 null 的问题 (=f2e5535df0c82e947c0fd133b366dda8174fa409)
- **github:** 修复了一个 typo (#181) (=5378134c57e2602d6ad014c916702127d1928aa3)
- **github:** 修复了大小写混用带来的无法识别问题 (=780466330c3a7897256879e60032dc4ce03de9f1)

## [Koishi 3.3.1](https://github.com/koishijs/koishi/releases/tag/3.3.1)

### Notable Changes

- koishi-plugin-rss@2.0.0 正式发布

### Features

- **github:** 优化了 markdown 处理，现在能够推送图片信息了 (=16c7059549416703f732af1f3f4adf6cf9705300)
- **status:** 默认情况下将使用相对路径作为 endpoint (=acfbdc06cc663bcdd703dcd80390c2dfabfa09f4)
- **status:** 支持了配置项 `config.handleSignals` (#158, #163) (=56909964a2e5961c8ac334c736f7dbaf4b61c32b)
- **status:** 支持了配置项 `config.title` (=57e5ebaf42299d5a9cc481932f031609f2e20ad7)
- **telegram:** 优化了消息段处理 (#167) (=19f253eab53e54795625cbeb75e9f2b3663d3edc)

### Bug Fixes

- **chess:** 修复了主动和被动跳过时可能手序错误的问题 (#169) (=e814fc9f5114d9f6b2396cf8bf3d3296a2c7c24b)
- **chess:** 修复了第一步悔棋时可能存在的问题 (=e7785ca1902a05fc6a1a79092e23a0ae9f4298de)
- **core:** 在指令执行前检查其上下文是否匹配 (#168) (=e7d597025c1701e33aadd5c481aa109ce20d44ed)
- **image-search:** 修复了错误的指令树结构 (#170) (=37aec5948c72a87adf9e9fa024f568d4bc5dbe7b)
- **mongo:** 修复了 `database.getAssignedChannels` 的错误实现 (#175, #176) (=cd23bc7afe21c686559e31e84ce6c0c051176deb)
- **onebot:** 修复了 notice/poke 事件没有 `channelId` 的问题 (#172) (=e157a5576d16a96077c26fea051abcd785a1f1cc)
- **status:** 移除了不必要的开发依赖 (=704db01bc6d67fcf36d68d47e9833223943be38b)
- **status:** 修复了生产模式下客户端报错的问题 (=939c3bcbf63c35d430dc4726f8c2c077b99a7fb3)
- **status:** 自动添加尾端 `/` 重定向以解决路径错误的问题 (=f2b6e67415aa29851806d7d683a57ea8b97022bc)
- **status:** 密码登录需要检测浏览器是否为安全环境 (#171) (=2738d34789653c969ec62e4246bfc03d650b7877)

## [Koishi 3.3.0](https://github.com/koishijs/koishi/releases/tag/3.3.0)

### Notable Changes

- 下一代 status 插件支持了生产模式
- 新增 command patch 功能：通过 patch 创建的指令如果不存在，将不会发生变化；如果已存在，将按照后续的链式调用进行修改

### Features

- **core:** 优化了指令创建时的报错信息 (=a4498ead0f7bb8aa4eb999e2a71e908f9fe0403e)
- **core:** 支持了配置项 `commandConfig.patch` (=8c2ce5ae1570572a1d714d59965aa5480c4ec8e9)
- **status:** 使用 Koishi 自己的端口而不是新建端口 (=06fb3ae0f9679acdb3bb8c31ef07b5241fd16da9)
- **status:** 支持了生产模式构建 (=7c4ba3b0051121929fd61dc0dd55984636975324)
- **status:** 优化了代码分割，同时修复了安全性问题 (#161) (=fe6f2c6c517315c2c33cf4d45d4682ffe379c390)
- **status:** 移除了 element-plus，降低了打包体积 (=cc0e6f6aacc38c76c2f6d9684700dacae8627c18)
- **status:** 使用单一机器人实例作为沙箱 (=5e989ebc83d2638bffbd6ce198c696a21dfa7645)
- **status:** 客户端自动保存沙箱聊天记录 (=475cd244364e3b7f606741befbad3a002e5332e3)
- **telegram:** 支持了消息中的 sticker (#164) (=099b5c2c06097100ff586f70a793d9caf08bd0fe)

### Bug Fixes

- **cli:** 修复了插件可能在卸载完成前重载的问题 (=2370acae398f1f206832f40ac7bd5bdc45b640ae)
- **core:** 修复了部分选择器生成的上下文可能不具有可卸载性的问题 (=a1f11d6afe256bad9cc355e123a16609d87b0cdc)
- **schedule:** 支持了无机器人运行的情况 (=2a778e446f8a03b597874662e98f7582d12c234f)
- **status:** 修复了用户数据加载错误的问题 (=36b3890b2f14207269362eb09292ebeb7445d76f)
- **status:** 修复了 MySql 建表报错的问题 (#166) (=b7ce209d7e4c7fdbbdb37294b2908f34a0192f7b)
- **utils:** 修复了 supports-color 相关类型标注错误的问题 (=dd86bc5ee7619ef666410196882965be2592ea58)

## [Koishi 3.2.1](https://github.com/koishijs/koishi/releases/tag/3.2.1)

### Notable Changes

- 下一代 status 插件支持了沙箱和登录功能，并提供了 mongo 数据库支持

### Features

- **database:** 支持了自定义表，允许不同数据库对统一功能提供不同实现 (=875f75b16e0205ae0492823c8cab61014e5f5e71)
- **status:** 加入了路由，导航栏和侧边栏，优化了页面样式 (=89583a357814ce286637da45e8d1f25d99d5fb23, =c8df0fa9f27e6373603d5fa0c5ed02ae3b4dbe72, =86043a4ac33e2ac2ccf7f53e6c4969f79ae9ef67, =1cf52be1b6c11136d16e44fb2917427efc40db39, =42381c5d5752d9af63525ec5b34945a4e587f973, =5ff956f8cc6f2e2ff22f471a4de34d0e02afc2dd, =bd33be6536a6a33f18e6f754f8186f9ddd49c775)
- **status:** 实现了沙箱和登录功能，增加了 token 机制 (=bf99513a04e7199e71ede2a22cc66ff7b8b17bb5, =c50ba31962e8ae53bf251ed858c1ef5e565439ed, =064810cf22b89131feb4b7ef86a9d52e79b07514, =bbfac8af45384f3e2f8f4b31857bf4e14fdb98a2, =2e03e5d3dc01627d62820f74d4b1248965d98a19)
- **status:** 优化了数据传输接口，并支持显示数据库大小 (=d17428e25b82248e0ff428554da25d3db30a4659, =dfdba08a6c913c97b8edf44db89274401e715998)
- **status:** 提供了 mongo 数据库支持 (#160) (=6956c815bfa2522b5e47619b425e4dd2c8e953ae)
- **utils:** 新增了 `remove()` 帮助函数 (=e50017899232a6772133fec94bc6c8e8438b4854)

### Bug Fixes

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
