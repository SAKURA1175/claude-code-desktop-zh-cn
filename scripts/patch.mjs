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
  "Your organization hasn't provided plugins. Contact your organization administrator to add them.": "你的组织尚未提供插件。请联系组织管理员添加。"
};

function parseArgs(argv) {
  const options = {
    app: process.env.CLAUDE_APP_PATH ?? DEFAULT_APP_PATH,
    locale: process.env.CLAUDE_LOCALE ?? DEFAULT_LOCALE,
    dryRun: false,
    reportOnly: false,
    patchBundles: false,
    maxReport: 80
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg === "--dry-run") options.dryRun = true;
    else if (arg === "--report-only") options.reportOnly = true;
    else if (arg === "--no-bundle") options.patchBundles = false;
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
  --no-bundle            Compatibility flag; JS bundles are skipped by default
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
  if (options.patchBundles && !options.reportOnly) assertDir(assetsDir, "Claude JS assets directory");

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

  const result = {
    dryRun: options.dryRun,
    reportOnly: options.reportOnly,
    app: options.app,
    locale: options.locale,
    dictionaryEntries: Object.keys(translations).length,
    catalog: trimSamples(catalog, options.maxReport),
    statsigCatalog: trimSamples(statsigCatalog, options.maxReport),
    bundles: options.reportOnly || !options.patchBundles ? [] : patchBundles(assetsDir, stamp, options.dryRun)
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
