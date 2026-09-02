#!/usr/bin/env node

/**
 * Toh Framework CLI
 * AI-Orchestration Driven Development
 * 
 * Usage:
 *   npx toh-framework install
 *   npx toh-framework list
 *   npx toh-framework status
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json for version
const packagePath = join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));

const program = new Command();

// ASCII Art Banner - Box width: 62 (║ + 60 content + ║)
const versionStr = `v${packageJson.version}`;
const line1Padding = ' '.repeat(Math.max(0, 44 - versionStr.length));
const banner = `
${chalk.cyan('╔════════════════════════════════════════════════════════════╗')}
${chalk.cyan('║')}  ${chalk.bold.white('Toh Framework')} ${chalk.gray(versionStr)}${line1Padding}${chalk.cyan('║')}
${chalk.cyan('║')}  ${chalk.yellow('AI-Orchestration Driven Development')}                       ${chalk.cyan('║')}
${chalk.cyan('║')}  ${chalk.green('"Type Once, Have it all."')}                                 ${chalk.cyan('║')}
${chalk.cyan('╚════════════════════════════════════════════════════════════╝')}
`;

program
  .name('toh-framework')
  .description('AI-Orchestration Driven Development Framework')
  .version(packageJson.version)
  .hook('preAction', () => {
    console.log(banner);
  });

// Install command
program
  .command('install')
  .description('Install Toh Framework to your project')
  .option('-t, --target <path>', 'Target directory', process.cwd())
  .option('-i, --ide <ides>', 'IDEs to configure (claude,cursor,antigravity,codex,zcode)', 'claude')
  .option('-q, --quick', 'Quick install without prompts')
  .option('--legacy-gemini', 'Also configure legacy Gemini CLI (.gemini/) — Enterprise/GCP users only; consumer Gemini CLI was shut down 2026-06-18')
  .option('--legacy-cursorrules', 'Also write the legacy root .cursorrules file (very old Cursor versions)')
  .action(async (options) => {
    const { install } = await import('../installer/install.js');
    try {
      await install(options);
    } catch (error) {
      // Hard-budget aborts already printed their explanation (error.reported).
      if (!error.reported) console.error(chalk.red(`\n✖ Installation failed: ${error.message}\n`));
      process.exit(1);
    }
  });

// Uninstall command — the counterpart to install.
// Safe by default: shows a plain-language preview and asks once before
// deleting anything, keeps .toh/plan.md, .toh/progress.md and the memory
// folders (your work) unless you explicitly pass --all.
program
  .command('uninstall')
  .description('Remove Toh Framework from your project (shows a preview and asks first)')
  .option('-t, --target <path>', 'Target directory', process.cwd())
  .option('--dry-run', 'Only show what would be removed, change nothing')
  .option('-y, --yes', 'Skip the confirmation question (for scripts)')
  .option('--all', 'ALSO delete your own plan, work log and project notes (a backup copy is saved first)')
  .option('--verbose', 'List every file in the preview instead of a per-tool summary')
  .option('-i, --ide <ides>', 'Remove one IDE surface only (currently: codex = the native .codex/agents/ files). Omit for the full uninstall')
  .option('--no-backup', 'With --ide: skip the backup copy of removed files')
  .action(async (options) => {
    const { uninstall } = await import('../installer/uninstall.js');
    const code = await uninstall(options);
    if (code) process.exitCode = code;
  });

// List command
program
  .command('list')
  .description('List all available commands and agents')
  .action(async () => {
    const { list } = await import('../installer/list.js');
    await list();
  });

// Status command
program
  .command('status')
  .description('Check installation status')
  .action(async () => {
    const { status } = await import('../installer/status.js');
    await status();
  });

// Bundle command
program
  .command('bundle')
  .description('Generate web bundles for ChatGPT/Claude web')
  .option('-o, --output <path>', 'Output directory', './dist/web-bundles')
  .action(async (options) => {
    const { bundle } = await import('../installer/bundle.js');
    await bundle(options);
  });

// Parse arguments
program.parse();
