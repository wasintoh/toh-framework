# Response Format Skill

> **Skill:** response-format  
> **Version:** 2.0.0  
> **For:** Toh Framework v1.4.0+  
> **Used by:** ALL Agents (MANDATORY)

---

## 🎯 Purpose

Define the **standard response format** that ALL agents MUST use to ensure users:
1. Know what AI did for them
2. Know what they received
3. Know what they need to do next (if anything)

**Golden Rule:** "If the user has to ask a follow-up question, your response wasn't complete enough."

---

## 🚨 The Problem We're Solving

### ❌ Bad Response (Anti-Pattern)

```
AI: "Done! The automatic ngrok URL detection system is ready.

     Files created:
     - /src/app/api/ngrok/detect/route.ts
     - /src/lib/webhook-url.ts
     
     How to use:
     1. Open ngrok: ngrok http 3000
     2. Open Settings page..."

User: "Wait, so I need to run ngrok myself first?"

→ User had to ask because AI didn't clearly state what USER must do
```

### ✅ Good Response (Required Format)

```
AI: "## ✅ What I Did

     **Files created:**
     - `/src/app/api/ngrok/detect/route.ts` - Auto-detect ngrok URL
     - `/src/lib/webhook-url.ts` - Webhook URL utility

     ---

     ## 🎁 What You Get

     - ✅ Automatic ngrok URL detection
     - ✅ Webhook URL updates dynamically
     - ✅ Status badge on Settings page

     ---

     ## 👉 What You Need To Do

     ### Right now:
     1. **Run ngrok first:** `ngrok http 3000`
     2. Copy the URL you get (e.g., https://xxxx.ngrok.io)
     3. Open Settings → Chatbot → Channels tab
     4. The system will detect your ngrok URL automatically

     ⚠️ **Important:** You must run ngrok yourself. The system only detects
     the URL - it doesn't start ngrok for you."

→ User knows exactly what to do without asking
```

---

## 📋 Required Response Format

### The Three Sections (MANDATORY)

Every response after completing work MUST include these three sections:

```markdown
## ✅ What I Did

**Files created:**
- `/path/to/file.tsx` - Brief description

**Files modified:**
- `/path/to/file.tsx` - What changed

**Dependencies installed:** (if any)
- `package-name` - Purpose

---

## 🎁 What You Get

- ✅ Feature/benefit 1 (user-facing, not technical)
- ✅ Feature/benefit 2
- ✅ Feature/benefit 3

**Preview:** http://localhost:3000/path (if applicable)

---

## 👉 What You Need To Do

### Right now:
[Clear, actionable steps OR "Nothing! Just open the preview and check it out."]

### Optional next steps:
[Suggestions for what to do next]
```

---

## 📝 Section Guidelines

### Section 1: ✅ What I Did

**Purpose:** Tell user exactly what was created/changed

**Must include:**
- File paths with brief descriptions
- Dependencies installed (if any)
- Configuration changes (if any)

**Example:**
```markdown
## ✅ What I Did

**Files created:**
- `/src/app/dashboard/page.tsx` - Main dashboard page
- `/src/components/dashboard/StatsCard.tsx` - Statistics card component
- `/src/hooks/useStats.ts` - Hook for fetching stats

**Files modified:**
- `/src/components/Sidebar.tsx` - Added dashboard link
- `/src/app/layout.tsx` - Added navigation item

**Dependencies installed:**
- `recharts` - For charts and graphs
```

---

### Section 2: 🎁 What You Get

**Purpose:** Describe benefits in USER terms, not technical terms

**Must include:**
- User-facing features/benefits
- What they can now do
- Preview URL (if UI was created)

**✅ Good (User perspective):**
```markdown
## 🎁 What You Get

- ✅ Dashboard page ready to use
- ✅ Real-time statistics display
- ✅ Charts showing 7-day trends
- ✅ Responsive on all devices
- ✅ Dark mode support

**Preview:** http://localhost:3000/dashboard
```

**❌ Bad (Technical perspective):**
```markdown
## 🎁 What You Get

- ✅ Created page.tsx successfully
- ✅ Imported recharts library
- ✅ Used Tailwind CSS classes
```

---

### Section 3: 👉 What You Need To Do

**Purpose:** Tell user EXACTLY what action they need to take

**Three scenarios:**

#### Scenario A: No action needed
```markdown
## 👉 What You Need To Do

### Right now:
Nothing! ✨ Just open http://localhost:3000/dashboard and check it out.

### Want to customize?
- Change colors: Tell me your preferred color scheme
- Add more charts: Tell me what data you want to visualize
```

#### Scenario B: User action required
```markdown
## 👉 What You Need To Do

### Right now:
1. **Run ngrok:** `ngrok http 3000`
2. **Copy the HTTPS URL** you get (e.g., https://abc123.ngrok.io)
3. **Tell me the URL** so I can configure the webhook

⚠️ **Why ngrok?** LINE webhooks require HTTPS. Ngrok creates a secure tunnel to your localhost.
```

#### Scenario C: Multiple options
```markdown
## 👉 What You Need To Do

### Choose your path:

**Option A: Use mock data first (Recommended)**
- Nothing to do! Open the preview and test the UI
- We'll connect real data later

**Option B: Connect Supabase now**
1. Create a project at https://supabase.com
2. Copy your API keys
3. Tell me "Ready to connect Supabase"

Which would you prefer?
```

---

## 🎯 Context-Specific Templates

### After Creating UI

```markdown
## ✅ What I Did

**Files created:**
- [list files with descriptions]

---

## 🎁 What You Get

- ✅ [Feature 1]
- ✅ [Feature 2]
- ✅ [Feature 3]

**Preview:** http://localhost:3000/[path]

---

## 👉 What You Need To Do

### Right now:
Open http://localhost:3000/[path] and check it out!

### Want changes?
- Different layout? Just describe what you want
- Different colors? Tell me your preference
```

---

### After Fixing a Bug

```markdown
## ✅ What I Fixed

**Problem:** [Description of the bug]
**Root cause:** [What was causing it]

**Files modified:**
- [list files with what changed]

---

## 🎁 Result

- ✅ [Problem] is now fixed
- ✅ [Any side benefits]

---

## 👉 What You Need To Do

### Right now:
Refresh the page (or hard refresh: Cmd+Shift+R) and test again.

### Still having issues?
Let me know and I'll investigate further.
```

---

### After Backend Integration

```markdown
## ✅ What I Did

**Integration:** [Supabase/API/etc.]

**Files created:**
- [list files]

**Environment variables needed:**
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your public API key

---

## 🎁 What You Get (after setup)

- ✅ [Feature 1]
- ✅ [Feature 2]

---

## 👉 What You Need To Do

### Step 1: Get your API keys
1. Go to https://supabase.com/dashboard
2. Open your project (or create one)
3. Go to Settings → API

### Step 2: Add to your project
Create/edit `.env.local` and add:
```
SUPABASE_URL=your_url_here
SUPABASE_ANON_KEY=your_key_here
```

### Step 3: Restart and test
1. Restart dev server: `npm run dev`
2. Test at http://localhost:3000/[path]

### Step 4: Let me know
Tell me "Keys are set" and I'll continue with the next step.
```

---

## ⚠️ Rules (MUST Follow)

### ALWAYS DO:
- ✅ Include all three sections in every completion response
- ✅ State clearly what user needs to do (even if it's "nothing")
- ✅ Provide preview URLs for UI work
- ✅ Explain WHY if user needs to do something non-obvious
- ✅ Anticipate follow-up questions and answer them preemptively

### NEVER DO:
- ❌ End with just "Done!" without the three sections
- ❌ Use technical jargon in "What You Get" section
- ❌ Leave user guessing what to do next
- ❌ Forget to mention required user actions (like running ngrok)
- ❌ Skip the preview URL when UI was created

---

## ✅ Pre-Response Checklist

Before sending ANY completion response, verify:

| Check | Question |
|-------|----------|
| □ | Did I include "✅ What I Did" section? |
| □ | Did I include "🎁 What You Get" section? |
| □ | Did I include "👉 What You Need To Do" section? |
| □ | Is "What You Get" written from USER perspective? |
| □ | Is "What You Need To Do" clear and actionable? |
| □ | If nothing needed, did I explicitly say "Nothing needed"? |
| □ | If preview exists, did I include the URL? |
| □ | Can user follow my instructions without asking questions? |

**If any check fails → Fix before sending!**

---

## 🌐 Language Adaptation

The response format sections should adapt to the project's language setting:

### English (Default)
- ✅ What I Did
- 🎁 What You Get  
- 👉 What You Need To Do

### Thai
- ✅ สิ่งที่ทำให้
- 🎁 สิ่งที่คุณได้
- 👉 สิ่งที่คุณต้องทำ

### Other Languages
Translate section headers while keeping the same structure.

---

## 🔗 Integration with Agents

ALL agents must:

1. **Load this skill** in their skills list
2. **Use this format** in PHASE 5: REPORT (or equivalent delivery phase)
3. **Never skip sections** even if they seem obvious

```yaml
# In agent file
skills:
  - response-format    # MANDATORY for all agents
  - [other skills...]
```

---

*Version 2.0.0 - Consolidated from response-format and response-excellence skills*
