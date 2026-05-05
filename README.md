# Claude Code 桌面端汉化

这是一个面向 **Claude Desktop macOS 桌面端** 的简体中文补丁，重点补齐 Claude Code、Cowork、桌面设置、扩展、开发者、本地 MCP 等页面中残留的英文文案。

它不是 Cursor / VS Code 插件汉化，也不是 Claude Code CLI 汉化。

## 特点

- 默认只修改 Claude Desktop 的 `i18n` catalog。
- 不替换 JS bundle，避免出现黑屏。
- 每次写入前自动生成备份。
- 支持 dry-run 预览和英文残留报告。
- 提供 npm / npx 快速执行方式。

本机验证过的 Claude Desktop 版本：`1.5354.0`。

## 快速使用

先完全退出 Claude Desktop，然后执行：

```bash
npx github:SAKURA1175/claude-code-desktop-zh-cn
```

也可以全局安装 GitHub 版本：

```bash
npm install -g github:SAKURA1175/claude-code-desktop-zh-cn
claude-code-desktop-zh-cn
```

发布到 npm registry 后，也可以使用：

```bash
npx claude-code-desktop-zh-cn@latest
npm install -g claude-code-desktop-zh-cn
claude-code-desktop-zh-cn
```

## 常用命令

预览将要修改的内容，不写入：

```bash
claude-code-desktop-zh-cn --dry-run
```

生成英文残留报告：

```bash
claude-code-desktop-zh-cn --report-only --dry-run
```

Claude.app 不在默认路径时：

```bash
claude-code-desktop-zh-cn --app /path/to/Claude.app
```

恢复某次补丁前的备份：

```bash
claude-code-desktop-zh-cn-restore --stamp 20260505132147
```

`stamp` 来自补丁运行时生成的备份文件名：

```text
*.pre-zhcn-plus-YYYYMMDDHHMMSS.bak
```

## 补丁范围

默认修改：

```text
/Applications/Claude.app/Contents/Resources/ion-dist/i18n/zh-CN.json
/Applications/Claude.app/Contents/Resources/ion-dist/i18n/statsig/zh-CN.json
```

默认不修改：

```text
/Applications/Claude.app/Contents/Resources/ion-dist/assets/v1/*.js
```

## 安全说明

早期尝试过直接替换 JS bundle 中的英文字符串，实测容易导致 Claude Desktop 黑屏。因此当前仓库默认只补 `i18n` catalog。

如果补丁后没有变化，请确认：

- 已完全退出并重新打开 Claude Desktop。
- Claude Desktop 的语言/locale 是 `zh-CN`。
- 你的 Claude.app 路径正确。

## 本地开发

```bash
npm install
npm run check
npm run patch:dry-run
```

## 许可

MIT
