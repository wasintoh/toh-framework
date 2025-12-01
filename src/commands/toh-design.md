---
command: /toh:design
aliases: ["/toh:ds"]
description: >
  ปรับปรุง design ให้ดูเป็นมืออาชีพมากขึ้น
  ไม่ให้ดูเหมือน "AI generated"
trigger: /toh:design หรือ /toh:ds
---

# /toh:design - Polish Design

## Signature Command ✨

```
/toh:design [specific area]
/toh:ds [specific area]
```

## What Happens

```
0. 🚨 READ MEMORY (MANDATORY!)
   ├── .toh/memory/active.md
   ├── .toh/memory/summary.md
   └── .toh/memory/decisions.md
   (ถ้าไม่มี → สร้างใหม่)

1. READ Skills
   └── ~/.claude/skills/design-excellence/SKILL.md

2. AUDIT Current Design
   ├── Check color usage (one accent only?)
   ├── Check typography (proper hierarchy?)
   ├── Check spacing (consistent?)
   ├── Check animations (subtle?)
   └── Check AI anti-patterns

3. IMPROVE
   ├── Fix color inconsistencies
   ├── Adjust typography scale
   ├── Normalize spacing
   ├── Add subtle animations
   └── Remove "AI-generated" tells

4. REPORT Changes

5. 🚨 SAVE MEMORY (MANDATORY!)
   ├── อัพเดท active.md
   ├── เพิ่ม decisions.md (design decisions)
   └── อัพเดท summary.md
```

## Example Prompts

```bash
# General polish
/toh:design ทำให้ดูเป็นมืออาชีพขึ้น

# Specific area
/toh:ds ปรับ dashboard cards ให้สวยขึ้น

# Animation
/toh:design เพิ่ม animation ที่เหมาะสม

# Fix specific issue
/toh:ds สี accent ดูไม่เข้ากัน ช่วยปรับหน่อย
```

## Output Format

```markdown
## ✅ ปรับ Design เรียบร้อยค่ะ!

### สิ่งที่ปรับ:

**🎨 Colors**
- เปลี่ยน accent จาก violet เป็น blue (professional)
- ปรับ text จาก black เป็น slate-900 (softer)

**📝 Typography**
- ลด font-bold ที่ใช้มากเกินไป
- เพิ่ม line-height ให้อ่านง่ายขึ้น

**📐 Spacing**
- ปรับ padding ให้ consistent (p-4 ทุกที่)
- เพิ่ม gap ระหว่าง sections

**🎬 Animation**
- เพิ่ม hover:shadow-md บน cards
- เพิ่ม transition-colors บน buttons

### Before/After:
ดู diff ใน git หรือ refresh หน้าเว็บค่ะ
```

## Anti-Patterns Checklist

หนูจะตรวจและแก้ไขสิ่งเหล่านี้:

- [ ] Purple/violet gradients → Solid blue
- [ ] Pure black text → Slate-900
- [ ] Inconsistent padding → Unified scale
- [ ] Too many font weights → Max 2-3
- [ ] Bounce animations → Subtle ease
- [ ] Generic placeholder → Real Thai content
- [ ] Round-3xl everything → Contextual radius

## Rules

1. **ALWAYS** maintain functionality while improving looks
2. **ALWAYS** keep changes subtle, not dramatic
3. **NEVER** change color scheme without reason
4. **NEVER** add decorative elements that don't serve purpose
