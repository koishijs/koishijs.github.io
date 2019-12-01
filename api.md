---
sidebar: auto
sidebarDepth: 2
---

# API

## 导出的属性和方法

### errors

### messages

### apps

### selfIds

### createApp()

### eachApp()

### startAll()

### stopAll()

### getContextId(meta)

### getTargetId(target)

### getUserName(user)

### getSenderName(meta)

### showSuggestions(options)

### getAverageActivity(activity)

### updateActivity(activity, groupId)

## 上下文 (Context)

**上下文 (Context)** 是 Koishi 的重要概念。你的每一个插件，中间件，监听器和指令都被绑定在上下文上。

### ctx.database

### ctx.sender

### ctx.receiver

### ctx.plugin(plugin, options?)

### ctx.middleware(middleware, index?)

### ctx.removeMiddleware(middleware)

### ctx.command(name, description?, config?)

### ctx.getCommand(name, meta?)

### ctx.runCommand(name, meta, args?, options?, rest?)

### ctx.end()

## 应用 (App)

**应用 (App)** 是 Context 的一个子类，它管理着一个 QQ 号下面的全部信息。除了上面提到的属性和方法以外，App 还提供了下面的属性和方法：

### app.server

### app.options

### app.users

### app.groups

### app.discusses

### app.user(userId)

### app.group(groupId)

### app.discuss(discussId)

### app.start()

### app.stop()

## 指令 (Command)

### cmd.option(name, description?, config?)

### cmd.usage(text)

### cmd.example(example)

### cmd.action(action)

### cmd.userFields(fields)

### cmd.alias(...names)

### cmd.shortcut(name, config?)

### cmd.subcommand(name, description?, config?)

### cmd.parse(message)

### cmd.execute(config, next?)

### cmd.end()

## 发送器 (Sender)

### sender.sendContextMsg(contextId, message, autoEscape?)

### sender.sendGroupMsg(groupId, message, autoEscape?)

### sender.sendDiscussMsg(discussId, message, autoEscape?)

### sender.sendPrivateMsg(userId, message, autoEscape?)

### sender.deleteMsg(messageId)

### sender.sendLike(userId, times?)

### sender.setGroupKick(groupId, userId, rejectAddRequest?)

### sender.setGroupBan(groupId, userId, duration?)

### sender.setGroupAnonymousBan(groupId, meta?, duration?)

### sender.setGroupWholeBan(groupId, enable?)

### sender.setGroupAdmin(groupId, userId, enable?)

### sender.setGroupAnonymous(groupId, enable?)

### sender.setGroupCard(groupId, userId, card?)

### sender.setGroupLeave(groupId, isDismiss?)

### sender.setGroupSpecialTitle(groupId, userId, specialTitle?, duration?)

### sender.setDiscussLeave(discussId)

### sender.setFriendAddRequest(flag, approve?, remark?)

### sender.setGroupAddRequest(flag, subType, approve?, reason?)

### sender.getLoginInfo()

### sender.getStrangerInfo(userId, noCache?)

### sender.getFriendList()

### sender.getGroupList()

### sender.getGroupInfo(groupId, noCache)

### sender.getGroupMemberInfo(groupId, userId, noCache?)

### sender.getGroupMemberList(groupId)

### sender.getCookies(domain?)

### sender.getCsrfToken()

### sender.getCredentials()

### sender.getRecord(file, outFormat, fullPath?)

### sender.getImage(file)

### sender.canSendImage()

### sender.canSendRecord()

### sender.getStatus()

### sender.getVersionInfo()

### sender.setRestartPlugin(delay?)

### sender.cleanDataDir(dataDir)

### sender.cleanPluginLog()

## 其他工具

这些工具函数由 `koishi-utils` 包提供。

### noop()

### sleep(ms?)

### observe(target, update?, label?)

### isInteger(value)

### simplify(source)

### traditionalize(source)

### CQCode.escape(source, insideCQ?)

### CQCode.unescape(souce)

### CQCode.stringify(type, data)

### CQCode.parse(source)

### getDateNumber(date?)

### fromDateNumber(value)

### isSubset(array1, array2)

### intersection(array1, array2)

### complement(array1, array2)

### union(array1, array2)

### camelCase(source)

### paramCase(source)

### snakeCase(source)

### randomId(length?)

### randomReal(start?, end)

### randomInt(start?, end)

### randomPick(array)

### randomSplice(array)

### randomWeightedPick(weights, value?)

### randomFraction(denominator, numerator)
