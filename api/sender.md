---
sidebarDepth: 2
---

# 发送器 (Sender)

## sender.sendContextMsg(contextId, message, autoEscape?)

## sender.sendGroupMsg(groupId, message, autoEscape?)

## sender.sendDiscussMsg(discussId, message, autoEscape?)

## sender.sendPrivateMsg(userId, message, autoEscape?)

## sender.deleteMsg(messageId)

## sender.sendLike(userId, times?)

## sender.setGroupKick(groupId, userId, rejectAddRequest?)

## sender.setGroupBan(groupId, userId, duration?)

## sender.setGroupAnonymousBan(groupId, meta?, duration?)

## sender.setGroupWholeBan(groupId, enable?)

## sender.setGroupAdmin(groupId, userId, enable?)

## sender.setGroupAnonymous(groupId, enable?)

## sender.setGroupCard(groupId, userId, card?)

## sender.setGroupLeave(groupId, isDismiss?)

## sender.setGroupSpecialTitle(groupId, userId, specialTitle?, duration?)

## sender.setDiscussLeave(discussId)

## sender.setFriendAddRequest(flag, approve?, remark?)

## sender.setGroupAddRequest(flag, subType, approve?, reason?)

## sender.getLoginInfo()

## sender.getStrangerInfo(userId, noCache?)

## sender.getFriendList()

## sender.getGroupList()

## sender.getGroupInfo(groupId, noCache)

## sender.getGroupMemberInfo(groupId, userId, noCache?)

## sender.getGroupMemberList(groupId)

## sender.getCookies(domain?)

## sender.getCsrfToken()

## sender.getCredentials()

## sender.getRecord(file, outFormat, fullPath?)

## sender.getImage(file)

## sender.canSendImage()

## sender.canSendRecord()

## sender.getStatus()

## sender.getVersionInfo()

## sender.setRestartPlugin(delay?)

## sender.cleanDataDir(dataDir)

## sender.cleanPluginLog()
