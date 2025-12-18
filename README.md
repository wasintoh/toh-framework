# 🎯 Toh Framework

<!-- Logo - พี่โตใส่รูป logo ได้ที่นี่ -->
<!--
<p align="center">
  <img src="./assets/logo.png" alt="Toh Framework" width="200">
</p>
-->

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
| 🧠 **Claude Code** | ✅ Full Support | Slash commands, Memory system |
| 📝 **Cursor** | ✅ Full Support | @ file references |
| 🌌 **Google Antigravity** | ✅ **NEW!** Full Support | Latest Gemini integration |
| 💎 **Gemini CLI** | ✅ Full Support | Context files auto-loaded |
| 🤖 **Codex CLI** | ✅ Supported | OpenAI agents |

> 📖 **[🇹🇭 Thai Documentation](docs/README-TH.md)**

## 💡 Why Toh?

**Toh** = **T**ype **O**nce, **H**ave it all!

We believe **Solo Developers** and **Solopreneurs** should be able to build SaaS systems single-handedly without being an expert in every field.

Toh Framework enables you to:
- 💬 **Command in natural language** - No complex prompts needed
- 🤖 **AI handles everything** - Breaks down tasks, calls agents, executes until done
- 👀 **See results instantly** - No waiting, no answering questions
- 🚀 **Production-ready** - Not just a prototype

## ✨ Features

- **🧠 The Brain** - `/toh-plan` analyzes, plans, and orchestrates all agents
- **💾 Auto Memory** - Context persists across sessions, IDEs, and models
- **🚀 One Command Install** - Easy setup via `npx`
- **🎨 UI First** - See results immediately, no backend needed
- **🤖 No Questions** - AI makes decisions, doesn't ask basic questions
- **🌍 Multi-language** - Thai or English mock data and UI
- **🧪 Auto Testing** - Automatic testing with auto-fix loop
- **💼 Production Ready** - Not a prototype, ready for real use
- **🔧 Multi-IDE Support** - Claude Code, Cursor, Gemini CLI, Codex CLI

## 🆕 What's New in v1.5.0

### 🌌 Google Antigravity - Full Support!

Now fully supports Google's **Antigravity** (Gemini IDE)! Install once, use everywhere:

```bash
npx toh-framework install
# Select: Claude Code ✅, Cursor ✅, Gemini CLI / Antigravity ✅
```

### 🏗️ Dual Folder Architecture

| IDE | Folder | Why |
|-----|--------|-----|
| Claude Code | `.claude/` | Required for slash commands |
| Others | `.toh/` | Central resources |

Both contain identical skills, agents, and commands - fully synced on install!

### 🔒 Memory Protocol Enforcement

- ✅ Mandatory memory load/save on EVERY task
- ✅ Skills loading checkpoint - AI must report what it loaded
- ✅ English-only memory files for consistency
- ✅ Cross-IDE memory compatibility

### 📋 Skills Loading Checkpoint

AI now MUST report skills at the start of every response:
```markdown
📚 **Skills Loaded:**
- design-mastery ✅ (13 business profiles)
- premium-experience ✅ (5+ pages, animations)

🤖 **Agent:** vibe-agent

💾 **Memory:** Loaded ✅
```

---

## ✨ v1.4.0 Features (Still Available!)

| Feature | Description |
|---------|-------------|
| **`/toh` Smart Command** | Type anything, AI picks the right agent! |
| **Premium Experience** | 5+ pages with animations in one prompt |
| **Design Mastery** | 13 business profiles for smart design |
| **Prompt Optimizer** | For AI SaaS - create excellent system prompts |
| **Response Format** | 3-section responses - no follow-up questions needed |

### 🌟 Premium by Default

When creating new apps, you get:
- ✅ 5+ pages automatically (Home, Dashboard, Feature, Settings, Auth)
- ✅ Animations everywhere (Page transitions, hover effects, stagger)
- ✅ Loading states on every page
- ✅ Empty states designed
- ✅ Zero TypeScript errors guaranteed

### 🎨 Design Mastery (13 Business Profiles)

AI auto-detects your business type and applies appropriate design:
```
Food/Restaurant → Warm colors, appetizing feel
SaaS/Dashboard → Professional blue, clean
E-commerce → Trust emerald, conversion-focused
Gaming → Dark mode, neon accents
Healthcare → Calm teal, trustworthy
...and 8 more profiles
```

### 🧠 AI Intelligence Upgrade (v1.3.0)

| Feature | Description |
|---------|-------------|
| 🏢 **Business Context** | AI understands business types, auto-includes standard features |
| 💡 **Smart Suggestions** | AI suggests 2-3 next steps after every task |
| 🔧 **Auto-fix Silent** | Errors fixed automatically, user never sees them |
| 📊 **Progress Tracking** | Visual progress bars and checklists |
| 🔄 **Session Recovery** | Continue where you left off, even across IDEs |
| 👁️ **Preview Mode** | See changes before applying |
| ⏪ **Version Control** | Easy undo/rollback without knowing git |
| 🔌 **Integrations** | One-click setup for Stripe, PromptPay, Email, Analytics |

### Example: Business Context

```bash
/toh-vibe coffee shop

# AI understands this means:
# ✅ POS System
# ✅ Menu Management
# ✅ Order Management
# ✅ Inventory
# ✅ Sales Reports
# No need to specify each feature!
```

### Example: Smart Suggestions

```
✅ Dashboard created!

💡 Recommended next steps:
1. /toh-design - Polish the UI
2. /toh-dev - Add logic
3. /toh-connect - Connect database

Type a number or tell me what you want to do.
```

### 🧠 `/toh-plan` - The Brain
```bash
/toh-plan Add user authentication with social login
```
The AI will analyze your project, create a plan, show you what it will do, then execute using the right agents.

### 💾 Auto Memory System
Your AI remembers everything across sessions:
- Switch IDEs (Claude → Cursor) - context preserved
- Token limit reached - start new chat, context preserved
- Come back tomorrow - context preserved

Files stored in `.toh/memory/` - zero config, just works!

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

If you already have Toh installed and want to update:

```bash
# Method 1: Use npx (recommended - always gets latest)
npx toh-framework@latest install

# Method 2: If installed globally
npm update -g toh-framework
toh install

# Method 3: Just reinstall (overwrites safely)
npx toh-framework install
```

> 💡 **Tip:** Reinstalling updates skills, agents, and commands without deleting your existing memory!

## 🛠️ Supported IDEs & CLI Tools

| Tool | Company | Config Location | Status |
|------|---------|-----------------|--------|
| **Claude Code** | Anthropic | `.claude/` + `CLAUDE.md` | ✅ Full Support |
| **Cursor** | Cursor | `.cursor/rules/` | ✅ Full Support |
| **Gemini CLI** | Google | `.gemini/` | ✅ Full Support |
| **Codex CLI** | OpenAI | `AGENTS.md` | ✅ Full Support |

## 🚀 Quick Start

### Claude Code (Anthropic)

After installation, use commands immediately:

```bash
# Open project with Claude Code
claude .

# Show all commands
/toh-help

# Create new project (natural language!)
/toh-vibe I want a coffee shop management system with POS, inventory, and sales reports

# Add UI
/toh-ui Add a dashboard page showing daily sales

# Improve Design
/toh-design Make it look professional and polished

# Test system (Auto fix until pass!)
/toh-test Test all pages

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

### Gemini CLI (Google)

```bash
# Start Gemini CLI in project directory
gemini

# Or use specific model
gemini --model gemini-2.5-pro

# Use commands like Claude Code
/toh-help
/toh-vibe Inventory management system
```

### Codex CLI (OpenAI)

```bash
# Start Codex CLI in project directory
codex

# Toh Framework loads automatically from AGENTS.md
# Use commands directly
/toh-vibe Restaurant order management system
```

## 📋 Available Commands

| Command | Shortcut | Description |
|---------|----------|-------------|
| `/toh-help` | `/toh-h` | ❓ Show all available commands |
| `/toh-plan` | `/toh-p` | 🧠 **THE BRAIN** - Analyze, plan, orchestrate all agents |
| `/toh-vibe` | `/toh-v` | 🎨 Create new project with UI + Logic + Mock Data |
| `/toh-ui` | `/toh-u` | 🖼️ Build UI - Pages, Components, Layouts |
| `/toh-dev` | `/toh-d` | ⚙️ Add Logic - TypeScript, Zustand, Forms |
| `/toh-design` | `/toh-ds` | ✨ Improve Design - Make it beautiful, not AI-looking |
| `/toh-test` | `/toh-t` | 🧪 Test System - Auto test & fix until pass |
| `/toh-connect` | `/toh-c` | 🔌 Connect Backend - Supabase, Auth, RLS |
| `/toh-line` | `/toh-l` | 💚 LINE Mini App - LIFF integration |
| `/toh-mobile` | `/toh-m` | 📱 Mobile App - Expo / React Native |
| `/toh-fix` | `/toh-f` | 🔧 Fix Bugs - Debug and fix issues |
| `/toh-ship` | `/toh-s` | 🚀 Deploy - Vercel, Production ready |

## 🧠 Philosophy (AODD)

Toh Framework uses **AI-Orchestration Driven Development (AODD)** principles:

### 1. Natural Language → Tasks
Users command in natural language, system breaks it down into tasks automatically.

```
❌ "Create a Next.js project with Zustand store for products 
    with React Hook Form and Zod validation..."

✅ "I want an online store"
```

### 2. Orchestrator → Agents
System automatically calls relevant AI-Agents to work.

```
User: "Create a product management page"

Orchestrator thinks:
├── 📐 Call ui-builder to create UI
├── ⚙️ Call dev-builder to add logic
├── ✨ Call design-reviewer to polish
└── ✅ Deliver results
```

### 3. Users Don't Manage the Process
- No framework selection needed
- No questions to answer
- No need to know which agent does what
- Just receive results

### 4. Test → Fix → Loop
When tests find errors, system will:
1. 🧪 Run tests with Playwright
2. 🔍 Analyze errors
3. 🔧 Call `/toh-fix` to repair
4. 🔄 Retest until pass

## 🏗️ Tech Stack (Fixed)

Toh Framework uses a fixed tech stack - no decisions needed:

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Backend | Supabase |
| Testing | Playwright |
| Language | TypeScript (strict) |

## 🤖 Agents

| Agent | Description |
|-------|-------------|
| `ui-builder` | Creates UI and Components |
| `dev-builder` | Adds Logic and State Management |
| `design-reviewer` | Improves Design to professional level |
| `test-runner` | Tests system with auto-fix |
| `backend-connector` | Connects to Supabase |
| `platform-adapter` | Adapts for LINE, Mobile, Desktop |

## 📚 Skills

| Skill | Description |
|-------|-------------|
| `vibe-orchestrator` | Core methodology and workflow |
| `ui-first-builder` | UI patterns and component library |
| `dev-engineer` | TypeScript, Zustand, Forms |
| `design-excellence` | Design system and anti-patterns |
| `test-engineer` | Testing strategy and Playwright |
| `backend-engineer` | Supabase, RLS, Auth |
| `platform-specialist` | LINE, Expo, Tauri |

## 🔄 Workflow Example

```
User: "Create a coffee shop management system"

┌─────────────────────────────────────────────────────┐
│  🎯 Toh Orchestrator                                │
├─────────────────────────────────────────────────────┤
│  1. Analyze requirements                            │
│     → POS system, inventory, reports                │
│                                                     │
│  2. Call ui-builder                                 │
│     → Create all UI pages + Mock data               │
│                                                     │
│  3. Call dev-builder                                │
│     → Add state management + forms                  │
│                                                     │
│  4. Call design-reviewer                            │
│     → Polish UI to professional look                │
│                                                     │
│  5. Call test-runner                                │
│     → Test all pages, auto-fix until pass           │
│                                                     │
│  ✅ Deliver ready-to-use system!                    │
└─────────────────────────────────────────────────────┘
```

## 🌐 Web Bundles

For use with ChatGPT, Claude.ai, or Gemini:

```bash
npx toh-framework bundle
```

Generated files:
- `toh-full-bundle.txt` - All features
- `toh-ui-bundle.txt` - UI only
- `toh-dev-bundle.txt` - Logic only

Copy and paste into Custom Instructions or System Prompt.

## 🔧 CLI Commands

```bash
# Install framework
npx toh-framework install

# List available commands
npx toh-framework list

# Check installation status
npx toh-framework status

# Generate web bundles
npx toh-framework bundle
```

## 🆚 Comparison

| Feature | Traditional | Toh Framework |
|---------|-------------|---------------|
| Setup Time | 30+ min | 2 min |
| Questions Asked | 10+ | 0 |
| Time to First UI | Hours | Minutes |
| Mock Data | Lorem ipsum | Realistic data |
| Tech Stack Decision | Every time | Fixed, optimized |
| Auto Testing | Manual setup | Built-in |
| Error Fixing | Manual | Auto loop |

## 📖 Examples

### Create E-commerce System

```
/toh-vibe Online store with product pages, cart, and checkout
```

### Create Employee Management

```
/toh-vibe HR system with employee management, leave requests, approvals, reports
```

### Create Dashboard

```
/toh-vibe Dashboard showing sales, charts, tables with date filters
```

### Test and Fix

```
/toh-test Test all pages
# If errors → auto call /toh-fix → retest until pass
```

## 🎯 Target Users

- **Solo Developers** - Build SaaS single-handedly
- **Solopreneurs** - Create MVP to test market
- **Startup Founders** - Prototype for investors
- **Freelancers** - Deliver client work faster
- **Students** - Learn modern web development

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Wasin Treesinthuros** (Innovation Vantage)

- 🌐 Website: [tohframework.dev](https://tohframework.dev)
- GitHub: [@wasintoh](https://github.com/wasintoh)
- Email: dr.wasin@gmail.com

---

<p align="center">
  Made with ❤️ for you.
</p>

<p align="center">
  <strong>"Type Once, Have it all!"</strong>
</p>
