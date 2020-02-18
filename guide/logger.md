---
sidebarDepth: 2
---

# 输出与日志 <Badge text="1.3.0+"/>

本章主要介绍如何控制 Koishi 命令行工具的输出。

## 设置输出等级

**输出等级**控制了所有输出到命令行的内容的重要性。在 Koishi 内置的输出系统中，所有信息被分为了 3 种不同的等级：

1. error / success
2. warning / info
3. debug

相应地，当设置输出等级为 x 时，Koishi 只会输出重要性小于等于 x 的信息。当输出等级被设置为 0 时，Koishi 将不产生任何输出；而当输出等级被设置为 3 时，Koishi 产生的全部信息都会被显示在屏幕上（当然下面还会介绍过滤器，你可以通过手动设置过滤器减少输出。）

需要注意的是，运行时产生的错误（如请求失败，数据库访问失败等）都属于 warning，只有在创建阶段和连接阶段抛出的错误才会通过 error 输出（参见 [生命周期](./plugin-and-context.md#生命周期)）。

默认情况下 Koishi 的输出等级为 2。

### 在 CLI 中控制输出

在使用 `koishi run` 指令时，你可以加入一个 `--log-level` 选项，它的值可以是 0~3 之间的一个整数，表示不同的输出等级。特别地，你还可以用 `--silent` 表示 `--log-level=0`，用 `--debug` 代替 `--log-level=3`。

### 在配置文件中控制输出

你也可以在配置文件中控制输出等级：

```js koishi.config.js
module.exports = {
  logLevel: 3,
}
```

上述两种方法的功能类似，但是 CLI 选项控制的范围更大，例如在配置文件解析完成之前 `koishi.config.js` 中的配置是不生效的。除此以外，如果同时使用 CLI 选项和配置选项，则实际的运行时输出等级为两者的最小值。

## 使用 logger

如果你是插件开发者，你也可以主动调用 Koishi 内置的 Logger API 来输出调试信息，这样用户就可以用上述的方法来控制你的插件的输出等级了。具体使用方法是这样的：

```js my-plugin.js
module.exports = (ctx) => {
  // 生成一个 Logger 对象
  const logger = ctx.logger()

  doSomething()
    // 调用 logger 方法来产生输出
    .then(() => logger.success('hello'))
    .catch(() => logger.warn('failed'))
}
```

上面的这个 Logger 对象有下面的方法，它们的函数签名与 `console.log` 一致：

```ts
export interface Logger {
  warn (format: any, ...param: any): void
  info (format: any, ...param: any): void
  debug (format: any, ...param: any): void
  success (format: any, ...param: any): void
  error (format: any, ...param: any): void
}
```

### 过滤输出

你还可以通过在 `ctx.logger()` 方法中传入一个 scope 参数来实现指定你输出的范围，就像这样：

```js plugin-foo.js
module.exports = (ctx) => {
  const logger = ctx.logger('foo')
  // 执行其他代码并使用 logger 产生输出
}
```

然后，用户可以通过设置 `logFilter` 这个配置项指定所有由 foo 插件产生的输出的等级，就像这样：

```js koishi.config.js
module.exports = {
  logLevel: 3,
  logFilter: {
    // 由 foo 产生的输出等级为 2
    foo: 2,
  },
}
```

当同时设置了 `logLevel` 和 `logFilter` 时，后者在 foo 插件的范围会覆盖前者，再用覆盖后的值与命令行取最小值，得到的就是 foo 插件的最终输出等级。

### 使用 debug

Koishi 内部使用 [debug](https://github.com/visionmedia/debug) 处理 logger 产生的信息。你可以通过设置环境变量的方式来输出 debug 信息：

<Terminal :content="[
  { content: [{ text: '# 对于 linux 和 macOS', class: 'hint' }] },
  { content: ['DEBUG=koishi:*; ', { text: 'koishi', class: 'input' }, ' start'] },
  { content: [] },
  { content: [{ text: '# 对于 Windows', class: 'hint' }] },
  { content: ['$env:DEBUG=koishi:*; ', { text: 'koishi', class: 'input' }, ' start'] },
  { content: [] },
  { content: [{ text: '# 使用 cross-env', class: 'hint' }] },
  { content: [{ text: 'cross-env', class: 'input' }, ' DEBUG=koishi:*; ', { text: 'koishi', class: 'input' }, ' start'] },
]" static></Terminal>

### 内置的输出

koishi-core 自身只会产生两种 logger 输出：

- Koishi 会以 app/server/receiver/sender/command 五种 scope 输出 debug 信息
- 当 Koishi 内置的 error 事件被触发时，会被自动触发无 scope 的 logger/warning 事件

利用上面的方法，你可以借助 koishi-core 的输出对你的机器人进行调试。
