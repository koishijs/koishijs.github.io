---
sidebarDepth: 2
---

# 命令行工具

Koishi 提供了名为 `koishi` 的命令行工具，相信你已经在之前的介绍中看过它的使用方法了。本章就详细介绍 Koishi 与命令行相关的特性。

## koishi init

### 设置生成的文件类型 <Badge text="1.3.0+"/>

## koishi start

### 自动重启

### 使用 TypeScript <Badge text="1.3.1+"/>

Koishi 支持直接调用 TypeScript 编写的插件。首先安装 ts-node：

```sh
npm i ts-node -D # 或者全局安装 -g
```

接着在你的命令行之后加上一段额外的参数：

```sh
koishi start -- -r ts-node/register
```

这样你就可以在 koishi.config.js 中直接引用 ts 文件了。
