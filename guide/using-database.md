---
sidebarDepth: 2
---

# 使用数据库

在之前的章节中，我们已经看到 Koishi 内部实现了一套权限管理系统，这需要对数据库的支持。但是另一方面，为了保证纯粹性，Koishi 的核心库 koishi-core 并不希望写入对某个具体的数据库的支持。因此，Koishi 的数据库采取了注入的方法。因此插件开发者大可不必同时担心 Koishi 使用了自己不了解的数据库框架——因为任何数据库在 Koishi 的调用中都提供了相同的接口。

## 安装数据库

正如上面所说的，如果你是 Koishi 的插件开发者，你可能不需要关心具体的数据库实现（除非你本身需要新的表来存储数据）。但是如果你是 Koishi 的使用者，只有当安装了数据库你才能正常使用所有的特性。首先你需要安装数据库依赖：

```sh
# 我们以 mysql 数据库为例
# 与插件类似，数据库支持通常以 koishi-database- 开头
npm i koishi-database-mysql
# 或 yarn add koishi-database-mysql
```

### 使用配置文件

然后如果你使用的是 [配置文件](./config-file.md)，你可以向文件中添加 `database` 属性：

```js
module.exports = {
  database: {
    mysql: {
      host: '[host]',
      port: 3306,
      user: 'root',
      password: '[password]',
      database: '[database]',
    },
  },
}
```

### 使用 API

对于 Koishi API 的使用者，你需要手动引入这个数据库，并将相同的配置传入 [App](../api/app.md) 的构造选项中：

```js
const { App, startAll } = require('koishi')
require('koishi-database-mysql')

new App({
  database: {
    mysql: {
      host: '[host]',
      port: 3306,
      user: 'root',
      password: '[password]',
      database: '[database]',
    },
  },
})

startAll()
```

### 安装多个数据库

你也可以在一个 Koishi 项目中使用多个数据库，例如用 mysql 存储教学对话，用 leveldb 存储用户数据。方法也很简单，只需在 database 属性中添加其他的值即可：

```js
require('koishi-database-mysql')
require('koishi-database-level')

const app = new App({
  database: {
    mysql: { /* mysql configuration */ },
    level: { /* leveldb configuration */ },
  },
})
```

### 解决数据库冲突

尽管我们可以让多个数据库同时运行，但是上面的配置却无法指定每个数据库管理哪部分数据。也就是说数据库之间可能存在在 API 冲突。这种情况下可能需要你手动解决这些冲突，方法很简单，只需在 `config.database` 中加入一个 `$tables` 属性，显式地说明哪张表用哪个数据库管理即可：

```js
module.exports = {
  database: {
    $tables: {
      user: 'mysql',
      group: 'level',
    },
    mysql: { /* mysql configuration */ },
    level: { /* leveldb configuration */ },
  },
}
```

## 调用数据库

你可以通过访问 `ctx.database` 来调用数据库接口：

```js
// 获取用户数据
const user = await ctx.database.getUser(id)

// 修改群数据
await ctx.database.setGroup(id, { assignee: 123456789 })
```

你可以在后面的 [API](../api/database.md) 文档中看到全部内置的数据库 API。不过在这里我先介绍一下 Koishi 的数据库接口的几种设计，方便理解。

### 常见的接口设计

下面的代码展示了一个 Koishi 数据库最常见的接口设计，它广泛地运用于各种插件中：

```js
// 向数据库中获取一行，可以采用 getXXX(id, fields) 的形式
// 其中 id 是该行的标识符，fields 是需要的字段
// 对于有些数据库这个参数是自动忽略的，无论填写什么都会返回一切字段
// 如果该行存在则返回该行的对应字段，否则返回 null
ctx.database.getSchedule(id, fields)

// 向数据库中添加一行，可以采用 createXXX(data) 的形式
// 其中 data 是一个键值对；返回值是添加的行的完整数据（包括自动生成的 id 和默认属性等）
ctx.database.createSchedule(data)

// 修改数据库中的一行，可以采用 setXXX(id, data) 的形式
// 其中 id 是该行的标识符，data 是要更改的数据
// 修改时只会用 data 中的键进行覆盖，不会影响未记录在 data 中的资源
ctx.database.setSchedule(id, data)
```

### 合并获取和插入

对于 Koishi 内部的两个抽象表 users 和 groups，情况略有不同。由于这两个表的访问量非常大，同时可能有许多未记录的数据请求，因此 Koishi 对这两个表采取了合并获取和插入的方法。你可以看到，在这种情况下将不需要使用 createXXX 方法就能插入新的行：

```js
// 中间增加了一个第二参数，表示默认情况下的权限等级
// 如果找到该用户，则不修改任何数据，返回该用户本身
// 如果未找到该用户，且 authority 小于 0，则返回 null
// 否则创建一个新的用户数据，权限为 authority
// 如果 authority 大于 0，则将新的用户数据添加到表中
ctx.database.getUser(id, authority, fields)

// 中间增加了一个第二参数，表示默认情况下的 assignee
// 如果找到该群，则不修改任何数据，返回该群本身
// 如果未找到该群，则创建一个新的群，代理者为 selfId
// 如果 selfId 大于 0，则将新的群数据添加到表中
ctx.database.getGroup(id, selfId, fields)
```

### 使用观察者

由于 Koishi 采取了中间件的处理流程，很可能发生用户数据在多个阶段都被修改的情况。如果每次修改都上传数据，势必会造成不必要的性能损失；如果每次修改不上传而是仅仅缓存，延迟的上传则可能导致必须上传所有字段，且有多个实例上传数据冲突的风险。对于这种情况，Koishi 设计了一套**观察者模式**，可以让你更轻松地管理用户数据：

```js
// 创建一个观察者
const user = await database.observeUser(id)

// 在多个中间件中修改用户数据
user.name = 'foo'
user.money += 100
updateActivity(user.activity, 123456789)

// 上传更新
user._update()
```

在上面的例子中，数据分成几次更新，但直到最后才进行上传。且由于观察者会记录每次的变化，使得最后更新时只修改之前变动的字段成为可能。更重要的是，这个更新时 Koishi 隐式地为你完成的，因此你**甚至无需手动更新数据**，只要你直接在中间件中修改 `meta.$user` 的数据即可。

::: tip 观察者的局限性和优化措施
如果你是插件开发者，这里有一些观察者的局限性需要提醒你。由于观察者本质上还是要延迟更新，因此为了确保数据安全，如果 `meta.$user` 已经被改动，你应当尽量在异步操作开始前手动进行 `meta.$user._update()` 的调用。

顺便一提，一旦成功执行了观察者的 `_update()` 方法，之前的缓冲区将会被清空，因此之后不会重复更新数据；对于缓冲区为空的观察者，`_update()` 方法也会直接返回，不会产生任何的数据库访问。这些都是我们优化的几个细节。
:::

## 向数据库中注入

由于 Koishi 的数据库实现使用了注入策略，因此无论是字段，表，方法还是数据库都是可以注入的。

### 注入字段

向内置的 users 和 groups 两张表中注入字段的方式如下：

```js
const { extendUser } = require('koishi')

// 向用户数据库中注入字段 foo，默认值为 'bar'
extendUser(() => ({ foo: 'bar' }))
```

如果你是 TypeScript 用户，你可能还需要进行定义合并：

```ts
import { extendUser } from 'koishi'

declare module 'koishi-core/dist/database' {
  interface UserData {
    foo: string
  }
}

extendUser(() => ({ foo: 'bar' }))
```

### 注入方法

向数据库中添加新的表，你并不需要对表进行描述（虽然只有这样才能让其他人对你的表进行二次注入，但如果你没有这种需求你当然可以不这么做），只需调用 `injectMethods()` 方法添加新的数据库方法：

```js
const { injectMethods } = require('koishi')

// 第一个参数声明这个方法依赖于 mysql 数据库
// 第二个参数表明这次调用注入的是 user 表
injectMethods('mysql', 'user', {
  myMethod (...args) {
    // 此时这里的 this 就变成了一个 MysqlDatabase 对象
    // 这也是 koishi-database-mysql 的导出之一
    return this.query(sql)
  },
})
```

这也依赖，你就可以直接调用刚刚定义的方法了：

```js
ctx.database.myMethod(...args)
```

如果你是 TypeScript 用户，你可能还需要进行定义合并：

```ts
import { injectMethods } from 'koishi'

// 这里需要手动导入 MysqlDatabase 的类型
// 你应该将 koishi-database-mysql 作为插件的 devDependency
// 尽量使用 import {}，这样可以不产生任何输出，有助于明确依赖关系
import {} from 'koishi-database-mysql'

declare module 'koishi-core/dist/database' {
  interface UserMethods {
    myMethod (...args: SomeType): SomeType
  }
}

injectMethods('mysql', 'user', {
  myMethod (...args) {
    // 这里已经可以进行类型推断了
    return this.query(sql)
  },
})
```

::: tip 有关注入方法的 this
在所有注入方法中，你的 `this` 都可以访问到同时注册的其他方法和这些注入方法绑定的子数据库本身。
:::

### 注入表

尽管注入表不需要你在 JavaScript 中进行额外的操作，但是如果你是 TypeScript 使用者，你需要对注入的表进行定义，就像这样：

```ts
interface MyTableData {
  myData: SomeType
}

interface MyTableMethods {
  myMethod (...args: SomeType): MyTableData
}

declare module 'koishi-core/dist/database' {
  interface TableData {
    myTable: MyTableData
  }

  interface TableMethods {
    myTable: MyTableMethods
  }
}

injectMethods('mysql', 'myTable', {
  myMethod () {
    return this.query(sql)
  },
}
```

## 定义新的数据库

最后，让我们介绍一下如何定义新的数据库。与上面介绍的方法类似，我们也采用注入的方式，不过这次我们需要先实现一个类。我们用 mysql 来举个例子：

```js
const { createPool } = require('mysql')
const { registerDatabase } = require('koishi')

class MysqlDatabase {
  constructor (config = {}) {
    this.pool = createPool(config)
  }

  query = (sql: string, values?: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, values, (error, results, fields) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      })
    })
  }
}

registerDatabase('mysql', MysqlDatabase)
```

对于 TypeScript 的使用者，你可以像这样进行类型合并：

```ts
import { createPool, Pool, PoolConfig } from 'mysql'
import { registerDatabase } from 'koishi'

declare module 'koishi-core/dist/database' {
  interface Subdatabases {
    mysql: MysqlDatabase
  }

  interface DatabaseConfig {
    mysql: PoolConfig
  }
}

class MysqlDatabase {
  pool: Pool

  constructor (config: PoolConfig = {}) {
    this.pool = createPool(config)
  }

  query (sql: string, values?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, values, (error, results, fields) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      })
    })
  }
}

registerDatabase('mysql', MysqlDatabase)
```

当然，完整的 [`koishi-database-mysql`](https://github.com/koishijs/koishi-database-mysql) 要比上面的例子复杂的多，我们还需要处理有关数据库的更多细节。

### 数据库的启动和停止

然而很多数据库并没有像上面写的这么简单——例如数据库的加载可能包含一些异步操作，这些操作是不适合在构造函数中完成的；如果你希望你的应用平稳地停止，也最好提供一个数据库的中止函数。这些接口将由你来提供，只需在你传入的 Database 类中添加 `start` 和 `stop` 两个方法即可。这两个方法都可以是异步的：

```js
class CustomDatabase {
  async start () {
    await doSomeAsyncWorks()
  }

  async stop () {
    await doSomeAsyncWorks()
  }
}

registerDatabase('custom', CustomDatabase)
```

### 数据库的复用

在 [多机器人开发](./multiple-bots.md) 一章中，我们会讨论到数据库实例的复用。诚然，复用数据库实例这件事是 Koishi 内部完成的，但如果你在某些时刻的确需要使用独立的数据库实例，你就需要了解数据库复用的原理。

最简单的方式就是在对应数据库的参数中手动设置 `identifier` 属性，不同的标识符将提示 Koishi 构造不同的数据库实例：

```js
new App({
  database: {
    custom: {
      identifier: 1,
      // other configurations
    },
  },
})

new App({
  database: {
    custom: {
      identifier: 2,
      // other configurations
    },
  },
}]
```

除此以外，Koishi 也提供了隐式的标识符设计。向你的数据库类添加一个静态方法 `identiy`，这个函数将传入一个将要传给构造函数的 `config` 对象，返回一个字符串或数字，这个返回值将会成为该数据库的标识符，并将作为传入构造函数的配置的 `identifier` 属性。

```js
class CustomDatabase {
  static identify (config) {
    return config.path
  }

  constructor (config) {
    console.log(config.identifier)
  }
}

registerDatabase('custom', CustomDatabase)

new App({
  database: {
    custom: { path: 'foo' },
  },
})

new App({
  database: {
    custom: { path: 'bar' },
  },
})

new App({
  database: {
    custom: { path: 'bar' },
  },
})
```

例如上面的代码将只产生两个输出。

### 配置每个表

很多数据库都提供了表（Table）作为二级结构，Koishi 也为这种结构提供了原生的支持。然而，像 leveldb 这种基于键值对的数据库并没有这种结构，对于这种情况，Koishi 中则将表封装成了一个子数据库。因此在这种情况下，你甚至可以对每个表分别进行配置。额外的配置可以作为 `injectMethods` 的第三个参数，同时它们将被传入你的数据库的构造函数，就像这样：

```js
class LevelDatabase {
  constructor (config, tables) {
    console.log(tables)
  }
}

registerDatabase('level', LevelDatabase)

injectMethods('level', 'user', {
  // some methods
}, {
  keyEncoding: 'utf8',
})

injectMethods('level', 'group', {
  // some methods
}, {
  valueEncoding: 'json',
})
```

这里的输出结果将形如：

```json
{
  "user": { "keyEncoding": "utf8" },
  "group": { "valueEncoding": "json" },
}
```

### 数据库访问原理

在本章的最后，我们简单介绍一个 Koishi 的数据库访问原理。尽管 Koishi 的核心库 koishi-core 本身不含任何具体的数据库逻辑，但是它却提供了一批注入接口。

- 当用户调用 `registerDatabase()` 时，会向 koishi-core 提交一个新的子数据库类型。
- 当用户调用 `injectMethods()` 时，koishi-core 会将新的方法记录在对应的数据库和对应的表上。同时如果传入了第三个参数，将先被保存下来。
- 当用户进行 `config.database.mysql` 配置时，koishi-core 也会自动寻找已经定义过的子数据库 mysql，一旦找到，首先会根据 `identifier` 或者 `identify` 生成标识符，接着检查该数据库是否已经被构造，如果没有就构造出一个新的 `MysqlDatabase` 实例。再之后根据 `config.database.$tables` 提供的信息选取出要注入的方法，将这些方法绑定这个实例并传入 `app.database` 中，这就实现了完整的注入和 `this` 绑定。
- 当用户调用 `app.start()` 或 `startAll()` 时，koishi-core 会检查每个已经存在的数据库是否拥有 `start` 方法，如果有就进行调用；当用户调用 `app.stop()` 或 `stopAll()` 时同理。
