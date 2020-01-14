---
sidebarDepth: 2
---

# 配置文件

Koishi CLI 只提供了两个命令：`koishi init` 和 `koishi run`。前者用于初始化一个配置文件，后者用于运行一个配置文件。而这个配置文件的大部分参数又可以直接传入 App 的构造函数中。可见，理解这些配置项是理解 Koishi 工作原理的关键。本章就详细介绍每个配置项的功能和使用方式。

标有 <Badge text="CLI" vertical="baseline"/> 表示只能在配置文件中使用。

## type

机器人的通信方式，目前支持 `'http'` 和 `'ws'` 两种。特别地，如果这个配置缺省，Koishi 也会读取你的 `server` 选项，根据你配置的服务器 URL 进行适配。

相关 CQHTTP 配置：`use_http`, `use_ws`。

::: tip 有关 HTTPS/WSS
由于目前 CoolQ HTTP API 本身不支持直接配置 SSL/TLS 证书，因此如果要使用 HTTPS/WSS 需要使用第三方软件进行代理。这里有一篇 [相关文档](https://github.com/richardchien/coolq-http-api/wiki/HTTPS) 可供参考。
:::

## port

服务器监听的端口。

相关 CQHTTP 配置：`post_url`。

::: tip 提示
CQHTTP 上报信息的默认值为 `http://localhost:8080`，但 Koishi 中不会提供默认行为，你需要在构造函数中显式的配置它或使用 `koishi init` 命令生成含该配置的文件。
:::

## server

如果使用了 HTTP，则该配置将作为发送信息的服务端；如果使用了 WebSocket，则该配置将作为监听事件和发送信息的服务端。

相关 CQHTTP 配置：`host`, `port`, `ws_host`, `ws_port`。

::: tip 提示
CQHTTP 的 HTTP 服务器默认监听 5700 端口，WebSocket 服务器默认监听 6700 端口，但 Koishi 中不会提供默认行为，你需要在构造函数中显式的配置它或使用 `koishi init` 命令生成含该配置的文件。
:::

## token

发送信息时用于验证的字段，应与 CQHTTP 的 `access_token` 配置保持一致。

## secret

接收信息时用于验证的字段，应与 CQHTTP 的 `secret` 配置保持一致。

## selfId

机器人自己的 QQ 号。这个选项通常是可选的，因为 Koishi 在大部分情况下可以自动获取机器人的 QQ 号。但是在 CQHTTP 版本低于 3.4 的情况下，你需要手动配置它。此外，预先配置 selfId 对安装了特定插件的应用可能拥有更快的启动速度。参见 [**QQ 号自动获取**](./multiple-bots.md#qq-号自动获取) 一节。

## database

要安装的数据库配置信息。参见 [**使用数据库**](./using-database.md) 一章。

::: warning 注意
如果是在 CLI 中，Koishi 会自动对使用的数据库进行注册；而直接使用 API 则不会，因此你需要手动注册它们。
:::

## plugins <Badge text="CLI"/>

要安装的插件列表。如果传入一个列表，则依次安装列表中的插件；如果传入一个对象，则以对象的键为上下文依次注册对应的值中的插件。参见 [**插件与上下文**](./plugin-and-context.md) 一章。

## nickname

机器人的昵称，可以是字符串或字符串数组。将用于指令前缀的匹配。例如，如果配置该选项为 `'恋恋'`，则你可以通过 `恋恋，help` 来进行 help 指令的调用。参见 [**指令前缀**](./command-system.md#指令前缀) 一节。

## commandPrefix

指令前缀字符，可以是字符串或字符串数组。将用于指令前缀的匹配。例如，如果配置该选项为 `.`，则你可以通过 `.help` 来进行 help 指令的调用。参见 [**指令前缀**](./command-system.md#指令前缀) 一节。

## maxMiddlewares

最大中间件的数量。如果超过这个数量，Koishi 会认定为发生了内存泄漏，将产生一个错误事件，并停止新中间件的安装。默认值为 `64`。

## similarityCoefficient

用于模糊匹配的相似系数，应该是一个 0 到 1 之间的数值。数值越高，模糊匹配越严格。设置为 1 可以完全禁用模糊匹配。参见 [**模糊匹配**](./command-system.md#模糊匹配) 一节。

## quickOperationTimeout

快捷操作的时间限制，单位为毫秒。如果配置了这个选项且使用了 HTTP 通信方式，则在这段时间内的首次调用 `meta.$send()` 或类似的方法将不产生新的 HTTP 请求。默认值为 `0`。参见 [**快捷操作**](./receive-and-send.md#快捷操作) 一节。

## logLevel <Badge text="CLI"/><Badge text="1.3.0+"/>

默认的输出等级。默认值为 `2`。参见 [**设置输出等级**](./logger.md#设置输出等级) 一节。

## logFilter <Badge text="CLI"/><Badge text="1.3.0+"/>

用于在某些范围覆盖默认的输出等级。参见 [**过滤输出**](./logger.md#过滤输出) 一节。
