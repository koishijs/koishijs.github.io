---
sidebarDepth: 2
---

# 主线程 API

## 事件

### eval/before-start

### eval/start

### eval/before-send

## Trap

### trap.define(key, decl)

### trap.get(target, fields)

### trap.set(target, data)

### trap.fields(fields)

### Trap.user

### Trap.channel

### Trap.resolve(fields)

### Trap.merge(baseAccess, fields)

### Trap.action(command, userAccess, channelAccess, action)

## MainHandle

### handle.execute(uuid, content)

### handle.send(uuid, content)

### handle.updateUser(uuid, data)

### handle.updateChannel(uuid, data)

## EvalWorker

### worker.remote

### worker.state

### worker.start()

### worker.stop()

### worker.restart()

