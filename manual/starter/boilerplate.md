---
sidebarDepth: 2
redirectFrom:
  - /guide/introduction/console.html
  - /guide/introduction/template.html
---

# 创建模板项目

本章将介绍我们最推荐的 Koishi 上手方案——创建模板项目。

## 安装 Node.js

::: tip
Koishi 需要 [Node.js](https://nodejs.org/) (最低 v12，推荐使用 LTS) 运行环境，你需要自己安装它。
:::

### 下载安装包

首先我们前往 [Node.js](https://nodejs.org/) 的官方网站：

![home](/manual/starter/nodejs/home.jpg)

在这里可以看到两个巨大的按钮，分别对应着 LTS (长期维护版) 和最新版本。我们建议你选择更加稳定的 LTS 版本，点击按钮即可下载安装包。

### 安装完成

运行下载好的安装包，根据提示完成整个安装流程即可。

安装完成后可以在命令行中输入 `node -v` 确认是否安装成功：

```sh
$ node -v
16.15.1
```

我们提供了两种创建方法。你可以使用其中的任意一种。

## 从模板仓库创建

访问模板仓库需要你有一个 [GitHub](https://github.com/) 账号。我们假设你已经处于登录状态。

1. 点击 [这里](https://github.com/koishijs/boilerplate/generate) 以创建此仓库的副本。
    <br>注意：创建副本不同于 fork，它生成的新仓库不会包含当前仓库的提交历史。
2. 将你创建的项目 clone 到本地，并在本地目录启动命令行。
3. 输入 `npm install` / `yarn` 安装依赖。
4. 输入 `npm start` / `yarn start` 开始运行。

::: danger

Koishi 不支持 pnpm 默认的 isolated linker。如果你确实想使用 pnpm，请在安装依赖前运行如下命令：

```sh
echo node-linker=hoisted > .npmrc
```

:::

## 使用包管理器创建

在任意目录启动命令行，输入下面的指令：

::: code-group manager
```npm
npm init koishi
```
```yarn
yarn create koishi
```
:::

跟随提示即可完成全套初始化流程。

:::: tip
由于国内可能无法访问 GitHub，你可能需要科学上网或使用镜像。例如你可以使用 [FastGit](http://fastgit.org/) 作为镜像源，只需在上面的脚本后添加 `-m https://hub.fastgit.xyz` 即可。
::::

### 启动应用

如果你顺利完成了上一步操作，你的应用此时应该已经是启动状态，你无需进行额外的操作。但当应用处于关闭状态时，你可以在运行下面的指令以启动：

::: code-group manager
```npm
npm start
```
```yarn
yarn start
```
:::

<!-- ### 自动重启 <badge text="beta" type="warning"/>

Koishi 的命令行工具支持自动重启。当运行 Koishi 的进程崩溃时，如果 Koishi 已经启动成功，则监视进程将自动重新启动一个新的进程。

同时，你也可以通过指令手动进行重启：

<panel-view :messages="[
  ['Alice', 'exit -r'],
  ['Koishi', '正在重启……'],
  ['Koishi', '重启完成。'],
]"/> -->

## 下一步该做什么

恭喜你已经学会了 Koishi 的基本使用方法！接下来：

- 如果你想继续学习 Koishi 的开发，请继续阅读 [指南](../../guide/) 中剩余的内容
- 如果你想了解更多的插件以便快速搭建成熟的项目，请前往 [官方插件](../../plugins/) 部分
