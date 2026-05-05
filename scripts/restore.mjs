#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_APP_PATH = "/Applications/Claude.app";

function parseArgs(argv) {
  const options = { app: process.env.CLAUDE_APP_PATH ?? DEFAULT_APP_PATH, dryRun: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") options.help = true;
    else if (arg === "--app") options.app = takeValue(argv, ++i, arg);
    else if (arg === "--stamp") options.stamp = takeValue(argv, ++i, arg);
    else if (arg === "--dry-run") options.dryRun = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (options.help) return options;
  if (!options.stamp) throw new Error("--stamp is required");
  return options;
}

function takeValue(argv, index, flag) {
  const value = argv[index];
  if (!value || value.startsWith("--")) throw new Error(`${flag} requires a value`);
  return value;
}

function printHelp() {
  console.log(`Claude Code desktop zh-CN restore

Usage:
  claude-code-desktop-zh-cn-restore --stamp <YYYYMMDDHHMMSS> [options]

Options:
  --stamp <stamp>        Backup stamp from *.pre-zhcn-plus-<stamp>.bak
  --dry-run              Print planned restore files without writing
  --app <path>           Claude.app path, default: ${DEFAULT_APP_PATH}
  -h, --help             Show this help
`);
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.isFile()) files.push(full);
  }
  return files;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  const ionRoot = path.join(options.app, "Contents", "Resources", "ion-dist");
  if (!fs.existsSync(ionRoot)) throw new Error(`ion-dist not found: ${ionRoot}`);

  const suffix = `.pre-zhcn-plus-${options.stamp}.bak`;
  const backups = walk(ionRoot).filter((file) => file.endsWith(suffix)).sort();
  const restored = [];

  for (const backup of backups) {
    const original = backup.slice(0, -suffix.length);
    if (!options.dryRun) fs.copyFileSync(backup, original);
    restored.push({ file: original, backup });
  }

  console.log(JSON.stringify({ dryRun: options.dryRun, stamp: options.stamp, count: restored.length, restored }, null, 2));
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
