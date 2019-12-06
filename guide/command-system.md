---
sidebarDepth: 2
---

# 指令系统

一个成功的机器人离不开强大的**指令系统**。正因为如此，Koishi 在编写时也广泛研究了许多指令系统的实现，并做成了如今的规模。使用 Koishi，你可以方便地创建和管理各种指令，并能够高效地处理大量指令的并发调用。同时，Koishi 还提供了快捷方式、多级指令、自定义前缀等功能，同时支持调用次数和频率限制，权限管理等高级特性，让你得以高自由度来配置你的机器人。

## 指令初探

编写下面的代码，你就实现了一个简单的 echo 指令：

```js
app.command('echo <message>')
  .action(({ meta }, message) => meta.$send(message))
```

现在运行你的机器人，对其输入 `echo Hello`，你就会得到 `Hello` 的回应。让我们回头看看这段代码是如何工作的：

- `.command()`：定义了一个 echo 指令，其有一个必选参数为 message
- `.action()`：定义了指令触发时的回调函数，第一个参数的 meta 属性是元信息，第二个参数是输入的 message

这种链式的结构能够让我们非常方便地定义和扩展指令，事实上这种想法参考了优秀的命令行工具 [CAC](https://github.com/cacjs/cac)。稍后我们将看到这两个函数的更多用法，以及更多指令相关的函数。

## 参数列表

正如你在上面所见的那样，使用 `ctx.command(rawName)` 方法可以定义一个指令，其中 `rawName` 是一个字符串，包含了指令的名称和参数列表。

- 指令名可以由数字、字母、下划线、短横线和非 ASCII 字符构成。注意：Koishi 的指令系统**对大小写和繁简体都不敏感**。
- 一个指令可以含有任意个参数。其中必选参数用尖括号包裹，可选参数用方括号包裹。

例如，下面的程序定义了一个拥有三个参数的指令，第一个为必选参数，后面两个为可选参数，它们将分别作为 `action` 回调函数的第 2, 3, 4 个参数：

```js
ctx.command('my-command <arg1> [arg2] [arg3]')
  .action(({ meta }, arg1, arg2, arg3) => { /* do something */ })
```

::: warning 注意
除去表达的意义不同，以及参数个数不足时使用必选参数可能产生错误信息外，这两种参数在程序上是没有区别的。与此同时，`action` 回调函数从第二个参数起也总是字符串。如果传入的参数不足，则对应的参数不会被传入，因此你需要自己处理可能的 `undefined`。
:::

### 变长参数

有时我们需要传入未知数量的参数，这时我们可以使用变长参数，它可以通过在括号中前置 `...` 来实现：

```js
ctx.command('my-command <arg1> [...rest]')
  .action(({ meta }, arg1, ...rest) => { /* do something */ })
```

在上面的例子中，无论传入了多少个参数，都会被放入 `rest` 数组进行处理。

### 长参数

通常来说传入的信息被解析成指令调用后，会被空格分割成若干个参数。但如果你想输入的就是含有空格的内容，可以通过在括号中后置 `...` 来声明一个长参数：

```js
ctx.command('my-command <longArg...>')
  .action(({ meta }, longArg) => { /* do something */ })
```

在上面的例子中，即使 my-command 后面的内容中含有空格，也会被整体传入 `longArg` 中。

::: warning 注意
长参数的解析优先级很高，即使是之后的内容中含有选项或 `--` 也会被一并认为是该参数的一部分。因此，当使用长参数时，应确保选项写在该参数之前。
:::

### 使用引号

除了上面所说的长参数外，你还可以通过使用引号的方式传入带空格的参数。Koishi 会自动将引号中的内容视为一个参数（可以是半角或者全角的引号）。这在很多场景中都非常有用，下面举出了一些典型的例子：

1. 当传入带空格的参数时（除非是长参数，否则参数默认会在空格处分开）
2. 当传入以 `-` 开头的参数时（默认的行为是解析成选项或 `--`）
3. 当希望传入一个空字符串时作为参数时

## 定义选项

使用 `cmd.option(rawName)` 函数可以给指令定义参数。这个函数是可以链式调用的，就像这样：

```js
ctx.command('my-command')
  .option('-a, --alpha')          // 定义一个选项
  .option('-b, --beta [beta]')    // 定义一个带参数的可选选项
  .option('-c, --gamma <gamma>')  // 定义一个带参数的必选选项
  .action(({ meta, options }) => console.log(options))
```

现在向你的机器人输入 `my-command -adb beta --gamma=123 --foo-bar baz`，你能在控制台看到这样的输出：

```
{ a: true, alpha: true,
  b: 'beta', beta: 'beta',
  c: 123, gamma: 123,
  d: true, fooBar: 'baz' }
```

从上面的例子中我们不难看出 Koishi 指令系统的许多方便的特性：

- 同时支持单字母和多字母选项，并且同时注册的选项被认为是同一个，会被同时赋值
- 选项和参数之间同时支持用空格或等号隔开的语法
- 短横线后跟多个字母时，会把之后的参数赋给最后一个字母（如果需要参数的话）
- 多字母中如果有短横线，会被自动进行 camelCase 处理
- 类型自动转换：无参数默认为 `true`，如果是数字会转化为数字，其余情况为字符串
- 支持识别未注册选项，同时会根据传入的命令行推测是否需要参数

接下来，我们还将讨论一些上面未展示的选项特性。

### 反向选项

如果一个选项以 `--no-` 开头，则 Koishi 会将其认定为一个反向选项，在解析时会对这个指取反，同时注册的其他值不受影响，例如这样：

```js
ctx.command('my-command')
  .option('-A, --no-alpha-beta')
  .action(({ meta, options }) => console.log(options))

// 输入：my-command -A
// 输出：{ A: true, alphaBeta: false }
```

但是如果此时已经注册了不带 `--no-` 前缀的选项，Koishi 就不会这样处理：

```js
ctx.command('my-command')
  .option('-a, --alpha-beta')
  .option('-A, --no-alpha-beta')
  .action(({ meta, options }) => console.log(options))

// 输入：my-command -A
// 输出：{ A: true, noAlphaBeta: true }
```

这种特性是许多指令系统做不到的。

### 选项的配置

在调用 `ctx.option()` 时，你还可以传入第二个参数（事实上还有第三个，将在之后介绍），它应该是一个对象，用于配置选项的具体特性。就像这样：

```js
ctx.command('my-command')
  // 即使传入数字或不传入参数，也不进行转换
  .option('-a [alpha]', { isString: true })
  // 如果没有传入参数，则取默认值 1000
  .option('-b [beta]', { default: 1000 })
  // 对 --no-gamma 不进行取反操作
  .option('-c, --no-gamma', { noNegated: true })
```

你可以在 [OptionConfig 对象](#optionconfig-对象) 一节看到全部的配置项。

### 额外参数

Koishi 同时还支持一种特殊的选项：`--`。我们称之为**额外参数**。这个选项之后的内容将不被解析，会被放入 `action` 回调函数的第一个参数的 `rest` 属性中。这在许多高级指令中将非常有用。

举个例子，假如你要写一个 schedule 指令，功能是定期触发某条指令，你就可以利用额外参数来实现：

```sh
# 每 5 分钟触发一次 echo Hello World 的执行
schedule --interval 300 -- echo Hello World
```

这样做有利于将原指令和要执行的指令成功分离开，避免要执行的指令的选项被原指令捕获。下面提供了一个简单的实现：

```js
app.command('schedule')
  .option('--interval <seconds>')
  .action(({ meta, options, rest }) => {
    setInterval(() => {
      const parsedResult = app.parseCommandLine(rest, meta)
      parsedResult.command.execute(parsedResult)
    }, options.interval * 1000)
  })
```

## 提供使用说明

为了让用户能够更方便的调用这些指令，我们还需要撰写指令的使用说明。而对 Koishi 来说，这一点儿也不麻烦。之前已经介绍了 `ctx.command()` 和 `cmd.option()` 这两个方法，它们都能传入第二个字符串作为参数。这个字符串会作为这个指令或选项的描述文字。就像这样：

```js
ctx.command('echo <message...>', '输出收到的信息')
  .option('-t, --timeout <seconds>', '设定延迟发送的时间')
```

那么这些内容如何才能让用户看到呢？别担心，koishi-plugin-common 中内置了一个强大的 help 指令，可以让你方便地查看一个指令的帮助文档。调用 `help echo` 或者 `echo -h`（这个默认情况下会被 Koishi 自动转化为 help 指令调用），你会看到这样的回复：

```
echo <message...>
输出收到的信息
可用的选项有：
    -t, --timeout <seconds>  设定延迟发送的时间
```

当然，我们还可以加入具体的用法和使用示例，进一步丰富这则使用说明：

```js
ctx.command('echo <message...>', '输出收到的信息')
  .option('-t, --timeout <seconds>', '设定延迟发送的时间')
  .usage('注意：参数请写在最前面，不然会被当成 message 的一部分！')
  .example('echo -t 300 Hello World  五分钟后发送 Hello World')
```

这时再调用 `help echo` 或者 `echo -h`，你便会发现使用说明中已经添加了你刚刚的补充文本：

```
echo <message...>
输出收到的信息
注意：参数请写在最前面，不然会被当成 message 的一部分！
可用的选项有：
    -t, --timeout <seconds>  设定延迟发送的时间
使用示例：
    echo -t 300 Hello World  五分钟后发送 Hello World
```

最后，如果直接调用 `help`，输出的会是全部指令组成的列表。

## 指令的调用

本节介绍有关指令调用的一些 API。

### 指令前缀

**指令前缀**是 Koishi 用于判断一条信息是否为指令的正则表达式。这个正则表达式在不同环境下可以是不同的。默认情况下，以下信息都可以触发指令调用（假设 `app.options.name` 被设置为了 `Koishi` 且机器人的群名片也是 `Koishi`）：

```sh
# 私聊状态下
Koishi echo hello
Koishi, echo hello
echo hello
.echo hello

# 群聊状态下
Koishi echo hello
Koishi, echo hello
@Koishi echo hello
.echo hello
```

但你也可以通过修改 `AppOptions` 的这几个属性来改变这种行为：

- name: `string` 默认为空。如果为空的话，上述几条以 `Koishi` 开头的信息就不会触发指令了
- commandPrefix: `string` 默认为 `.`。设置为其他字符可以修改上述几条以 `.` 开头的触发行为

### 指令别名

你可以为一条指令添加别名：

```js
app.command('echo').alias('say')
```

这样一来，无论是 `echo` 还是 `say` 都能触发这条指令了。

### 模糊匹配

在日常的使用中，我们也难免会遇到打错的情况，这时 Koishi 还会自动根据相近的指令名进行纠错提醒：

```
>> ecko hello
<< 没有此命令。你要找的是不是“echo”？发送空行以调用推测的指令。
>> 
<< hello
```

是不是很方便呢？

### 快捷方式

Koishi 要求指令名只能由英文字母、数字、下划线、短横线和非 ASCII 字符构成，这看起来已经够用了，但是指令的调用仍然会受到指令前缀的限制；另一方面，一些指令可能有较长的选项和参数，但它们调用时却往往是相同的。面对这些情况，**快捷方式**能有效地解决你的问题。

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

上面程序注册了一个快捷方式，`prefix` 要求在调用时保留指令前缀，而 `fuzzy` 允许这个快捷方式带参数列表。这样一来，只要输入“Koishi，购买物品名”，Koishi 就会自动调用 `buy 物品名` 了。

不难看出，使用快捷方式会让你的输入方式更加接近自然语言，也会让你的机器人显得更平易近人。

在本章的最后，你可以在 [ShortcutConfig 对象](#shortcutconfig-对象) 中看到全部的配置项。

## 权限管理

Koishi 内置了一套用户系统（虽然需要 [数据库](./using-database.md) 的支持）。利用这套系统，我们就可以实现指令的调用权限控制。本节将分别介绍目前支持的权限控制形式。通过向 `ctx.command()` 传入一个对象作为第二或者第三个参数可以修改有关权限管理的一些设置。在本章的最后，你可以在 [CommandConfig 对象](#commandconfig-对象) 中看到全部的配置项。

### 设置调用权限

Koishi 默认的权限共分为 6 个等级，分别从最低的 0 级到最高的 5 级。指令的调用权限要求默认是 1 级。你可以通过这样的方式设置调用权限：

```js
// 设置 echo 命令的调用权限为 2 级
ctx.command('echo <message...>', '输出收到的信息', { authority: 2 })
  // 设置 -t 选项的调用权限为 3 级
  .option('-t, --timeout <seconds>', '设定延迟发送的时间', { authority: 3 })
```

这样一来，1 级或以下权限的用户就无法调用 echo 指令；2 级权限用户只能调用 echo 指令但不能使用 -t 参数；3 级或以上权限的用户不受限制。

### 设置访问次数上限

有些指令（例如签到抽卡点赞，高性能损耗的计算，限制次数的 API 调用等）我们并不希望被无限制调用，这时我们可以设置每天访问次数的上限：

```js
// 设置 lottery 命令每人每天只能调用 10 次
ctx.command('lottery', '抽卡', { maxUsage: 10 })
  // 设置使用了 -s 的调用不计入总次数
  .option('-s, --show', '查看已经抽到的物品列表', { notUsage: true })
```

这样一来，所有访问 lottery 指令且不含 -s 选项的调用次数上限便被设成了 10 次。当超出总次数后，机器人将回复“调用次数已达上限”。

### 设置最短触发间隔

有些指令（例如高强度刷屏）我们并不希望被短时间内重复调用，这时我们可以设置最短触发间隔：

```js
// 设置 help 命令每 60 秒只能调用 1 次
ctx.command('help', '抽卡', { minInterval: 60000 })
```

这样一来，help 命令被调用后 60 秒内，如果再次被调用，将不会产生任何回答（这个行为也可以被手动修改）。

## 多级指令

尽管指令的注册非常方便，但是当指令数量变多时，另一些问题也会随之浮现出来：大量的指令不便于列表显示（想象一下你的机器人输出由上百条指令构成的列表的时候会是何等的刷屏），同时来自不同插件的指令可能存在名称冲突。本节所介绍的**多级指令**，便是对这一类问题的解决方案。

### 子指令

通过 `cmd.subcommand()` 方法可以创建子指令，它的调用方法与 `ctx.command()` 是完全一致的，唯一的区别是创建的指令将被标记为原来指令的子指令。下面我们举个简单的例子，假设你运行了下面的代码：

```js
ctx.command('foo').subcommand('bar')
```

则此时调用 `help` 所获得的指令列表中将不会显示 bar，但是会标注 foo 含有子指令。如果再调用 `help foo`，则可以看到其子指令列表中含有指令 bar。而与此同时，你仍然可以直接调用 bar 指令或通过调用 `help bar` 查看其帮助。这样一来，你便可以对你的大量指令进行分组管理，从而有效降低列表的长度。这就成功解决了上面提出的第一个问题。

在解决第二个问题之前，先让我介绍一下 Koishi 支持的两种子指令格式。一种是**层级式**，也就是刚刚演示的这种；而另一种则叫**派生式**。后者跟前者的区别是，它在调用时要额外加个前置小数点：

```js
ctx.command('foo').subcommand('.bar')
ctx.command('foo').subcommand('foo.bar') // 这种写法是等价的
```

此时将不会有 bar 这条指令，取而代之的是 foo.bar。调用 `help` 所获得的指令列表中将不会显示 foo.bar，但是同样会标注 foo 含有子指令。如果再调用 `help foo`，则可以看到其子指令列表中含有指令 foo.bar。与此同时，无论是直接调用 bar 指令还是调用 `help bar` 都是无效的，你必须显式地写出全名才行。这样一来，你就可以成功区分重名指令，从而解决上面提出的第二个问题。

### 链式注册

如果你想创建一个 foo 指令，其含有一个 bar 作为子指令，用上面的写法的确是一种很好的做法。但是如果 foo 是已经存在的指令，这种写法还生效吗？这一点上，你并不需要担心。Koishi 内部的逻辑可以保证：当调用 `ctx.command()` 方法时，如果指令不存在将会被创建；而如果指令已存在（并且在当前上下文内），除去其他参数可以对其进行修改外，将会直接返回之前注册的指令本身。因此，你可以使用下面的写法来创建两种子指令：

```js
ctx.command('foo').subcommand('bar')
ctx.command('foo').subcommand('.baz')
```

Koishi 为其提供了一种更加简便的等价写法，称为**链式注册**：

```js
ctx.command('foo/bar') // 用斜杠表示层级式子指令
ctx.command('foo.bar') // 用小数点表示派生式子指令
```

利用这种写法，你甚至可以快速注册多级指令：

```js
ctx.command('foo.bar/abc.xyz')
```

不过需要注意的是，在某些情况下，上面的两种写法并不完全等价。具体情况将在下一节介绍。

### 边界情况

尽管多级指令为我们带来了种种方便，我们也需要警惕它可能存在的问题。本节就讨论了一些有关多级指令的边界情况，这些用法是你需要警惕和避免的。

#### 将已有的存在父指令的指令注册成其他指令的子指令

一旦将已有的指令注册成其他指令的子指令，将可能面临着循环的父子关系。因此，我们将对这种行为进行检测：如果试图将已有的存在父指令的指令的指令注册成其他指令的子指令，则 Koishi 会抛出一个错误。这里的检测，不仅适用于直接调用 `cmd.subcommand()` 方法，还适用于在 `ctx.command()` 中可能的隐式完成的子指令注册。

#### 链式注册过程中某个指令存在但不属于父指令上下文

由于子指令应当在各个方面都是父指令的从属，因此我们也要求子指令的上下文是父指令上下文的子集（换句话说父指令的上下文路径是子指令的上下文路径的前缀）。因此如果发现链式注册过程中某个指令存在但不属于当前上下文的情况，Koishi 也会抛出一个错误。这里的“某个指令”，可以是已有的，也可以是即将创建的。

## 深入指令系统

在本章的最后，我们将深入指令系统，逐一介绍相关的各项 API。

### CommandConfig 对象

- checkUnknown: `boolean` 是否对未知选项进行检测，默认为 `false`
- checkRequired: `boolean` 是否对必选选项进行检测，默认为 `false`
- checkArgCount: `boolean` 是否对参数个数进行检测，默认为 `false`
- authority: `number` 最低调用权限，默认为 `1`
- maxUsage: `number` 每天最多调用次数，默认为 `Infinity`
- minInterval: `number` 每次调用最短时间间隔，默认为 `0`
- showWarning: `boolean` 当小于最短间隔时是否进行提醒，默认为 `false`
- noHelpOption: `boolean` 不默认注册 `-h, --help` 选项，默认为 `false`
- usageName: `string` 调用标识符，默认为指令名，如果多个指令使用同一个标识符，则它们的调用次数将合并计算

### OptionConfig 对象

- default: `any` 选项的默认值
- hidden: `boolean` 此选项在帮助中不可见
- authority: `number` 调用此选项的最低权限
- notUsage: `boolean` 调用此选项将不计入调用次数
- isString: `boolean` 保持参数为字符串，不进行类型转换
- noNegated: `boolean` 对以 `--no-` 开头的参数不进行取反操作

### ShortcutConfig 对象

- hidden: `boolean` 此选项在帮助中不可见
- authority: `number` 调用此快捷方式的最低权限
- prefix: `boolean` 调用时要求保留前缀
- fuzzy: `boolean` 允许在快捷方式后带参数
- oneArg: `boolean` 将所有后面的内容解析成一个参数
- options: `boolean` 要带的选项列表，将与传入的参数合并

### ActionConfig 对象

一个指令的 `action` 回调函数的第一个参数是一个对象，被称为 ActionConfig 对象。本节将介绍其上的全部属性。

- args: `string[]` 由全部参数构成的数组
- options: `Record<string, any>` 由传入选项构成的键值对
- unknown: `string[]` 未知参数列表
- rest: `string` 额外参数的内容
- meta: `Meta` 当前正在处理的元信息
- command: `Command` 当前匹配到的指令实例
- next: [`NextFunction`](../api/context.md#middleware) 当前指令解析函数所处的中间件的 `next` 回调函数
