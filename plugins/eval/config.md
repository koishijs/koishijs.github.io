---
sidebarDepth: 2
---

# 执行脚本 (eval)

::: tip 提示
本章节将同时介绍 koishi-plugin-eval 和 koishi-plugin-eval-addons 两个插件，后者的功能将作为前者的补充。
:::

::: warning 注意
由于这两个插件使用了许多最新的特性。目前使用 koishi-plugin-eval 的功能需要你的 Node 版本不小于 14.6，并运行时附上 `--enable-source-maps`。如果要使用 koishi-plugin-eval-addons，还需要额外附上 `--experimental-vm-modules` 参数。
:::

koishi-plugin-eval 允许用户直接使用机器人执行脚本。它利用了 Node.js 的 vm 和 worker_thread 模块，在保护执行安全的前提下能够获得较快的响应速度。同时，插件还提供了一些内置的 API 供用户调用，结合教学功能可以在客户端实现复杂的行为。

koishi-plugin-eval-addons 在前一个插件的基础上，允许用户编写自己的模块并永久保存。插件将自动加载特定目录下的文件，并将其作为机器人的内置功能。用户可以利用此功能存储较为复杂的代码，甚至扩展新的指令。同时，如果上述目录是一个 git 目录，该插件也提供了自动更新等机制。

## 沙箱 API

evaluate 指令会创建一个沙箱环境。这个沙箱环境支持 ES2020 的全部特性，外加 [Buffer](https://nodejs.org/dist/latest-v14.x/docs/api/buffer.html)。除此以外，还支持下面的属性和方法：

### user

- 类型: `Partial<User>`

调用者的用户数据。

### send(...param)

- **param:** `any[]` 要发送的内容
- 返回值: `Promise<void>`

向当前上下文发送一条消息。

### exec(message)

- **message:** `string` 指令文本
- 返回值: `Promise<void>`

在当前上下文执行一条指令。

### utils <Badge text="addons"/>

如果你使用了 koishi-plugin-eval-addons，部分 koishi-utils 的功能将作为一个独立模块暴露在全局对象上，它包含了下列属性：

- CQCode
- Random
- Time

## 主线程 API

### DataTrap

#### trap.define

#### trap.get

#### trap.set

#### trap.fields

#### userTrap

#### groupTrap

#### attachTraps

### MainAPI

### app.worker

## 子线程 API

### config

### response

### mapDirectory

### WorkerAPI

### internal

#### internal.contextify(value)

#### internal.decontextify(value)

#### internal.setGlobal(name, value, writable)

#### internal.connect(outer, inner)

### formatError(error)

### synthetize(identifier, namespace, name) <Badge text="addons"/>

## 安全性

### 使用陷阱

koishi-plugin-eval 提供了一套陷阱 API。它会影响 evaluate 指令和扩展指令中的用户数据。你可以通过下面的方式来定义一个陷阱：

```ts
import { userTrap } from 'koishi-plugin-eval'

userTrap.define('foo', {
  fields: ['bar'],
  get: user => user.bar,
  set: (user, value) => user.bar = value,
})
```

这样一来，当用户在沙箱中尝试访问 `user.foo` 时，访问到的实际上是 `user.bar` 的数据。

当然，陷阱 API 能做的事远比上面的例子强大。假如一些数据的计算更适合在主线程完成，你就可以通过陷阱来将已经计算好的数据暴露给子线程。

### 禁用部分指令

如果你担心在 evaluate 中调用部分指令存在风险，你可以手动将这些指令设置为禁止在沙箱中调用：

```ts
ctx.command('foo', { noEval: true })
```

<panel-view title="聊天记录">
<chat-message nickname="Alice" color="#cc0066">> exec('foo')</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png">不能在 evaluate 指令中调用 foo 指令。</chat-message>
</panel-view>

默认情况下，evaluate 指令本身也是禁止在沙箱中调用的。

## 配置项

请注意标有 <Badge text="addons" vertical="baseline"/> 的配置项需要配合 koishi-plugin-eval-addons 使用。但你可以将相应的参数传给任何一个插件，效果是等价的。

### prefix

- 类型: `string`
- 默认值: `'>'`

快捷调用的前缀字符。设置为 `null` 可以取消 evaluate 指令的快捷调用。

### timeout

- 类型: `number`
- 默认值: `1000`

单轮 evaluate 指令执行过程允许的最大等待时长，单位为毫秒。

### maxLogs

- 类型: `number`

单轮 evaluate 指令执行过程中允许 [`send`](#send) 被调用的最大次数。

### userFields

- 类型: `string[]`
- 默认值: `['id', 'authority']`

能够在 evaluate 指令中被访问的用户字段列表。这里的字段也是受 [陷阱](#使用陷阱) 影响的。

### resourceLimits

- 类型: [`ResourceLimits`](https://nodejs.org/api/worker_threads.html#worker_threads_worker_resourcelimits)

对子线程的资源限制。

### setupFiles

- 类型: `Record<string, string>`

要在子线程执行的文件名的键值对。键表示你希望在报错信息中显示的模块名，值表示文件的实际路径。如果你要扩展 eval 插件在子线程的行为，你可能需要这个选项。

### inspect

- 类型: [`InspectOptions`](https://nodejs.org/api/util.html#util_util_formatwithoptions_inspectoptions_format_args)

用于将传入 [`send`](#send) 方法的参数转化成字符串的配置项。

### gitRemote <Badge text="addons"/>

- 类型: `string`

扩展模块更新时的 remote 链接。

### moduleRoot <Badge text="addons"/>

- 类型: `string`

扩展模块的根目录路径。
