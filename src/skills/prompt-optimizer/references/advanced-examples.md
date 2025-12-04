# Advanced Prompt Engineering Examples

This reference provides complex, real-world examples of prompt optimization for specialized scenarios. Load this when encountering sophisticated prompt engineering challenges beyond basic optimization.

## Complex Multi-Part Prompts

### Example: Multi-Stage Research Assistant

**Before:**
```
Help me research this topic and write a report
```

**After:**
```
Multi-stage research and report generation process:

**Stage 1: Research Planning**
- Analyze the topic and identify 5-7 key research questions
- Propose search strategies and source types
- Outline expected findings structure

**Stage 2: Information Gathering**
- Search for authoritative sources on each research question
- For each source, note: credibility indicators, key claims, supporting evidence
- Flag contradicting information for deeper investigation

**Stage 3: Synthesis & Analysis**
- Identify patterns and themes across sources
- Evaluate strength of evidence for major claims
- Note gaps in available information
- Form preliminary conclusions with confidence levels

**Stage 4: Report Drafting**
Structure:
1. Executive Summary (200 words)
   - Key findings with confidence indicators
   - Main recommendations
2. Methodology (150 words)
   - Research approach
   - Source selection criteria
   - Limitations
3. Detailed Findings (800-1000 words)
   - Organize by research question or theme
   - Present evidence systematically
   - Include counterarguments where relevant
4. Conclusions & Recommendations (200-300 words)
   - Synthesis of findings
   - Actionable recommendations
   - Suggested further research

**Quality Standards:**
- Cite sources for all factual claims
- Distinguish between well-established facts and emerging research
- Flag assumptions and uncertainties explicitly
- Maintain neutral, analytical tone
- Verify internal consistency

**Output Format:**
Present Stage 1 planning for approval before proceeding. After approval, execute Stages 2-4 and present complete report with citations.
```

**Optimization rationale:**
- Breaks complex task into manageable stages
- Provides checkpoint for user input
- Clear quality standards throughout
- Structured output with specific requirements
- Built-in validation and verification

---

## Prompts with Conditional Logic

### Example: Adaptive Code Review System

**Before:**
```
Review my code
```

**After:**
```
Adaptive Code Review Process

**Step 1: Context Detection**

Analyze the code to determine:
- Programming language and version
- Framework/libraries used
- Apparent purpose (webapp, script, library, etc.)
- Code maturity (prototype vs. production-ready)
- Test coverage status

**Step 2: Review Path Selection**

**IF** code is a prototype/POC:
→ Focus on: Architecture decisions, scalability concerns, tech stack fit
→ De-emphasize: Minor style issues, premature optimization
→ Tone: Exploratory, suggesting alternatives

**ELSE IF** code appears production-bound:
→ Focus on: Security, performance, error handling, maintainability
→ Include: Specific fixes for all issues
→ Tone: Rigorous, detail-oriented

**ELSE IF** code is a library/framework:
→ Focus on: API design, documentation, backward compatibility, edge cases
→ Include: Usage examples and potential misuse scenarios
→ Tone: API-consumer perspective

**Step 3: Specialized Checks by Language**

**For Python:**
- Type hints coverage and correctness
- PEP 8 compliance
- Exception handling patterns
- Resource management (context managers)
- Async/await usage if applicable

**For JavaScript/TypeScript:**
- Type safety (TypeScript) or JSDoc (JavaScript)
- Promise handling and error propagation
- Memory leak potential
- Bundle size implications
- Browser compatibility if web-targeted

**For [Other Languages]:**
[Language-specific patterns]
```

**Optimization rationale:**
- Adapts review depth and focus based on code context
- Language-specific analysis
- Conditional logic for different code maturity levels
- Structured, comprehensive output
- Balances thoroughness with relevance

---

## When to Use Advanced Patterns

Load and apply these advanced patterns when:

1. **Multi-stage processes** - User needs prompts for complex, sequential tasks
2. **Conditional logic** - Output should vary based on input characteristics
3. **Domain expertise** - Specialized fields (medical, legal, technical) with specific requirements
4. **Safety-critical applications** - Mental health, child safety, medical advice, etc.
5. **Ambiguous requests** - Need to clarify before optimizing
6. **Poorly structured input** - Significant transformation needed
7. **Multi-modal** - Combining text with images, code, or other formats
8. **Sensitive topics** - Requiring careful handling and safety protocols
9. **Cross-cultural** - Non-English or culturally specific contexts
10. **Conflicting requirements** - Need to negotiate trade-offs

These patterns complement the core SKILL.md framework for handling sophisticated optimization scenarios.
