# vsCode 配置

::: tip 强烈建议
养成一个良好的代码风格不仅有助于我们代码的浏览和维护，更能让我们养成一个良好的码代码习惯。建议团队开发先配置好 `eslint`、`prettier`，把配置共享给其他同事，共用相同代码风格配置更利于项目开发、维护。
:::

请花点时间认真阅读以下内容，否则页面代码可能各种错误！若当前文件夹不在 `vsCode` 工作区中，请把项目拉出来（就是不要放进嵌套文件夹中，放最顶级可消除部分报红）。

## vsCode 下载

官网地址：[https://code.visualstudio.com/](https://code.visualstudio.com/)

## vsCode 插件安装

### 1. 复制粘贴以下插件进行安装（可批量搜索，空格隔开）

- Vue Language Features (Volar)
- Auto Close Tag
- Auto Rename Tag
- background-cover
- Bracket Pair Colorizer
- Chinese (Simplified) Language Pack for Visual Studio Code
- Color Info
- CSS Peek
- Debugger for Chrome
- DotENV
- ESLint
- filesize
- GitLens — Git supercharged
- HTML Boilerplate
- HTML CSS Support
- HTML Snippets
- Icon Fonts
- Iconify IntelliSense
- JavaScript (ES6) code snippets
- Jest
- language-postcss
- Less IntelliSense
- markdownlint
- Material Icon Theme
- open in browser
- Path Intellisense
- Prettier - Code formatter
- SCSS IntelliSense
- stylelint
- Tailwind CSS IntelliSense
- vscode-fileheader
- vscode-icons

### 3. 打开 vsCode 用户自定义配置

- Ctrl + shift + p，
- 搜 setting，
- 复制粘贴以下内容到 setting

```json
{
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.options": {
    "extensions": [".js", ".vue", ".ts", ".tsx"]
  },
  "eslint.validate": [
    "vue",
    "html",
    "javascript",
    "graphql",
    "javascriptreact",
    "json",
    "typescript",
    "typescriptreact",
    "vue-html"
  ],
  "eslint.format.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.associations": {
    "*.cjson": "jsonc",
    "*.wxss": "css",
    "*.wxs": "javascript",
    "*.nvue": "vue"
  },
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "editor.formatOnType": true,
  "javascript.format.enable": false,
  "workbench.iconTheme": "material-icon-theme",
  "backgroundCover.imagePath": "d:\\360downloads\\upload.jpg",
  "search.followSymlinks": false,
  "backgroundCover.opacity": 0.5,
  "terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "markdownlint.config": {
    "default": true,
    "no-hard-tabs": false,
    "no-inline-html": false,
    "first-line-heading": false,
    "heading-increment": false,
    "no-bare-urls": false
  }
}
```

## eslint 第一次可能出现以下问题

### 1. 点击 `allow everywhere` 或者 `allow`

### 2. 出现 `!感叹号`，点击如下图片位置

### 3. 出现其它弹窗，直接点击 `关闭按钮`

## 如果配置不生效，请尝试重启下 vsCode

安装完插件也请重启下 vsCode，有时有可能出现延迟生效，具体原因不详。

## 代码智能提示双提示问题

如下图所示， `locals` 出现了双提示：

### 1. 卸载 `Vetur` 插件 + 删除 vs code 配置代码

```json
"vetur.format.defaultFormatter.html": "prettyhtml",
"vetur.format.defaultFormatter.js": "prettier",
"vetur.validation.template": false,
"vetur.completion.autoImport": false,
"vetur.validation.style": false,
"vetur.validation.interpolation": false,
"vetur.validation.script": false,
```

### 2. 或者禁用工作区，`shift + ctrl + x` 找到 `Vetur` 插件
