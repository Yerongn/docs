# eslint

::: tip 温馨提示
此配置仅适用于 wcs-vnext，其它语言 react 或者其它 vue-admin 项目等报错请自行调整

## 安装对应的 eslint 依赖

```bash
cnpm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-plugin-vue vue-eslint-parser
```

## 根目录新建 .eslintrc.js

其它格式 .eslintrc.\*，参考：http://eslint.cn/docs/user-guide/configuring

### 1. 相关文档及名词解释

- http://eslint.cn/docs/rules/
- https://eslint.vuejs.org/rules/

```ts
rules: {
  "规则名": ["规则值", "规则配置"]
}
```

### 2. 配置规则 rules

配置后，如果编写代码时不符合规则规范，页面将会出现 `红色波浪线` 或 `黄色波浪线`

```ts {5,9}
module.exports = {
  ...
  rules: {
    // "no-console": 2, 红色波浪线
    "no-console": "error",
    // "no-console": 1, 黄色波浪线
    // "no-console": "warn",
    // http://eslint.cn/docs/rules/ 可点击对应的规则名查看详细介绍、示例
    "array-bracket-spacing": [2, "never"],
    ...
  },
};
```

### 3. rules：开启规则和发生错误时报告的等级，规则的错误等级有以下三种

- `0` 或 `off`： 关闭规则
- `1` 或 `warn`： 打开规则，并且作为一个警告，字体颜色为黄色（并不会导致检查不通过）
- `2` 或 `error`：打开规则，并且作为一个错误 ，色体颜色为红色(退出码为 1，检查不通过)

## .eslintignore 忽略特定的文件

你可以通过在项目根目录创建一个 `.eslintignore` 文件告诉 ESLint 去忽略特定的文件和目录。`.eslintignore` 文件是一个纯文本文件，其中的每一行都是一个 `glob` 模式表明哪些路径应该忽略检测。

::: tip 项目根目录
新建 `.eslintignore`，文档参看：[http://eslint.cn/docs/user-guide/configuring](http://eslint.cn/docs/user-guide/configuring)
:::

例如，以下将忽略部分文件，规则将不会检查以下目录：

```ts
*.sh
node_modules
lib
*.md
*.scss
*.woff
*.ttf
.vscode
.idea
dist
mock
public
bin
build
config
index.html
src/assets
```

## 关闭 eslint 检查

eslint 可以配置在开发环境中，帮助我们找出项目中不符合规则的代码并给出提示。在我们的开发环境中，开发者每次修改代码，都会先用 eslint 检查代码，这样可以让 eslint 随时提醒开发者代码是否符合规范，从而降低低级 bug 的出现。`所以不建议关闭 eslint 检查`。

::: tip eslintignore
直接在 `.eslintignore` 忽略列表中添加
:::

比如：要忽略 `views/login` 组件中的检查，`.eslintignore` 中添加如下内容：

```html
src/views/login
```
