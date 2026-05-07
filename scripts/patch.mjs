#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_APP_PATH = "/Applications/Claude.app";
const DEFAULT_LOCALE = "zh-CN";

const translations = {
  "Required for screen visibility. macOS may ask you to restart.": "屏幕可见性需要此权限。macOS 可能会要求你重启。",
  "Scanning...": "正在扫描...",
  "Image": "图片",
  "Sidebar failed to load.": "侧边栏加载失败。",
  "Ad online": "发布在线广告",
  "Are you sure you want to delete this environment? This action cannot be undone.": "确定要删除此环境吗？此操作无法撤销。",
  "Learn how to use this feature safely": "了解如何安全使用此功能",
  "Couldn't save image.": "无法保存图片。",
  "Meet Claude": "认识 Claude",
  "Searching for sources...": "正在搜索来源...",
  "Remove folder {name}": "移除文件夹 {name}",
  "Forked from {source}": "派生自 {source}",
  "Start a new session": "开始新会话",
  "Connection requirements": "连接要求",
  "Create routine": "创建例程",
  "Delete token": "删除令牌",
  "What this URL is overriding": "此 URL 覆盖的内容",
  " — not enabled": " - 未启用",
  "The endpoint rejected the request. Check cert trust, IP allowlist, or auth headers.": "端点拒绝了请求。请检查证书信任、IP 允许列表或认证请求头。",
  "Which plan?": "选择哪个方案？",
  "Get notified when Claude is available in your region.": "当 Claude 在你所在地区可用时通知我。",
  "Failed to update default plugin preference.": "无法更新默认插件偏好。",
  "Your AWS token has expired. Please return to the AWS product page to re-initiate application setup.": "你的 AWS 令牌已过期。请返回 AWS 产品页重新开始应用设置。",
  "Manually create PR in GitHub": "在 GitHub 中手动创建 PR",
  "Delete routine": "删除例程",
  "Move to project": "移动到项目",
  "Payment confirmation failed. You can try again.": "付款确认失败。你可以重试。",
  "Accept": "接受",
  "Active Claude Code users in this period": "此期间活跃的 Claude Code 用户",
  "Setup failed": "设置失败",
  "Select a repository first": "请先选择一个仓库",
  "System": "系统",
  "What was unsatisfying about this response?": "这个回复哪里让你不满意？",
  "Remove condition": "移除条件",
  "Allow \"Always allow\" for connector tools": "允许连接器工具使用“始终允许”",
  "Add payment method": "添加付款方式",
  "Not supported": "不支持",
  "Your gift link is ready to share": "你的赠送链接已可分享",
  "Used Preview": "已使用预览",
  "No microphone was found. You can connect a microphone and try again.": "未找到麦克风。你可以连接麦克风后重试。",
  "Back to connectors": "返回连接器",
  "Why this banner is shown": "为什么显示此横幅",
  "Turn on microphone": "开启麦克风",
  "Enter amount": "输入金额",
  "Your first chat with Claude": "你与 Claude 的第一次聊天",
  "Remove from allowlist": "从允许列表中移除",
  "Resubscribe": "重新订阅",
  "Your account could not be prepared. Refresh the page to try again.": "无法准备你的账号。请刷新页面后重试。",
  "Re-sync": "重新同步",
  "Failed to archive project. You can try again.": "无法归档项目。你可以重试。",
  "Client State": "客户端状态",
  "Edit settings": "编辑设置",
  "Move pane down": "下移面板",
  "Tools you use": "你使用的工具",
  "Learning & studying": "学习与研究",
  "File is too large to export. Maximum size is 30 MB.": "文件过大，无法导出。最大大小为 30 MB。",
  "Add self-hosted environment": "添加自托管环境",
  "Some plugins in this marketplace have validation errors.": "此插件市场中的部分插件存在验证错误。",
  "ACTIONS": "操作",
  "Set project instructions": "设置项目指令",
  "Invited by {name}": "{name} 邀请",
  "Could not check session readiness.": "无法检查会话是否就绪。",
  "Save {percent}% ({discount})": "节省 {percent}%（{discount}）",
  "user@myserver.com or a host from ~/.ssh/config": "user@myserver.com 或 ~/.ssh/config 中的主机",
  "Try Claude Code to build, debug, and ship just by describing what you need": "只需描述你的需求，就能用 Claude Code 构建、调试并交付",
  "At minute": "在第几分钟",
  "Install now": "立即安装",
  "Run on a recurring cron schedule": "按重复 cron 计划运行",
  "Artifacts disabled": "制品已禁用",
  "Exit summary view": "退出摘要视图",
  "Most connected integrations": "连接最多的集成",
  "Screen recording": "屏幕录制",
  "Type": "类型",
  "abilities": "能力",
  "Log out of current session": "退出当前会话",
  "Select a protocol": "选择协议",
  "Outputs": "输出",
  "Enterprise search across your organization": "跨组织企业搜索",
  "You can automatically buy more extra usage when you run low.": "当额度不足时，可以自动购买更多额外用量。",
  "No tools available": "没有可用工具",
  "Drop settings.json here": "将 settings.json 拖到这里",
  "Assign roles based on IdP group membership.": "根据 IdP 组成员身份分配角色。",
  "Grant admin pre-consent for your organization": "为你的组织授予管理员预先同意",
  "Failed to delete routine.": "无法删除例程。",
  "Run now": "立即运行",
  "Members": "成员",
  "When you sign in to Claude Code, your authorization tokens will appear here.": "登录 Claude Code 后，你的授权令牌会显示在这里。",
  "You already have a plugin with that name. Choose a different one.": "已存在同名插件。请选择其他名称。",
  "Don't have the chrome extension yet?": "还没有 Chrome 扩展？",
  "AI-powered artifacts disabled": "AI 驱动的制品已禁用",
  "Set up projects with files and context Claude can always reference": "设置项目，让 Claude 始终可以引用其中的文件和上下文",
  "Duplicate routine": "复制例程",
  "{serverName} needs authentication to use {toolName}": "{serverName} 需要认证后才能使用 {toolName}",
  "Blocked websites updated.": "已更新被阻止的网站。",
  "Read my eval metrics": "读取我的评测指标",
  "Only existing users can sign in. New registrations are blocked.": "仅现有用户可以登录。新注册已被阻止。",
  "Try Claude Code": "试用 Claude Code",
  "Get the most out of Cowork, plus 20x more usage": "充分使用 Cowork，并获得 20 倍更多用量",
  "Start fresh with a separate project": "用单独项目重新开始",
  "required": "必填",
  "Marketing analytics": "营销分析",
  "Already added": "已添加",
  "Clean up my Downloads folder": "整理我的下载文件夹",
  "Save Configuration": "保存配置",
  "This isn't working right now. You can try again later.": "此功能暂时不可用。你可以稍后重试。",
  "Everything in Pro, plus:": "包含 Pro 的全部功能，另加：",
  "Combining overlapping findings…": "正在合并重叠的发现...",
  "Marketplace": "市场",
  "Initial usage charge": "初始用量费用",
  "Scroll right": "向右滚动",
  "Already allowed": "已允许",
  "Add to project": "添加到项目",
  "Created {count} memories": "已创建 {count} 条记忆",
  "Edit style instructions manually": "手动编辑风格指令",
  "No matching projects": "没有匹配的项目",
  "Findings": "发现",
  "Set up Cowork": "设置 Cowork",
  "Increase seats": "增加席位",
  "Help and security": "帮助与安全",
  "Checking your tools...": "正在检查你的工具...",
  "Pay as you go, with only Chat access": "按量付费，仅包含聊天访问",
  "edit": "编辑",
  "Don’t ask me again": "不再询问",
  "Choose a time in the future.": "请选择未来的时间。",
  "Copy unmodified message": "复制未修改的消息",
  "Add Tools": "添加工具",
  "This will:": "这将：",
  "Using {connectorName}...": "正在使用 {connectorName}...",
  "Not running": "未运行",
  "More Opus with Pro and Max plans": "Pro 和 Max 方案可获得更多 Opus 用量",
  "Artifacts are user-generated and may contain unverified or potentially unsafe content.": "制品由用户生成，可能包含未经验证或潜在不安全的内容。",
  "Inline visualizations enabled": "已启用内联可视化",
  "Complete identity verification to finish setting up your subscription.": "完成身份验证以完成订阅设置。",
  "Give your developers access to Claude Code": "为你的开发者开通 Claude Code 访问权限",
  "Environment archived.": "环境已归档。",
  "Select a trigger": "选择触发器",
  "Fetching page...": "正在获取页面...",
  "Total PRs per user": "每位用户的 PR 总数",
  "creations": "创作",
  "Skip": "跳过",
  "ends in {days}d": "{days} 天后结束",
  "Open plan": "打开方案",
  "Haiku": "Haiku",
  "Automatically sync when a new commit lands on the default branch": "当默认分支有新提交时自动同步",
  "Run at": "运行时间",
  "Couldn’t verify eligibility. You can try again.": "无法验证资格。你可以重试。",
  "Couldn't verify eligibility. You can try again.": "无法验证资格。你可以重试。",
  "Doesn't reset": "不会重置",
  "More messages than Free": "比免费版更多消息",
  "Opus consumes usage limits faster than other models": "Opus 消耗用量额度的速度比其他模型更快",
  "Auto thinking": "自动思考",
  "Analysis tool": "分析工具",
  "Most efficient for everyday tasks": "日常任务最高效",
  "Best for math and coding challenges": "最适合数学和编程挑战",
  "Web search": "网页搜索",
  "Customer Email": "客户邮件",
  "Adaptive": "自适应",
  "Adaptive thinking": "自适应思考",
  "Patient, educational responses that build understanding": "耐心且有教学性的回复，帮助建立理解",
  "Claude uses its access to the web to improve answers when appropriate.": "Claude 会在适当时使用网页访问能力来改进回答。",
  "Write the opening of a short story about a morning commute that takes an unexpected turn": "写一篇短篇故事的开头，讲述一次发生意外转折的早晨通勤",
  "Respond via email to a customer who received the wrong item in their order": "给收到错误商品的客户写一封邮件回复",
  "Write a product review for wireless headphones": "写一篇无线耳机产品评测",
  "Write a blog post about sustainable fashion trends": "写一篇关于可持续时尚趋势的博客文章",
  "Most capable for ambitious work": "最适合有挑战性的工作",
  "Short Story": "短篇故事",
  "Our most intelligent model yet": "我们迄今最智能的模型",
  "Learning": "学习",
  "Thinks for more complex tasks": "会为更复杂的任务进行思考",
  "Extended": "扩展",
  "Product Review": "产品评测",
  "Respond right away": "立即回复",
  "Shorter responses & more messages": "更短回复和更多消息",
  "Explain why the sky changes color at sunset": "解释为什么日落时天空会变色",
  "Educational responses for learning": "适合学习的教学型回复",
  "Default responses from Claude": "Claude 的默认回复",
  "Think longer for complex tasks": "为复杂任务思考更久",
  "Match thinking to complexity": "根据复杂度匹配思考强度",
  "Concise": "简洁",
  "Normal": "普通",
  "Explanatory": "解释型",
  "Fastest for quick answers": "快速回答最快",
  "Educational Content": "教育内容",
  "During high demand, Claude keeps replies short so you can chat longer.": "需求高峰时，Claude 会保持回复简短，让你能聊得更久。",
  "Formal": "正式",
  "Claude can write and run code to process data, run analysis, and produce data visualizations in real time.": "Claude 可以编写并运行代码来处理数据、执行分析，并实时生成数据可视化。",
  "Instant": "即时",
  "Extended thinking": "扩展思考",
  "Best for most use cases": "适合大多数使用场景",
  "Clear and well-structured responses": "清晰且结构良好的回复",
  "Marketing Blog Post": "营销博客文章",
  "Profile": "个人资料",
  "Dismiss": "忽略",
  "Upgrade": "升级",
  "Manage": "管理",
  "Account": "账号",
  "Billing": "账单",
  "Connectors": "连接器",
  "Memory": "记忆",
  "Theme": "主题",
  "Invite": "邀请",
  "Organization": "组织",
  "Workspace": "工作区",
  "Keyboard shortcuts": "键盘快捷键",
  "Subscription": "订阅",

  "Claude code desktop settings": "Claude Code 桌面端设置",
  "Allow bypass permissions mode": "允许绕过权限模式",
  "Bypass all permission checks and let Claude work uninterrupted. This works well for workflows like fixing lint errors or generating boilerplate code. Letting Claude run arbitrary commands is risky and can result in data loss, system corruption, or data exfiltration (e.g., via prompt injection attacks). <link>See best practices for safe usage</link>": "绕过所有权限检查，让 Claude 不间断地工作。这适合修复 lint 错误或生成样板代码等工作流。允许 Claude 运行任意命令有风险，可能导致数据丢失、系统损坏或数据泄露（例如通过提示注入攻击）。<link>查看安全使用最佳实践</link>",
  "Draw attention on notifications": "通知时引起注意",
  "Bounce the dock icon or flash the taskbar when Claude needs your attention and the app is not focused.": "当 Claude 需要你注意且应用未聚焦时，跳动 Dock 图标或闪烁任务栏。",
  "Worktree location": "工作树位置",
  "Where to store git worktrees for isolated coding sessions": "用于隔离编码会话的 git 工作树存储位置",
  "Branch prefix": "分支前缀",
  "Prefix added to the beginning of every worktree branch name": "添加到每个工作树分支名称开头的前缀",
  "Claude can start dev servers, open a live preview, and verify code changes with screenshots, snapshots, and DOM inspection.": "Claude 可以启动开发服务器、打开实时预览，并通过截图、快照和 DOM 检查验证代码变更。",
  "Persist Preview sessions": "保留预览会话",
  "Save cookies, local storage, and login sessions for dev server previews. Data is stored per workspace and persists across app restarts. Turning this off clears all saved session data.": "为开发服务器预览保存 Cookie、本地存储和登录会话。数据按工作区存储，并会在应用重启后保留。关闭此项会清除所有已保存的会话数据。",
  "Claude Code on the Web": "网页版 Claude Code",
  "Create pull requests automatically": "自动创建拉取请求",
  "When Claude pushes changes to a branch, it automatically opens a pull request without asking first.": "当 Claude 将变更推送到分支时，会自动打开拉取请求，无需先询问。",

  "Instructions here apply to all Cowork sessions. Use this for preferences, conventions, or context that Claude should always know.": "这里的指令会应用到所有 Cowork 会话。可用于填写偏好、约定或 Claude 应始终了解的上下文。",
  "Add instructions for Claude to follow in all Cowork sessions...": "添加 Claude 在所有 Cowork 会话中都应遵循的指令...",
  "Use memory in sessions": "在会话中使用记忆",
  "Claude will read and update these memories during Cowork sessions.": "Claude 会在 Cowork 会话期间读取并更新这些记忆。",
  "Claude saves what it learns about you and your work during Cowork sessions. These files are stored on this device.": "Claude 会保存它在 Cowork 会话中了解到的关于你和你工作的内容。这些文件存储在此设备上。",
  "No memories yet": "还没有记忆",
  "No memories yet. Claude will add entries here as you work together.": "还没有记忆。随着你们一起工作，Claude 会在这里添加条目。",

  "Browse extensions": "浏览扩展",
  "Extensions": "扩展",
  "Developer": "开发者",
  "Desktop app": "桌面应用",
  "Capabilities": "能力",
  "Preview": "预览",
  "Select": "选择",
  "Privacy": "隐私",
  "Connectors": "连接器",
  "Allow Claude to directly interact with apps, data, and tools on your computer.": "允许 Claude 直接与你电脑上的应用、数据和工具交互。",
  "Advanced settings": "高级设置",

  "Local MCP servers": "本地 MCP 服务器",
  "Add and manage MCP servers that you’re working on. ": "添加和管理你正在使用的 MCP 服务器。",
  "No servers added": "尚未添加服务器",
  "Edit Config": "编辑配置",
  "Developer docs": "开发者文档",

  "Avatar": "头像",
  "Full name": "全名",
  "What should Claude call you?": "Claude 应该怎么称呼你？",
  "What best describes your work?": "哪项最符合你的工作？",
  "Instructions for Claude": "给 Claude 的指令",
  "Claude will keep these in mind across chats as long as they’re within Anthropic’s guidelines. These won't apply to Cowork or Code. Learn more": "只要这些内容符合 Anthropic 指南，Claude 会在聊天中记住它们。这些内容不会应用到 Cowork 或 Code。了解更多",
  "Preferences": "偏好设置",
  "Color mode": "颜色模式",
  "Chat font": "聊天字体",
  "Response completions": "回复完成通知",
  "Get notified when Claude has finished a response. Useful for long-running tasks.": "当 Claude 完成回复时通知你。适合长时间运行的任务。",

  "General desktop settings": "桌面端通用设置",
  "Run on startup": "开机启动",
  "Automatically start Claude when you log in to your computer": "登录电脑时自动启动 Claude",
  "Quick access shortcut": "快速访问快捷键",
  "Message Claude from anywhere on your desktop": "从桌面任何位置向 Claude 发送消息",
  "Voice shortcut": "语音快捷键",
  "Speak to Claude from anywhere on your desktop": "从桌面任何位置与 Claude 语音交流",
  "Menu bar": "菜单栏",
  "Show Claude in the menu bar": "在菜单栏显示 Claude",
  "Keep computer awake": "保持电脑唤醒",
  "Prevent your computer from idle-sleeping while Claude is open so scheduled tasks can run. Your display can still turn off. Closing the laptop lid will still put it to sleep.": "Claude 打开时阻止电脑因空闲而睡眠，以便计划任务可以运行。显示器仍可关闭；合上笔记本盖子仍会让电脑进入睡眠。",
  "Tap Option twice": "连按两次 Option",
  "No shortcut": "无快捷键",
  "Directory": "目录",
  "Plugins": "插件",
  "Search plugins…": "搜索插件...",
  "Search plugins": "搜索插件",
  "Open MCP Log File": "打开 MCP 日志文件",
  "Reload MCP Configuration": "重新加载 MCP 配置",
  "Check for Updates…": "检查更新…",
  "Last update attempt failed...": "上次更新尝试失败...",
  "Install Extension...": "安装扩展...",
  "Install Unpacked Extension...": "安装未打包扩展...",
  "Open Extensions Folder...": "打开扩展文件夹...",
  "Open Extension Settings Folder...": "打开扩展设置文件夹...",
  "Your organization hasn't provided plugins. Contact your organization administrator to add them.": "你的组织尚未提供插件。请联系组织管理员添加。",

  "Configure third-party inference": "配置第三方推理",
  "Search settings": "搜索设置",
  "Connection": "连接",
  "Sandbox & workspace": "沙盒与工作区",
  "Connectors & extensions": "连接器与扩展",
  "Telemetry & updates": "遥测与更新",
  "Usage limits": "用量限制",
  "Plugins & skills": "插件与技能",
  "Egress Requirements": "出站访问要求",
  "Choose where Claude Desktop sends inference requests.": "选择 Claude Desktop 将推理请求发送到哪里。",
  "Inference provider": "推理提供方",
  "Selects the inference backend. Setting this key activates third-party mode.": "选择推理后端。设置此项会启用第三方模式。",
  "{provider} credentials": "{provider} 凭据",
  "Gateway credentials": "Gateway 凭据",
  "Gateway base URL": "Gateway 基础 URL",
  "Full URL of the inference gateway endpoint.": "推理网关端点的完整 URL。",
  "Gateway API key": "Gateway API 密钥",
  "Gateway auth scheme": "Gateway 认证方式",
  "How to send the gateway credential. 'bearer' (default) sends Authorization: Bearer. Set 'x-api-key' only if your gateway requires the x-api-key header instead (e.g. api.anthropic.com). Set 'sso' to obtain the credential via the gateway's own browser-based sign-in (RFC 8414 discovery at `<inferenceGatewayBaseUrl>/.well-known/oauth-authorization-server` + RFC 8628 device-code grant); inferenceGatewayApiKey and inferenceCredentialHelper are not required.": "如何发送网关凭据。'bearer'（默认）会发送 Authorization: Bearer。仅当你的网关需要 x-api-key 请求头时才设置为 'x-api-key'（例如 api.anthropic.com）。设置为 'sso' 可通过网关自己的浏览器登录获取凭据（RFC 8414 发现地址为 `<inferenceGatewayBaseUrl>/.well-known/oauth-authorization-server`，并使用 RFC 8628 设备码授权）；此时不需要 inferenceGatewayApiKey 和 inferenceCredentialHelper。",
  "Gateway extra headers": "Gateway 额外请求头",
  "Extra HTTP headers sent on every inference request. JSON array of 'Name: Value' strings.": "每次推理请求都会发送的额外 HTTP 请求头。格式为 'Name: Value' 字符串组成的 JSON 数组。",
  "Required": "必填",
  "Apply locally": "应用到本机",
  "View as JSON": "以 JSON 查看",
  "Form view": "表单视图",
  "Export": "导出",
  "Configuration JSON": "配置 JSON",
  "Full config": "完整配置",
  "Partial — not a valid file on its own": "仅部分配置，不能单独作为有效文件使用",
  "Plain JSON": "普通 JSON",
  "macOS configuration profile": "macOS 配置描述文件",
  "Windows registry file": "Windows 注册表文件",
  "Firewall allowlist (.txt)": "防火墙允许列表（.txt）",
  "This configuration contains sensitive values. They will be written to the exported file in plain text.": "此配置包含敏感值。它们会以明文写入导出的文件。",
  "Relaunch Claude?": "要重新启动 Claude 吗？",
  "Configuration was written to disk. Claude needs to relaunch to use this provider.": "配置已写入磁盘。Claude 需要重新启动才能使用此提供方。",
  "Relaunch now": "立即重启",
  "Later": "稍后",
  "Restart now": "立即重启",
  "Restart to apply this configuration.": "重启以应用此配置。",
  "Restart to fetch the config from this URL.": "重启以从此 URL 获取配置。",
  "Couldn't load configuration": "无法加载配置",
  "Couldn't update saved configurations": "无法更新已保存的配置",
  "Couldn't export the configuration profile.": "无法导出配置描述文件。",
  "Couldn't copy to the clipboard.": "无法复制到剪贴板。",
  "An unknown error occurred": "发生未知错误",
  "New configuration": "新建配置",
  "Rename configuration": "重命名配置",
  "Duplicate configuration": "复制配置",
  "Configuration name": "配置名称",
  "Configurations": "配置",
  "Select configuration: {name}": "选择配置：{name}",
  "{name} copy": "{name} 副本",
  "Default": "默认",
  "Organization-managed": "组织管理",
  "Managed by your organization — read-only": "由你的组织管理，只读",
  "This configuration is managed by your organization. Contact your IT administrator to make changes.": "此配置由你的组织管理。请联系 IT 管理员进行更改。",
  "This configuration is fetched from a bootstrap URL at launch. Fields it provides are locked below.": "此配置会在启动时从 bootstrap URL 获取。它提供的字段在下方会被锁定。",
  "Set by bootstrap URL": "由 bootstrap URL 设置",
  "Set by bootstrap URL · <h>{host}</h>": "由 bootstrap URL 设置 · <h>{host}</h>",
  "Set by MDM profile": "由 MDM 描述文件设置",
  "Settings covered by the URL are read-only below.": "此 URL 覆盖的设置在下方为只读。",
  "Includes a value set by provider: {provider}": "包含由提供方设置的值：{provider}",
  "What this URL is overriding": "此 URL 正在覆盖的内容",
  "Use bootstrap config": "使用 bootstrap 配置",
  "Bootstrap config URL": "Bootstrap 配置 URL",
  "Bootstrap config server": "Bootstrap 配置服务器",
  "Bootstrap OIDC parameters": "Bootstrap OIDC 参数",
  "Bootstrap sign-in (OIDC)": "Bootstrap 登录（OIDC）",
  "Point this configuration at a bootstrap URL to have your organization manage these settings remotely.": "将此配置指向 bootstrap URL，让你的组织远程管理这些设置。",
  "HTTPS endpoint fetched at app launch. The JSON response body overrides per-user provider config (project ID, region, base URL, model list, credential, OTLP endpoint) for the current user. When `bootstrapOidc` is unset, the app signs in via RFC 8628 device-code: discovery hits `<bootstrapUrl-minus-trailing-/bootstrap>/.well-known/oauth-authorization-server` (the path-scoped issuer base, not the bare origin); when the response's `inferenceGatewayBaseUrl` shares this origin, the same session authorizes inference.": "应用启动时获取的 HTTPS 端点。JSON 响应体会为当前用户覆盖逐用户提供方配置（项目 ID、区域、基础 URL、模型列表、凭据、OTLP 端点）。未设置 `bootstrapOidc` 时，应用会通过 RFC 8628 设备码登录：发现地址为 `<bootstrapUrl-minus-trailing-/bootstrap>/.well-known/oauth-authorization-server`（路径作用域的 issuer 基址，而不是裸 origin）；当响应中的 `inferenceGatewayBaseUrl` 与该 origin 相同时，同一会话会授权推理请求。",
  "When unset or true, the app fetches `bootstrapUrl` at launch and applies the response as a config overlay. Set false to keep the URL saved but skip the fetch.": "未设置或为 true 时，应用会在启动时获取 `bootstrapUrl`，并将响应作为配置覆盖层应用。设为 false 可保留 URL 但跳过获取。",
  "Sign in to fetch this configuration.": "登录以获取此配置。",
  "Sign-in required": "需要登录",
  "Sign-in failed:": "登录失败：",
  "Signed in": "已登录",
  "Fetching config from this URL.": "正在从此 URL 获取配置。",
  "Syncing…": "正在同步...",
  "Synced": "已同步",
  "Last synced": "上次同步",
  "Last sync failed": "上次同步失败",
  "Not synced yet": "尚未同步",
  "Not in use — toggle on to fetch and apply this URL.": "未使用，开启后会获取并应用此 URL。",
  "No cached response available. Claude is running with local values instead.": "没有可用的缓存响应。Claude 正在改用本地值运行。",
  "Claude is using the cached response. Newer changes at the URL won't apply until a successful sync.": "Claude 正在使用缓存响应。URL 上的新变更需要同步成功后才会应用。",
  "The URL returned 200 but the body isn't a valid config document.": "该 URL 返回了 200，但响应体不是有效的配置文档。",
  "Invalid response": "响应无效",
  "HTTP {status}": "HTTP {status}",
  "The endpoint returned an error.": "端点返回了错误。",
  "The endpoint rejected the request. Check cert trust, IP allowlist, or auth headers.": "端点拒绝了请求。请检查证书信任、IP 允许列表或认证请求头。",

  "Allowed workspace folders": "允许的工作区文件夹",
  "JSON array of absolute paths the user may attach as workspace folders. A leading ~ expands to the per-user home directory. Unset means unrestricted.": "用户可作为工作区文件夹附加的绝对路径 JSON 数组。开头的 ~ 会展开为当前用户主目录。未设置表示不限制。",
  "Require full VM sandbox": "要求完整 VM 沙盒",
  "Forces the agent loop, file/web tools, and plugin-bundled MCPs to run inside the VM, disabling host-loop mode.": "强制 agent 循环、文件/网页工具和插件内置 MCP 在 VM 内运行，并禁用主机循环模式。",
  "Secure VM features": "安全 VM 功能",
  "Disabled built-in tools": "禁用的内置工具",
  "Allow Claude Code tab": "允许 Claude Code 标签页",
  "Show the Code tab (terminal-based coding sessions). Sessions run on the host, not inside the VM.": "显示 Code 标签页（基于终端的编码会话）。会话在主机上运行，而不是在 VM 内运行。",
  "Allow all": "全部允许",
  "Tool egress (VM sandbox)": "工具出站访问（VM 沙盒）",
  "Allowed egress hosts": "允许的出站主机",
  "Additional hostnames the Cowork sandbox may reach (web fetch, shell commands, package installs). JSON array; supports *.example.com wildcards. The inference provider host is always allowed. Set to [\"*\"] to disable VM-level egress filtering entirely. Common hosts to add for dependency installs (pip/npm/apt/cargo/git): pypi.org, files.pythonhosted.org, registry.npmjs.org, deb.debian.org, security.debian.org, archive.ubuntu.com, security.ubuntu.com, github.com, raw.githubusercontent.com, objects.githubusercontent.com, crates.io, static.crates.io.": "Cowork 沙盒可访问的额外主机名（网页抓取、shell 命令、包安装）。JSON 数组；支持 *.example.com 通配符。推理提供方主机会始终被允许。设为 [\"*\"] 可完全禁用 VM 级出站过滤。依赖安装常见主机（pip/npm/apt/cargo/git）：pypi.org、files.pythonhosted.org、registry.npmjs.org、deb.debian.org、security.debian.org、archive.ubuntu.com、security.ubuntu.com、github.com、raw.githubusercontent.com、objects.githubusercontent.com、crates.io、static.crates.io。",

  "Allow desktop extensions": "允许桌面扩展",
  "Permit users to install local desktop extensions (.dxt/.mcpb).": "允许用户安装本地桌面扩展（.dxt/.mcpb）。",
  "Show extension directory": "显示扩展目录",
  "Show the Anthropic extension directory in the connectors UI.": "在连接器界面中显示 Anthropic 扩展目录。",
  "Require signed extensions": "要求扩展签名",
  "Reject desktop extensions that are not signed by a trusted publisher.": "拒绝未由受信任发布者签名的桌面扩展。",
  "Allow user-added MCP servers": "允许用户添加 MCP 服务器",
  "Permit users to add their own local (stdio) MCP servers via Developer settings. HTTP/SSE servers are managed separately. When false, only servers from the Managed MCP servers list and org-provisioned plugins are available.": "允许用户通过开发者设置添加自己的本地（stdio）MCP 服务器。HTTP/SSE 服务器会单独管理。关闭时，仅可使用托管 MCP 服务器列表和组织配置的插件。",
  "Managed MCP servers": "托管 MCP 服务器",
  "User-added MCP (Python runtime)": "用户添加的 MCP（Python 运行时）",
  "Desktop extensions (Python runtime)": "桌面扩展（Python 运行时）",
  "Plugin folder": "插件文件夹",
  "Read-only to the app. Nothing here is written by Apply or Export.": "应用对此处只读。应用或导出不会写入这里。",

  "Essential telemetry": "必要遥测",
  "Block essential telemetry": "阻止必要遥测",
  "Blocks crash and error reports (stack traces, app state at failure, device/OS info) and performance timing data sent to Anthropic. Used to investigate bugs and monitor responsiveness.": "阻止发送给 Anthropic 的崩溃和错误报告（堆栈跟踪、失败时的应用状态、设备/系统信息）以及性能计时数据。这些数据用于排查问题和监控响应性。",
  "Nonessential telemetry": "非必要遥测",
  "Block nonessential telemetry": "阻止非必要遥测",
  "Blocks product-usage analytics sent to Anthropic — feature usage, navigation patterns, UI actions.": "阻止发送给 Anthropic 的产品使用分析，包括功能使用、导航模式和界面操作。",
  "Nonessential services": "非必要服务",
  "Block nonessential services": "阻止非必要服务",
  "Blocks connector favicons (fetched from a third-party favicon service — leaks MCP hostnames) and the artifact-preview sandbox iframe. Connectors fall back to letter icons; artifacts do not render.": "阻止连接器 favicon（从第三方 favicon 服务获取，可能泄露 MCP 主机名）和 artifact 预览沙盒 iframe。连接器会退回为字母图标；artifact 不会渲染。",
  "Auto-updates": "自动更新",
  "Block auto-updates": "阻止自动更新",
  "Blocks the app from checking for and downloading updates from Anthropic. The app will stay on its installed version until updated by other means.": "阻止应用检查并下载来自 Anthropic 的更新。应用会停留在当前安装版本，直到通过其他方式更新。",
  "Auto-update enforcement window": "自动更新强制窗口",
  "When set, forces a pending update to install after this many hours regardless of user activity. When unset, the app uses a 72-hour window but defers installation while the user is active.": "设置后，无论用户是否活跃，待处理更新都会在指定小时数后强制安装。未设置时，应用使用 72 小时窗口，但用户活跃时会推迟安装。",
  "OpenTelemetry collector endpoint": "OpenTelemetry 采集器端点",
  "Base URL of an OpenTelemetry collector. When set, Cowork sessions export logs and metrics (prompts, tool calls, token counts) to this endpoint via OTLP. The endpoint host is automatically added to the session network allowlist.": "OpenTelemetry 采集器的基础 URL。设置后，Cowork 会话会通过 OTLP 将日志和指标（提示词、工具调用、token 数）导出到此端点。该端点主机会自动加入会话网络允许列表。",
  "OpenTelemetry exporter protocol": "OpenTelemetry 导出协议",
  "OTLP wire protocol used to reach the collector. Defaults to http/protobuf when otlpEndpoint is set.": "连接采集器使用的 OTLP 传输协议。设置 otlpEndpoint 时默认使用 http/protobuf。",
  "OpenTelemetry exporter headers": "OpenTelemetry 导出请求头",
  "Headers sent with every OTLP request, as comma-separated key=value pairs (the standard OTEL_EXPORTER_OTLP_HEADERS format).": "每个 OTLP 请求发送的请求头，格式为逗号分隔的 key=value 对（标准 OTEL_EXPORTER_OTLP_HEADERS 格式）。",
  "OpenTelemetry resource attributes": "OpenTelemetry 资源属性",
  "Extra OTEL resource attributes as comma-separated key=value pairs (the standard OTEL_RESOURCE_ATTRIBUTES format). Appended to the app's built-in attributes; keys that collide with built-ins (e.g. service.name) are dropped. Scoped for bootstrap so per-user values can be returned at sign-in.": "额外 OTEL 资源属性，格式为逗号分隔的 key=value 对（标准 OTEL_RESOURCE_ATTRIBUTES 格式）。会附加到应用内置属性后；与内置属性冲突的 key（例如 service.name）会被丢弃。此项作用于 bootstrap，因此登录时可返回逐用户值。",
  "Headers": "请求头",
  "Credential helper script": "凭据辅助脚本",
  "Absolute path to an executable that prints the inference credential to stdout. When set, the static inferenceGatewayApiKey / inferenceFoundryApiKey is optional.": "可执行文件的绝对路径，该程序会将推理凭据输出到 stdout。设置后，静态 inferenceGatewayApiKey / inferenceFoundryApiKey 可选。",
  "Credential helper TTL": "凭据辅助缓存 TTL",
  "Helper cache TTL (sec)": "辅助缓存 TTL（秒）",
  "Helper output is cached for this many seconds. Default 3600. Re-runs at the next session start after expiry.": "辅助脚本输出会缓存这么多秒。默认 3600。过期后会在下次会话启动时重新运行。",
  "Headers helper script": "请求头辅助脚本",

  "Model list": "模型列表",
  "Model ID": "模型 ID",
  "Offer 1M-context variant": "提供 1M 上下文变体",
  "Max tokens per window": "每个窗口最大 token 数",
  "Token cap window": "Token 限额窗口",
  "Total input+output tokens permitted per window before further messages are refused. Unset = no cap.": "每个窗口允许的输入+输出 token 总数，超过后将拒绝更多消息。未设置 = 不限制。",
  "Tumbling window length for the token cap. Max 720 hours (30 days). The counter resets at the end of each window.": "token 限额的滚动窗口长度。最大 720 小时（30 天）。计数器会在每个窗口结束时重置。",
  "Organization UUID": "组织 UUID",
  "Required organization": "必需组织",
  "Restricts login to specific org UUID(s). Single UUID string or JSON array.": "将登录限制为指定组织 UUID。可填写单个 UUID 字符串或 JSON 数组。",
  "Stable identifier for this deployment, used to scope local storage and telemetry. Must be a UUID.": "此部署的稳定标识符，用于限定本地存储和遥测范围。必须是 UUID。",
  "Skip login-mode chooser": "跳过登录模式选择",
  "Skips the first-launch screen that asks the user to choose between Anthropic sign-in and the organization-managed provider. The app goes straight to the mode implied by this configuration (third-party when inferenceProvider is set), overriding any earlier user choice.": "跳过首次启动时要求用户在 Anthropic 登录和组织管理提供方之间选择的页面。应用会直接进入此配置隐含的模式（设置 inferenceProvider 时为第三方模式），并覆盖此前的用户选择。",

  "AWS region": "AWS 区域",
  "AWS region for the Bedrock runtime endpoint.": "Bedrock runtime 端点所在的 AWS 区域。",
  "AWS bearer token": "AWS bearer token",
  "Bedrock base URL": "Bedrock 基础 URL",
  "Override the Bedrock inference endpoint (e.g. a VPC interface endpoint or LLM gateway). Leave unset to use the public regional endpoint.": "覆盖 Bedrock 推理端点（例如 VPC interface endpoint 或 LLM 网关）。留空则使用公开区域端点。",
  "AWS profile name": "AWS profile 名称",
  "AWS named profile to use (from the AWS config/credentials files). Ignored when inferenceBedrockBearerToken is set.": "要使用的 AWS 命名 profile（来自 AWS config/credentials 文件）。设置 inferenceBedrockBearerToken 时会忽略此项。",
  "AWS config directory": "AWS 配置目录",
  "Absolute path to the directory containing AWS config and credentials files. Optional — defaults to the user's ~/.aws when inferenceBedrockBearerToken is not set. Copied into the sandbox at session start so the named profile can be resolved.": "包含 AWS config 和 credentials 文件的目录绝对路径。可选，未设置 inferenceBedrockBearerToken 时默认使用用户的 ~/.aws。会在会话启动时复制进沙盒，以便解析命名 profile。",
  "Bedrock service tier": "Bedrock 服务层级",
  "Bedrock service tier, sent as the X-Amzn-Bedrock-Service-Tier header. Leave unset for on-demand. Tier availability varies by model and region. Reserved capacity uses a provisioned throughput ARN as the model ID instead of this setting. Older bundled Claude Code CLI versions ignore this key.": "Bedrock 服务层级，会作为 X-Amzn-Bedrock-Service-Tier 请求头发送。留空表示按需。层级可用性因模型和区域而异。预留容量使用 provisioned throughput ARN 作为模型 ID，而不是此设置。较旧的内置 Claude Code CLI 会忽略此项。",
  "GCP project ID": "GCP 项目 ID",
  "GCP region": "GCP 区域",
  "GCP region for the Vertex AI endpoint.": "Vertex AI 端点所在的 GCP 区域。",
  "GCP credentials file path": "GCP 凭据文件路径",
  "Absolute path to a service-account JSON or ADC file. No tilde or environment-variable expansion.": "服务账号 JSON 或 ADC 文件的绝对路径。不支持 ~ 或环境变量展开。",
  "Vertex OAuth client ID": "Vertex OAuth 客户端 ID",
  "Client ID of a Desktop-app OAuth client created in your GCP project (APIs & Services → Credentials). When set together with the client secret, the app runs Sign in with Google and stores the resulting refresh token encrypted; `inferenceVertexCredentialsFile` is not needed.": "在你的 GCP 项目中创建的桌面应用 OAuth 客户端 ID（API 和服务 → 凭据）。与客户端密钥一起设置时，应用会运行 Google 登录并加密保存得到的 refresh token；此时不需要 `inferenceVertexCredentialsFile`。",
  "Vertex OAuth client secret": "Vertex OAuth 客户端密钥",
  "Client secret for the Desktop-app OAuth client. Not confidential for installed apps per Google's docs — PKCE protects the flow.": "桌面应用 OAuth 客户端密钥。根据 Google 文档，这对已安装应用并非机密，流程由 PKCE 保护。",
  "Vertex OAuth scopes": "Vertex OAuth 范围",
  "Space-separated OAuth scopes for the Google sign-in flow. Defaults to `openid email https://www.googleapis.com/auth/cloud-platform`. Narrow this if your Workspace's Context-Aware Access or reauth policy restricts `cloud-platform`.": "Google 登录流程使用的 OAuth scope，以空格分隔。默认为 `openid email https://www.googleapis.com/auth/cloud-platform`。如果你的 Workspace 上下文感知访问或重新认证策略限制 `cloud-platform`，可缩小此范围。",
  "Vertex AI base URL": "Vertex AI 基础 URL",
  "Override the Vertex inference endpoint (e.g. a Private Service Connect address). Leave unset to use the public regional endpoint.": "覆盖 Vertex 推理端点（例如 Private Service Connect 地址）。留空则使用公开区域端点。",
  "Azure AI Foundry resource name": "Azure AI Foundry 资源名称",
  "Azure AI Foundry resource name used to construct the endpoint URL.": "用于构造端点 URL 的 Azure AI Foundry 资源名称。",
  "Azure AI Foundry API key": "Azure AI Foundry API 密钥",

  "Firewall allowlist": "防火墙允许列表",
  "Hosts your network firewall must allow, derived from your current settings. This list is read-only and updates as you make changes. Traffic is HTTPS on port 443 unless a custom port is specified (OTLP, gateway, or MCP server URLs).": "根据当前设置推导出的网络防火墙必须允许的主机。此列表只读，并会随你的更改自动更新。除非配置了自定义端口（OTLP、网关或 MCP 服务器 URL），流量均为 443 端口 HTTPS。",
  "Copy hostnames": "复制主机名",
  "Download .txt": "下载 .txt",
  "Test connectivity": "测试连通性",
  "Connectivity test failed.": "连通性测试失败。",
  "{reachable} of {total} reachable": "{total} 个中有 {reachable} 个可达",
  "Reachable": "可达",
  "Unreachable": "不可达",
  "VM tool egress is unrestricted — tools may reach any host your firewall allows. Common hosts (not exhaustive):": "VM 工具出站访问不受限制，工具可访问防火墙允许的任何主机。常见主机（非完整列表）：",
  "Copy to clipboard (redacted)": "复制到剪贴板（已脱敏）",
  "Copied": "已复制",
  "Reveal in Finder": "在 Finder 中显示",
  "Show in Explorer": "在资源管理器中显示",
  "Show in file manager": "在文件管理器中显示",
  "Choose from disk": "从磁盘选择",
  "Choose…": "选择...",
  "Type a path or pick from disk": "输入路径或从磁盘选择",
  "Add and press Enter": "添加后按 Enter",
  "+ Add": "+ 添加",
  "Remove value": "移除值",
  "Remove {label}": "移除 {label}",
  "Remove {value}": "移除 {value}",
  "Item {n}": "第 {n} 项",
  "Value does not match the required format.": "值不符合要求的格式。",
  "Must be valid JSON.": "必须是有效 JSON。",
  "Must be a JSON object.": "必须是 JSON 对象。",
  "Fix invalid value for {field}": "修正 {field} 的无效值",
  "Invalid: <b>{label}</b>": "无效：<b>{label}</b>",
  "Complete {count, plural, one {# required field} other {# required fields}} in Connection": "请在“连接”中补全 {count, plural, one {# 个必填字段} other {# 个必填字段}}",
  "<b>Connection</b> needs {count, plural, one {{label}} other {# fields}}": "<b>连接</b>还需要 {count, plural, one {{label}} other {# 个字段}}",
  "Search results": "搜索结果",
  "Matching “{query}” across all sections.": "在所有分区中匹配“{query}”。",
  "No matches.": "没有匹配项。",
  "Read in docs": "阅读文档",
  "Show details": "显示详情",
  "Hide details": "隐藏详情",
  "Close details": "关闭详情",
  "Source": "来源",
  "Transport": "传输",
  "OAuth": "OAuth",
  "Issuer URL": "Issuer URL",
  "Authorization URL": "授权 URL",
  "Token URL": "Token URL",
  "Client ID": "客户端 ID",
  "Redirect port": "重定向端口",
  "Scopes": "范围",
  "URL": "URL"
};

const appResourceTranslations = {
  "Claude Help": "Claude 帮助",
  "Troubleshooting": "故障排查",
  "Get Support": "获取支持",
  "Show Logs in Finder": "在 Finder 中显示日志",
  "Show Logs in Explorer": "在资源管理器中显示日志",
  "Show Logs in File Manager": "在文件管理器中显示日志",
  "Show Cowork Session Data in Finder": "在 Finder 中显示 Cowork 会话数据",
  "Show Cowork Session Data in Explorer": "在资源管理器中显示 Cowork 会话数据",
  "Show Cowork Session Data in File Manager": "在文件管理器中显示 Cowork 会话数据",
  "Copy Installation ID": "复制安装 ID",
  "Generate Diagnostic Report": "生成诊断报告",
  "Record Net Log (30s)": "记录网络日志（30 秒）",
  "Disable Hardware Acceleration": "禁用硬件加速",
  "Enable Cowork VM Debug Logging": "启用 Cowork VM 调试日志",
  "Enable Cowork SDK Debugging": "启用 Cowork SDK 调试",
  "Delete Cowork VM Bundle and Restart…": "删除 Cowork VM Bundle 并重新启动…",
  "Delete Cowork VM Sessions and Restart…": "删除 Cowork VM 会话并重新启动…",
  "Delete VM Sessions and Restart": "删除 VM 会话并重新启动",
  "Delete VM Bundle and Restart": "删除 VM Bundle 并重新启动",
  "Clear Cache and Restart": "清除缓存并重新启动",
  "Reset App Data…": "重置应用数据…",
  "Reset Application Data": "重置应用数据",
  "Configure Third-Party Inference…": "配置第三方推理…",
  "File": "文件",
  "Edit": "编辑",
  "View": "视图",
  "Developer": "开发者",
  "Window": "窗口",
  "Help": "帮助",
  "About Claude": "关于 Claude",
  "Settings…": "设置…",
  "Settings...": "设置...",
  "Check for Updates…": "检查更新…",
  "Last update attempt failed...": "上次更新尝试失败...",
  "Services": "服务",
  "Hide Claude": "隐藏 Claude",
  "Hide Others": "隐藏其他",
  "Show All": "全部显示",
  "Quit Claude": "退出 Claude",
  "Open Link in Browser": "在浏览器中打开链接",
  "Open File…": "打开文件…",
  "Open Documentation": "打开文档",
  "Reload MCP Configuration": "重新加载 MCP 配置",
  "Open App Config File...": "打开应用配置文件...",
  "Open Developer Config File...": "打开开发者配置文件...",
  "Extensions": "扩展",
  "Install Extension...": "安装扩展...",
  "Install Unpacked Extension...": "安装未打包扩展...",
  "Open Extensions Folder...": "打开扩展文件夹...",
  "Open Extension Settings Folder...": "打开扩展设置文件夹...",
  "Open MCP Log File": "打开 MCP 日志文件",
  "Open MCP Log File...": "打开 MCP 日志文件...",
  "Show Dev Tools": "显示开发者工具",
  "Show All Dev Tools": "显示全部开发者工具",
  "Inspect Element": "检查元素",
  "Reload This Page": "重新加载此页面",
  "Actual Size": "实际大小",
  "Zoom In": "放大",
  "Zoom Out": "缩小",
  "Select All": "全选",
  "Find": "查找",
  "Cut": "剪切",
  "Copy": "复制",
  "Paste": "粘贴",
  "Undo": "撤销",
  "Redo": "重做",
  "Close": "关闭",
  "Close Window": "关闭窗口",
  "Quit": "退出",
  "Exit": "退出",
  "Back": "后退",
  "Forward": "前进",
  "Refresh": "刷新",
  "Preview": "预览",
  "Open": "打开",
  "Create": "创建",
  "Save": "保存",
  "Cancel": "取消",
  "Restart Now": "立即重启",
  "Restart Required": "需要重启",
  "The application must be restarted for this change to take effect.": "必须重新启动应用，此更改才会生效。",
  "The application will now restart.": "应用现在将重新启动。"
};

const thirdPartyInferenceBundleKeys = [
  "Configure third-party inference",
  "Search settings",
  "Connection",
  "Sandbox & workspace",
  "Connectors & extensions",
  "Telemetry & updates",
  "Usage limits",
  "Plugins & skills",
  "Egress Requirements",
  "Choose where Claude Desktop sends inference requests.",
  "Inference provider",
  "Selects the inference backend. Setting this key activates third-party mode.",
  "{provider} credentials",
  "Gateway base URL",
  "Full URL of the inference gateway endpoint.",
  "Gateway API key",
  "Gateway auth scheme",
  "How to send the gateway credential. 'bearer' (default) sends Authorization: Bearer. Set 'x-api-key' only if your gateway requires the x-api-key header instead (e.g. api.anthropic.com). Set 'sso' to obtain the credential via the gateway's own browser-based sign-in (RFC 8414 discovery at `<inferenceGatewayBaseUrl>/.well-known/oauth-authorization-server` + RFC 8628 device-code grant); inferenceGatewayApiKey and inferenceCredentialHelper are not required.",
  "Gateway extra headers",
  "Extra HTTP headers sent on every inference request. JSON array of 'Name: Value' strings.",
  "Required",
  "Apply locally",
  "View as JSON",
  "Form view",
  "Export",
  "Configuration JSON",
  "Full config",
  "Partial — not a valid file on its own",
  "Plain JSON",
  "macOS configuration profile",
  "Windows registry file",
  "Firewall allowlist (.txt)",
  "This configuration contains sensitive values. They will be written to the exported file in plain text.",
  "Relaunch Claude?",
  "Configuration was written to disk. Claude needs to relaunch to use this provider.",
  "Relaunch now",
  "Later",
  "Restart now",
  "Restart to apply this configuration.",
  "Restart to fetch the config from this URL.",
  "Couldn't load configuration",
  "Couldn't update saved configurations",
  "Couldn't export the configuration profile.",
  "Couldn't copy to the clipboard.",
  "An unknown error occurred",
  "New configuration",
  "Rename configuration",
  "Duplicate configuration",
  "Configuration name",
  "Configurations",
  "Select configuration: {name}",
  "{name} copy",
  "Default",
  "Organization-managed",
  "Managed by your organization — read-only",
  "This configuration is managed by your organization. Contact your IT administrator to make changes.",
  "This configuration is fetched from a bootstrap URL at launch. Fields it provides are locked below.",
  "Set by bootstrap URL",
  "Set by bootstrap URL · <h>{host}</h>",
  "Set by MDM profile",
  "Settings covered by the URL are read-only below.",
  "Includes a value set by provider: {provider}",
  "What this URL is overriding",
  "Use bootstrap config",
  "Bootstrap config URL",
  "Bootstrap config server",
  "Bootstrap OIDC parameters",
  "Bootstrap sign-in (OIDC)",
  "Point this configuration at a bootstrap URL to have your organization manage these settings remotely.",
  "When unset or true, the app fetches `bootstrapUrl` at launch and applies the response as a config overlay. Set false to keep the URL saved but skip the fetch.",
  "Sign in to fetch this configuration.",
  "Sign-in required",
  "Sign-in failed:",
  "Signed in",
  "Fetching config from this URL.",
  "Syncing…",
  "Synced",
  "Last synced",
  "Last sync failed",
  "Not synced yet",
  "Not in use — toggle on to fetch and apply this URL.",
  "No cached response available. Claude is running with local values instead.",
  "Claude is using the cached response. Newer changes at the URL won't apply until a successful sync.",
  "The URL returned 200 but the body isn't a valid config document.",
  "Invalid response",
  "The endpoint returned an error.",
  "The endpoint rejected the request. Check cert trust, IP allowlist, or auth headers.",
  "Allowed workspace folders",
  "JSON array of absolute paths the user may attach as workspace folders. A leading ~ expands to the per-user home directory. Unset means unrestricted.",
  "Require full VM sandbox",
  "Forces the agent loop, file/web tools, and plugin-bundled MCPs to run inside the VM, disabling host-loop mode.",
  "Secure VM features",
  "Disabled built-in tools",
  "Allow Claude Code tab",
  "Show the Code tab (terminal-based coding sessions). Sessions run on the host, not inside the VM.",
  "Allow all",
  "Tool egress (VM sandbox)",
  "Allowed egress hosts",
  "Allow desktop extensions",
  "Permit users to install local desktop extensions (.dxt/.mcpb).",
  "Show extension directory",
  "Show the Anthropic extension directory in the connectors UI.",
  "Require signed extensions",
  "Reject desktop extensions that are not signed by a trusted publisher.",
  "Allow user-added MCP servers",
  "Permit users to add their own local (stdio) MCP servers via Developer settings. HTTP/SSE servers are managed separately. When false, only servers from the Managed MCP servers list and org-provisioned plugins are available.",
  "Managed MCP servers",
  "User-added MCP (Python runtime)",
  "Desktop extensions (Python runtime)",
  "Plugin folder",
  "Read-only to the app. Nothing here is written by Apply or Export.",
  "Essential telemetry",
  "Block essential telemetry",
  "Blocks crash and error reports (stack traces, app state at failure, device/OS info) and performance timing data sent to Anthropic. Used to investigate bugs and monitor responsiveness.",
  "Nonessential telemetry",
  "Block nonessential telemetry",
  "Blocks product-usage analytics sent to Anthropic — feature usage, navigation patterns, UI actions.",
  "Nonessential services",
  "Block nonessential services",
  "Blocks connector favicons (fetched from a third-party favicon service — leaks MCP hostnames) and the artifact-preview sandbox iframe. Connectors fall back to letter icons; artifacts do not render.",
  "Auto-updates",
  "Block auto-updates",
  "Blocks the app from checking for and downloading updates from Anthropic. The app will stay on its installed version until updated by other means.",
  "Auto-update enforcement window",
  "When set, forces a pending update to install after this many hours regardless of user activity. When unset, the app uses a 72-hour window but defers installation while the user is active.",
  "OpenTelemetry collector endpoint",
  "OpenTelemetry exporter protocol",
  "OpenTelemetry exporter headers",
  "OpenTelemetry resource attributes",
  "Headers",
  "Credential helper script",
  "Credential helper TTL",
  "Helper cache TTL (sec)",
  "Helper output is cached for this many seconds. Default 3600. Re-runs at the next session start after expiry.",
  "Headers helper script",
  "Model list",
  "Model ID",
  "Offer 1M-context variant",
  "Max tokens per window",
  "Token cap window",
  "Total input+output tokens permitted per window before further messages are refused. Unset = no cap.",
  "Tumbling window length for the token cap. Max 720 hours (30 days). The counter resets at the end of each window.",
  "Organization UUID",
  "Required organization",
  "Restricts login to specific org UUID(s). Single UUID string or JSON array.",
  "Stable identifier for this deployment, used to scope local storage and telemetry. Must be a UUID.",
  "Skip login-mode chooser",
  "AWS region",
  "AWS bearer token",
  "Bedrock base URL",
  "AWS profile name",
  "AWS config directory",
  "Bedrock service tier",
  "GCP project ID",
  "GCP region",
  "GCP credentials file path",
  "Vertex OAuth client ID",
  "Vertex OAuth client secret",
  "Vertex OAuth scopes",
  "Vertex AI base URL",
  "Azure AI Foundry resource name",
  "Azure AI Foundry API key",
  "Firewall allowlist",
  "Copy hostnames",
  "Download .txt",
  "Test connectivity",
  "Connectivity test failed.",
  "{reachable} of {total} reachable",
  "Reachable",
  "Unreachable",
  "VM tool egress is unrestricted — tools may reach any host your firewall allows. Common hosts (not exhaustive):",
  "Copy to clipboard (redacted)",
  "Copied",
  "Reveal in Finder",
  "Show in Explorer",
  "Show in file manager",
  "Choose from disk",
  "Choose…",
  "Type a path or pick from disk",
  "Add and press Enter",
  "+ Add",
  "Remove value",
  "Remove {label}",
  "Remove {value}",
  "Item {n}",
  "Value does not match the required format.",
  "Must be valid JSON.",
  "Must be a JSON object.",
  "Fix invalid value for {field}",
  "Invalid: <b>{label}</b>",
  "Complete {count, plural, one {# required field} other {# required fields}} in Connection",
  "<b>Connection</b> needs {count, plural, one {{label}} other {# fields}}",
  "Search results",
  "Matching “{query}” across all sections.",
  "No matches.",
  "Read in docs",
  "Show details",
  "Hide details",
  "Close details",
  "Source",
  "Transport",
  "OAuth",
  "Issuer URL",
  "Authorization URL",
  "Token URL",
  "Client ID",
  "Redirect port",
  "Scopes",
  "URL"
];

const thirdPartyInferenceBundleTranslations = Object.fromEntries(
  thirdPartyInferenceBundleKeys
    .filter((key) => typeof translations[key] === "string")
    .map((key) => [key, translations[key]])
);

function parseArgs(argv) {
  const options = {
    app: process.env.CLAUDE_APP_PATH ?? DEFAULT_APP_PATH,
    locale: process.env.CLAUDE_LOCALE ?? DEFAULT_LOCALE,
    dryRun: false,
    reportOnly: false,
    patchBundles: false,
    patchRouteBundles: true,
    maxReport: 80
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--report-only") options.reportOnly = true;
    else if (arg === "--no-bundle") {
      options.patchBundles = false;
      options.patchRouteBundles = false;
    }
    else if (arg === "--no-route-bundle") options.patchRouteBundles = false;
    else if (arg === "--app") options.app = takeValue(argv, ++i, arg);
    else if (arg === "--locale") options.locale = takeValue(argv, ++i, arg);
    else if (arg === "--max-report") options.maxReport = Number(takeValue(argv, ++i, arg));
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

function takeValue(argv, index, flag) {
  const value = argv[index];
  if (!value || value.startsWith("--")) throw new Error(`${flag} requires a value`);
  return value;
}

function printHelp() {
  console.log(`Claude Code desktop zh-CN patch

Usage:
  claude-code-desktop-zh-cn [options]

Options:
  --dry-run              Print planned changes without writing files
  --report-only          Only report untranslated English catalog entries
  --app <path>           Claude.app path, default: ${DEFAULT_APP_PATH}
  --locale <locale>      Locale to patch, default: ${DEFAULT_LOCALE}
  --no-route-bundle      Skip third-party inference route bundle patch
  --no-bundle            Skip all JS bundle patching
  --max-report <n>       Max untranslated catalog samples in report, default: 80
  -h, --help             Show this help
`);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, value, dryRun) {
  if (!dryRun) fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function backup(file, stamp, dryRun) {
  const target = `${file}.pre-zhcn-plus-${stamp}.bak`;
  if (!dryRun) fs.copyFileSync(file, target);
  return target;
}

function assertDir(dir, label) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    throw new Error(`${label} not found: ${dir}`);
  }
}

function isProbablyUiEnglish(value) {
  return typeof value === "string" && /[A-Za-z]/.test(value) && value.length <= 180;
}

function patchCatalog(enPath, localePath, stamp, dryRun) {
  if (!fs.existsSync(enPath)) return { skipped: true, reason: "missing en-US catalog", file: enPath };
  if (!fs.existsSync(localePath)) throw new Error(`Missing locale catalog: ${localePath}`);

  const en = readJson(enPath);
  const locale = readJson(localePath);
  let changed = 0;

  for (const [key, enValue] of Object.entries(en)) {
    const translated = translations[enValue];
    if (typeof translated === "string" && locale[key] !== translated) {
      locale[key] = translated;
      changed += 1;
    }
  }

  const stillEnglish = [];
  for (const [key, enValue] of Object.entries(en)) {
    if (isProbablyUiEnglish(enValue) && locale[key] === enValue) stillEnglish.push({ key, value: enValue });
  }

  const result = {
    file: localePath,
    changed,
    remainingEnglish: stillEnglish.length,
    samples: stillEnglish.slice(0, 80)
  };

  if (changed > 0) {
    result.backup = backup(localePath, stamp, dryRun);
    writeJson(localePath, locale, dryRun);
  }
  return result;
}

function patchJsonValues(file, map, stamp, dryRun) {
  if (!fs.existsSync(file)) throw new Error(`Missing JSON file: ${file}`);

  const source = readJson(file);
  let changed = 0;

  for (const [key, value] of Object.entries(source)) {
    const translated = map[value];
    if (typeof translated === "string" && translated !== value) {
      source[key] = translated;
      changed += 1;
    }
  }

  const result = { file, changed };
  if (changed > 0) {
    result.backup = backup(file, stamp, dryRun);
    writeJson(file, source, dryRun);
  }
  return result;
}

function replaceAll(source, from, to) {
  return source.split(from).join(to);
}

function patchBundleFile(file, stamp, dryRun) {
  const original = fs.readFileSync(file, "utf8");
  let next = original;
  let replacements = 0;

  for (const [from, to] of Object.entries(translations)) {
    const encodedFrom = JSON.stringify(from);
    const encodedTo = JSON.stringify(to);
    if (next.includes(encodedFrom)) {
      const before = next;
      next = replaceAll(next, encodedFrom, encodedTo);
      if (next !== before) replacements += 1;
    }
  }

  if (next === original) return null;
  const result = {
    file,
    replacements,
    bytesBefore: Buffer.byteLength(original),
    bytesAfter: Buffer.byteLength(next),
    backup: backup(file, stamp, dryRun)
  };
  if (!dryRun) fs.writeFileSync(file, next);
  return result;
}

function patchBundles(assetsDir, stamp, dryRun) {
  return fs
    .readdirSync(assetsDir)
    .filter((name) => name.endsWith(".js"))
    .map((name) => patchBundleFile(path.join(assetsDir, name), stamp, dryRun))
    .filter(Boolean);
}

function patchThirdPartyInferenceBundles(assetsDir, stamp, dryRun) {
  return fs
    .readdirSync(assetsDir)
    .filter((name) => name.endsWith(".js"))
    .map((name) => path.join(assetsDir, name))
    .filter((file) => fs.readFileSync(file, "utf8").includes("Configure third-party inference"))
    .map((file) => patchBundleFileWithMap(file, thirdPartyInferenceBundleTranslations, stamp, dryRun))
    .filter(Boolean);
}

function patchBundleFileWithMap(file, map, stamp, dryRun) {
  const original = fs.readFileSync(file, "utf8");
  let next = original;
  let replacements = 0;

  for (const [from, to] of Object.entries(map)) {
    const encodedFrom = JSON.stringify(from);
    const encodedTo = JSON.stringify(to);
    if (next.includes(encodedFrom)) {
      const before = next;
      next = replaceAll(next, encodedFrom, encodedTo);
      if (next !== before) replacements += 1;
    }
  }

  if (next === original) return null;
  const result = {
    file,
    replacements,
    bytesBefore: Buffer.byteLength(original),
    bytesAfter: Buffer.byteLength(next),
    backup: backup(file, stamp, dryRun)
  };
  if (!dryRun) fs.writeFileSync(file, next);
  return result;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const resourcesDir = path.join(options.app, "Contents", "Resources");
  const ionRoot = path.join(resourcesDir, "ion-dist");
  const i18nDir = path.join(ionRoot, "i18n");
  const assetsDir = path.join(ionRoot, "assets", "v1");
  const stamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);

  assertDir(resourcesDir, "Claude resources directory");
  assertDir(ionRoot, "Claude ion-dist directory");
  assertDir(i18nDir, "Claude i18n directory");
  if ((options.patchBundles || options.patchRouteBundles) && !options.reportOnly) assertDir(assetsDir, "Claude JS assets directory");

  const catalog = patchCatalog(
    path.join(i18nDir, "en-US.json"),
    path.join(i18nDir, `${options.locale}.json`),
    stamp,
    options.dryRun || options.reportOnly
  );
  const statsigCatalog = patchCatalog(
    path.join(i18nDir, "statsig", "en-US.json"),
    path.join(i18nDir, "statsig", `${options.locale}.json`),
    stamp,
    options.dryRun || options.reportOnly
  );
  const appResources = options.reportOnly
    ? { skipped: true, reason: "report-only", file: path.join(resourcesDir, "en-US.json") }
    : patchJsonValues(path.join(resourcesDir, "en-US.json"), appResourceTranslations, stamp, options.dryRun);

  const result = {
    dryRun: options.dryRun,
    reportOnly: options.reportOnly,
    app: options.app,
    locale: options.locale,
    dictionaryEntries: Object.keys(translations).length,
    appResources,
    catalog: trimSamples(catalog, options.maxReport),
    statsigCatalog: trimSamples(statsigCatalog, options.maxReport),
    bundles: options.reportOnly
      ? []
      : [
          ...(options.patchRouteBundles ? patchThirdPartyInferenceBundles(assetsDir, stamp, options.dryRun) : []),
          ...(options.patchBundles ? patchBundles(assetsDir, stamp, options.dryRun) : [])
        ]
  };

  console.log(JSON.stringify(result, null, 2));
}

function trimSamples(result, maxReport) {
  if (!result || !Array.isArray(result.samples)) return result;
  return { ...result, samples: result.samples.slice(0, Number.isFinite(maxReport) ? maxReport : 80) };
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
