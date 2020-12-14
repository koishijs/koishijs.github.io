---
sidebarDepth: 2
---

# 选项索引

## 配置项

### prefix

- 类型: `string`
- 默认值: `'#'`

教学指令的前缀。

### historyAge

- 类型: `number`
- 默认值: `60000`

教学记录的保存时长，单位为毫秒。参见 [**查询近期操作**](./basic.md#查询近期操作)。

### nickname

- 类型: `string | string[]`
- 默认值: [`app.options.nickname`](../../api/app.md#options-nickname)

问答中使用的昵称。参见 [**称呼匹配**](./prob.md#称呼匹配)。

### appellationTimeout

- 类型: `number`
- 默认值: `60000`

[**称呼本身作为问题触发**](./prob.md#称呼本身作为问题触发) 的后续效果持续时间，单位为毫秒。

### maxRedirections

- 类型: `number`
- 默认值: `3`

[**问题重定向**](./interp.md#问题重定向) 的次数上限。

### detailDelay

- 类型: `number`

### maxShownDialogues

- 类型: `number`

### itemsPerPage

- 类型: `number`

### mergeThreshold

- 类型: `number`

### maxAnswerLength

- 类型: `number`

### imagePath

- 类型: `string`

### imageServer

- 类型: `string`

### uploadKey

- 类型: `string`

### uploadPath

- 类型: `string`

### uploadServer

- 类型: `string`

### preventLoop

- 类型: `number | LoopConfig | LoopConfig[]`

### throttle

- 类型: `ThrottleConfig | ThrottleConfig[]`

<!-- ### successorTimeout

- 类型: `number` -->

## 指令选项索引

| 选项 | 主条目 |
|:--|:-:|
| /, --page [page] | [**搜索问答**](./basic.md#搜索问答) |
| \|, --pipe [op...] | [**管道操作**](./basic.md#管道操作) |
| =>, --redirect-dialogue [ques] | [**问题重定向**](./interp.md#问题重定向) |
| -d, --disable | [**上下文机制**](./context.md#基本用法) |
| -D, --disable-global | [**上下文机制**](./context.md#基本用法) |
| -e, --enable | [**上下文机制**](./context.md#基本用法) |
| -E, --enable-global | [**上下文机制**](./context.md#基本用法) |
| -f, --frozen | [**署名机制**](./misc.md#署名机制) |
| -F, --no-frozen | [**署名机制**](./misc.md#署名机制) |
| -g, --channels [ids] | [**上下文机制**](./context.md#基本用法) |
| -G, --global | [**上下文机制**](./context.md#基本用法) |
| -h, --help | N/A |
| -l, --include-last [count] | [**查询近期操作**](./basic.md#查询近期操作) |
| -L, --exclude-last [count] | [**查询近期操作**](./basic.md#查询近期操作) |
| -p, --prob-strict [prob] | [**概率机制**](./prob.md#基本用法) |
| -P, --prob-appellative [prob] | [**概率机制**](./prob.md#基本用法) |
| -r, --remove | [**查看和修改问答**](./basic.md#查看和修改问答) |
| -R, --no-recursive | [**递归搜索**](./interp.md#递归搜索) |
| -s, --substitude | [**教学者执行问答**](./interp.md#教学者执行问答) |
| -S, --no-substitude | [**教学者执行问答**](./interp.md#教学者执行问答) |
| -t, --start-time, --match-time [ques] | [**触发时段**](./misc.md#触发时段) |
| -T, --end-time, --mismatch-time [ques] | [**触发时段**](./misc.md#触发时段) |
| -v, --review | [**查询近期操作**](./basic.md#查询近期操作) |
| -V, --revert | [**回退近期操作**](./basic.md#回退近期操作) |
| -w, --writer [id] | [**署名机制**](./misc.md#署名机制) |
| -W, --anonymous | [**署名机制**](./misc.md#署名机制) |
| -x, --regexp | [**正则匹配**](./regexp.md#基本用法) |
| -X, --no-regexp | [**正则匹配**](./regexp.md#基本用法) |

<!-- | -z, --successor-timeout | [**搜索问答**](./basic.md#搜索问答) | -->
