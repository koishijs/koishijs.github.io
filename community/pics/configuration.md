---
sidebarDepth: 2
noTwoslash: true
---

# 配置

## 插件配置

- **commandName:** `string` 指令名称。默认 `pic`。
- **useAssets:** `boolean` [Assets](../../guide/service/assets.md) 服务可用时，使用 Assets 缓存图片。默认 `true`。
- **useBase64:** `boolean` 使用 Base64 发送图片结果。默认 `false`。

## 图源插件共同配置

图源相关的配置由图源插件自行定义，各个图源的共同配置如下：

- **name:** `string` 图源名称。**必填，**但是部分插件会给定该默认值。
- **tags:** `string[]` 图源标签。
- **weight:** `number` 图源权重，越大优先级越高。
- **description:** `string` 图源的描述。
- **isDefault:** `boolean` 是否默认图源，若设置为 false 或不设置，则需要通过 `-s` 选项指定图源才能调用。

## 多图源的配置

有些图源插件可以配置不止一个图源，如 [koishi-plugin-picsource-yande](https://npmjs.com/package/koishi-plugin-picsource-yande) 支持 yande 和 konachan，这种情况下，你需要在 `instances` 数组里分别配置这些图源。

```yaml title=koishi.yml
plugins:
  pics:
    commandName: pic
  picsource-yande:
    instances:
      - name: yande # Yande 图源
        tags:
          - anime
          - foreign
          - 动漫
          - 二次元
        weight: 1
        isDefault: true
        description: 'Yande 的图'
        endpoint: https://yande.re/post.json
        pageLimit: 200
        useOriginal: true
      - name: konachan # Konachan 图源
        tags:
          - anime
          - foreign
          - 动漫
          - 二次元
        weight: 1
        isDefault: true
        description: 'Konachan 的图'
        endpoint: https://konachan.com/post.json
        pageLimit: 270
        useOriginal: true
```
