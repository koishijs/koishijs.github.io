---
sidebarDepth: 2
---

# 发布插件

为了让别人更方便地使用你编写的插件，你需要将其作为一个 npm 包进行发布。只需满足一定的规范，你的插件就能显示在 [插件市场](../../market.md) 中，其他人就可以通过控制台来安装它。

::: tip
如果想了解更多关于发布 npm 包的知识，请参考 [这篇文档](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)。
:::

## 基本要求

要想显示在插件市场中，插件的 `package.json` 需要满足以下基本要求：

- 符合 `package.json` 本身的要求
- 包名必须符合以下格式之一：
  - koishi-plugin-foo
  - @bar/koishi-plugin-foo
  - @koishijs/plugin-foo (官方插件)
- 必须声明 `koishi` 作为 [同版本依赖](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#peerdependencies)
- 最新版本不能被 [弃用](https://docs.npmjs.com/deprecating-and-undeprecating-packages-or-package-versions)

一个符合上述标准的示例：

```json title=package.json
{
  "name": "koishi-plugin-example",
  "version": "1.0.0",
  "peerDependencies": {
    "koishi": "^4.3.2"
  }
}
```

## 添加相关信息

除去上面的基本要求外，`package.json` 中还有一些字段能帮助显示插件的相关信息。

```json title=package.json
{
  "name": "koishi-plugin-example",
  "version": "1.0.0",
  "author": "Alice <alice@gmail.com>",      // 作者
  "maintainers": [                          // 维护者
    "Bob <bob@gmail.com>"
  ],
  "license": "MIT",                         // 许可证
  "homepage": "https://example.com",        // 主页
  "keywords": ["example"],                  // 关键词
  "peerDependencies": {
    "koishi": "^4.3.2"
  }
}
```

## `koishi` 字段

除此以外，我们还提供了一个额外的 `koishi` 字段，用于指定与 Koishi 相关的信息。

```json title=package.json
{
  "name": "koishi-plugin-dialogue",
  "version": "1.0.0",
  "peerDependencies": {
    "koishi": "^4.3.2"
  },
  "koishi": {
    "description": {                        // 不同语言的插件描述
      "en": "English Description",
      "zh": "中文描述"
    },
    "service": {
      "required": ["database"],             // 必需的服务
      "optional": ["assets"],               // 可选的服务
      "implements": ["dialogue"],           // 实现的服务
    },
    "locales": ["en", "zh"],                // 支持的语言
    "recommendeds": [                       // 推荐同时安装的插件
      "koishi-plugin-dialogue-flow",
    ],
  }
}
