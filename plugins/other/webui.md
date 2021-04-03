---
sidebarDepth: 2
---

# 网页控制台 (WebUI)

## 配置项

### title

- 类型: `string`
- 默认值: `'Koishi 控制台'`

网页控制台的标题。

### uiPath

- 类型: `string`
- 默认值: `/console`

前端页面呈现的路径。

### apiPath

- 类型: `string`
- 默认值: `/status`

后端 API 服务的路径。

### selfUrl

- 类型: `string`
- 默认值: `''`

Koishi 服务暴露在公网的地址。

::: tip
与其他需要 `selfUrl` 配置项的地方不同的是，这里的属性不会继承 `app.options.selfUrl` 的值。这是因为，由于这里缺省时会使用相对路径，网页依旧可以正常访问。

只有你将 `uiPath` 和 `apiPath` 分别部署到了不同的端口或域名时，这个选项才建议使用。
:::

### expiration

- 类型: `number`
- 默认值: `Time.week`

登陆控制台所获得的令牌的生效时间。

### tickInterval

- 类型: `number`
- 默认值: `Time.second * 5`

页面同步 profile 数据的时间。
