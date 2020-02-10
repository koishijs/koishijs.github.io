---
sidebarDepth: 2
---

# 消息的响应

## 配置内置问答

respondent 插件允许设置一套内置问答，就像这样：

```js koishi.config.js
module.exports = {
  plugins: [['common', {
    respondent: [{
      match: 'awsl',
      reply: '爱我苏联',
    }, {
      match: /^\s*(\S +){2,}\S\s*$/,
      reply: '空格警察，出动！',
    }, {
      match: /^(.+)一时爽$/,
      reply: (_, str) => `一直${str}一直爽`,
    }],
  }]],
}
```

<panel-view title="聊天记录">
<chat-message nickname="Alice" color="#cc0066">awsl</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png">爱我苏联</chat-message>
<chat-message nickname="Bob" color="#00994d">久 等 了</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png">空格警察，出动！</chat-message>
<chat-message nickname="Carol" color="#1e90ff">挖坑一时爽</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png">一直挖坑一直爽</chat-message>
</panel-view>

其中 `match` 可以是一个字符串或正则表达式，用来表示要匹配的内容；`reply` 可以是一个字符串或传入字符串的函数，用来表示输出的结果。`respondent` 数组会按照从上到下的顺序进行匹配。

如果想要加入更高级和用户可定义的问答系统，可以参见 [koishi-plugin-teach](../teach.md)。

## 配置复读机

复读功能一直是很多机器人的传统艺能，但是 Koishi 敢说自己能做得更多。利用内置的复读插件，你的机器人不仅可以实现概率复读，还可以概率打断，甚至可以检测他人重复复读或打断复读的行为并做出回应。让我们开始吧！

### 控制复读时机和概率

首先让我们看一个最简单的例子。如果我们希望让机器人在复读进行到第 3 次时参与复读，且此后不再参与，我们可以这样配置：

```js koishi.config.js
module.exports = {
  plugins: [['common', {
    repeater: {
      repeat: (repeated, times) => times === 3,
    },
  }]],
}
```

<panel-view title="聊天记录">
<chat-message nickname="Alice" color="#cc0066">foo</chat-message>
<chat-message nickname="Bob" color="#00994d">foo</chat-message>
<chat-message nickname="Carol" color="#1e90ff">foo</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png">foo</chat-message>
<chat-message nickname="Dave" color="#f4a460">foo</chat-message>
</panel-view>

我们可以看到，上面显示的 `repeat` 参数是一个函数，传入的第一个参数表示是否已经复读过，第二个参数表示全员已经复读过的次数（包括自己）。这个函数的返回值如果是 truthy，那么机器人就会触发一次复读。

下面我们加入一些概率因素，让机器人的行为变得更不可控一些，例如让每次仅有 50% 的概率触发复读：

```js koishi.config.js
module.exports = {
  plugins: [['common', {
    repeater: {
      // 因为不知道具体是哪次复读的，所以可以用 !repeated 确保只复读一次
      repeat: (repeated, times) => !repeated && times >= 4 && Math.random() < 0.5,
    },
  }]],
}
```

### 自动打断复读

不过有时我们也不希望机器人复读所有的内容，因此我们可以让机器人自动打断某些复读：

```js koishi.config.js
module.exports = {
  plugins: [['common', {
    repeater: {
      // 传入的第三个参数是最后收到的发言内容
      interrupt: (_, times, message) => times >= 2 && message === '这机器人又开始复读了',
      interruptText: '打断复读！',
    },
  }]],
}
```

<panel-view title="聊天记录">
<chat-message nickname="Alice" color="#cc0066">这机器人又开始复读了</chat-message>
<chat-message nickname="Bob" color="#00994d">这机器人又开始复读了</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png">打断复读！</chat-message>
</panel-view>

### 检测重复复读和打断复读

除此以外，我们还可以让 Koishi 对他人重复复读和打断复读的行为作出回应。例如，如果你想让你的机器人在一条信息已经复读过 5 次以上，且自己也已经复读过后，对任何打断复读的人以 50% 的概率出警，同时对所有将同一句话复读 2 次的用户也作出警告。你可以这样配置：

```js koishi.config.js
module.exports = {
  plugins: [['common', {
    repeater: {
      // 检测重复复读
      repeatCheck: true,
      repeatCheckText: '不许重复复读！',

      // 检测打断复读
      interruptCheck: (repeated, times) => repeated && times >= 3 && Math.random() > 0.5,
      interruptCheckText: (userId) => `[CQ:at,qq=${userId}] 在？为什么打断复读？`,
    },
  }]],
}
```

<panel-view title="聊天记录">
<chat-message nickname="Alice" color="#cc0066">foo</chat-message>
<chat-message nickname="Bob" color="#00994d">foo</chat-message>
<chat-message nickname="Alice" color="#cc0066">foo</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png">不许重复复读！</chat-message>
</panel-view>

<panel-view title="聊天记录">
<chat-message nickname="Alice" color="#cc0066">bar</chat-message>
<chat-message nickname="Bob" color="#00994d">bar</chat-message>
<chat-message nickname="Carol" color="#1e90ff">bar</chat-message>
<chat-message nickname="Dave" color="#f4a460">打断复读</chat-message>
<chat-message nickname="Koishi" avatar="/koishi.png"><strong>@Dave</strong> 在？为什么打断复读？</chat-message>
</panel-view>

### 完整的配置项参考

```ts
type SessionSwitch = boolean | ((repeated: boolean, times: number, message: string) => boolean)
type SessionText = string | ((userId: number, message: string) => string)

interface RepeaterOptions {
  repeat: SessionSwitch
  interrupt: SessionSwitch
  repeatCheck: SessionSwitch
  interruptCheck: SessionSwitch
  interruptText: SessionText
  repeatCheckText: SessionText
  interruptCheckText: SessionText
}
```

其中，四个 `SessionSwitch` 都会根据返回值是否为 truthy 做出相应的回应；三个 `SessionText` 会根据返回的字符串进行输出。对于其他人的复读行为，各个回应的优先级为 repeatCheck > interrupt > repeat。而默认的行为如下图：

```js
const defaultOptions: RepeaterOptions = {
  repeat: false,
  interrupt: false,
  interruptText: '打断复读！',
  repeatCheck: false,
  repeatCheckText: (userId) => `[CQ:at,qq=${userId}] 在？为什么重复复读？`,
  interruptCheck: false,
  interruptCheckText: (userId) => `[CQ:at,qq=${userId}] 在？为什么打断复读？`,
}
```
