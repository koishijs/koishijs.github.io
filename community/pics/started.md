---
sidebarDepth: 2
noTwoslash: true
---

# 基本用法

由于 pics 仅仅是一个随机图片的插件框架，并不包含任何图源的实现，因此你必须添加至少一个图源插件才能开始使用。

## 图源插件

下面是一部分社区常用的图源插件，您可以选择喜欢的图源插件来安装。完整的列表详见[社区生态](./community.md#图源)。

- [koishi-plugin-picsource-lolicon](https://npmjs.com/package/koishi-plugin-picsource-lolicon) [Lolicon](https://api.lolicon.app/) 图源。
- [koishi-plugin-picsource-yande](https://npmjs.com/package/koishi-plugin-picsource-yande) [Yandere](https://yande.re/) 及 [Konachan](https://konachan.com) 图源。

## 插件配置

在开始启动之前，你还需要添加一些配置，告诉 pics 插件有哪些图源插件可以使用，以及每个图源插件的配置。对于配置项的详细说明，请参考[配置](./configuration.md)。

下面以 [koishi-plugin-picsource-lolicon](https://npmjs.com/package/koishi-plugin-picsource-lolicon) 和
[koishi-plugin-picsource-yande](https://npmjs.com/package/koishi-plugin-picsource-yande) 为例进行说明。

```yaml title=koishi.yml
plugins:
  pics:
    commandName: pic
  picsource-lolicon: # Lolicon 图源
    name: lolicon
    r18: 2
    tags:
      - anime
      - 动漫
      - 二次元
    description: 'Lolicon API 的图'
    isDefault: true
    weight: 2
```

成功启动 Koishi 后，就可以使用指令 `pic` 获取一张随机图片。更多指令的配置可以参阅 [指令](./commands.md) 章节。
