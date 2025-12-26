# 🎯 Toh Framework

> **"Type Once, Have it all!"** - AI-Orchestration Driven Development

[![npm version](https://img.shields.io/npm/v/toh-framework.svg?style=flat-square)](https://www.npmjs.com/package/toh-framework)
[![npm downloads](https://img.shields.io/npm/dt/toh-framework.svg?style=flat-square)](https://www.npmjs.com/package/toh-framework)
[![License](https://img.shields.io/npm/l/toh-framework.svg?style=flat-square)](https://github.com/wasintoh/toh-framework/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/wasintoh/toh-framework?style=flat-square)](https://github.com/wasintoh/toh-framework)

🌐 **Official Website:** [tohframework.dev](https://tohframework.dev)

> 📖 **[🇹🇭 Thai Documentation](docs/README-TH.md)**

## 🤖 Supported IDEs

| IDE | Status | Notes |
|-----|--------|-------|
| 🧠 **Claude Code** | ✅ Full Support | Native Sub-Agents, Slash commands |
| 📝 **Cursor** | ✅ Full Support | @ file references |
| 🌌 **Google Antigravity** | ✅ Full Support | Gemini integration |
| 💎 **Gemini CLI** | ✅ Full Support | Context files auto-loaded |
| 🤖 **Codex CLI** | ✅ Supported | OpenAI agents |

## 💡 Why Toh?

**Toh** = **T**ype **O**nce, **H**ave it all!

We believe **Solo Developers** and **Solopreneurs** should be able to build SaaS systems single-handedly without being an expert in every field.

Toh Framework enables you to:
- 💬 **Command in natural language** - No complex prompts needed
- 🤖 **AI handles everything** - Breaks down tasks, calls agents, executes until done
- 👀 **See results instantly** - No waiting, no answering questions
- 🚀 **Production-ready** - Not just a prototype

## 🆕 What's New in v1.7.0

### 🏗️ Code Architecture Tracking

AI now remembers your project structure instantly:

| Memory File | Purpose |
|-------------|---------|
| `architecture.md` | Project structure, routes, data flow |
| `components.md` | Component registry with props |

**Benefits:**
- No more scanning codebase every session
- AI knows where everything is
- 5 memory files (was 3), ~3,000 tokens

### 🔐 Security Engineer System

New security-first approach for AI-generated code:

```bash
# Full security audit
/toh-protect

# Quick checks built into /toh-dev and /toh-test
/toh-dev add payment form  # → Security check before & after
/toh-test                  # → Security check before testing
```

**Security Checks:**
- Level 1 (Quick): Secrets, dangerous code, auth issues
- Level 2 (Full): Injection, auth flaws, AI risks, config

### 🤖 7 Sub-Agents

| Agent | Specialty |
|-------|-----------|
| 🎨 **ui-builder** | Pages, Components, Layouts |
| ⚙️ **dev-builder** | Logic, State, API |
| 🔌 **backend-connector** | Supabase, Auth, RLS |
| ✨ **design-reviewer** | Polish, Animation |
| 🧪 **test-runner** | Auto test & fix |
| 🧠 **plan-orchestrator** | Analyze, Plan |
| 📱 **platform-adapter** | LINE, Mobile, Desktop |

### 🔄 Multi-Agent Orchestration

**`/toh` v4.0** - The Smart Command with full visibility:

```bash
/toh create a coffee shop management system

# AI shows you the plan:
📋 Workflow Plan:
├── 1. plan-orchestrator → Analyze requirements
├── 2. ui-builder → Create all pages + components
├── 3. dev-builder → Add state + forms + API
├── 4. design-reviewer → Polish to professional
├── 5. test-runner → Test until pass
└── 6. security-check → Audit before deploy [NEW]

🚀 Executing...
```

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **`/toh` Smart Command** | Type anything, AI picks the right agent |
| **Sub-Agents** | 7 specialized agents for different tasks |
| **Multi-Agent Orchestration** | Complex workflows with full visibility |
| **Premium Experience** | 5+ pages with animations in one prompt |
| **Design Mastery** | 13 business profiles for smart design |
| **Auto Memory** | Context persists across sessions and IDEs |
| **Auto Testing** | Test & fix loop until all pass |

---

## 📦 Installation

```bash
# Interactive install (choose IDEs and language)
npx toh-framework install

# Quick install (Claude Code + Cursor, English)
npx toh-framework install --quick

# Specific IDE only
npx toh-framework install --ide claude
npx toh-framework install --ide cursor
npx toh-framework install --ide gemini
npx toh-framework install --ide codex

# Multiple IDEs
npx toh-framework install --ide "claude,cursor,gemini,codex"
```

## 🔄 Update to Latest Version

```bash
# Method 1: Use npx (recommended - always gets latest)
npx toh-framework@latest install

# Method 2: If installed globally
npm update -g toh-framework
toh install
```

> 💡 **Tip:** Reinstalling updates skills, agents, and commands without deleting your existing memory!

---

## 🚀 Quick Start

### Claude Code

```bash
# Open project with Claude Code
claude .

# Show all commands
/toh-help

# Smart command - AI picks the right agent
/toh create a landing page with pricing section

# Create complete project
/toh-vibe coffee shop management system

# Add UI
/toh-ui Add a dashboard with sales charts

# Add Logic
/toh-dev Add form validation and API calls

# Improve Design
/toh-design Make it look professional

# Test system
/toh-test

# Security audit
/toh-protect

# Deploy
/toh-ship
```

### Cursor

```bash
# Call Toh agent
@toh Create a meeting room booking system

# Or use specific command
@toh:ui Create a calendar page for room booking
```

### Gemini CLI / Antigravity

```bash
# Start Gemini CLI
gemini

# Use commands
/toh-vibe Inventory management system
```

---

## 📋 Available Commands

| Command | Shortcut | Description |
|---------|----------|-------------|
| `/toh` | - | 🧠 **Smart Command** - Type anything, AI picks agent |
| `/toh-plan` | `/toh-p` | 📋 **Plan** - Analyze, plan, orchestrate |
| `/toh-vibe` | `/toh-v` | 🎨 **Create Project** - Complete app in one command |
| `/toh-ui` | `/toh-u` | 🖼️ **Create UI** - Pages, Components, Layouts |
| `/toh-dev` | `/toh-d` | ⚙️ **Add Logic** - TypeScript, Zustand, Forms |
| `/toh-design` | `/toh-ds` | ✨ **Polish Design** - Professional, not AI-looking |
| `/toh-test` | `/toh-t` | 🧪 **Test** - Auto test & fix until pass |
| `/toh-protect` | `/toh-pt` | 🔐 **Security Audit** - Full security check `[NEW]` |
| `/toh-connect` | `/toh-c` | 🔌 **Connect Backend** - Supabase, Auth, RLS |
| `/toh-line` | `/toh-l` | 💚 **LINE Mini App** - LIFF integration |
| `/toh-mobile` | `/toh-m` | 📱 **Mobile App** - Expo / React Native |
| `/toh-fix` | `/toh-f` | 🔧 **Fix Bugs** - Systematic debugging |
| `/toh-ship` | `/toh-s` | 🚀 **Deploy** - Vercel, Production ready |
| `/toh-help` | `/toh-h` | ❓ **Help** - Show all commands |

---

## 🏗️ Tech Stack (Fixed)

No decisions needed - optimized stack ready to go:

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Backend | Supabase |
| Testing | Playwright |
| Language | TypeScript (strict) |

---

## 🧠 Philosophy (AODD)

**AI-Orchestration Driven Development:**

1. **Natural Language → Tasks** - Just describe what you want
2. **Orchestrator → Agents** - System calls the right specialists
3. **No Process Management** - You just receive results
4. **Test → Fix → Loop** - Auto-fix until everything passes

```
User: "Create a coffee shop management system"

Orchestrator:
├── 📐 plan-orchestrator → Analyze & plan
├── 🎨 ui-builder → Create all UI
├── ⚙️ dev-builder → Add logic
├── ✨ design-reviewer → Polish design
├── 🧪 test-runner → Test & fix
├── 🔐 security-check → Audit code [NEW]
└── ✅ Deliver working system!
```

---

## 📖 Examples

### Create E-commerce
```
/toh-vibe Online store with products, cart, and checkout
```

### Create Dashboard
```
/toh-vibe Analytics dashboard with charts and date filters
```

### Create SaaS
```
/toh-vibe Project management tool with teams and tasks
```

---

## 🎯 Target Users

- **Solo Developers** - Build SaaS single-handedly
- **Solopreneurs** - Create MVP to test market
- **Startup Founders** - Prototype for investors
- **Freelancers** - Deliver client work faster
- **Students** - Learn modern web development

---

## 📊 Framework Stats

- 🤖 **7 Sub-Agents** - Specialized for different tasks
- 🎯 **15 Commands** - From planning to deployment `[NEW: /toh-protect]`
- 📚 **24 Skills** - Comprehensive AI capabilities `[NEW: Security Engineer]`
- 🎨 **13 Design Profiles** - Business-appropriate design
- 📦 **15 Component Templates** - Ready-to-use premium components
- 🌐 **5 IDEs** - Claude Code, Cursor, Antigravity, Gemini, Codex

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.

## 👨‍💻 Author

**Wasin Treesinthuros** (Innovation Vantage)

- 🌐 Website: [tohframework.dev](https://tohframework.dev)
- GitHub: [@wasintoh](https://github.com/wasintoh)
- Email: dr.wasin@gmail.com

---

<p align="center">
  Made with ❤️ for Solo Developers everywhere.
</p>

<p align="center">
  <strong>"Type Once, Have it all!"</strong>
</p>
