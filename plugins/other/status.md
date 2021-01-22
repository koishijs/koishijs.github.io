---
sidebarDepth: 2
---

# 运行状态 (Status)

::: warning
要使用本插件，你需要安装 mysql 或 mongo 数据库支持。
:::

koishi-plugin-status 可以用于查看机器人的运行状态。

<panel-view title="聊天记录">
<chat-message nickname="Alice" color="#cc0066">你的状态</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png">
<p>5 名四季酱正在为 20 个群和 2409 名用户提供服务。</p>
<p>四季酱 2 号：工作中（2/min）</p>
<p>四季酱 3 号：工作中（3/min）</p>
<p>四季酱 4 号：工作中（3/min）</p>
<p>四季酱 5 号：工作中（0/min）</p>
<p>四季酱 9 号：工作中（5/min）</p>
<p>==========</p>
<p>更新时间：2019-12-8 14:41:15</p>
<p>启动时间：2019-12-8 14:52:12</p>
<p>已运行 43 天 10 小时 22 分钟</p>
<p>已载入指令：105</p>
<p>已载入中间件：8</p>
<p>CPU 使用率：1% / 2%</p>
<p>内存使用率：34% / 91%</p>
</chat-message>
</panel-view>

## 指令：status

- 快捷调用：你的状态，查看状态，运行情况，运行状态

查看机器人的运行状态并输出。

## Web API

本插件还提供了一个 Web API，访问 `http://localhost:{port}/status`，即可获得 JSON 格式的运行状态：

```js
interface BotStatus {
  type: string
  selfId: number
  label: string
  code: number
}

interface PerfRate {
  app: number
  total: number
}

interface Status {
  activeUsers: number
  bots: BotStatus[]
  memory: PerfRate
  cpu: PerfRate
  timestamp: number
  startTime: number
}
```

## 扩展 API

你可以扩展 status 返回的结果，可配合 [format](#format) 选项使用：

```js
const { extend } = require('koishi-plugin-status')

extend(function (status, config) {
  status.foo = 'bar'
})
```

## App 构造选项

### options(.bots[]).label

- 类型: `string`
- 默认值: `selfId`

你可以给每个机器人一个不同的标签，例如上面的例子中的“四季酱 2 号”。

## 配置项

### path

- 类型: `string`
- 默认值: `'/status'`

Web API 服务的路径。

### refresh

- 类型: `number`
- 默认值: `60000`

内置缓存的刷新间隔，单位为毫秒。

### format

- 类型: `string`
- 默认值:

::: v-pre
```
{{ bots }}
==========
活跃用户数量：{{ activeUsers }}
启动时间：{{ new Date(startTime).toLocaleString("zh-CN", { hour12: false }) }}
CPU 使用率：{{ (cpu.app * 100).toFixed() }}% / {{ (cpu.total * 100).toFixed() }}%
内存使用率：{{ (memory.app * 100).toFixed() }}% / {{ (memory.total * 100).toFixed() }}%
```
:::

status 指令的输出样式。

### formatBot

::: v-pre
- 类型: `string`
- 默认值: ``'{{ label || selfId }}：{{ code ? `无法连接` : `工作中（${rate}/min）` }}'``
:::

status 指令对单个机器人的输出样式。
