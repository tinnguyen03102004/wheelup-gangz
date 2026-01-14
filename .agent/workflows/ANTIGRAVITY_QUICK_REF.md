# Antigravity Quick Reference

## 🎯 One-Line Summary
**Antigravity** = Auto-discovered tools + Auto-injected context + Multi-agent swarm for AI agents

---

## 📋 Workflow Commands

| Command | When to Use | What It Does |
|---------|-------------|--------------|
| `/antigravity-init` | New AI agent project | Full setup from scratch |
| `/antigravity-setup` | Existing project | Add Antigravity structure |
| `/antigravity-tool` | Need custom tool | Create auto-discovered Python tool |
| `/antigravity-context` | Need domain knowledge | Add auto-injected context files |
| `/antigravity-swarm` | Complex multi-step task | Run multi-agent orchestration |
| `/antigravity-web-tool` | Web development tool | Create web-specific tools |
| `/antigravity-web-context` | Web project context | Add web design/SEO context |

---

## 🏗️ Directory Structure

```
project/
├── .antigravity/rules.md      # Agent behavior rules
├── .context/                   # Auto-injected (every prompt)
│   ├── design-system.md
│   ├── tech-stack.md
│   └── business-rules.md
├── artifacts/                  # AI outputs
│   ├── plans/                 # Task plans
│   ├── logs/                  # Execution logs
│   ├── evidence/              # Screenshots
│   └── swarm/                 # Multi-agent results
├── src/
│   ├── tools/                 # Auto-discovered
│   └── agents/                # Specialist agents
└── mission.md                 # Project goals
```

---

## 🛠️ Tool Template (Copy-Paste)

```python
from pydantic import BaseModel, Field

class MyToolInput(BaseModel):
    """Input schema."""
    param: str = Field(..., description="Parameter description")

def my_tool(input_data: MyToolInput) -> str:
    """
    Tool description.
    
    Args:
        input_data: Input parameters
        
    Returns:
        Result description
    """
    return f"Result: {input_data.param}"
```

**Requirements**: Type hints + Pydantic + Docstring + Field descriptions

---

## 📚 Context Template (Copy-Paste)

```markdown
# Context Title

## Section 1
- Point 1
- Point 2

## Section 2
- Point 1
- Point 2

## Examples
[Concrete examples]
```

**Best Practices**: 200-800 words, focused, no sensitive data

---

## 🤖 Swarm Usage

```python
from src.swarm import SwarmOrchestrator

swarm = SwarmOrchestrator()
result = swarm.execute("Complex task description")
```

**Agents Available**:
- Router (task decomposition)
- Coder (implementation)
- Reviewer (code review)
- Researcher (information gathering)
- Designer (UI/UX)
- Tester (QA)
- Documenter (docs)

---

## ✅ Quick Checklist

### After `/antigravity-setup`:
- [ ] `.antigravity/rules.md` exists
- [ ] `.context/` directory created
- [ ] `artifacts/` directory created
- [ ] `mission.md` defined

### After Creating Tool:
- [ ] File in `src/tools/`
- [ ] Type hints on ALL parameters
- [ ] Pydantic model for input
- [ ] Docstring with example
- [ ] Test passes

### After Adding Context:
- [ ] File in `.context/`
- [ ] Valid markdown
- [ ] 200-800 words
- [ ] No sensitive data
- [ ] Agent references it

---

## 🔥 Common Patterns

### Pattern 1: Simple Tool
```python
def tool_name(input_data: Input) -> str:
    return f"Processed: {input_data.value}"
```

### Pattern 2: Web Tool
```python
def generate_css(input_data: CSSInput) -> str:
    return f":root {{ --color: {input_data.color}; }}"
```

### Pattern 3: Sequential Swarm
```
Research → Design → Code → Test → Review → Document
```

### Pattern 4: Parallel Swarm
```
        ┌─→ Feature A ─┐
Task ──→├─→ Feature B ─┼─→ Integrate
        └─→ Feature C ─┘
```

---

## 🚨 Common Mistakes

| Mistake | Fix |
|---------|-----|
| No type hints | Add type hints to ALL parameters |
| Missing docstring | Add Google-style docstring |
| Tool not discovered | Check file in `src/tools/` |
| Context not injected | Check file in `.context/` |
| Swarm fails | Make task more specific |

---

## 🎯 Decision Tree

**Need to...**

- **Start new AI agent project?** → `/antigravity-init`
- **Add to existing project?** → `/antigravity-setup`
- **Create custom functionality?** → `/antigravity-tool`
- **Give agent domain knowledge?** → `/antigravity-context`
- **Tackle complex task?** → `/antigravity-swarm`
- **Build web tools?** → `/antigravity-web-tool`
- **Add web context?** → `/antigravity-web-context`

---

## 📖 Full Documentation

See `ANTIGRAVITY_README.md` for complete guide.

---

**Quick Start**: `/antigravity-setup` → `/antigravity-context` → `/antigravity-tool` → Code!
