/**
 * List Command
 * Shows all available commands and agents
 */

import chalk from 'chalk';

export async function list() {
  console.log(chalk.cyan('\n📋 Toh Framework - Available Commands\n'));
  
  const commands = [
    { cmd: '/toh-help', short: '/toh-h', desc: 'แสดงรายการ commands ทั้งหมด', icon: '❓' },
    { cmd: '/toh-vibe', short: '/toh-v', desc: 'สร้างโปรเจคใหม่ UI + Logic + Mock Data', icon: '🎨' },
    { cmd: '/toh-ui', short: '/toh-u', desc: 'สร้าง UI - Pages, Components, Layouts', icon: '🖼️' },
    { cmd: '/toh-dev', short: '/toh-d', desc: 'เพิ่ม Logic - TypeScript, Zustand, Forms', icon: '⚙️' },
    { cmd: '/toh-design', short: '/toh-ds', desc: 'ปรับ Design - ทำให้สวย ไม่ดูเหมือน AI', icon: '✨' },
    { cmd: '/toh-test', short: '/toh-t', desc: 'ทดสอบระบบ - Auto test & fix จนผ่าน', icon: '🧪' },
    { cmd: '/toh-connect', short: '/toh-c', desc: 'เชื่อม Backend - Supabase, Auth, RLS', icon: '🔌' },
    { cmd: '/toh-line', short: '/toh-l', desc: 'LINE Mini App - LIFF integration', icon: '💚' },
    { cmd: '/toh-mobile', short: '/toh-m', desc: 'Mobile App - Expo / React Native', icon: '📱' },
    { cmd: '/toh-fix', short: '/toh-f', desc: 'แก้ Bug - Debug และ fix issues', icon: '🔧' },
    { cmd: '/toh-ship', short: '/toh-s', desc: 'Deploy - Vercel, Production ready', icon: '🚀' }
  ];

  console.log(chalk.white('  Commands:'));
  console.log(chalk.gray('  ─────────────────────────────────────────────────────────'));
  
  for (const c of commands) {
    console.log(
      `  ${c.icon} ${chalk.green(c.cmd.padEnd(14))} ${chalk.gray(c.short.padEnd(10))} ${chalk.white(c.desc)}`
    );
  }

  console.log(chalk.gray('\n  ─────────────────────────────────────────────────────────'));
  
  console.log(chalk.cyan('\n🤖 Available Agents:\n'));
  
  const agents = [
    { name: 'ui-builder', desc: 'สร้าง UI และ Components' },
    { name: 'dev-builder', desc: 'เพิ่ม Logic และ State Management' },
    { name: 'design-reviewer', desc: 'ปรับปรุง Design ให้เป็นมืออาชีพ' },
    { name: 'test-runner', desc: 'ทดสอบระบบและ auto-fix จนผ่าน' },
    { name: 'backend-connector', desc: 'เชื่อมต่อ Supabase' },
    { name: 'platform-adapter', desc: 'Adapt สำหรับ LINE, Mobile, Desktop' }
  ];

  for (const a of agents) {
    console.log(`  • ${chalk.yellow(a.name.padEnd(20))} ${chalk.white(a.desc)}`);
  }

  console.log(chalk.cyan('\n📚 Skills:\n'));
  
  const skills = [
    { name: 'vibe-orchestrator', desc: 'Core methodology และ workflow' },
    { name: 'ui-first-builder', desc: 'UI patterns และ component library' },
    { name: 'dev-engineer', desc: 'TypeScript, Zustand, Forms' },
    { name: 'design-excellence', desc: 'Design system และ anti-patterns' },
    { name: 'test-engineer', desc: 'Testing strategy และ Playwright' },
    { name: 'backend-engineer', desc: 'Supabase, RLS, Auth' },
    { name: 'platform-specialist', desc: 'LINE, Expo, Tauri' }
  ];

  for (const s of skills) {
    console.log(`  • ${chalk.magenta(s.name.padEnd(22))} ${chalk.white(s.desc)}`);
  }

  console.log('');
}
