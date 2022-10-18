---
sidebarDepth: 2
---

# 常见问题

这里列举了一些大家在 Koishi 的使用过程中经常会遇到的问题，用于参考。如果你遇到的问题没有在这里列出，可以点击右上角的按钮加入群组提问，或 [在 GitHub 上新建一个 issue](https://github.com/koishijs/novelai-bot/issues/new/choose)。

## 请先确保……

- 你的 Koishi、控制台和所使用的插件均已更新到了最新版本。开发者可能已经在最新版本中修复了你遇到的问题。

- 已经尝试过移除并重新添加插件，或重启 Koishi。

- 如果无法访问或登录控制台，可以尝试「[Koishi 在重启之后没有弹出控制台页面](#Koishi-在重启之后没有弹出控制台页面) 」和「[无法登录控制台](#无法登录控制台)」。

## 插件安装显示「安装失败」

![安装失败](/manual/faq/installation-failed.png)

实际可能已经安装成功，重启 Koishi 即可在「插件配置」中添加刚刚安装的插件了。

## 如何启用插件？

点击控制台左侧的「插件配置」，点击右上角的「添加插件」，然后在「插件选择」下拉框中选择你要添加的插件进行配置，最后点击右上角的「启用插件」。

## 「必需服务：database」是什么？

![必需服务：database](/manual/faq/requires-database.png)

你所使用的插件需要数据库才能运行。使用「[如何启用插件？](#如何启用插件？)」中的方法添加并启用一个数据库插件。

如果你正在使用 Koishi Desktop 或 Koishi Android，那么直接添加并启用「database-sqlite」插件即可，无需进行任何配置。

如果你熟悉 MySQL 或 MongoDB，则可以添加对应的插件并连接到你的数据库。

## 如何把 Koishi 控制台部署到公网？

1. 按照『[「必需服务：database」是什么？](#「必需服务：database」是什么？)』中的方法安装任意数据库插件
1. 在群里发言，此时机器人会自动帮你创建用户数据
1. 启动 dataview 插件，在网页中找到自己的数据并将 authority 设置为 4 或者更高
1. 添加并启用 auth 插件
1. 参考 [在服务器上安装](/manual/starter/server.html) 中的步骤将控制台对公网开放

现在，你可以在公网访问 Koishi 控制台了！「插件配置」页面只有在你登录后才可见。

> 另请参阅：[koishijs/novelai-bot#13](https://github.com/koishijs/novelai-bot/issues/13)

## 「Koishi 配置文件」在哪里？

配置文件所在的目录叫根目录。根据你的安装方式，根目录的位置可能不同：

- 使用模板创建：创建的文件夹就是你的根目录
- Koishi Desktop - zip 便携包：解压目录下 `data/instances/default`
- Koishi Desktop - msi 安装包：`C:/Users/你的用户名/AppData/Roaming/Il Harper/Koishi/data/instances/default`
- Koishi Desktop - pkg 安装包：`~/Library/Application Support/Il Harper/Koishi/data/instances/default`

配置文件是根目录下名为 `koishi.yml` 的文件。当你遇到问题时，开发者可能会要求你提供配置文件的内容。此时去上面的地方找就好了。

## 如何手动停用插件？

首先，按照『[「Koishi 配置文件」在哪里？](#「Koishi-配置文件」在哪里？)』中的方法找到你的 Koishi 配置文件；
然后，在配置文件内找到你要停用的插件，并在其前面加上一个英文波浪号 `~`，并重启 Koishi。

## Koishi 在重启之后没有弹出控制台页面

Koishi 启动失败了——这很有可能是你最近一次安装的插件导致的。

尝试按照「[如何手动停用插件？](#如何手动停用插件？)」中的方法停用你最近安装的插件，并再次重启 Koishi。
如果 Koishi 仍然无法启动，那么尝试逐个禁用你安装的所有插件，直至问题解决。

## 无法登录控制台

![无法登录控制台](/manual/faq/auth.png)

你启用了 `auth` 插件。

如果你的 `auth` 插件较新，则可能已经内置了初始账号；你可以使用「账号：`admin` 密码：`123456`」尝试登录。

如果初始账号无法登录，则需要按照「[如何手动停用插件？](#如何手动停用插件？)」中的方法手动停用 `auth` 插件。
