### 快速上手

::: tip 提示

@wocwin/t-ui-plus 基于 vue3 + ts + Element-plus 再次封装的基础组件

:::

### 安装

**建议您使用包管理器 ([pnpm](https://pnpm.io/)<el-tag  effect="dark">推荐</el-tag> ， [yarn](https://classic.yarnpkg.com/lang/en/)，[npm](https://www.npmjs.com/)) 安装 @wocwin/t-ui-plus**。

::: code-group

```sh [pnpm]
pnpm install @wocwin/t-ui-plus -S
```

```sh [yarn]
yarn add @wocwin/t-ui-plus
```

```sh [npm]
npm install @wocwin/t-ui-plus    -S
```

:::
### 全局使用

> #### 前提条件：使用项目必须全局注册 Element-plus 组件库

```js
// main.ts
import { createApp } from "vue"
import App from "./App.vue"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import locale from "element-plus/es/locale/lang/zh-cn"
// element-plus图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import TuiPlus from "@wocwin/t-ui-plus"
import "@wocwin/t-ui-plus/lib/style.css"
const app = createApp(App)
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 注册ElementPlus
app.use(ElementPlus, {
  locale // 语言设置
  // size: Cookies.get('size') || 'medium' // 尺寸设置
})
app.use(TuiPlus)
app.mount("#app")
```
### 按需引入

```js
// 在main.js中按下引入
import '@wocwin/t-ui-plus/lib/style.css'
// 单个.vue文件引入
<script setup lang="ts">
  import {TDetail, TForm} from "@wocwin/t-ui-plus"
</script>
```

### Use CDN in Project(v1.5.0支持)--建议使用pnpm安装使用
> 浏览器直接引入组件库，属性`驼峰命名`必须转换为短横线，直接通过浏览器的 HTML 标签导入 `@wocwin/t-ui-plus`，然后就可以使用全局变量 `TuiPlus` 了。
```html
<head>
  <!-- Import style -->
   <link rel="stylesheet" href="https://unpkg.com/element-plus/dist/index.css" />
  <link rel="stylesheet" href="https://unpkg.com/@wocwin/t-ui-plus/lib/style.css" />
  <!-- Import Vue 3 -->
  <script src="https://unpkg.com/vue@3"></script>
  <!-- Import component library -->
  <script src="https://unpkg.com/element-plus"></script>
  <!-- 3. 引入t-ui-plus的组件库 -->
  <script src="https://unpkg.com/@wocwin/t-ui-plus@latest"></script>
</head>
<body>
  <div id="app">
    <t-input placeholder="请输入金额" input-type="amount" show-thousands v-model="value"></t-input>
  </div>
  <script>
    const app = Vue.createApp({
      data() {
        return {
          value: ''
        }
      }
    });
    app.mount('#app');
  </script>
</body>
```
### 全部组件如下
| 组件名称                 | 说明                                                                                                                                                       |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TLayoutPage              | 布局页面                                                                                                                                                   |
| TLayoutPageItem          | 布局页面子项                                                                                                                                               |
| TAdaptivePage            | [一屏组件](https://wocwin.github.io/t-ui-plus/components/TAdaptivePage/base.html?_blank)（继承TTable 及 TQueryCondition 组件的所有属性、事件、插槽、方法） |
| TQueryCondition          | [条件查询组件](https://wocwin.github.io/t-ui-plus/components/TQueryCondition/base.html?_blank)                                                             |
| TTable                   | [表格组件](https://wocwin.github.io/t-ui-plus/components/TTable/base.html?_blank)                                                                          |
| Virtualized TTable       | [虚拟列表](https://wocwin.github.io/t-ui-plus/components/TTableVirtual/base.html?_blank)                                                                   |
| TForm                    | [表单组件](https://wocwin.github.io/t-ui-plus/components/TForm/base.html?_blank)                                                                           |
| TSelectTable             | [下拉选择表格组件](https://wocwin.github.io/t-ui-plus/components/TSelectTable/base.html?_blank)                                                            |
| Virtualized TSelectTable | [下拉选择虚拟表格组件](https://wocwin.github.io/t-ui-plus/components/multipleVirtual/base.html?_blank)                                                     |
| TSelectIcon              | [图标选择组件](https://wocwin.github.io/t-ui-plus/components/TSelectIcon/base.html?_blank)                                                                 |
| TSelect                  | [下拉选择组件](https://wocwin.github.io/t-ui-plus/components/TSelect/base.html?_blank)      
| ZhangInput                  | [zhangke输入框组件](https://wocwin.github.io/t-ui-plus/components/ZhangInput/base.html?_blank)                                                                  |
| TDetail                  | [详情组件](https://wocwin.github.io/t-ui-plus/components/TDetail/base.html?_blank)                                                                         |
| TButton                  | [防抖按钮组件](https://wocwin.github.io/t-ui-plus/components/TButton/base.html?_blank)                                                                     |
| TStepWizard              | [步骤条组件](https://wocwin.github.io/t-ui-plus/components/TStepWizard/base.html?_blank)                                                                   |
| TTimerBtn                | 定时按钮组件                                                                                                                                               |
| TModuleForm              | [模块表单/详情组件](https://wocwin.github.io/t-ui-plus/components/TModuleForm/base.html?_blank)                                                            |
| TDatePicker              | [日期选择器组件](https://wocwin.github.io/t-ui-plus/components/TDatePicker/base.html?_blank)                                                               |
| TRadio                   | [单选组件](https://wocwin.github.io/t-ui-plus/components/TRadio/base.html?_blank)                                                                          |
| TCheckbox                | [多选组件](https://wocwin.github.io/t-ui-plus/components/TCheckbox/base.html?_blank)                                                                       |
| TChart                   | [图表组件](https://wocwin.github.io/t-ui-plus/components/TChart/base.html?_blank)                                                                          |
| TTabs                    | [标签页组件](https://wocwin.github.io/t-ui-plus/components/TTabs/base.html?_blank)                                                                         |
| TSelectIcon              | [图标选择组件](https://wocwin.github.io/t-ui-plus/components/TSelectIcon/base.html?_blank)                                                                 |


### T-ui-plus 组件 Volar 类型提示

```js
// 需要在使用的项目的tsconfig.json文件中添加以下
compilerOptions：{
  "types": [
      "@wocwin/t-ui-plus/components.d.ts",
    ],
}

```

### 🔨 Vue3 + Vite 项目中安装引入报如下错误的解决方法

> #### 把项目的 vite 版本升级到 4+

<img src="../public/img/error.png">

### docs 文档结构目录

```
├─ examples               # VPDemo组件自动解析此文件夹下的所有.vue文件
├─ components             # .md文件
├─ public                 # 静态资源文件
├─ .vitepress
│  ├─ config              # 插件配置
|  │  ├─ global.ts        # 全局变量定义
|  │  └─ plugins.ts       # 自定义.md文件渲染
│  ├─ theme               # 主题配置
│  ├─ utils               # 文档展开隐藏代码高亮
│  ├─ vitepress
|  │  ├─ vp-demo          # VPDemo组件源码
|  │  ├─ style            # VPDemo组件样式
|  │  └─ index.ts         # 暴露VPDemo组件
│  └─ config.ts           # vitepress配置文件
├─ index.md               # 文档home页面
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 全局配置文件（支持tsx）
```

### Git 提交规范（PR 提交规范）

- `ci`: ci 配置文件和脚本的变动;
- `chore`: 构建系统或辅助工具的变动;
- `fix`: 代码 BUG 修复;
- `feat`: 新功能;
- `perf`: 性能优化和提升;
- `refactor`: 仅仅是代码变动，既不是修复 BUG 也不是引入新功能;
- `style`: 代码格式调整，可能是空格、分号、缩进等等;
- `docs`: 文档变动;
- `test`: 补充缺失的测试用例或者修正现有的测试用例;
- `revert`: 回滚操作;

### vue2 基础组件

> 基于 vue2 + Element-ui 和 ant-design-vue 二次封装的基础组件

---

#### [Vue2 基础组件文档地址](https://wocwin.github.io/t-ui/)

---

#### [Vue2 基础组件码云地址](https://gitee.com/wocwin/t-ui)

---

#### [Vue2 基础组件 GitHub 地址](https://github.com/wocwin/t-ui)
