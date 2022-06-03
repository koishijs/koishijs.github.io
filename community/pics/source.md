---
sidebarDepth: 2
noTwoslash: true
---

# 图源插件

图源插件是一类 pics 的附属插件，由其他 Koishi 插件提供，以提供从平台获取随机图片的功能。

::: tip
图源插件需要使用 [koishi-thirdeye](../decorator/thirdeye.md) 提供的装饰器来进行开发。建议阅读本章节之前，先阅读 [koishi-thirdeye](../decorator/thirdeye.md) 的相关文档。
:::

## 开发图源插件

图源插件需要从 `PicSourcePlugin(Config)` 基类进行继承，并实现 `randomPic` 方法，并返回一个包含 `url` 字段的对象。若返回对象带有 `description` 字段，则会在指令的输出中一并显示。此外，推荐在 `package.json` 的 `keywords` 内写上 `required:pics` 以保证正确被 Koishi 插件市场搜索。

我们以 [Lolicon](https://api.lolicon.app/) 为例，开发一个 Lolicon 图源插件。

```ts title=lolicon.ts
import { Context, Quester } from "koishi"
import { DefinePlugin, RegisterSchema, SchemaProperty, Inject } from "koishi-thirdeye"
import { PicSourcePlugin, PicsContainer } from "koishi-plugin-pics"

@RegisterSchema()
export class Config {
  @SchemaProperty({ default: 'lolicon' }) // 推荐覆盖该属性以提供默认值
  name: string
  
  @SchemaProperty({ default: 2 })
  r18: number
}


@DefinePlugin()
export default class LoliconSource extends PicSourcePlugin(Config) {
  @Inject(true)
  private http: Quester

  async randomPic(tags: string[]) {
    // 从 Lolicon 获取图源
    const result = await this.http.post(
      'https://api.lolicon.app/setu/v2',
      {
        r18: this.config.r18,
        num: 1,
        tag: picTags,
      },
    )
    const data = result.data[0]
    if(!data) {
      // 没有找到图片
      return
    }
    return {
      url: data.urls.original,
      description: data.title,
    }
  }
}
```

然后使用下面的配置即可加载这个插件了：

```yaml title=koishi.yml
plugins:
  pics:
    commandName: pic
  ./lolicon:
    name: lolicon
    weight: 1
    isDefault: true
    r18: 2
```

您可以注意到，我们配置的插件选项只有 `name` 和 `r18` 两个属性，但是我们加载插件的时候还使用了 `weight` 和 `isDefault` 等属性，似乎并没有定义。实际上，`PicSourcePlugin` 基类生成器会自动生成图源插件所必需的属性，我们无需在每个插件中都指定一遍。这些字段可以在前面的[配置](./configuration.md#图源插件共同配置)一节中来查看。

而真正的 [koishi-plugin-picsource-lolicon](https://npmjs.com/package/koishi-plugin-picsource-lolicon) 插件的逻辑比上面这个例子复杂得多，您可以从参考该插件的源代码了解更多详情。

### 插件基类

`PicSourcePlugin(Config)` 生成基类具有这些预定义属性，可以直接使用。

- **pics:** pics 服务本身，并已标记为服务依赖。
- **logger:** 日志记录器。

## 多图源插件

有些插件，如 [koishi-plugin-picsource-yande](https://npmjs.com/package/koishi-plugin-picsource-yande) 支持多个图源，您可以配置多个图片网站分别作为不同的图源引入机器人中。

这些插件是使用 [koishi-thirdeye](../decorator/thirdeye.md#多实例插件) 的**多实例插件**功能实现的，您可以参考相关文档来了解更多详情。
