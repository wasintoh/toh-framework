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

// ASCII Art Banner
const banner = `
${chalk.cyan('╔════════════════════════════════════════════════════════════╗')}
${chalk.cyan('║')}  ${chalk.bold.white('🎯 Toh Framework')} ${chalk.gray(`v${packageJson.version}`)}                              ${chalk.cyan('║')}
${chalk.cyan('║')}  ${chalk.yellow('AI-Orchestration Driven Development')}                       ${chalk.cyan('║')}
${chalk.cyan('║')}  ${chalk.green('"Type Once, Have it all."')}                                    ${chalk.cyan('║')}
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
  .option('-i, --ide <ides>', 'IDEs to configure (claude,cursor,gemini,codex)', 'claude,cursor,gemini')
  .option('-q, --quick', 'Quick install without prompts')
  .action(async (options) => {
    const { install } = await import('../installer/install.js');
    await install(options);
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
