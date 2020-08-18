---
sidebarDepth: 2
---

# 网页截图 (puppeteer)

koishi-plugin-puppeteer 本身提供了网页截图（shot）指令和 TeX 渲染指令（tex），同时也封装了一系列与网页进行交互的接口。利用这些接口我们可以开发更多以渲染图片为基础的插件。

## 扩展接口

### ctx.getPage()

- 返回值: [`Promise<Page>`](https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#class-page)

获取一个页面对象。

### ctx.freePage()

- 返回值: `void`

释放一个页面对象。

## 配置项

### browser

- 类型: [`LaunchOptions`](https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#puppeteerlaunchoptions)

启动浏览器时使用的配置。

### loadTimeout

- 类型: `number`
- 默认值: `10000`

加载页面的最长时间，单位为毫秒。当一个页面等待时间超过这个值时，如果此页面主体已经加载完成，则会发送一条提示消息“正在加载中，请稍等片刻”并继续等待加载；否则会直接提示“无法打开页面”并终止加载。

### idleTimeout

- 类型: `number`
- 默认值: `30000`

等待页面空闲的最长时间，单位为毫秒。当一个页面等待时间超过这个值时，将停止进一步的加载并立即发送截图。

### maxLength

- 类型: `number`
- 默认值: `1000000`

单张图片的最大尺寸，单位为字节。当截图尺寸超过这个值时会自动截取图片顶部的一段进行发送。
