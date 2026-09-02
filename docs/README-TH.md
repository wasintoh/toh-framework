<p align="center">
  <img src="assets/toh-framework-banner.png" alt="Toh Framework" width="760" />
</p>

<h3 align="center">"พิมพ์ครั้งเดียว ได้ครบ!" · AI-Orchestration Driven Development</h3>

<p align="center">อนุมัติครั้งเดียว เดินไปกินกาแฟ กลับมาเจอแอปที่เสร็จและตรวจแล้ว</p>

[![npm version](https://img.shields.io/npm/v/toh-framework.svg?style=flat-square)](https://www.npmjs.com/package/toh-framework)
[![npm downloads](https://img.shields.io/npm/dt/toh-framework.svg?style=flat-square)](https://www.npmjs.com/package/toh-framework)
[![License](https://img.shields.io/npm/l/toh-framework.svg?style=flat-square)](https://github.com/wasintoh/toh-framework/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/wasintoh/toh-framework?style=flat-square)](https://github.com/wasintoh/toh-framework)

**Toh Framework** ติดตั้ง "แผนกสร้างแอป" ที่ขับด้วย AI เข้าไปในโปรเจคของคุณ มีคำสั่ง 14 ตัว agents ผู้เชี่ยวชาญ 8 ตัว และ skills อีก 23 ตัว ตั้งค่าให้ Claude Code, Cursor, Antigravity, Codex และ ZCode ครบในการติดตั้งครั้งเดียว

คุณพิมพ์ประโยคเดียว เช่น `/toh-vibe ระบบจัดการร้านกาแฟ` แล้วอนุมัติครั้งเดียว จากนั้นมันจะวางแผน สร้าง ทดสอบ และแก้เอง จนแอปเสร็จแบบพิสูจน์ได้

```bash
npx toh-framework install
```

**ถ้าคุณเขียนโค้ดไม่เป็น** คุณจะเจอแค่หน้าจอเดียวที่ถามว่าอยากได้อะไร ตอบเป็นภาษาคนปกติ แล้วกด "ไป" ครั้งเดียว ไม่ต้องเลือกเทคโนโลยี ไม่ต้องกรอกค่าอะไร ไม่ต้องแปลศัพท์

AI จะเขียนแผนออกมาเป็นรายการติ๊กที่คุณอ่านรู้เรื่อง แล้วไล่ทำทีละข้อ สร้างเอง ทดสอบเอง พังก็แก้เอง แล้วค่อยกลับมาบอกตอนเสร็จ ถ้าติดตรงไหนมันจะบอกว่าติดข้อไหนและเพราะอะไร เป็นประโยคเดียวจบ

**ถ้าคุณเป็นนักพัฒนา** สิ่งที่คุณได้คือ loop ที่เก็บแผนไว้เป็นไฟล์ ซึ่ง agent โกงไม่ได้

งานทั้งหมดอยู่ใน `.toh/plan.md` เป็น checkbox เพราะงั้นเปิด session ใหม่ใน IDE ไหนก็ได้จาก 6 ตัวที่รองรับ มันจะทำต่อจากจุดที่ค้างไว้พอดี ตัว orchestrator ต้องรัน checkpoint ของแต่ละงานด้วยตัวเอง แล้ว quote output จริงออกมาก่อน ถึงจะติ๊กช่องได้ คำว่า "เสร็จ" ที่นี่จึงแปลว่าคำสั่งรันแล้ว exit code เป็นศูนย์ ไม่ใช่แค่โมเดลบอกว่าเสร็จ

เรื่องต้นทุนมันจัดโมเดลให้เอง: haiku รับงาน scaffold กับเทส sonnet ลงมือสร้าง opus วางแผนกับตรวจงาน แล้วทุกอย่างถูก generate จากแหล่งความจริงเดียว ย้าย IDE ไปก็ไม่เพี้ยน

เปลี่ยนใจได้ตลอดครับ สั่ง `npx toh-framework uninstall` มันจะโชว์ให้ดูก่อนว่าจะลบอะไร เก็บอะไร แก้อะไร แล้วถามก่อนลงมือ

🌐 **เว็บไซต์:** [tohframework.dev](https://tohframework.dev)

> 📖 **[🇬🇧 English Documentation](../README.md)**

## 🆕 มีอะไรใหม่ใน v2.2.0

> **Codex ได้ทีมตัวจริงแล้ว** agent ทุกตัวของ Toh ติดตั้งเป็น native agent ของ Codex ตรงๆ workflow ทั้ง 14 ตัวเรียกเป็น skill ของ Codex ได้ และ repo มี test อัตโนมัติชุดแรก รุ่นนี้เริ่มจาก [PR #3](https://github.com/wasintoh/toh-framework/pull/3) ของ [@pcbimon](https://github.com/pcbimon) ซึ่งเป็นโค้ดจากคนนอกชิ้นแรกของ Toh Framework

| ฟีเจอร์ | คุณได้อะไร |
|---------|-----------|
| 🤖 **Native agent บน Codex** | ผู้เชี่ยวชาญ Toh ทั้ง 8 ตัวติดตั้งเป็น custom agent ของ Codex ระดับโปรเจค อยู่ที่ `.codex/agents/*.toml` สร้างจาก `.toh/agents/` ตอนนี้ Codex มอบงานให้ `ui-builder` หรือ `plan-orchestrator` ได้เหมือนที่ Claude Code, Cursor และ Antigravity ทำได้อยู่แล้ว เรื่องนี้เทสจริงบน Codex CLI 0.145.0 มาแล้ว agent ถูก spawn ขึ้นมาทำงาน ทำแบบ read-only ตามที่ tool allowlist ของมันกำหนด แล้วรายงานกลับผ่าน announce contract ของ Toh |
| 🎛️ **model ของคุณ ความลึกของแต่ละตัว** | ไฟล์ agent ตั้งใจไม่ใส่ `model` key เลย ทุกตัวใช้ model เดียวกับ session ของคุณ เพราะงั้นเปลี่ยน `/model` ที่เดียวทั้งทีมเปลี่ยนตาม และวันที่ OpenAI เปลี่ยนชื่อ model เราก็ไม่ต้องออกรุ่นใหม่ แต่ละตัวตั้งแค่ระดับ reasoning ของตัวเอง (`lightweight`, `implementation`, `planning`, `review`) จาก frontmatter key ใหม่ชื่อ `modelIntent` |
| 🔏 **จำได้ว่าไฟล์ไหนเป็นของเรา** | `.codex/toh-framework.json` เก็บ sha256 ของไฟล์ agent ทุกไฟล์ที่ Toh เขียน ถ้าคุณแก้ไฟล์ไหนหรือเพิ่มไฟล์ของตัวเอง มันจะไม่ถูกเขียนทับหรือลบ ไม่ว่าจะติดตั้งซ้ำหรือสั่ง `toh uninstall --ide codex` ซึ่งลบเฉพาะไฟล์ที่พิสูจน์ได้ว่า Toh เขียนเอง (สำรองไว้ก่อนด้วย) |

### และใน 2.2.0 ยังมี

- 💲 **`$toh-vibe` บน Codex** workflow ทั้ง 14 ตัวเป็น skill ของ Codex แบบ native เรียกด้วย `$toh-<cmd>` หรือพิมพ์ `/skills` ดูทั้งหมด พิมพ์ `/toh-vibe ...` แบบเดิมก็ยังได้ และ AGENTS.md บอก Codex ไว้แล้วว่าตอนมอบงานให้ agent ให้ส่ง brief ที่จบในตัว เพราะ Codex ไม่ยอมให้ส่งประวัติแชททั้งหมดไปให้ agent
- 🧪 **test ชุดแรก** `npm test` รัน 14 ข้อกับการติดตั้งจริงในโฟลเดอร์ชั่วคราว ตั้งแต่โครงไฟล์ รูปแบบ TOML กฎคนเขียนคนเดียวของ `.agents/skills/` ไม่ว่าลง IDE ลำดับไหน `config.toml` ของคุณไม่ถูกแตะ ระบบจำเจ้าของไฟล์ AGENTS.md ติดตั้งซ้ำแล้วเหมือนเดิมและไม่เกินงบ จนถึงการถอนทั้งสองแบบ ชุดนี้คุม CI และทุก release
- 🧭 **ที่ตั้งใจไม่เปลี่ยน** `.agents/skills/` ยังมีคนเขียนคนเดียว `.codex/config.toml` ที่มีอยู่แล้วยังไม่ถูกแตะ และ capability ของ Codex ยังตรวจจริงตอนติดตั้ง ไม่ได้เดา

## 🤖 IDE ที่รองรับ

| IDE | สถานะ | หมายเหตุ |
|-----|--------|----------|
| 🧠 **Claude Code** | ✅ รองรับเต็ม | Native subagents + skills preload, Stop hook, slash commands และทางลัด |
| 📝 **Cursor (2.4+)** | ✅ รองรับเต็ม | Native subagents (`.cursor/agents/`), skills ผ่าน `.agents/skills/`, rule แบบ always-on |
| 🛰️ **Antigravity CLI (agy) + IDE** | ✅ รองรับเต็ม | `.agents/` rules + skills + workflows + subagents + Stop hook |
| 🤖 **Codex** (CLI + Codex desktop app / ChatGPT app) | ✅ รองรับ | AGENTS.md แบบกะทัดรัด + repo-level skills + native agents ใน `.codex/agents/` |
| 💠 **ZCode (Z.ai)** | ✅ รองรับ | AGENTS.md + `.agents/skills/` + คำสั่ง `/toh-*` native ใน `.agents/commands/` |
| 💎 **Gemini CLI** | 🏢 Legacy | เฉพาะ Enterprise/GCP ใช้ผ่าน `--legacy-gemini` |

## 💡 ทำไมต้อง Toh?

**Toh** ย่อมาจาก **T**ype **O**nce, **H**ave it all!

Solo Developer กับ Solopreneur ควรสร้างระบบ SaaS ได้ด้วยตัวคนเดียว โดยไม่ต้องเก่งทุกด้าน นั่นคือความเชื่อที่เราสร้างของนี้ขึ้นมา

สิ่งที่คุณจะได้:
- 💬 **สั่งด้วยภาษาคนปกติ** ไม่ต้องเขียน prompt ซับซ้อน
- 🤖 **AI ลงมือทำให้ทั้งหมด** แบ่งงาน เรียก agent ทำจนจบ
- 👀 **เห็นผลทันที** ไม่ต้องรอ ไม่ต้องคอยตอบคำถาม
- 🚀 **ใช้งานจริงได้** ไม่ใช่แค่ prototype

### 📜 เวอร์ชันก่อนหน้า

ประวัติเวอร์ชันทั้งหมดอยู่ใน [CHANGELOG.md](../CHANGELOG.md)

**ไฮไลท์ล่าสุด:**

| เวอร์ชัน | วันที่ | ฟีเจอร์เด่น |
|---------|--------|------------|
| v2.1.1 | 2026-08-26 | รุ่นซ่อม: อัปเดตแล้ว memory ไม่หาย, Stop hook เคารพแผนที่พักไว้, capability ของ Codex ตรวจจริงไม่ได้เดา |
| v2.1.0 | 2026-08-16 | รุ่น Compatibility: รองรับ agy, Codex ไม่โดนตัดท้าย, Cursor ได้ native subagents, `.agents/skills` เป็นมาตรฐานร่วม |
| v2.0.0 | 2026-07-14 | One-Go Build, TOH LOOP, Design Identity, Auto-Resume |
| v1.8.0 | 2026-01-11 | 7-File Memory System, Agent Announcements |
| v1.7.0 | 2025-12-26 | Security Engineer, คำสั่ง `/toh-protect` |
| v1.6.0 | 2025-12-18 | Claude Code Sub-Agents, Multi-Agent Orchestration |
| v1.5.0 | 2025-12-05 | รองรับ Google Antigravity/Gemini |

---

## ✨ Features

| Feature | รายละเอียด |
|---------|------------|
| **One-Go Build** | `/toh-plan` แล้วอนุมัติครั้งเดียว จากนั้นมันสร้างทั้งแอปเอง |
| **TOH LOOP** | สร้าง เทส แก้ วนเองจนทุกงานเสร็จจริงแบบพิสูจน์ได้ |
| **`/toh` Smart Command** | พิมพ์อะไรก็ได้ AI เลือก agent กับโมเดลให้เอง |
| **Design Identity** | `DESIGN.md` ประจำโปรเจค คู่กับ AVOID-LIST ที่มีเวอร์ชัน งานเลยไม่ออกมาหน้าตาแบบ AI |
| **Auto-Resume** | `.toh/plan.md` รอดทั้ง `/clear` ปิดเครื่อง และย้าย IDE |
| **Sub-Agents** | agent เฉพาะทาง 8 ตัว จับคู่โมเดลตามหน้าที่ |
| **Auto Memory** | Context อยู่ต่อข้าม session และข้าม IDE |

---

## 📦 การติดตั้ง

```bash
# ติดตั้งแบบ interactive (เลือก IDE และภาษา)
npx toh-framework install

# ติดตั้งแบบรวดเร็ว (Claude Code, English)
npx toh-framework install --quick

# ติดตั้งเฉพาะ IDE
npx toh-framework install --ide claude
npx toh-framework install --ide cursor
npx toh-framework install --ide antigravity
npx toh-framework install --ide codex
npx toh-framework install --ide zcode

# หลาย IDE พร้อมกัน
npx toh-framework install --ide "claude,cursor,antigravity,codex,zcode"

# เป้าหมาย legacy (ปิดเป็นค่าเริ่มต้น)
npx toh-framework install --legacy-gemini       # .gemini/ สำหรับ Gemini CLI ฝั่ง Enterprise/GCP
npx toh-framework install --legacy-cursorrules  # .cursorrules ที่ root สำหรับ Cursor รุ่นเก่ามาก
```

## 🔄 อัพเดทเป็นเวอร์ชันล่าสุด

```bash
# วิธีที่ 1: ใช้ npx (แนะนำ ได้เวอร์ชันล่าสุดเสมอ)
npx toh-framework@latest install

# วิธีที่ 2: ถ้าติดตั้งแบบ global ไว้
npm update -g toh-framework
toh install
```

> 💡 **Tip:** ติดตั้งทับได้เลย มันจะอัพเดท skills, agents และ commands ให้ โดยไม่ลบ memory ที่มีอยู่

## 🧹 ถอนการติดตั้ง

เปลี่ยนใจได้ตลอดครับ คำสั่งเดียวเอา Toh Framework ออกจากโปรเจค ก่อนลบมันจะพิมพ์ให้ดูก่อนเป็นภาษาคน
ธรรมดาว่าจะเกิดอะไรขึ้นบ้าง แล้วถามยืนยันก่อนเสมอ

```bash
# ดูก่อนว่าจะเกิดอะไรขึ้น ไม่แตะไฟล์ไหนเลย
npx toh-framework uninstall --dry-run

# ถอนการติดตั้ง (ถามยืนยันก่อน)
npx toh-framework uninstall

# ถ้าโปรเจคอยู่ที่อื่น ระบุโฟลเดอร์ได้
npx toh-framework uninstall -t /path/to/your/project

# ลบแผนงาน บันทึกงาน และโน้ตของโปรเจคด้วย (สำรองไฟล์ให้ก่อน)
npx toh-framework uninstall --all
```

**สิ่งที่จะไม่เกิดขึ้นเด็ดขาด:**

- **ไฟล์ของคุณไม่โดนลบ** ไฟล์ไหนที่มันพิสูจน์ไม่ได้ว่าตัวเองเป็นคนติดตั้ง จะถูกทิ้งไว้ที่เดิม
  แล้วขึ้นรายชื่อบนจอให้ คุณเลยรู้ตลอดว่าเหลืออะไร อยู่ตรงไหน
- **ไฟล์ที่ใช้ร่วมกันจะถูกแก้ ไม่ใช่เขียนทับ** `CLAUDE.md`, `AGENTS.md`, `.claude/settings.json`,
  `.agents/hooks.json` ทุกบรรทัดที่คุณเขียนเองยังอยู่ครบ เอาออกเฉพาะส่วนของ Toh กับ hook ของ Toh
  ถ้าแยกไม่ออกว่าส่วนไหนเป็นของตัวเอง มันจะไม่แตะไฟล์นั้นเลย แล้วบอกให้รู้
- **แผนงานกับโน้ตของคุณอยู่ต่อเป็นค่าเริ่มต้น** `.toh/plan.md`, `.toh/progress.md` และโฟลเดอร์
  memory คืองานจริงของโปรเจค จะลบก็ต่อเมื่อคุณตอบใช่ในคำถามเพิ่ม (หรือใส่ `--all`) และไม่ว่าทางไหน
  ก็สำรองไว้ที่ `.toh-uninstall-backup/` ก่อนเสมอ
- **โฟลเดอร์จะถูกลบก็ต่อเมื่อว่างแล้วเท่านั้น** ไฟล์ของคุณที่อยู่ข้างในจึงปลอดภัย

แฟล็กอื่น: `-y, --yes` (ข้ามคำถาม สำหรับสคริปต์) และ `--verbose` (แสดงรายชื่อไฟล์ทุกไฟล์แทนสรุปรายเครื่องมือ)

---

## 🚀 เริ่มต้นใช้งาน

### Claude Code

```bash
# เปิด project ด้วย Claude Code
claude .

# แสดงคำสั่งทั้งหมด
/toh-help

# Smart command AI เลือก agent ให้
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
# ใช้คำสั่งเดียวกันในแชทได้เลย rule แบบ always-on สอนให้ Cursor รู้จักคำสั่งพวกนี้
/toh-vibe สร้างระบบจองห้องประชุม

# หรือเรียกคำสั่งเฉพาะ
/toh-ui สร้างหน้า calendar สำหรับจองห้อง
```

### Antigravity (agy CLI หรือ Antigravity IDE)

```bash
# เริ่ม Antigravity CLI
agy

# ใช้คำสั่งเดียวกัน
/toh-vibe ระบบจัดการ inventory
```

### Codex (CLI และ Codex desktop app / ChatGPT app)

```bash
codex

# เรียก workflow ของ Toh เป็น skill ของ Codex ตรงๆ ด้วย $ ตามด้วยชื่อ หรือพิมพ์ /skills ดูทั้งหมด
$toh-vibe ระบบจัดการ inventory

# พิมพ์ /toh-* แบบเดิมก็ยังใช้ได้ AGENTS.md สอนชุดคำสั่งครบให้ Codex อยู่แล้ว
/toh-vibe ระบบจัดการ inventory
```

agent ทั้ง 8 ตัวของ Toh ถูกติดตั้งเป็น native agent ของ Codex ด้วย อยู่ที่ `.codex/agents/*.toml`
สร้างจาก `.toh/agents/` และจำไว้ว่าไฟล์ไหนเป็นของเรา ไฟล์ที่คุณแก้เองจะไม่ถูกเขียนทับ
ทุกตัวใช้ model เดียวกับ session ของคุณ มีแค่ระดับ reasoning ที่ตั้งไว้ตามหน้าที่ของแต่ละตัว

### ZCode (Z.ai)

เปิดโปรเจคในแอป ZCode หรือใช้ CLI ที่มากับแอปก็ได้

```bash
zcode

# คำสั่ง /toh-* ทั้ง 14 ตัวติดตั้งเป็น slash command จริง
/toh-vibe ระบบจัดการ inventory
```

อยากเช็คว่า ZCode เห็นอะไรไปแล้วบ้าง สั่งได้ตลอด

```bash
zcode skills list      # skills ระดับโปรเจค 37 ตัว
zcode commands list    # คำสั่ง /toh-* 14 ตัว
```

---

## 📋 คำสั่งทั้งหมด

| คำสั่ง | ทางลัด | รายละเอียด |
|--------|--------|------------|
| `/toh` | - | 🧠 **Smart Command** - พิมพ์อะไรก็ได้ AI เลือก agent ให้ |
| `/toh-plan` | `/toh-p` | 📋 **วางแผน** - เขียน `.toh/plan.md` อนุมัติครั้งเดียว แล้วสร้างจนจบ |
| `/toh-vibe` | `/toh-v` | 🎨 **สร้าง Project** - ได้แอปครบในคำสั่งเดียว |
| `/toh-ui` | `/toh-u` | 🖼️ **สร้าง UI** - Pages, Components, Layouts |
| `/toh-dev` | `/toh-d` | ⚙️ **เพิ่ม Logic** - TypeScript, Zustand, Forms |
| `/toh-design` | `/toh-ds` | ✨ **ขัดเกลา Design** - ให้ดูมืออาชีพ ไม่ดูเป็น AI |
| `/toh-test` | `/toh-t` | 🧪 **Test** - เทสแล้วแก้เองจนผ่าน |
| `/toh-protect` | `/toh-pt` | 🔐 **Security Audit** - ตรวจความปลอดภัยทั้งระบบ |
| `/toh-connect` | `/toh-c` | 🔌 **เชื่อม Backend** - Supabase, Auth, RLS |
| `/toh-line` | `/toh-l` | 💚 **LINE MINI App** (convert) |
| `/toh-mobile` | `/toh-m` | 📱 **Mobile App** - PWA / Capacitor |
| `/toh-fix` | `/toh-f` | 🔧 **แก้ Bug** - ไล่ debug อย่างเป็นระบบ |
| `/toh-ship` | `/toh-s` | 🚀 **Deploy** - Vercel พร้อมขึ้น Production |
| `/toh-help` | `/toh-h` | ❓ **Help** - แสดงคำสั่งทั้งหมด |

> บน Claude Code ทางลัดพวกนี้เป็นคำสั่งจริงที่ลงทะเบียนไว้แล้ว (v2.1) ส่วน IDE อื่นใช้เป็น pattern ในแชท ที่ rule file สอนให้โมเดลรู้จัก

---

## 🏗️ Tech Stack (Fixed)

ไม่ต้องตัดสินใจอะไร stack จูนมาให้พร้อมใช้แล้ว

| หมวด | เทคโนโลยี |
|------|-----------|
| Framework | Next.js 16 (App Router) + React 19 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Backend | Supabase |
| Testing | Playwright |
| Language | TypeScript (strict) |

---

## 🧠 ปรัชญา (AODD)

**AI-Orchestration Driven Development:**

1. **ภาษาธรรมชาติ → Tasks** - บอกไปตรงๆ ว่าอยากได้อะไร
2. **Orchestrator → Agents** - ระบบเรียกผู้เชี่ยวชาญที่ตรงงานมาทำ
3. **ไม่ต้องคุม process** - คุณแค่รอรับผลลัพธ์
4. **Test → Fix → Loop** - แก้เองวนไปจนผ่านหมด

```
User: "สร้างระบบจัดการร้านกาแฟ"

Orchestrator:
├── 📐 plan-orchestrator → วิเคราะห์ & วางแผน
├── 🎨 ui-builder → สร้าง UI ทั้งหมด
├── ⚙️ dev-builder → เพิ่ม logic
├── ✨ design-reviewer → ขัดเกลา design
├── 🧪 test-runner → Test & fix
├── 🔐 security-check → ตรวจสอบความปลอดภัย
└── ✅ ส่งมอบระบบพร้อมใช้!
```

### 🔁 Plan → Vibe Workflow

แผนคือ **ไฟล์** ไม่ใช่ข้อความในแชท

- `/toh-plan` เขียนแผนลง `.toh/plan.md` แล้วคุณอนุมัติ**ครั้งเดียว** ("Go") จากนั้นมันสร้างตามแผนเองจนจบ ตรวจทีละ checkpoint
- `/toh-vibe` ทำแผนที่ค้างไว้ต่อได้เสมอ มันอ่าน `.toh/plan.md` ก่อน แล้วเริ่มจาก task แรกที่ยังไม่ติ๊ก จะ session ไหน IDE ไหนก็ได้

หมายเหตุ: กลไก*บังคับ*ให้ loop เดินเองแข็งแรงที่สุดบน Claude Code (Stop hook, `/goal`, `/loop`) กับ Antigravity (Stop hook แบบ deterministic ใน `.agents/hooks.json`) ส่วน IDE อื่นเดิน loop เดียวกันในรูปแบบคำสั่งในเอกสาร โดยมี checkbox-resume ใน `.toh/plan.md` เป็นตัวกู้คืน

**สั่ง build แบบไม่ต้องเฝ้า** รันแบบ headless บน Claude Code ได้เลย

```bash
claude -p "/toh-vibe ระบบจัดการร้านกาแฟ" --permission-mode acceptEdits
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

- **Solo Developers** - สร้าง SaaS ด้วยตัวคนเดียว
- **Solopreneurs** - ทำ MVP ออกไปทดสอบตลาด
- **Startup Founders** - ทำ prototype ให้นักลงทุนดู
- **Freelancers** - ส่งงานลูกค้าได้เร็วขึ้น
- **นักศึกษา** - เรียน modern web development

---

## 📊 สถิติ Framework

- 🤖 **8 Sub-Agents** - เชี่ยวชาญคนละด้าน ติดตั้งแบบ native บน Claude Code, Cursor 2.4+, Antigravity และ Codex
- 🎯 **14 Commands** - ตั้งแต่วางแผนยันขึ้น production
- 📚 **23 Skills** - ความสามารถของ AI ครบชุด ส่งครั้งเดียวลง `.agents/skills/` ให้ทุก IDE ที่อ่านมาตรฐานเปิดนี้ `[ใหม่ใน 2.1]`
- 🎨 **Design Identity** - DESIGN.md ประจำโปรเจค คู่กับ AVOID-LIST ที่มีเวอร์ชัน
- 📦 **15 Component Templates** - component ระดับพรีเมียม หยิบไปใช้ได้เลย
- 🌐 **6 IDEs** - Claude Code, Cursor, Antigravity (+ Antigravity CLI), Codex (CLI + desktop app), ZCode, Gemini CLI (legacy)

---

## 📚 เอกสารและคู่มือ

| คู่มือ | อยู่ที่ไหน |
|-------|-----------|
| 🇬🇧 เอกสารภาษาอังกฤษ | [README.md](../README.md) |
| ประวัติเวอร์ชันทั้งหมด | [CHANGELOG.md](../CHANGELOG.md) |
| คำสั่งทั้งหมด + cheatsheet | พิมพ์ `/toh-help` ใน IDE ที่ใช้อยู่ |
| คู่มือประจำโปรเจค (สร้างให้อัตโนมัติ) | `CLAUDE.md` / `AGENTS.md` / `.cursor/rules/` / `.agents/rules/` ในโปรเจค หลังติดตั้ง |
| ไฟล์แผนงาน | `.toh/plan.md` คือ checklist สดของแอปคุณ เปิดดูความคืบหน้าได้ตลอด |
| สัญญา design | `DESIGN.md` ที่ root ของโปรเจค สร้างใหม่ทุกโปรเจค แก้ได้เพื่อกำหนดลุค |

---

## 🤝 ร่วมพัฒนา

ยินดีรับ Pull Request ครับ

## 📝 License

MIT License ดูรายละเอียดที่ [LICENSE](../LICENSE)

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
