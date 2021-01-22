---
sidebarDepth: 2
---

# 实用工具 (Tools)

koishi-plugin-tools 是一系列小功能的合集。这些小功能将全部作为 tools 指令的子指令。

尽管这看起来像是个大杂烩，但你可以按照需要在配置项中只开启其中的一部分。事实上，这个插件的体积并不及 koishi-plugin-common 或 koishi-plugin-teach，你大可以放心地引入它。如果你也写了什么有趣的小玩意儿，也欢迎给我们发个 Pull Request。

## 指令：alpha

调用 [Wolfram Alpha](https://www.wolframalpha.com/) 查询。

默认关闭，你需要申请一个 Wolfram App 并配置 `wolframAlphaAppId` 以开启本功能。

- 基本语法：`alpha <expr>`
- 选项列表：
  - `-f, --full` 显示完整回答

## 指令：brainfuck

编写并调试 [BrainFuck](http://www.muppetlabs.com/~breadbox/bf) 代码。

默认开启，配置 `brainfuck` 为 `false` 以关闭本功能。

- 基本语法：`brainfuck <code> -- <input>`

### 配置项：brainfuck.cellSize

- 类型: `number`
- 默认值: `8`

每个单元占用的比特数。

### 配置项：brainfuck.memorySize

- 类型: `number`
- 默认值: `1024`

允许的最大单元数目。如果超出这个数目将会抛出错误：max memory exceed。

### 配置项：brainfuck.maxSteps

- 类型: `number`
- 默认值: `16384`

允许的最大步数。如果超出这个数目将会抛出错误：max step exceeded。

## 指令：crypto

## 指令：magi

## 指令：maya

## 指令：mcping

## 指令：music

## 指令：oeis

## 指令：qrcode

生成二维码。

默认开启，配置 `qrcode` 为 `false` 以关闭本功能。

- 基本语法：`qrcode <text>`
- 选项列表：
  - -m, --margin \<margin>  边界尺寸
  - -s, --scale \<scale>  比例系数
  - -w, --width \<width>  图片大小
  - -d, --dark \<color>  暗部颜色
  - -l, --light \<color>  亮部颜色

## 指令：translate

调用 [有道翻译](http://fanyi.youdao.com/)。

默认关闭，你需要申请一个有道翻译 App 并配置 `youdaoAppKey` 和 `youdaoSecret` 以开启本功能。

支持的语言名包括 zh-CHS, en, ja, ko, fr, es, pt, it, ru, vi, de, ar, id, it。

- 基本语法：`translate <text>`
- 选项列表：
  - -f, --from \<lang>  源语言
  - -t, --to \<lang>  目标语言
