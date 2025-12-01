# 🎯 Toh Framework

> **"Type Once, Have it all!"** - AI-Orchestration Driven Development
>
> **"สั่งแล้วจบ ไม่ถาม ไม่รอ"**

[![npm version](https://badge.fury.io/js/toh-framework.svg)](https://www.npmjs.com/package/toh-framework)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 📖 **[🇬🇧 English Documentation](../README.md)**

## 💡 ทำไมต้อง Toh?

**Toh** = **T**ype **O**nce, **H**ave it all!

เราเชื่อว่า **Solo Developer** และ **Solopreneur** ควรสามารถสร้างระบบ SaaS ได้ด้วยตัวคนเดียว โดยไม่ต้องเป็น expert ทุกด้าน

Toh Framework ทำให้คุณ:
- 💬 **สั่งงานแบบภาษาคน** - ไม่ต้องเขียน prompt แบบซับซ้อน
- 🤖 **AI จัดการให้หมด** - แตก tasks, เรียก agents, ทำงานจนเสร็จ
- 👀 **เห็นผลลัพธ์ทันที** - ไม่ต้องรอ, ไม่ต้องตอบคำถาม
- 🚀 **พร้อมใช้งานจริง** - ไม่ใช่แค่ prototype

## ✨ คุณสมบัติหลัก

- **🧠 The Brain** - `/toh:plan` วิเคราะห์, วางแผน, สั่งการทุก agents
- **💾 Auto Memory** - จำ context ได้ข้าม sessions, IDEs, และ models
- **🚀 ติดตั้งง่าย** - แค่คำสั่งเดียวผ่าน `npx`
- **🎨 UI First** - เห็นผลลัพธ์ทันที ไม่ต้องรอ backend
- **🤖 ไม่ถามคำถาม** - AI ตัดสินใจให้เลย ไม่ถามคำถามพื้นฐาน
- **🇹🇭 ข้อมูลภาษาไทย** - Mock data ภาษาไทย ดูเหมือนข้อมูลจริง
- **🧪 ทดสอบอัตโนมัติ** - ทดสอบอัตโนมัติ แก้ไขจนผ่าน
- **💼 พร้อมใช้งานจริง** - ไม่ใช่ prototype แต่ใช้งานได้จริง
- **🔧 รองรับหลาย IDE** - Claude Code, Cursor, Gemini CLI, Codex CLI

## 🆕 มีอะไรใหม่ใน v1.2.0

### 🧠 Memory Enforcement
Memory system ตอนนี้ **บังคับใช้** - ไม่มีลืม context อีกต่อไป!
- ทุก commands อ่าน memory ก่อนเริ่มงาน
- ทุก commands บันทึก memory ก่อนจบงาน
- ต้อง confirm: "✅ บันทึก memory แล้วครับ"

### 📊 Selective Read Protocol (ประหยัด Token)
โหลด memory อย่างฉลาดเพื่อประหยัด tokens:
```
โหลดเสมอ (~2,000 tokens):
├── active.md     (~500 tokens)  - งานปัจจุบัน
├── summary.md    (~1,000 tokens) - ภาพรวมโปรเจค
└── decisions.md  (~500 tokens)  - decisions ที่ผ่านมา

❌ archive/ - โหลดเมื่อ user ถามถึง history เท่านั้น
```

### 🧠 `/toh:plan` - The Brain
```bash
/toh:plan อยากเพิ่มระบบ login แบบ social login
```
AI จะวิเคราะห์โปรเจค สร้างแผน แสดงให้เห็นว่าจะทำอะไรบ้าง แล้วค่อยลงมือทำโดยใช้ agents ที่เหมาะสม

### 💾 Auto Memory System
AI จำทุกอย่างข้าม sessions:
- เปลี่ยน IDE (Claude → Cursor) - context ยังอยู่
- Token เต็ม - เปิด chat ใหม่ได้ context ยังอยู่
- พรุ่งนี้มาทำต่อ - context ยังอยู่

ไฟล์เก็บที่ `.toh/memory/` - ไม่ต้อง config อะไร ใช้ได้เลย!

## 📦 การติดตั้ง

```bash
# ติดตั้งแบบ Interactive (เลือก IDEs และภาษาได้)
npx toh-framework install

# ติดตั้งแบบด่วน (Claude Code + Cursor, ภาษาอังกฤษ)
npx toh-framework install --quick

# ติดตั้งเฉพาะ IDE ที่ต้องการ
npx toh-framework install --ide claude
npx toh-framework install --ide cursor
npx toh-framework install --ide gemini
npx toh-framework install --ide codex

# ติดตั้งหลาย IDEs
npx toh-framework install --ide "claude,cursor,gemini,codex"
```

## 🛠️ IDEs และ CLI Tools ที่รองรับ

| Tool | บริษัท | ไฟล์ Config | สถานะ |
|------|--------|-------------|-------|
| **Claude Code** | Anthropic | `.claude/` + `CLAUDE.md` | ✅ รองรับเต็มที่ |
| **Cursor** | Cursor | `.cursor/rules/` | ✅ รองรับเต็มที่ |
| **Gemini CLI** | Google | `.gemini/` | ✅ รองรับเต็มที่ |
| **Codex CLI** | OpenAI | `AGENTS.md` | ✅ รองรับเต็มที่ |

## 🚀 เริ่มต้นใช้งาน

### Claude Code (Anthropic)

หลังติดตั้งแล้ว ใช้ commands ได้ทันที:

```bash
# เปิด project ด้วย Claude Code
claude .

# ดู commands ทั้งหมด
/toh:help

# สร้างโปรเจคใหม่ (สั่งแบบภาษาคนได้เลย!)
/toh:vibe อยากได้ระบบจัดการร้านกาแฟ มี POS สต็อก รายงานยอดขาย

# เพิ่ม UI
/toh:ui เพิ่มหน้า dashboard แสดงยอดขายรายวัน

# ปรับ Design ให้สวย
/toh:design ทำให้ดูเป็นมืออาชีพ สวยงาม

# ทดสอบระบบ (Auto fix จนผ่าน!)
/toh:test ทดสอบทุกหน้า

# Deploy
/toh:ship
```

### Cursor

```bash
# เรียก Toh agent
@toh สร้างระบบจองห้องประชุม

# หรือใช้ command เฉพาะ
@toh:ui สร้างหน้า calendar สำหรับจองห้อง
```

### Gemini CLI (Google)

```bash
# Start Gemini CLI ใน project directory
gemini

# หรือใช้ model ที่ต้องการ
gemini --model gemini-2.5-pro

# ใช้ commands เหมือน Claude Code
/toh:help
/toh:vibe ระบบจัดการสต็อกสินค้า
```

### Codex CLI (OpenAI)

```bash
# Start Codex CLI ใน project directory
codex

# Toh Framework จะ load อัตโนมัติจาก AGENTS.md
# ใช้ commands ได้เลย
/toh:vibe ระบบจัดการออเดอร์ร้านอาหาร
```

## 📋 Commands ทั้งหมด

| Command | Shortcut | คำอธิบาย |
|---------|----------|----------|
| `/toh:help` | `/toh:h` | ❓ แสดงรายการ commands ทั้งหมด |
| `/toh:plan` | `/toh:p` | 🧠 **THE BRAIN** - วิเคราะห์, วางแผน, สั่งการทุก Agent |
| `/toh:vibe` | `/toh:v` | 🎨 สร้างโปรเจคใหม่ UI + Logic + Mock Data |
| `/toh:ui` | `/toh:u` | 🖼️ สร้าง UI - Pages, Components, Layouts |
| `/toh:dev` | `/toh:d` | ⚙️ เพิ่ม Logic - TypeScript, Zustand, Forms |
| `/toh:design` | `/toh:ds` | ✨ ปรับ Design - ทำให้สวย ไม่ดูเหมือน AI |
| `/toh:test` | `/toh:t` | 🧪 ทดสอบระบบ - Auto test & fix จนผ่าน |
| `/toh:connect` | `/toh:c` | 🔌 เชื่อม Backend - Supabase, Auth, RLS |
| `/toh:line` | `/toh:l` | 💚 LINE Mini App - LIFF integration |
| `/toh:mobile` | `/toh:m` | 📱 Mobile App - Expo / React Native |
| `/toh:fix` | `/toh:f` | 🔧 แก้ Bug - Debug และ fix issues |
| `/toh:ship` | `/toh:s` | 🚀 Deploy - Vercel, Production ready |

## 🧠 หลักการ AODD

Toh Framework ใช้หลักการ **AI-Orchestration Driven Development (AODD)**:

### 1. ภาษาคน → Tasks
ผู้ใช้สั่งงานแบบภาษาธรรมชาติ ระบบจะแตกออกเป็น tasks อัตโนมัติ

```
❌ "สร้าง Next.js project ที่มี Zustand store สำหรับ products 
    พร้อม React Hook Form และ Zod validation..."

✅ "อยากได้ระบบขายของออนไลน์"
```

### 2. Orchestrator → Agents
ระบบจะเรียก AI-Agents ที่เกี่ยวข้องมาทำงานโดยอัตโนมัติ

```
User: "สร้างหน้าจัดการสินค้า"

Orchestrator คิด:
├── 📐 เรียก ui-builder สร้าง UI
├── ⚙️ เรียก dev-builder เพิ่ม logic
├── ✨ เรียก design-reviewer ปรับให้สวย
└── ✅ ส่งมอบผลลัพธ์
```

### 3. ผู้ใช้ไม่ต้องยุ่งกับกระบวนการ
- ไม่ต้องเลือก framework
- ไม่ต้องตอบคำถาม
- ไม่ต้องรู้ว่า agent ไหนทำอะไร
- แค่รอรับผลลัพธ์

### 4. Test → Fix → Loop
เมื่อทดสอบแล้วพบ error ระบบจะ:
1. 🧪 Run tests ด้วย Playwright
2. 🔍 วิเคราะห์ error
3. 🔧 เรียก `/toh:fix` แก้ไข
4. 🔄 Test ใหม่จนผ่าน

## 🏗️ Tech Stack (ตายตัว)

Toh Framework ใช้ tech stack ที่ตายตัว ไม่ต้องเลือก:

| หมวด | เทคโนโลยี |
|------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Backend | Supabase |
| Testing | Playwright |
| Language | TypeScript (strict) |

## 🤖 Agents

| Agent | คำอธิบาย |
|-------|----------|
| `ui-builder` | สร้าง UI และ Components |
| `dev-builder` | เพิ่ม Logic และ State Management |
| `design-reviewer` | ปรับปรุง Design ให้เป็นมืออาชีพ |
| `test-runner` | ทดสอบระบบและ auto-fix |
| `backend-connector` | เชื่อมต่อ Supabase |
| `platform-adapter` | Adapt สำหรับ LINE, Mobile, Desktop |

## 📚 Skills

| Skill | คำอธิบาย |
|-------|----------|
| `vibe-orchestrator` | Core methodology และ workflow |
| `ui-first-builder` | UI patterns และ component library |
| `dev-engineer` | TypeScript, Zustand, Forms |
| `design-excellence` | Design system และ anti-patterns |
| `test-engineer` | Testing strategy และ Playwright |
| `backend-engineer` | Supabase, RLS, Auth |
| `platform-specialist` | LINE, Expo, Tauri |

## 🔄 ตัวอย่าง Workflow

```
พี่โต: "สร้างระบบจัดการร้านกาแฟ"

┌─────────────────────────────────────────────────────┐
│  🎯 Toh Orchestrator                                │
├─────────────────────────────────────────────────────┤
│  1. วิเคราะห์ความต้องการ                              │
│     → ระบบ POS, จัดการสต็อก, รายงาน                   │
│                                                     │
│  2. เรียก ui-builder                                │
│     → สร้าง UI ทุกหน้า + Mock data ไทย               │
│                                                     │
│  3. เรียก dev-builder                               │
│     → เพิ่ม state management + forms                │
│                                                     │
│  4. เรียก design-reviewer                           │
│     → ปรับ UI ให้สวยงาม professional                 │
│                                                     │
│  5. เรียก test-runner                               │
│     → ทดสอบทุกหน้า auto-fix จนผ่าน                   │
│                                                     │
│  ✅ ส่งมอบระบบที่พร้อมใช้งาน!                          │
└─────────────────────────────────────────────────────┘
```

## 📖 ตัวอย่างการใช้งาน

### สร้างระบบ E-commerce

```
/toh:vibe ระบบขายของออนไลน์ มีหน้าสินค้า ตะกร้า ชำระเงิน
```

### สร้างระบบจัดการพนักงาน

```
/toh:vibe ระบบ HR มีจัดการพนักงาน ลางาน อนุมัติ รายงาน
```

### สร้าง Dashboard

```
/toh:vibe Dashboard แสดงยอดขาย กราฟ ตาราง filter ตามวันที่
```

### ทดสอบและแก้ไข

```
/toh:test ทดสอบทุกหน้า
# ถ้ามี error → auto เรียก /toh:fix → test ใหม่จนผ่าน
```

## 🎯 กลุ่มเป้าหมาย

- **Solo Developers** - สร้าง SaaS ด้วยตัวคนเดียว
- **Solopreneurs** - ทำ MVP ไว้ test ตลาด
- **Startup Founders** - Prototype ให้นักลงทุนดู
- **Freelancers** - ส่งมอบงานลูกค้าเร็วขึ้น
- **Students** - เรียนรู้ modern web development

## 🆚 เปรียบเทียบ

| Feature | แบบเดิม | Toh Framework |
|---------|---------|---------------|
| เวลา Setup | 30+ นาที | 2 นาที |
| คำถามที่ต้องตอบ | 10+ | 0 |
| เวลาจนเห็น UI แรก | หลายชั่วโมง | ไม่กี่นาที |
| Mock Data | Lorem ipsum | ภาษาไทยสมจริง |
| เลือก Tech Stack | ทุกครั้ง | ตายตัว, optimized |
| Auto Testing | ต้อง setup เอง | มีให้พร้อม |
| แก้ Error | ทำเอง | Auto loop |

## 🔧 CLI Commands

```bash
# ติดตั้ง framework
npx toh-framework install

# ดู commands ที่มี
npx toh-framework list

# เช็คสถานะการติดตั้ง
npx toh-framework status

# สร้าง web bundles
npx toh-framework bundle
```

## 🤝 ร่วมพัฒนา

ยินดีรับ contributions! สามารถส่ง Pull Request ได้เลย

1. Fork project
2. สร้าง feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📝 License

โปรเจคนี้ใช้ MIT License - ดูรายละเอียดใน [LICENSE](../LICENSE)

## 👨‍💻 ผู้พัฒนา

**Wasin Treesinthuros** (Innovation Vantage)

- GitHub: [@wasintoh](https://github.com/wasintoh)
- Email: dr.wasin@gmail.com
- LINE OA: [@dr.wasin.official](https://line.me/R/ti/p/@dr.wasin.official)

---

<p align="center">
  Made with ❤️ Naja. Grow Together. 🚀
</p>

<p align="center">
  <strong>"Type Once, Have it all!"</strong><br>
  <em>"สั่งแล้วจบ ไม่ถาม ไม่รอ"</em>
</p>
