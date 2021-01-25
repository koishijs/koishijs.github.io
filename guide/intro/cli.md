---
sidebarDepth: 2
---

# 命令行工具

::: danger 注意
这里是**正在施工**的 koishi v3 的文档。要查看 v1 版本的文档，请前往[**这里**](/v1/)。
:::

Koishi 提供了名为 `koishi` 的命令行工具，相信你已经在之前的介绍中看过它的使用方法了。本章就详细介绍 Koishi 与命令行相关的特性。

## koishi init

<Terminal :content="[
  { text: 'cd my-bot', type: 'input' },
  { text: 'koishi init', type: 'input' },
  { message: 'Connection Type',
    hint: 'Use arrow-keys. Return to submit.',
    type: 'select',
    typeDelay: 500,
    lineDelay: 500,
    choices: ['HTTP', 'WebSocket'],
    actions: '12' },
  { message: 'Koishi Port', text: '8080', type: 'question' },
  { message: 'HTTP Server', text: 'http://localhost:5700', type: 'question' },
  { message: 'Bot\'s QQ Number', type: 'question', lineDelay: 300 },
  { message: 'Secret for Koishi Server', type: 'question', lineDelay: 300 },
  { message: 'Token for CoolQ Server', type: 'question', lineDelay: 300 },
  { content: [{ text: 'success', class: 'success' }, ' created config file: my-bot/koishi.config.js'] },
]"></Terminal>

koishi init 指令用于生成一个 koishi 配置文件，通常是 koishi.config.js。相信看过前几章的你已经对这个文件的结构足够熟悉了。这个指令的完整语法如下：

```cli
koishi init [file] [-f]
```

其中的 `file` 参数可以用于指定输出的文件位置（覆盖默认值 koishi.config.js）。如果要输出的位置已经有文件，则 Koishi 会提示你使用 `-f, --forced` 选项，这个选项将告诉 Koishi 覆盖已经存在的文件。

### 设置生成的文件类型

除了 js 格式以外，Koishi 还支持其他几种格式的输出。只需向 `file` 参数传入具有相应后缀名的文件，Koishi 就会生成对应格式的输出。目前支持的类型有：

- js
- json
- ts

## koishi start

<Terminal :content="[
  { text: 'koishi start', type: 'input' },
  { content: [{ text: 'info', class: 'info' }, ' apply plugin ', { text: 'common', class: 'info' }] },
  { content: [{ text: 'info', class: 'info' }, ' Koishi/1.8.1 CoolQ/Pro CQHTTP/4.12.3'] },
  { content: [{ text: 'info', class: 'info' }, ' server listening at ', { text: '8080', class: 'info' }] },
  { content: [{ text: 'info', class: 'info' }, ' connected to ', { text: 'http://localhost:5700', class: 'info' }] },
  { content: [{ text: 'success', class: 'success' }, ' bot started successfully in 141 ms.'] },
]"></Terminal>

koishi start（或 koishi run）指令用于运行一个配置文件。它的完整语法为：

```cli
koishi start [file] [--debug|--silent|--log-level <level>]
```

其中 `file` 参数表示要执行的文件位置。文件尾的后缀名可以省略，Koishi 会自动寻找可用的文件作为配置文件（各种文件格式的最低所需版本与上面所述的相同）。

`--log-level` 选项用于控制输出等级，`--debug` 和 `--silent` 则表示输出等级为 3 和 0 的两种特殊情况，参见 [在 CLI 中控制输出](./logger.md#在-cli-中控制输出) 一节。

### 自动重启

Koishi 的命令行工具支持自动重启。当运行 Koishi 的进程崩溃时，如果 Koishi 已经启动成功，则监视进程将自动重新启动一个新的进程。

同时，你也可以通过指令手动进行重启：

<panel-view title="聊天记录">
<chat-message nickname="Alice" color="#cc0066">exit -r</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png">正在重启……</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png">重启完成。</chat-message>
</panel-view>

### 使用 TypeScript

Koishi 支持直接调用 TypeScript 编写的插件。首先安装 typescript 和 ts-node：

<panel-view class="code" type="package-manager">

```npm
npm i typescript ts-node -D
```

```yarn
yarn add typescript ts-node -D
```

</panel-view>

接着在你的命令行之后加上一段额外的参数：

<panel-view class="code" type="package-manager">

```npm
npx koishi start -- -r ts-node/register
```

```yarn
yarn koishi start -- -r ts-node/register
```

</panel-view>

这样你就可以直接使用 koishi.config.ts，或在 koishi.config.js 中引用 ts 文件作为插件了。
