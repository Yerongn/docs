// .vitepress/config.js
export default {
    // 站点级选项
    lang: "zh-CN",
    title: 'WCS-vNext 项目文档',
    description: '项目功能描述、使用说明、版本、路线图等',
    base: '/docs/',
    themeConfig: {
      // 主题级选项
      search: true,
      outline: "deep",
      outlineTitle: "导航目录",
      logo: '/logo.svg',
      footer: {
        message: "根据 MIT 许可证发布",
        copyright: "本文档内容版权为 wcs-vnext 作者所有，保留所有权利。",
      },
      docFooter: {
        prev: "上一页",
        next: "下一页",
      },
      nav:[ 
        { text: "指南", link: "/home/", activeMatch: "/home/" },
        { text: "配置", link: "/config/", activeMatch: "/config/" },
        { text: "部署", link: "/deployment/", activeMatch: "/deployment/" },
        ],
        sidebar: {
          "/home/": [
            {
              text: "功能介绍",
              collapsed: false,
              items: [
                { text: "简介", link: "/home/" },
                { text: "技术选择", link: "/home/technology/" },
                { text: "功能说明", link: "/home/describe/" },
                { text: "路线图", link: "/home/roadmap/" },
                { text: "版本信息", link: "/home/version/" },
              ],
            },
            {
              text: "开发指南",
              collapsed: false,
              items: [
                { text: "介绍", link: "/home/introduce/" },
                { text: "安装", link: "/home/install/" },
                { text: "其它", link: "/home/fast/" },
                { text: "参考文档", link: "/home/document/" },
              ],
            },
            {
              text: "代码规范",
              collapsed: false,
              items: [
                { text: "eslint", link: "/home/eslint/" },
                { text: "prettier", link: "/home/prettier/" },
                { text: "vsCode 配置", link: "/home/vscode/" },
                { text: "git 提交规范", link: "/home/gitPush/" },
              ],
            },
          ],
          "/config/": [
            {
              text: "基础",
              collapsed: false,
              items: [
                { text: "简介", link: "/config/" },
                { text: "菜单配置", link: "/config/menu/" },
                { text: "布局配置", link: "/config/layoutConfig/" },
                { text: "字体图标", link: "/config/iconfont/" },
                { text: "服务端交互", link: "/config/server/" },
                { text: "vuex", link: "/config/vuex/" },
                { text: "打包预览", link: "/config/build/" },
              ],
            },
            {
              text: "高级",
              collapsed: false,
              items: [
                { text: "权限管理", link: "/config/power/" },
                { text: "路由参数", link: "/config/route/" },
                { text: "国际化", link: "/config/i18n/" },
                { text: "标签页", link: "/config/tagsView/" },
                { text: "内置指令", link: "/config/directive/" },
              ],
            },
            {
              text: "其它",
              collapsed: false,
              items: [
                { text: "数据可视化", link: "/config/charts/" },
                { text: "工具类集合", link: "/config/tool/" },
                { text: "第三方插件使用", link: "/config/partyPlug/" },
                { text: "内置插件的使用", link: "/config/builtPlug/" },
                { text: "其它问题", link: "/config/otherIssues/" },
              ],
            },
          ],
        }
    }
  }
