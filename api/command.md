---
sidebarDepth: 2
---

# 指令 (Command)

## cmd.option(name, description?, config?)

## cmd.usage(text)

## cmd.example(example)

## cmd.action(action)

## cmd.userFields(fields)

## cmd.alias(...names)

## cmd.shortcut(name, config?)

## cmd.subcommand(name, description?, config?)

## cmd.parse(message)

## cmd.execute(config, next?)

## cmd.end()

## 类型定义

### CommandConfig

```ts
export interface CommandConfig {
  checkUnknown?: boolean
  checkRequired?: boolean
  checkArgCount?: boolean
  usageName?: string
  description?: string
  authority?: number
  maxUsage?: number
  minInterval?: number
  showWarning?: boolean
}
```
