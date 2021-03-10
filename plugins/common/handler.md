---
sidebarDepth: 2
---

# 处理事件

::: danger 注意
这里是**正在施工**的 koishi v3 的文档。
:::

## 处理好友和群申请

当使用了 koishi-plugin-common 并配置了数据库时，默认情况下 Koishi 会通过所有 1 级以上用户的好友申请，忽略所有群申请。你可以手动设置忽略和通过的函数：

```js koishi.config.js
module.exports = {
  plugins: [['common', {
    handleFriend: true, // 通过所有好友申请
    handleGroupAdd: undefined, // 忽略所有加群申请（当然这没必要写出来）
    async handleGroupInvite (meta) {
      // 拒绝所有来自 1 级以下，通过所有来自 3 级或以上权限用户的加群邀请，其他不处理
      const user = await ctx.database.getUser(meta.userId, 0, ['authority'])
      if (user.authority >= 3) {
        return true
      } else if (user.authority <= 1) {
        return false
      }
    },
  }]],
}
```

在上面的例子中，`handleFriend`, `handleGroupAdd` 和 `handleGroupInvite` 分别用于处理好友申请，加群申请和加群邀请。每个选项的值都可以是下面几种类型：

- true: 表示通过申请
- false: 表示拒绝申请
- undefined: 表示不做处理
- 字符串
  - 如果是好友申请，则表示通过，并使用该字符串作为该好友的备注名
  - 如果是群申请或邀请，则表示拒绝，并使用该字符串作为拒绝的理由
- 函数: 将传入两个参数，第一个是请求对应的元信息 Meta 对象，第二个是所在的 App 实例，返回值同样可以是 true, false, undefined, 字符串或对应的 Promise，将按照上面所说的方式来解读

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

<panel-view :messages="[
  ['Alice', 'awsl'],
  ['Koishi', '爱我苏联'],
  ['Bob', '久 等 了'],
  ['Koishi', '空格警察，出动！'],
  ['Carol', '挖坑一时爽'],
  ['Koishi', '一直挖坑一直爽'],
]"/>

其中 `match` 可以是一个字符串或正则表达式，用来表示要匹配的内容；`reply` 可以是一个字符串或传入字符串的函数，用来表示输出的结果。`respondent` 数组会按照从上到下的顺序进行匹配。

如果想要加入更高级和用户可定义的问答系统，可以参见 [koishi-plugin-teach](../teach.md)。

## 配置复读机

复读功能一直是很多机器人的传统艺能，但是 Koishi 敢说自己能做得更多。利用内置的复读插件，你的机器人不仅可以实现概率复读，还可以概率打断，甚至可以检测他人重复复读或打断复读的行为并做出回应。让我们开始吧！

### 控制复读时机和概率

通过提供onRepeat参数，我们可以定义机器人在检测到复读时进行怎样的行为，是跟着复读，还是进行打断，甚至是出警。
首先让我们看一个最简单的例子。如果我们希望让机器人在复读进行到第 3 次时参与复读，且此后不再参与，我们可以这样配置：

```js koishi.config.js
module.exports = {
  plugins: {
    common: {
      onRepeat: {
        minTimes: 3
      }
    },
  }
}
```

<panel-view :messages="[
  ['Alice', 'foo'],
  ['Bob', 'foo'],
  ['Carol', 'foo'],
  ['Koishi', 'foo'],
  ['Dave', 'foo'],
]"/>

下面我们加入一些概率因素，让机器人的行为变得更不可控一些，例如让每次仅有 50% 的概率触发复读：

```js koishi.config.js
module.exports = {
  plugins: {
    common: {
      onRepeat: {
        minTimes: 3,
        probability: 0.5
      }
    },
  }
}
```

在这种配置下，当复读语句达到3句后，每一次其他人的复读都有50%的概率触发机器人的复读行为。而一旦复读后，机器人将不再重复复读。

onRepeat除了可以接受一个对象作为参数以外，也支持接受一个函数来自定义当机器人检测到复读时执行的具体行为。下面我们来举几个例子。

### 自动打断复读

onRepeat函数可以接受两个参数，第一个参数为当前复读行为的状态state，其中包含目前复读次数times, 复读语句内容content，参与复读的用户与他们的复读次数users，机器人是否已经复读repeated。

第二个参数是当前的会话session。

当我们也不希望机器人复读所有的内容，我们可以通过如下配置让机器人自动打断某些复读：

```js koishi.config.js
module.exports = {
  plugins: {
    common: {
      onRepeat: (state) =>
        state.times >= 2 &&
        state.content === "这机器人又开始复读了" &&
        "打断复读！",
    }
  }
}
```

<panel-view :messages="[
  ['Alice', '这机器人又开始复读了'],
  ['Bob', '这机器人又开始复读了'],
  ['Koishi', '打断复读！'],
]"/>

### 检测重复复读

来看一个更复杂的例子。我们还可以让 Koishi 对所有将同一句话复读 2 次的用户作出警告。你可以这样配置：

```js koishi.config.js
module.exports = {
  plugins: {
    common: {
      onRepeat: (state) => {
        for (const user of Object.entries(state.users)) {
          if (user[1] > 1) {
            return segment.at(user[0]) + "不许重复复读！";
          }
        }
      },
    },
  },
}
```

<panel-view :messages="[
  ['Alice', 'foo'],
  ['Bob', 'foo'],
  ['Alice', 'foo'],
  ['Koishi', '不许重复复读！'],
]"/>

### 检测打断复读

复读机插件支持的另一个参数onInterrupt可以定义机器人在检测到复读被其他人打断时的行为。可以传入一个函数来定义此行为，函数签名与onRepeat一致。

例如，如果你想让你的机器人在一条信息已经复读过 5 次以上，且自己也已经复读过后，对任何打断复读的人以 50% 的概率出警。你可以这样配置：

```js koishi.config.js
module.exports = {
  common: {
      onRepeat:{
        minTimes: 2
      },
      onInterrupt: (state, session) =>
        state.repeated &&
        state.times >= 3 &&
        Math.random() > 0.5 &&
        segment.at(session.userId!) + "在？为什么打断复读？",
    },
}
```

<panel-view :messages="[
  ['Alice', 'bar'],
  ['Bob', 'bar'],
  ['Koishi', ' bar'],
  ['Dave', '打断复读'],
  ['Koishi', ' 在？为什么打断复读？'],
]"/>

### 完整的配置项参考

```js
interface RepeatState {
  content: string
  repeated: boolean
  times: number
  users: Record<number, number>
}

type StateCallback = (state: RepeatState, session: Session) => void | string

interface RepeatHandler {
  minTimes: number
  probability?: number
}

export interface RepeaterOptions {
  onRepeat?: RepeatHandler | StateCallback
  onInterrupt?: StateCallback
}
```
