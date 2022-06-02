# 图像中间件

和图源类似，图像中间件是 pics 的另一类附属插件，可以对图源获取的随机 URL 在发送给用户之前进行一定的变换。利用图像中间件系统，我们可以在图片被发送前进行反色、反转、改变大小等图像操作。

## 图像中间件系统

图像中间件系统使用洋葱模型的方式进行处理。每一层处理的过程中，可以使用 `next(url?: string)` 函数进行后续的操作，并得到后续结果的返回值，再进行进一步的处理。

`next` 函数中的 `url` 参数可以对进行后续操作的初始 URL 值进行控制。若不填写，则与本中间件的传入 URL 值相同。

## 开发图像中间件插件

图像中间件插件同样是需要使用 [koishi-thirdeye](../decorator/thirdeye.md) 进行开发。推荐在 `package.json` 的 `keywords` 内写上 `required:pics` 以保证正确被 Koishi 插件市场搜索。

图像中间件插件从 `PicMiddlewarePlugin(Config)` 基类继承，并实现 use 方法，该方法具有 url 和 next 两个参数，并需要以一个字符串作为返回值。

下例图像中间件插件会将所有 URL 进行预先下载，并使用 `download` 方法转换为 `base64://` 形式的 URL，即为 pics 中 `useBase64` 选项的功能。事实上，koishi-plugin-pics 中的 `useAssets` 和 `useBase64` 这两个选项的功能，都是由内置图像中间件实现的。

```ts
export class Config {
  @SchemaProperty({ type: Schema.object() })
  axiosConfig: AxiosRequestConfig
}

@DefinePlugin()
export default class PicDownloaderMiddleware extends PicMiddlewarePlugin(Config) {
  override async use(url: string, next: PicNext) {
    const downloadedUrl = await this.pics.download(url, config.axiosConfig)
    return next(downloadedUrl)
  }
}
```

### 插件基类

`PicMiddlewarePlugin(Config)` 生成基类具有这些预定义属性，可以直接使用。

- **pics**: pics 服务本身，并已标记为服务依赖。
- **logger**: 日志记录器。

### 中间件配置

`PicMiddlewarePlugin(Config)` 生成的插件基类中，已经内置了一些配置属性，如下。

- **name**: `string` 中间件名称，仅在日志记录中体现。
- **prepend**: `boolean` 是否在图像中间件链中的前面执行，默认为 `false`。
