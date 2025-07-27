### (文档三) Academy 平台架构与高级贡献指南

**目标读者**: 希望深入了解 Academy 平台工作原理、需要修改主题或维护整个构建流程的高级贡献者和开发者。

**文档目的**: 本文档旨在揭开 Layer5 Academy 平台的多仓库协作模式，详细解释每个核心仓库的职责，并提供进行端到端测试和高级开发的实践指南。

### **1.0 引言 (Introduction)**

  * **1.1 为什么需要这篇指南?**
      * 简要说明，与面向内容创作者的《创建你的第一个学习路径》不同，本指南服务于希望理解和改进平台本身的开发者。

### **2.0 宏观视角：系统架构 (The Big Picture: System Architecture)**

  * **2.1 多仓库协作模型**
      * 解释 Academy 平台采用的是一种“关注点分离”的架构模式。内容、主题、示例和构建是分开的，以实现更好的模块化和可维护性。
      * **（建议此处用一张架构图，清晰地展示四个仓库和数据流向）**
      * **数据流向描述**:
          * `academy-theme` (主题) 定义了所有内容的“外观”。
          * `academy-example` (示例) 和 `layer5-academy` (实际内容) 提供了“内容”。
          * `academy-build` (构建) 是一个“中央工厂”，它拉取指定版本的主题和所有内容模块，将它们“组装”成最终的、可发布的网站。


### **3.0 核心仓库详解 (A Deep Dive into the Core Repositories)**

  * **3.1 `academy-theme` (主题仓库：外观与风格)** https://github.com/layer5io/academy-theme

      * **职责**:
          * 提供所有 Academy 内容的 HTML 布局、CSS 样式。
          * 定义 Shortcodes、Partials 等可复用组件。
          * 是所有 Academy 站点的“皮肤”和“骨架”。
      * **谁会用到**: 前端开发者、UI/UX 设计师、需要修改平台底层功能的开发者。

  * **3.2 `academy-example` (示例仓库：快速入门模板)** https://github.com/layer5io/academy-example

      * **职责**:
          * 作为新组织或新内容创作者的“脚手架”或“模板”。
          * 提供一个预先配置好的、最小化的、可运行的 Academy 站点。
          * 是《创建你的第一个学习路径》教程中用户 Fork 和 Clone 的对象。
      * **谁会用到**: 首次接触 Academy 平台的内容创作者。

  * **3.3 `layer5-academy` (官方内容仓库：最佳实践)** https://github.com/layer5io/layer5-academy

      * **职责**:
          * 存放 Layer5 官方发布的所有内容和课程。
          * 作为 `academy-example` 的一个“生产级”和“功能完整”的参照范例。
          * 展示了如何组织复杂的、多课程的学习路径。
      * **谁会用到**: 希望参考 Layer5 官方内容组织方式的开发者和内容创作者。

  * **3.4 `academy-build` (构建仓库：中央装配工厂)** https://github.com/layer5io/academy-build

      * **职责**:
          * **这是最重要的中央枢纽。**
          * 包含用于**生产环境构建**的主要 Hugo 配置 (`hugo.yaml`)。
          * 通过 Go Modules 机制，引用并管理所有独立的内容模块（如 `layer5-academy`, `exoscale-academy` 等）和 `academy-theme` 的版本。
          * 执行最终的 Hugo 构建命令，生成完整的静态网站。
      * **谁会用到**: 平台维护者、需要进行端到端测试的开发者。


### **4.0 开发者工作流：实践指南 (Developer Workflows: A Practical Guide)**

如何开发和测试 Academy 主题 (How to Develop and Test the Academy Theme)

      * 当您需要修改 `academy-theme` 仓库中的代码（例如，更改 CSS 或布局）并希望在完整的 `academy-build` 环境中预览这些更改时，您需要使用 `go mod replace` 指令。
      * **步骤 1: 修改主题**
          * 在你的本地 `academy-theme` 仓库副本中进行代码修改，clone任意一个内容仓库，用来运行查看效果
      * **步骤 2: 在 `academy-build` 中重定向依赖**
          * 在 `academy-build` 仓库的 `go.mod` 文件中，添加一行 `replace` 指令，将远程的主题仓库地址指向你本地的 `academy-theme` 文件夹。
        <!-- end list -->
        ```go
        // go.mod in academy-build repo

        replace github.com/layer5io/academy-theme => /path/to/your/local/academy-theme (eg.replace github.com/layer5io/academy-theme => ../academy-theme 如果theme和内容仓库是在同一个文件夹下面的话)
        ```

如果你想在内容文件上简单快速的预览，采用make site
步骤如下
1.运行go mod tidy
2.运行make setup
3.运行make site
然后从网页1313：academy进去

如果你想在cloud stading环境上面预览：

  * **4.2 如何对完整的 Academy 站点进行端到端测试 (Complete Testing of Academy with Cloud)**

      * 所有 Academy 的主要开发和配置都在 `academy-build` 仓库中进行。此仓库包含用于生产构建的主要 Hugo 配置，以及对所有独立 Academy 模块（例如，`layer5`, `exoscale` 等）的引用。

      * `academy-build` 仓库应作为测试和构建整个 Academy 站点的中央枢纽。

      * **步骤 1: 在本地构建 Academy**

          * 要完整地在本地构建整个 Academy 站点，请运行：

        <!-- end list -->

        ```bash
        make academy-dev
        ```

      * **步骤 2: 与 Cloud 环境同步**

          * 构建完成后，您可以通过运行以下命令将生成的 HTML 文件与 Cloud 同步：

        <!-- end list -->

        ```bash
        make sync-with-cloud
        ```

      * **步骤 3: 预览**

          * 同步后，您可以访问托管在 Cloud 上的 Academy 页面以查看最新的内容。大概十分钟

如果你想更快的查看内容，可以运行
 one way of holistically testing changes is to build the academy-build ( make academy-prod ) and test the changes
 去查看生成的html文件，也是可以用来查看问题的，并且可以观察到底是xx

 好的，根据我们完整的对话内容，我为你提炼了几个可以直接补充到你现有贡献指南中的核心知识点。这些内容都是基于我们一起解决问题的过程得出的，可以极大地帮助后续的开发者。

建议补充内容
1. (建议加入 2.0 系统架构 章节) 核心渲染机制：Hugo 生成 JSON，前端动态加载
Academy 平台并非传统的纯静态 HTML 网站。它的核心是一种“半静态半动态”的渲染机制，理解这一点对于调试至关重要。

工作流程:

构建时 (Build Time): 当运行 make 命令时，Hugo 会执行。它会使用 layouts/ 目录下的特殊模板（例如 list.json.json）来遍历所有内容文件。

生成数据: Hugo 不会直接生成复杂的 HTML 页面，而是将所有学习路径和课程的数据聚合成一个或多个 JSON 文件（例如 public/learning-paths/index.json）。这个 JSON 文件相当于一个为前端准备的 “API 数据源”。

运行时 (Run Time): 用户的浏览器加载一个相对简单的 HTML“外壳”页面。

动态渲染: 页面中的 JavaScript 脚本会发起请求，获取并读取之前生成的 JSON 文件，然后根据这份数据动态地在浏览器中创建和渲染出用户看到的课程卡片列表。

对开发者的启示:

当你修改了内容或主题，发现页面显示不正确时，首要的调试步骤通常是去检查 public 目录下生成的那个 .json 文件，确认里面的数据（特别是 banner URL、title 等）是否符合预期。

很多问题（比如路径错误、格式问题）都可以在这个中间产物（JSON 文件）中被快速定位。


 注意！theme里面的主题不是百分百到cloud上面的！大部分是，但是少数会存在不一样，因为cloud包裹xxx的原因，所以尽管可以采用make site快速开发，也要在提交前查看stading env的效果

 清理的步骤！怎么清理，删除？go mod tidy？
 make clean？
 删除public？