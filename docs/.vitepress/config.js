// .vitepress/config.js
export default {
    // 站点级选项
    lang: "zh-CN",
    title: 'WCS-vNext 项目文档',
    description: '项目功能描述、使用说明、版本、路线图等',
    base: '/docs/',
    markdown: {
      lineNumbers: true
    },
    themeConfig: {
      // 主题级选项
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
              text: "项目介绍",
              collapsed: false,
              items: [
                { text: "简介", link: "/home/" },
                { text: "功能介绍", link: "/home/describe/" },
                { text: "快速开始", link: "/home/getting-started/" },
                { text: "路线图", link: "/home/roadmap/" },
                { text: "版本信息", link: "/home/version/" }
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
                { text: "系统配置", link: "/config/sys/" },
                { text: "监控配置", link: "/config/monitor/" },
                { text: "场景搭建", link: "/config/communication/" },
                { text: "业务开发", link: "/config/process/" },
                { text: "规则配置", link: "/config/ruleEngine/" },
                { text: "其他", link: "/config/build/" },
              ],
            },
            {
              text: "高级",
              collapsed: false,
              items: [
                { text: "日志追踪", link: "/config/log/" },
                { text: "流程配置", link: "/config/route/" },
                { text: "数据读写", link: "/config/readwrite/" },
                { text: "标签页", link: "/config/tagsView/" },
                { text: "最佳实践", link: "/config/directive/" },
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
        },
        search: {
          provider: 'local'
        }
    }
  }
