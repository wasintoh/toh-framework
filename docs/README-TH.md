# 🎯 Toh Framework

> **"พิมพ์ครั้งเดียว ได้ครบ!"** - AI-Orchestration Driven Development

[![npm version](https://img.shields.io/npm/v/toh-framework.svg?style=flat-square)](https://www.npmjs.com/package/toh-framework)
[![npm downloads](https://img.shields.io/npm/dt/toh-framework.svg?style=flat-square)](https://www.npmjs.com/package/toh-framework)
[![License](https://img.shields.io/npm/l/toh-framework.svg?style=flat-square)](https://github.com/wasintoh/toh-framework/blob/main/LICENSE)

🌐 **เว็บไซต์:** [tohframework.dev](https://tohframework.dev)

> 📖 **[🇬🇧 English Documentation](../README.md)**

## 🤖 IDE ที่รองรับ

| IDE | สถานะ | หมายเหตุ |
|-----|--------|----------|
| 🧠 **Claude Code** | ✅ รองรับเต็ม | Native Sub-Agents, Slash commands |
| 📝 **Cursor** | ✅ รองรับเต็ม | @ file references |
| 🌌 **Google Antigravity** | ✅ รองรับเต็ม | Gemini integration |
| 💎 **Gemini CLI** | ✅ รองรับเต็ม | Context files auto-loaded |
| 🤖 **Codex CLI** | ✅ รองรับ | OpenAI agents |

## 💡 ทำไมต้อง Toh?

**Toh** = **T**ype **O**nce, **H**ave it all!

เราเชื่อว่า **Solo Developers** และ **Solopreneurs** ควรสามารถสร้างระบบ SaaS ได้ด้วยตัวเอง โดยไม่ต้องเป็น expert ทุกด้าน

Toh Framework ช่วยให้คุณ:
- 💬 **สั่งด้วยภาษาธรรมชาติ** - ไม่ต้องเขียน prompt ซับซ้อน
- 🤖 **AI ทำให้ทุกอย่าง** - แบ่งงาน เรียก agent ทำจนเสร็จ
- 👀 **เห็นผลทันที** - ไม่ต้องรอ ไม่ต้องตอบคำถาม
- 🚀 **พร้อมใช้งานจริง** - ไม่ใช่แค่ prototype

## 🆕 มีอะไรใหม่ใน v1.7.0

### 🏗️ Code Architecture Tracking

AI จำโครงสร้าง project ของคุณได้ทันที:

| Memory File | หน้าที่ |
|-------------|---------|
| `architecture.md` | โครงสร้าง project, routes, data flow |
| `components.md` | รายการ components พร้อม props |

**ประโยชน์:**
- ไม่ต้อง scan codebase ทุก session
- AI รู้ว่าอะไรอยู่ตรงไหน
- 5 memory files (เดิม 3), ~3,000 tokens

### 🔐 Security Engineer System

ระบบ security สำหรับ AI-generated code:

```bash
# Full security audit
/toh-protect

# Quick checks ใน /toh-dev และ /toh-test
/toh-dev เพิ่ม payment form  # → Security check ก่อน & หลัง
/toh-test                    # → Security check ก่อน test
```

**Security Checks:**
- Level 1 (Quick): Secrets, dangerous code, auth issues
- Level 2 (Full): Injection, auth flaws, AI risks, config

### 🤖 7 Sub-Agents

| Agent | ความเชี่ยวชาญ |
|-------|---------------|
| 🎨 **ui-builder** | Pages, Components, Layouts |
| ⚙️ **dev-builder** | Logic, State, API |
| 🔌 **backend-connector** | Supabase, Auth, RLS |
| ✨ **design-reviewer** | ขัดเกลา, Animation |
| 🧪 **test-runner** | Auto test & fix |
| 🧠 **plan-orchestrator** | วิเคราะห์, วางแผน |
| 📱 **platform-adapter** | LINE, Mobile, Desktop |

### 🔄 Multi-Agent Orchestration

**`/toh` v4.0** - Smart Command พร้อมความโปร่งใส:

```bash
/toh สร้างระบบจัดการร้านกาแฟ

# AI แสดงแผน:
📋 Workflow Plan:
├── 1. plan-orchestrator → วิเคราะห์ requirements
├── 2. ui-builder → สร้างหน้าทั้งหมด + components
├── 3. dev-builder → เพิ่ม state + forms + API
├── 4. design-reviewer → ขัดเกลาให้สวย
├── 5. test-runner → Test จนผ่าน
└── 6. security-check → ตรวจสอบก่อน deploy [NEW]

🚀 กำลังทำ...
```

---

## ✨ Features

| Feature | รายละเอียด |
|---------|------------|
| **`/toh` Smart Command** | พิมพ์อะไรก็ได้ AI เลือก agent ให้ |
| **Sub-Agents** | 7 agents เชี่ยวชาญเฉพาะทาง |
| **Multi-Agent Orchestration** | Workflow ซับซ้อนพร้อมความโปร่งใส |
| **Premium Experience** | 5+ หน้าพร้อม animations ในคำสั่งเดียว |
| **Design Mastery** | 13 business profiles สำหรับ design อัจฉริยะ |
| **Auto Memory** | Context คงอยู่ข้าม sessions และ IDEs |
| **Auto Testing** | Test & fix loop จนผ่านหมด |

---

## 📦 การติดตั้ง

```bash
# ติดตั้งแบบ interactive (เลือก IDE และภาษา)
npx toh-framework install

# ติดตั้งแบบรวดเร็ว (Claude Code + Cursor, English)
npx toh-framework install --quick

# ติดตั้งเฉพาะ IDE
npx toh-framework install --ide claude
npx toh-framework install --ide cursor
npx toh-framework install --ide gemini
npx toh-framework install --ide codex

# หลาย IDEs
npx toh-framework install --ide "claude,cursor,gemini,codex"
```

## 🔄 อัพเดทเป็นเวอร์ชันล่าสุด

```bash
# วิธีที่ 1: ใช้ npx (แนะนำ - ได้เวอร์ชันล่าสุดเสมอ)
npx toh-framework@latest install

# วิธีที่ 2: ถ้าติดตั้ง globally
npm update -g toh-framework
toh install
```

> 💡 **Tip:** การติดตั้งใหม่จะอัพเดท skills, agents, และ commands โดยไม่ลบ memory ที่มีอยู่!

---

## 🚀 เริ่มต้นใช้งาน

### Claude Code

```bash
# เปิด project ด้วย Claude Code
claude .

# แสดงคำสั่งทั้งหมด
/toh-help

# Smart command - AI เลือก agent ให้
/toh สร้าง landing page พร้อมส่วน pricing

# สร้าง project ครบ
/toh-vibe ระบบจัดการร้านกาแฟ

# เพิ่ม UI
/toh-ui เพิ่ม dashboard แสดงยอดขาย

# เพิ่ม Logic
/toh-dev เพิ่ม form validation และ API calls

# ปรับ Design
/toh-design ทำให้ดูเป็น professional

# Test ระบบ
/toh-test

# ตรวจสอบความปลอดภัย
/toh-protect

# Deploy
/toh-ship
```

### Cursor

```bash
# เรียก Toh agent
@toh สร้างระบบจองห้องประชุม

# หรือใช้คำสั่งเฉพาะ
@toh:ui สร้างหน้า calendar สำหรับจองห้อง
```

### Gemini CLI / Antigravity

```bash
# เริ่ม Gemini CLI
gemini

# ใช้คำสั่ง
/toh-vibe ระบบจัดการ inventory
```

---

## 📋 คำสั่งทั้งหมด

| คำสั่ง | ทางลัด | รายละเอียด |
|--------|--------|------------|
| `/toh` | - | 🧠 **Smart Command** - พิมพ์อะไรก็ได้ AI เลือก agent |
| `/toh-plan` | `/toh-p` | 📋 **วางแผน** - วิเคราะห์, วางแผน, orchestrate |
| `/toh-vibe` | `/toh-v` | 🎨 **สร้าง Project** - แอปครบในคำสั่งเดียว |
| `/toh-ui` | `/toh-u` | 🖼️ **สร้าง UI** - Pages, Components, Layouts |
| `/toh-dev` | `/toh-d` | ⚙️ **เพิ่ม Logic** - TypeScript, Zustand, Forms |
| `/toh-design` | `/toh-ds` | ✨ **ขัดเกลา Design** - Professional ไม่ดู AI |
| `/toh-test` | `/toh-t` | 🧪 **Test** - Auto test & fix จนผ่าน |
| `/toh-protect` | `/toh-pt` | 🔐 **Security Audit** - ตรวจสอบความปลอดภัย `[NEW]` |
| `/toh-connect` | `/toh-c` | 🔌 **เชื่อม Backend** - Supabase, Auth, RLS |
| `/toh-line` | `/toh-l` | 💚 **LINE Mini App** - LIFF integration |
| `/toh-mobile` | `/toh-m` | 📱 **Mobile App** - Expo / React Native |
| `/toh-fix` | `/toh-f` | 🔧 **แก้ Bug** - Debug อย่างเป็นระบบ |
| `/toh-ship` | `/toh-s` | 🚀 **Deploy** - Vercel, พร้อม Production |
| `/toh-help` | `/toh-h` | ❓ **Help** - แสดงคำสั่งทั้งหมด |

---

## 🏗️ Tech Stack (Fixed)

ไม่ต้องเลือก - stack ที่ optimize แล้วพร้อมใช้:

| หมวด | เทคโนโลยี |
|------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Backend | Supabase |
| Testing | Playwright |
| Language | TypeScript (strict) |

---

## 🧠 ปรัชญา (AODD)

**AI-Orchestration Driven Development:**

1. **ภาษาธรรมชาติ → Tasks** - แค่บอกว่าอยากได้อะไร
2. **Orchestrator → Agents** - ระบบเรียก specialist ที่เหมาะสม
3. **ไม่ต้องจัดการ Process** - คุณแค่รับผลลัพธ์
4. **Test → Fix → Loop** - Auto-fix จนทุกอย่างผ่าน

```
User: "สร้างระบบจัดการร้านกาแฟ"

Orchestrator:
├── 📐 plan-orchestrator → วิเคราะห์ & วางแผน
├── 🎨 ui-builder → สร้าง UI ทั้งหมด
├── ⚙️ dev-builder → เพิ่ม logic
├── ✨ design-reviewer → ขัดเกลา design
├── 🧪 test-runner → Test & fix
├── 🔐 security-check → ตรวจสอบความปลอดภัย [NEW]
└── ✅ ส่งมอบระบบพร้อมใช้!
```

---

## 📖 ตัวอย่าง

### สร้าง E-commerce
```
/toh-vibe ร้านค้าออนไลน์ มีสินค้า ตะกร้า และ checkout
```

### สร้าง Dashboard
```
/toh-vibe Dashboard แสดงยอดขาย มี charts และ date filters
```

### สร้าง SaaS
```
/toh-vibe ระบบจัดการ project มี teams และ tasks
```

---

## 🎯 กลุ่มเป้าหมาย

- **Solo Developers** - สร้าง SaaS ด้วยตัวเอง
- **Solopreneurs** - สร้าง MVP ทดสอบตลาด
- **Startup Founders** - Prototype สำหรับ investors
- **Freelancers** - ส่งงานลูกค้าเร็วขึ้น
- **นักศึกษา** - เรียนรู้ modern web development

---

## 📊 สถิติ Framework

- 🤖 **7 Sub-Agents** - เชี่ยวชาญเฉพาะทาง
- 🎯 **15 Commands** - ตั้งแต่วางแผนถึง deployment `[NEW: /toh-protect]`
- 📚 **24 Skills** - ความสามารถ AI ครบครัน `[NEW: Security Engineer]`
- 🎨 **13 Design Profiles** - Design เหมาะกับธุรกิจ
- 📦 **15 Component Templates** - Premium components พร้อมใช้
- 🌐 **5 IDEs** - Claude Code, Cursor, Antigravity, Gemini, Codex

---

## 🤝 ร่วมพัฒนา

ยินดีรับ Pull Request!

## 📝 License

MIT License - ดู [LICENSE](../LICENSE)

## 👨‍💻 ผู้พัฒนา

**วศิน ตรีสินธุรส** (Innovation Vantage)

- 🌐 เว็บไซต์: [tohframework.dev](https://tohframework.dev)
- GitHub: [@wasintoh](https://github.com/wasintoh)
- Email: dr.wasin@gmail.com

---

<p align="center">
  สร้างด้วย ❤️ เพื่อ Solo Developers ทุกคน
</p>

<p align="center">
  <strong>"พิมพ์ครั้งเดียว ได้ครบ!"</strong>
</p>
