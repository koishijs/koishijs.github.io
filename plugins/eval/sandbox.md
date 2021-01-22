---
sidebarDepth: 2
---

# 使用沙箱

evaluate 指令会创建一个沙箱环境。这个沙箱环境支持 ES2020 的全部特性，外加 [Buffer](https://nodejs.org/dist/latest-v14.x/docs/api/buffer.html)。除此以外，还支持下面的属性和方法：

## 沙箱上下文

### user

- 类型: `Partial<User>`

调用者的用户数据。

### channel

- 类型: `Partial<Channel>`

当前频道的数据。

### send(...param)

- **param:** `any[]` 要发送的内容
- 返回值: `Promise<void>`

向当前会话发送一条消息。

### exec(message)

- **message:** `string` 指令文本
- 返回值: `Promise<void>`

在当前会话执行一条指令。

## 全局对象

### utils <Badge text="addons"/>

如果你使用了 koishi-plugin-eval-addons，部分 koishi-utils 的功能将作为一个独立模块暴露在全局对象上，它包含了下列属性：

- CQCode
- Random
- Time

