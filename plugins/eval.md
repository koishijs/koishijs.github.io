---
sidebarDepth: 2
---

# 执行脚本 (eval)

::: tip 提示
本章节将同时介绍 koishi-plugin-eval 和 koishi-plugin-eval-addons 两个插件，后者的功能将作为前者的补充。

由于这两个插件使用了许多最新的特性。目前使用 koishi-plugin-eval 的功能需要你的 Node 版本不小于 14.6，并运行时附上 `--enable-source-maps`。如果要使用 koishi-plugin-eval-addons，还需要额外附上 `--experimental-vm-modules` 参数。
:::

koishi-plugin-eval 允许用户直接使用机器人执行脚本。它利用了 Node.js 的 vm 和 worker_thread 模块，在保护执行安全的前提下能够获得较快的响应速度。同时，插件还提供了一些内置的 API 供用户调用，结合教学功能可以在客户端实现复杂的行为。

koishi-plugin-eval-addons 在前一个插件的基础上，允许用户编写自己的模块并永久保存。插件将自动加载特定目录下的文件，并将其作为机器人的内置功能。用户可以利用此功能存储较为复杂的代码，甚至扩展新的指令。同时，如果上述目录是一个 git 目录，该插件也提供了自动更新等机制。

## 配置项

请注意标有 <Badge text="addons" vertical="baseline"/> 的配置项需要配合 koishi-plugin-eval-addons 使用。但你可以将相应的参数传给任何一个插件，效果是等价的。

### prefix

- 类型: `string`
- 默认值: `>`

快捷调用的前缀字符。设置为 `null` 可以取消 evaluate 指令的快捷调用。

### timeout

- 类型: `number`
- 默认值: `1000`

单轮 evaluate 指令执行过程允许的最大等待时长，单位为毫秒。

### maxLogs

- 类型: `number`

单轮 evaluate 指令执行过程中允许 `send` 被调用的最大次数。

### blacklist

- 类型: `string[]`
- 默认值: `['evaluate', 'echo', 'broadcast', 'contextify', 'teach']`

禁止在 evaluate 调用过程中调用的指令列表。设置这个选项是为了防止一些潜在的危险性为。

### resourceLimits

- 类型: [`ResourceLimits`](https://nodejs.org/api/worker_threads.html#worker_threads_worker_resourcelimits)

对子线程的资源限制。

### setupFiles

- 类型: `Record<string, string>`

要在子线程执行的文件名的键值对。键表示你希望在报错信息中显示的模块名，值表示文件的实际路径。如果你要扩展 eval 插件在子线程的行为，你可能需要这个选项。

### inspect

- 类型: [`InspectOptions`](https://nodejs.org/api/util.html#util_util_formatwithoptions_inspectoptions_format_args)

用于将传入 `send` 方法的参数转化成字符串的配置项。

::: warning 注意
由于此选项仅对子线程生效，请勿在这个对象里写函数，否则将无法完成序列化。如果你确实有配置函数的需求，可以考虑使用上面的 `setupFiles` 选项代替。
:::

### gitRemote <Badge text="addons"/>

- 类型: `string`

扩展模块更新时的 remote 链接。

### moduleRoot <Badge text="addons"/>

- 类型: `string`

扩展模块的根目录路径。
