---
name: toh-help
description: >
  Display all Toh Framework commands with descriptions
  and quick usage guide.
shortcuts:
  - /toh:help
  - /toh:h
  - /toh:?
---

# Toh Framework - Help

When user calls `/toh:help`, display the following:

<help_response>
## 🎯 Toh Framework v1.4.0

**"พิมพ์อะไรก็ได้ AI ทำให้เลย"** - AI-Orchestration Driven Development

---

### ✨ NEW! Smart Single Command (v1.4.0)

```
/toh [พิมพ์อะไรก็ได้]
```

**ไม่ต้องจำ commands** - AI วิเคราะห์ → เลือก Agent → ทำให้เลย!

**ตัวอย่าง:**
```
/toh scroll เกิน                      → Fix Agent
/toh ทำให้สวยขึ้น                      → Design Agent
/toh เพิ่มหน้า login                   → UI + Dev Agent
/toh เชื่อม Supabase                  → Connect Agent
/toh สร้าง chatbot ร้านกาแฟ           → Plan → Vibe Agent
```

---

### 🚀 Quick Commands (Power User)

| Command | Shortcut | Description |
|---------|----------|-------------|
| `/toh` | - | 🧠 **Smart Command** - พิมพ์อะไรก็ได้ AI เลือก Agent ให้ |
| `/toh:plan` | `/toh:p` | 📋 **Plan** - วางแผน project ใหญ่ |
| `/toh:vibe` | `/toh:v` | 🎨 **Create Project** - UI + Logic + Mock Data ครบในคำสั่งเดียว |
| `/toh:ui` | `/toh:u` | 🖼️ **Create UI** - Pages, Components, Layouts |
| `/toh:dev` | `/toh:d` | ⚙️ **Add Logic** - TypeScript, Zustand, Forms |
| `/toh:design` | `/toh:ds` | ✨ **Polish Design** - ทำให้สวย ไม่ดู AI-looking |
| `/toh:test` | `/toh:t` | 🧪 **Test** - Auto test & fix |
| `/toh:connect` | `/toh:c` | 🔌 **Connect Backend** - Supabase, Auth, RLS |
| `/toh:line` | `/toh:l` | 💚 **LINE Mini App** - LIFF integration |
| `/toh:mobile` | `/toh:m` | 📱 **Mobile App** - Expo / React Native |
| `/toh:fix` | `/toh:f` | 🔧 **Fix Bug** - Debug with 3-5-Rewrite Rule |
| `/toh:ship` | `/toh:s` | 🚀 **Deploy** - Vercel, Production ready |

---

### 💡 Usage Examples

**ง่ายที่สุด - ใช้ /toh:**
```
/toh สร้าง expense tracker
/toh เพิ่ม chart แสดงค่าใช้จ่าย
/toh bug - ปุ่มไม่ทำงาน
/toh เชื่อม database
```

**Power User - ใช้ specific commands:**
```
/toh:vibe coffee shop management system
/toh:plan อ่าน PRD แล้วสร้างตาม spec
/toh:design ปรับให้ professional กว่านี้
```

---

### 💾 Memory System

```
.toh/memory/
├── active.md      # Current task
├── summary.md     # Project summary
├── decisions.md   # Key decisions
├── debug-log.md   # Debug tracking (v1.3.0+)
└── archive/       # Historical data
```

---

### 📝 Response Excellence (v1.4.0)

ทุกคำตอบจาก Toh จะบอก:

1. **✅ สิ่งที่ทำให้** - ไฟล์ที่สร้าง/แก้ไข
2. **🎁 สิ่งที่คุณได้** - Features, URLs
3. **👉 สิ่งที่คุณต้องทำ** - ขั้นตอนถัดไป (ถ้ามี)

**ไม่ต้องถามซ้ำอีกต่อไป!**

---

### 🏗️ Tech Stack (Fixed)

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** Zustand
- **Forms:** React Hook Form + Zod
- **Backend:** Supabase
- **Language:** TypeScript

---

### 📚 Skills (23 skills)

| Category | Skills |
|----------|--------|
| **Core** | business-context, smart-suggestions, error-handling |
| **Dev** | progress-tracking, session-recovery, version-control |
| **Design** | design-mastery, design-excellence, preview-mode |
| **Debug** | debug-protocol |
| **AI** | prompt-optimizer |
| **Response** | response-format, response-excellence |
| **Premium** | premium-experience (NEW!) |
| **Integrations** | integrations |

---

### 📊 Framework Stats

- 🤖 **8 Agents** - UI, Dev, Design, Test, Fix, Connect, LINE, Mobile
- 🎯 **14 Commands** - Including new `/toh` smart command
- 📚 **23 Skills** - Comprehensive AI capabilities
- 🎨 **13 Design Profiles** - Business-appropriate design
- 📦 **15 Component Templates** - Ready-to-use premium components
- 🌐 **4 IDEs** - Claude, Cursor, Gemini, Codex

---

### 🆕 What's New in v1.4.0

- ✨ **Smart Single Command** `/toh` - พิมพ์อะไรก็ได้!
- 🎨 **Design Mastery** - ออกแบบ smart ตาม business type
- 🎯 **Prompt Optimizer** - สำหรับ AI SaaS projects
- 📝 **Response Excellence** - ตอบครบ ไม่ต้องถามซ้ำ
- 🐛 **Debug Protocol** - 3-5-Rewrite Rule

---

### 🌐 Supported IDEs

| IDE | Config Location |
|-----|-----------------|
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursor/rules/*.mdc` |
| Gemini CLI | `.gemini/GEMINI.md` |
| Codex CLI | `AGENTS.md` |

---

### 🔗 Links

- **Website:** [tohframework.dev](https://tohframework.dev)
- **npm:** `npm install -g toh-framework`
- **GitHub:** [github.com/wasintoh/toh-framework](https://github.com/wasintoh/toh-framework)

</help_response>
