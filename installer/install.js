/**
 * Toh Framework Installer
 * Main installation logic
 */

import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { setupClaudeCode } from './ide-handlers/claude-code.js';
import { setupCursor } from './ide-handlers/cursor.js';
import { setupGeminiCLI } from './ide-handlers/gemini-cli.js';
import { setupCodex } from './ide-handlers/codex.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SRC_DIR = join(__dirname, '..', 'src');

export async function install(options) {
  const { target, ide, quick, lang } = options;
  
  console.log(chalk.cyan('\n📦 Starting Toh Framework Installation...\n'));
  
  let config = {
    targetDir: target,
    ides: ide.split(',').map(i => i.trim()),
    language: lang || 'en',
    installSkills: true,
    installAgents: true,
    installCommands: true,
    installTemplates: true
  };

  // Interactive mode (if not quick)
  if (!quick) {
    config = await promptConfiguration(config);
  }

  // Validate target directory
  const spinner = ora('Validating target directory...').start();
  
  if (!fs.existsSync(config.targetDir)) {
    spinner.warn('Target directory does not exist');
    const { create } = await inquirer.prompt([{
      type: 'confirm',
      name: 'create',
      message: `Create directory ${config.targetDir}?`,
      default: true
    }]);
    
    if (create) {
      fs.mkdirSync(config.targetDir, { recursive: true });
      spinner.succeed('Directory created');
    } else {
      spinner.fail('Installation cancelled');
      return;
    }
  } else {
    spinner.succeed('Target directory validated');
  }

  // Check for existing installation
  const existingInstall = await checkExistingInstall(config.targetDir);
  if (existingInstall) {
    const { action } = await inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'Existing Toh Framework installation detected. What would you like to do?',
      choices: [
        { name: '🔄 Quick Update (preserve customizations)', value: 'update' },
        { name: '🗑️  Fresh Install (overwrite all)', value: 'fresh' },
        { name: '❌ Cancel', value: 'cancel' }
      ]
    }]);

    if (action === 'cancel') {
      console.log(chalk.yellow('\nInstallation cancelled.'));
      return;
    }
    
    if (action === 'fresh') {
      await cleanExistingInstall(config.targetDir);
    }
  }

  // Install components
  console.log(chalk.cyan('\n📁 Installing components...\n'));

  if (config.installSkills) {
    await installComponent('skills', config.targetDir);
  }
  
  if (config.installAgents) {
    await installComponent('agents', config.targetDir);
  }
  
  if (config.installCommands) {
    await installComponent('commands', config.targetDir);
  }
  
  if (config.installTemplates) {
    await installComponent('templates', config.targetDir);
  }

  // Install Memory System (v1.1.0)
  await installComponent('memory', config.targetDir);
  await setupMemoryFolder(config.targetDir);

  // Setup IDEs
  console.log(chalk.cyan('\n🛠️  Configuring IDEs...\n'));
  
  for (const ideName of config.ides) {
    switch (ideName.toLowerCase()) {
      case 'claude':
      case 'claude-code':
        await setupIDEWithSpinner('Claude Code', () => setupClaudeCode(config.targetDir, config.language));
        break;
      case 'cursor':
        await setupIDEWithSpinner('Cursor', () => setupCursor(config.targetDir, config.language));
        break;
      case 'gemini':
      case 'gemini-cli':
        await setupIDEWithSpinner('Gemini CLI', () => setupGeminiCLI(config.targetDir, SRC_DIR, config.language));
        break;
      case 'codex':
      case 'codex-cli':
        await setupIDEWithSpinner('Codex CLI', () => setupCodex(config.targetDir, SRC_DIR, config.language));
        break;
      default:
        console.log(chalk.yellow(`  ⚠️  Unknown IDE: ${ideName}`));
    }
  }

  // Generate manifest
  await generateManifest(config);

  // Success message
  console.log(chalk.green('\n✅ Toh Framework installed successfully!\n'));
  printNextSteps(config);
}

async function promptConfiguration(defaults) {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'language',
      message: '🌐 Select language / เลือกภาษา:',
      choices: [
        { name: '🇺🇸 English (Default)', value: 'en' },
        { name: '🇹🇭 ภาษาไทย', value: 'th' }
      ],
      default: 'en'
    },
    {
      type: 'input',
      name: 'targetDir',
      message: 'Target directory:',
      default: defaults.targetDir
    },
    {
      type: 'checkbox',
      name: 'ides',
      message: 'Which IDEs/CLI tools do you want to configure?',
      choices: [
        { name: '🤖 Claude Code (Anthropic)', value: 'claude', checked: true },
        { name: '📝 Cursor', value: 'cursor', checked: true },
        { name: '💎 Gemini CLI / Antigravity (Google)', value: 'gemini', checked: true },
        { name: '🧠 Codex CLI (OpenAI)', value: 'codex', checked: false }
      ],
      validate: (input) => input.length > 0 ? true : 'Please select at least one IDE'
    },
    {
      type: 'checkbox',
      name: 'components',
      message: 'What would you like to install?',
      choices: [
        { name: 'Skills (Core methodology)', value: 'skills', checked: true },
        { name: 'Agents (Sub-agents)', value: 'agents', checked: true },
        { name: 'Commands (/toh:* commands)', value: 'commands', checked: true },
        { name: 'Templates (Next.js starter)', value: 'templates', checked: true }
      ]
    }
  ]);

  return {
    ...defaults,
    ...answers,
    installSkills: answers.components.includes('skills'),
    installAgents: answers.components.includes('agents'),
    installCommands: answers.components.includes('commands'),
    installTemplates: answers.components.includes('templates')
  };
}

async function checkExistingInstall(targetDir) {
  const markers = [
    join(targetDir, '.toh'),
    join(targetDir, '.claude', 'skills', 'vibe-orchestrator'),
    join(targetDir, '.cursor', 'rules', 'toh-framework.mdc')
  ];
  
  return markers.some(marker => fs.existsSync(marker));
}

async function cleanExistingInstall(targetDir) {
  const spinner = ora('Cleaning existing installation...').start();
  
  const pathsToClean = [
    join(targetDir, '.toh'),
    join(targetDir, '.claude', 'skills'),
    join(targetDir, '.claude', 'agents'),
    join(targetDir, '.claude', 'commands')
  ];

  for (const p of pathsToClean) {
    if (fs.existsSync(p)) {
      await fs.remove(p);
    }
  }
  
  spinner.succeed('Cleaned existing installation');
}

async function setupIDEWithSpinner(ideName, setupFn) {
  const spinner = ora(`Configuring ${ideName}...`).start();
  try {
    await setupFn();
    const configFile = getIDEConfigFile(ideName);
    spinner.succeed(`${ideName} configured (${configFile})`);
  } catch (error) {
    spinner.fail(`Failed to configure ${ideName}: ${error.message}`);
  }
}

function getIDEConfigFile(ideName) {
  const configs = {
    'Claude Code': 'created CLAUDE.md',
    'Cursor': '.cursor/rules/*.mdc',
    'Gemini CLI': '.gemini/GEMINI.md',
    'Codex CLI': 'AGENTS.md'
  };
  return configs[ideName] || 'configured';
}

async function installComponent(componentName, targetDir) {
  const spinner = ora(`Installing ${componentName}...`).start();
  
  const srcPath = join(SRC_DIR, componentName);
  let destPath;
  
  // v1.4.0: All resources go to .toh/ (Central Resources)
  switch (componentName) {
    case 'skills':
      destPath = join(targetDir, '.toh', 'skills');
      break;
    case 'agents':
      destPath = join(targetDir, '.toh', 'agents');
      break;
    case 'commands':
      destPath = join(targetDir, '.toh', 'commands');
      break;
    case 'templates':
      destPath = join(targetDir, '.toh', 'templates');
      break;
    case 'memory':
      destPath = join(targetDir, '.toh', 'memory-docs');
      break;
    default:
      destPath = join(targetDir, '.toh', componentName);
  }

  try {
    await fs.ensureDir(destPath);
    await fs.copy(srcPath, destPath, { overwrite: true });
    
    const files = await countFiles(destPath);
    spinner.succeed(`Installed ${componentName} (${files} files)`);
  } catch (error) {
    spinner.fail(`Failed to install ${componentName}: ${error.message}`);
  }
}

async function countFiles(dir) {
  let count = 0;
  const items = await fs.readdir(dir, { withFileTypes: true });
  
  for (const item of items) {
    if (item.isDirectory()) {
      count += await countFiles(join(dir, item.name));
    } else {
      count++;
    }
  }
  
  return count;
}

async function generateManifest(config) {
  const spinner = ora('Generating manifest...').start();
  
  const manifest = {
    version: '1.4.0',
    installedAt: new Date().toISOString(),
    targetDir: config.targetDir,
    ides: config.ides,
    components: {
      skills: config.installSkills,
      agents: config.installAgents,
      commands: config.installCommands,
      templates: config.installTemplates,
      memory: true
    }
  };

  const manifestPath = join(config.targetDir, '.toh', 'manifest.json');
  await fs.ensureDir(join(config.targetDir, '.toh'));
  await fs.writeJson(manifestPath, manifest, { spaces: 2 });
  
  spinner.succeed('Manifest generated');
}

async function setupMemoryFolder(targetDir) {
  const spinner = ora('Setting up Memory System...').start();
  
  const memoryDir = join(targetDir, '.toh', 'memory');
  const archiveDir = join(memoryDir, 'archive');
  
  try {
    // Create memory directories
    await fs.ensureDir(memoryDir);
    await fs.ensureDir(archiveDir);
    
    // Create initial memory files (empty templates)
    const activeTemplate = `# 🔥 Active Task

## Current Work
[ยังไม่มีงาน - รอคำสั่งจาก User]

## Last Action
[ยังไม่มี]

## Next Steps
- รอคำสั่งจาก User

## Blockers
[ไม่มี]

---
Updated: ${new Date().toISOString()}
`;

    const summaryTemplate = `# 📋 Project Summary

## Project Info
- **Name:** [ยังไม่ได้ระบุ]
- **Type:** [ยังไม่ได้ระบุ]
- **Stack:** Next.js 14 + Tailwind + shadcn/ui + Zustand + Supabase
- **Language:** th

## Completed Features
[ยังไม่มี]

## In Progress
[ยังไม่มี]

## Project Structure
[จะอัพเดทเมื่อเริ่มโปรเจค]

---
Updated: ${new Date().toISOString()}
`;

    const decisionsTemplate = `# 🧠 Key Decisions

## Architecture Decisions
| Date | Decision | Reason |
|------|----------|--------|
| ${new Date().toISOString().split('T')[0]} | ใช้ Toh Framework v1.1.0 | AI-Orchestration Driven Development |

## Design Decisions
| Date | Decision | Reason |
|------|----------|--------|

## Technical Decisions
| Date | Decision | Reason |
|------|----------|--------|

---
Updated: ${new Date().toISOString()}
`;

    await fs.writeFile(join(memoryDir, 'active.md'), activeTemplate);
    await fs.writeFile(join(memoryDir, 'summary.md'), summaryTemplate);
    await fs.writeFile(join(memoryDir, 'decisions.md'), decisionsTemplate);
    
    spinner.succeed('Memory System ready (.toh/memory/)');
  } catch (error) {
    spinner.fail(`Failed to setup Memory System: ${error.message}`);
  }
}

function printNextSteps(config) {
  const isEN = config.language === 'en';
  
  console.log(chalk.cyan('┌────────────────────────────────────────────────────────────┐'));
  console.log(chalk.cyan('│') + chalk.bold.white('  🎉 Toh Framework v1.5.2 Installed!                       ') + chalk.cyan('│'));
  console.log(chalk.cyan('├────────────────────────────────────────────────────────────┤'));
  
  if (config.ides.includes('claude') || config.ides.includes('claude-code')) {
    console.log(chalk.cyan('│') + chalk.white('  Claude Code:                                             ') + chalk.cyan('│'));
    if (isEN) {
      console.log(chalk.cyan('│') + chalk.green('    /toh:plan') + chalk.gray(' - 🧠 Plan and orchestrate tasks        ') + chalk.cyan('│'));
      console.log(chalk.cyan('│') + chalk.green('    /toh:vibe') + chalk.gray(' - 🎨 Create new project                ') + chalk.cyan('│'));
      console.log(chalk.cyan('│') + chalk.green('    /toh:help') + chalk.gray(' - 📚 Show all commands                 ') + chalk.cyan('│'));
    } else {
      console.log(chalk.cyan('│') + chalk.green('    /toh:plan') + chalk.gray(' - 🧠 วางแผนและ orchestrate งาน       ') + chalk.cyan('│'));
      console.log(chalk.cyan('│') + chalk.green('    /toh:vibe') + chalk.gray(' - 🎨 เริ่มสร้างโปรเจคใหม่             ') + chalk.cyan('│'));
      console.log(chalk.cyan('│') + chalk.green('    /toh:help') + chalk.gray(' - 📚 ดูรายการ commands ทั้งหมด       ') + chalk.cyan('│'));
    }
    console.log(chalk.cyan('│') + chalk.white('                                                           ') + chalk.cyan('│'));
  }
  
  if (config.ides.includes('cursor')) {
    console.log(chalk.cyan('│') + chalk.white('  Cursor:                                                  ') + chalk.cyan('│'));
    if (isEN) {
      console.log(chalk.cyan('│') + chalk.green('    @toh') + chalk.gray('       - Call Toh agent                     ') + chalk.cyan('│'));
    } else {
      console.log(chalk.cyan('│') + chalk.green('    @toh') + chalk.gray('       - เรียก Toh agent                    ') + chalk.cyan('│'));
    }
    console.log(chalk.cyan('│') + chalk.white('                                                           ') + chalk.cyan('│'));
  }
  
  if (config.ides.includes('gemini') || config.ides.includes('gemini-cli')) {
    console.log(chalk.cyan('│') + chalk.white('  Gemini CLI / Google Antigravity:                         ') + chalk.cyan('│'));
    if (isEN) {
      console.log(chalk.cyan('│') + chalk.green('    gemini') + chalk.gray('     - Start Gemini CLI in project        ') + chalk.cyan('│'));
      console.log(chalk.cyan('│') + chalk.green('    /toh:vibe') + chalk.gray('  - Create new project                  ') + chalk.cyan('│'));
    } else {
      console.log(chalk.cyan('│') + chalk.green('    gemini') + chalk.gray('     - Start Gemini CLI in project        ') + chalk.cyan('│'));
      console.log(chalk.cyan('│') + chalk.green('    /toh:vibe') + chalk.gray('  - เริ่มสร้างโปรเจคใหม่                ') + chalk.cyan('│'));
    }
    console.log(chalk.cyan('│') + chalk.white('                                                           ') + chalk.cyan('│'));
  }
  
  if (config.ides.includes('codex') || config.ides.includes('codex-cli')) {
    console.log(chalk.cyan('│') + chalk.white('  Codex CLI:                                               ') + chalk.cyan('│'));
    if (isEN) {
      console.log(chalk.cyan('│') + chalk.green('    codex') + chalk.gray('      - Start Codex CLI in project         ') + chalk.cyan('│'));
      console.log(chalk.cyan('│') + chalk.green('    /toh:vibe') + chalk.gray('  - Create new project                  ') + chalk.cyan('│'));
    } else {
      console.log(chalk.cyan('│') + chalk.green('    codex') + chalk.gray('      - Start Codex CLI in project         ') + chalk.cyan('│'));
      console.log(chalk.cyan('│') + chalk.green('    /toh:vibe') + chalk.gray('  - เริ่มสร้างโปรเจคใหม่                ') + chalk.cyan('│'));
    }
    console.log(chalk.cyan('│') + chalk.white('                                                           ') + chalk.cyan('│'));
  }
  
  console.log(chalk.cyan('│') + chalk.white('  Documentation:                                           ') + chalk.cyan('│'));
  console.log(chalk.cyan('│') + chalk.blue('    https://github.com/wasintoh/toh-framework             ') + chalk.cyan('│'));
  console.log(chalk.cyan('├────────────────────────────────────────────────────────────┤'));
  console.log(chalk.cyan('│') + chalk.bold.yellow('  ✨ What\'s New:                                           ') + chalk.cyan('│'));
  if (isEN) {
    console.log(chalk.cyan('│') + chalk.white('  • 🌌 Google Antigravity - Full Support!                 ') + chalk.cyan('│'));
    console.log(chalk.cyan('│') + chalk.white('  • 🔒 Memory Protocol - Mandatory load/save              ') + chalk.cyan('│'));
    console.log(chalk.cyan('│') + chalk.white('  • 📋 Skills Checkpoint - AI reports loaded skills       ') + chalk.cyan('│'));
  } else {
    console.log(chalk.cyan('│') + chalk.white('  • 🌌 Google Antigravity - รองรับเต็มรูปแบบ!            ') + chalk.cyan('│'));
    console.log(chalk.cyan('│') + chalk.white('  • 🔒 Memory Protocol - บังคับ load/save ทุกครั้ง       ') + chalk.cyan('│'));
    console.log(chalk.cyan('│') + chalk.white('  • 📋 Skills Checkpoint - AI รายงาน skills ที่โหลด     ') + chalk.cyan('│'));
  }
  console.log(chalk.cyan('└────────────────────────────────────────────────────────────┘'));
  console.log('');
}
