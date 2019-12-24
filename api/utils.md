---
sidebarDepth: 2
---

# 其他工具 (Utils)

包含了许多被 Koishi 使用的工具函数，它们由 `koishi-utils` 包提供。

## noop()

不进行任何操作（no operation）。

- 返回值: `void`

## sleep(ms?)

等待一段时间。

- **ms:** `number` 要等待的毫秒数
- 返回值: `Promise<void>`

## isInteger(value)

判断传入的值是否为整数。

- **value:** `any` 要判断的值
- 返回值: `boolean` 是否为整数

## Observer API

### observe(target, update?, label?)

创建一个观察者对象。目前只支持从普通对象创建（不支持 Array / Set / Map）。

- **target:** `T extends object` 要观测的对象
- **update:** `(diff: Partial<T>) => R` 更新回调函数
- **label:** `string` 对象的标签，用于标识
- 返回值: `Observed<T>`

### observer._diff

观察者当前的对象变化。

### observer._merge(source)

将某些属性合并入当前观察者，不会触发 diff 更新。

- **source:** `object` 要合并的对象
- 返回值: `this`

### observer._update()

更新观察者对象，同时清除 diff。

- 返回值: `R`

## CQCode Manipulation

### CQCode.escape(source, insideCQ?)

转义一段文本到 CQ 码格式。

- **source:** `string` 源文本
- **insideCQ:** `boolean` 在 CQ 码内部转义（会额外处理逗号）
- 返回值: `string` 转义过后的文本

### CQCode.unescape(souce)

取消一段文本的 CQ 码转义。

- **source:** `string` 源文本
- 返回值: `string` 转义前的文本

### CQCode.stringify(type, data)

将一个对象转化成 CQ 码文本。

- **type:** `string` CQ 码类型
- **data:** `object` CQ 码参数
- 返回值: `string` 生成的 CQ 码

### CQCode.parse(source)

将一个 CQ 码文本解析成对象。

- **source:** `string` CQ 码
- 返回值: `{ type: string, data: object }` CQ 码的类型和参数

## String Manipulation

### simplify(source)

繁体转简体。

- **source:** `string` 源文本
- 返回值: `string` 简体文本

### traditionalize(source)

简体转繁体。

- **source:** `string` 源文本
- 返回值: `string` 繁体文本

### capitalize(source)

首字母大写。

- **source:** `string` 源文本
- 返回值: `string` 首字母大写后的文本

### camelCase(source)

如果输入的是字符串，则将字符串转换成 camelCase；如果是数组或对象，则递归地将对象中的每个（可枚举）的键转换成 camelCase；其他情况不受影响。

- **source:** `any` 要转换的内容
- 返回值: `any` 转换结果

### paramCase(source)

如果输入的是字符串，则将字符串转换成 param-case；如果是数组或对象，则递归地将对象中的每个（可枚举）的键转换成 param-case；其他情况不受影响。

- **source:** `any` 要转换的内容
- 返回值: `any` 转换结果

### snakeCase(source)

如果输入的是字符串，则将字符串转换成 snake_case；如果是数组或对象，则递归地将对象中的每个（可枚举）的键转换成 snake_case；其他情况不受影响。

- **source:** `any` 要转换的内容
- 返回值: `any` 转换结果

## Date Manipulation

### getDateNumber(date?)

获取当前日期（从 UNIX 时间开始时计算）。

- **date:** `Date` 日期对象，默认为 `new Date()`
- 返回值: `number` UNIX 时间开始后的天数

### fromDateNumber(value)

从 UNIX 时间开始后的天数计算日期对象。

- **value:** `number` UNIX 时间开始后的天数
- 返回值: `Date` 日期对象

## Set Manipulation

### contain(array1, array2)

检测集合的包含关系。

- **array1:** `readonly any[]` 数组 1
- **array2:** `readonly any[]` 数组 2
- 返回值: `boolean` 数组 1 是否包含数组 2 的全部元素

### intersection(array1, array2)

求两个集合的交集。

- **array1:** `readonly any[]` 数组 1
- **array2:** `readonly any[]` 数组 2
- 返回值: `any[]` 两个数组的交集

### difference(array1, array2)

求两个集合的差集。

- **array1:** `readonly any[]` 数组 1
- **array2:** `readonly any[]` 数组 2
- 返回值: `any[]` 两个数组的差集

### union(array1, array2)

求两个集合的并集。

- **array1:** `readonly any[]` 数组 1
- **array2:** `readonly any[]` 数组 2
- 返回值: `any[]` 两个数组的并集

## Random Manipulation

### randomBool(probability)

生成一个随机布尔值，有 probability 的概率为 1。

- **probability:** `number` 概率
- 返回值: `boolean` 随机布尔值

### randomId(length?)

生成一个随机 ID，由数字和大小写字母构成，长度为 length。

- **length:** `number` ID 长度，默认为 16
- 返回值: `string` 生成的 ID

### randomReal(start?, end)

生成一个随机实数。

- **start:** `number` 下界，默认为 0
- **end:** `end` 上界
- 返回值: `number` 一个 [start, end) 之间的随机实数

### randomInt(start?, end)

生成一个随机实数。

- **start:** `number` 下界，默认为 0
- **end:** `end` 上界
- 返回值: `number` 一个 [start, end) 之间的随机整数

### randomPick(array)

从数组中随机挑出一个元素，不改变原数组。

- **array:** `readonly T[]` 数组
- 返回值: `T` 挑出的元素

### randomSplice(array)

从数组中随机删掉一个元素，返回删掉的元素。

- **array:** `T[]` 数组
- 返回值: `T` 挑出的元素
