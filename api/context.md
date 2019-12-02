---
sidebarDepth: 2
---

# 上下文 (Context)

**上下文 (Context)** 是 Koishi 的重要概念。你的每一个插件，中间件，监听器和指令都被绑定在上下文上。

## ctx.database

## ctx.sender

## ctx.receiver

## ctx.plugin(plugin, options?)

## ctx.middleware(middleware, index?)

## ctx.removeMiddleware(middleware)

## ctx.command(name, description?, config?)

## ctx.getCommand(name, meta?)

## ctx.runCommand(name, meta, args?, options?, rest?)

## ctx.end()
