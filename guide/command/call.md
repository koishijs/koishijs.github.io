---
sidebarDepth: 2
---

# 指令的调用

本节介绍有关指令调用的一些机制。

## 指令前缀

**指令前缀**是 Koishi 用于判断一条信息是否为指令的机制。这个机制在不同环境下可以是不同的。假设 `app.options.nickname` 被设置为了 `四季酱`，则以下信息都可以触发指令调用：

```sh
# 私聊状态下
四季酱 echo hello
四季酱, echo hello
echo hello

# 群聊状态下
四季酱 echo hello
四季酱, echo hello
@四季酱 echo hello
echo hello
```

你也可以通过修改下列配置项来改变这种行为：

- **[nickname](../api/app.md#options-nickname):** `string | string[]` 如果为空的话，上述几条以 `Koishi` 开头的信息就不会触发指令了。你也可以同时设置多个昵称。
- **[prefix](../api/app.md#options-prefix):** `string | string[]` 设置为 `.` 可以禁止在群中调用 `echo` 但允许调用 `.echo`。你也可以同时设置多个前缀。

::: tip
#### nickname 和 prefix 的区别

1. nickname 后需要有**逗号或空白字符**，再后面才是指令名；prefix 后面**必须紧跟**指令名。
2. nickname 的默认值为 `[]`，因此覆盖这个值不会对原本可用的调用产生任何影响；prefix 的默认值为 `''`，如果覆盖了则会导致非私聊环境下无法直接写指令名进行调用（也就是在非私聊环境下调用指令必须加 nickname 和 prefix 前缀）。

如果想要保留直接写指令名的调用效果，可以设置 prefix 为 `['.', '']`，这样一来不写前缀和写 `.` 做前缀都是可以的。但是也要注意由于是按照从前往后的顺序依次匹配，因此 `''` 必须写在最后一个。
:::

## 指令别名

你可以为一条指令添加别名：

```js
app.command('echo').alias('say')
```

这样一来，无论是 `echo` 还是 `say` 都能触发这条指令了。

## 快捷方式

Koishi 的指令机制虽然能够尽可能避免冲突和误触发，但是也带来了一些麻烦。一方面，一些常用指令的调用会受到指令前缀的限制；另一方面，一些指令可能有较长的选项和参数，但它们调用时却往往是相同的。面对这些情况，**快捷方式**能有效地解决你的问题。

假设你实现了一个货币系统和 rank 指令，调用 `rank wealth --global` 可以实现查看全服所有人财富排行，你可以这样做：

```js
ctx.command('rank <type>')
  .shortcut('全服财富排行', { args: ['wealth'], options: { global: true } })
```

这样一来，只要输入“全服财富排行”，Koishi 就会自动调用 `rank wealth --global`，回复查询结果了。

通常来说，快捷方式都要求严格匹配（当然删除两端空格和繁简体转化这种程度的模糊匹配是可以做的），但是你也可以让快捷方式允许带参数：

```js
ctx.command('buy <item>')
  .shortcut('购买', { prefix: true, fuzzy: true })
```

上面程序注册了一个快捷方式，`prefix` 要求在调用时保留指令前缀，而 `fuzzy` 允许这个快捷方式带参数列表。这样一来，只要输入“Koishi，购买物品名”，Koishi 就会自动调用“buy 物品名”了。

除此以外，你还可以使用正则表达式作为快捷方式：

```js
ctx.command('market <area>')
  .shortcut(/^查(.+区)市场$/, { args: ['$1'] })
```

这样一来，输入“查美区市场”就等价于输入“market 美区”了。

不难看出，使用快捷方式会让你的输入方式更加接近自然语言，也会让你的机器人显得更平易近人。

## 指令插值

如果你希望在指令中使用其他指令的内容，可以使用 `$()` 进行指令插值：

<panel-view title="聊天记录">
<chat-message nickname="Alice" color="#cc0066">echo foo$(echo bar)</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png">foobar</chat-message>
</panel-view>

Koishi 默认不转义单引号内的文本。如果你不希望某个参数被插值语法所转义，可以使用单引号：

<panel-view title="聊天记录">
<chat-message nickname="Alice" color="#cc0066">echo 'foo$(echo bar)'</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png">foo$(echo bar)</chat-message>
</panel-view>

最后，你还可以在 [koishi-plugin-eval](../../plugins/eval/basic.md) 中了解到另一种插值方法。

## 模糊匹配

在日常的使用中，我们也难免会遇到打错的情况，这时 Koishi 还会自动根据相近的指令名进行纠错提醒：

<panel-view title="聊天记录">
<chat-message nickname="Alice" color="#cc0066">ecko hello</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png">没有此命令。你要找的是不是“echo”？发送空行或句号以调用推测的指令。</chat-message>
<chat-message nickname="Alice" color="#cc0066">.</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png">hello</chat-message>
</panel-view>

如果想调整模糊匹配的程度，你还可以修改配置项 [similarityCoefficient](../../api/app.md#options-similaritycoefficient)。是不是很方便呢？