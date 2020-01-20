---
sidebarDepth: 2
---

# 存储聊天记录 (recorder) <Badge text="beta" type="warn"/>

::: tip 提示
本章介绍的功能由 koishi-plugin-recorder 插件提供。
:::

koishi-plugin-recorder 提供了一种将聊天记录存储于本地文件的方式。

## 使用方法

### 安装

```sh
npm i koishi-plugin-recorder
# 或者
yarn add koishi-plugin-recorder
```

### 使用配置文件

```js koishi.config.js
module.exports = {
  plugins: [
    ['recorder', options],
  ],
}
```

### 使用 API

```js
ctx.plugin(require('koishi-plugin-recorder'), options)
```

## 配置项

### target

- 类型: `(meta: Meta) => string | void`
- 默认值: 当不是群消息时无返回值，否则返回 `messages/${meta.groupId}.txt`

要存放到的文件。如果文件不存在则连同所在的路径一起创建；如果文件已经存在则继续写在文件后。如果返回的不是绝对路径，则依照当前工作目录来解析。

### transform

- 类型: `(meta: Meta) => string`
- 默认值: 由元信息的 `$ctxType`, `$ctxId`, `userId`, `message` 字段构成的 JSON

将元信息转化成要输出的文本行。

## 扩展事件

koishi-plugin-recorder 插件会增加几个额外的事件，你可以利用这些钩子扩充你机器人的逻辑。

### 事件：record-opened

当一个新的输出流被创建完成时在 App 实例触发。传入两个参数，第一个是输出流 `WriteStream` 对象，第二个是输出文件的绝对路径。

### 事件：record-closing

当一个输出流被关闭时在 App 实例触发（默认情况下这只会发生在全部 App 都被关闭之后）。传入两个参数，第一个是输出流 `WriteStream` 对象，第二个是输出文件的绝对路径。

### 事件：record-writing

当插件即将新的文本行写入文件时在 App 实例触发。传入两个参数，第一个是要写入的文本行，第二个是元信息 `Meta` 对象。

### 事件：record-written

当插件成功将新的文本行写入完成时在 App 实例触发。传入两个参数，第一个是要写入的文本行，第二个是元信息 `Meta` 对象。

## 避免重复记录

如果你在同一目录运行了多个机器人并且存在多机器人加同一个群的情况，那么你应当注意避免两个机器人同时对一条信息进行处理，导致重复记录的情况。下面举出两个具体的例子用于展示。

### 使用 WeakSet 检测消息是否被记录过

koishi-plugin-recorder 的默认行为采用了 WeakSet 来检测消息是否被记录过。你可以参考下面的代码：

```js
const refs = new WeakSet<Meta>()

app.plugin(require('koishi-plugin-recorder', {
  target (meta) {
    if (refs.has(meta) || meta.$ctxType !== 'group') return
    return `messages/${meta.groupId}.txt`
  },
  transform (meta) {
    refs.add(meta)
    return JSON.stringify(pick(meta, ['$ctxType', '$ctxId', 'userId', 'message']))
  },
})
```

### 将不同机器人收到的信息存放于不同的目录下

你也可以通过将不同机器人收到的信息存放于不同的目录下来避免对同一个文件的多次写入：

```js
app.plugin(require('koishi-plugin-recorder', {
  target (meta) {
    if (meta.$ctxType !== 'group') return
    return `messages/${app.selfId}/${meta.groupId}.txt`
  },
  transform (meta) {
    return JSON.stringify(pick(meta, ['$ctxType', '$ctxId', 'userId', 'message']))
  },
})
```
