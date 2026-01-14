# Antigravity Workflows for WheelUp Gangz

This directory contains workflows for integrating **Antigravity workspace template** into your current project.

## 🌟 What is Antigravity?

Antigravity is a production-grade framework for building autonomous AI agents with:
- 🧠 **Infinite Memory**: Recursive summarization for context management
- 🛠️ **Auto-Discovery**: Tools in `src/tools/` are automatically loaded
- 📚 **Context Injection**: Files in `.context/` are auto-injected into prompts
- 🔌 **MCP Integration**: Connect to external tools seamlessly
- 🤖 **Multi-Agent Swarm**: Coordinate specialist agents for complex tasks
- 📦 **Artifact-First**: All outputs saved to `artifacts/`

## 📋 Available Workflows

### Core Workflows

| Workflow | Command | Purpose |
|----------|---------|---------|
| **Init** | `/antigravity-init` | Initialize new AI agent project from scratch |
| **Setup** | `/antigravity-setup` | Add Antigravity structure to existing project |
| **Tool** | `/antigravity-tool` | Create auto-discovered Python tools |
| **Context** | `/antigravity-context` | Add auto-injected context files |
| **Swarm** | `/antigravity-swarm` | Run multi-agent swarm orchestration |

### Web Development Workflows

| Workflow | Command | Purpose |
|----------|---------|---------|
| **Web Tool** | `/antigravity-web-tool` | Create web development tools |
| **Web Context** | `/antigravity-web-context` | Add web-specific context files |

## 🚀 Quick Start

### For New AI Agent Projects

```powershell
# Use the init workflow
/antigravity-init

# This creates complete structure:
# - .antigravity/rules.md
# - .context/ directory
# - artifacts/ directory
# - src/tools/ and src/agents/
# - Python environment
# - Configuration files
```

### For Existing Projects (Like This One)

```powershell
# Use the setup workflow
/antigravity-setup

# This adds Antigravity structure to current project
# without disrupting existing files
```

## 📁 Project Structure After Setup

```
wheelup-gangz/
├── .agent/
│   └── workflows/              # Workflow definitions
├── .antigravity/
│   └── rules.md               # Antigravity-specific rules
├── .context/                   # Auto-injected knowledge base
│   ├── design-system.md
│   ├── brand-guidelines.md
│   ├── technical-constraints.md
│   └── seo-requirements.md
├── artifacts/                  # AI outputs
│   ├── plans/                 # Task plans
│   ├── logs/                  # Execution logs
│   ├── evidence/              # Screenshots, proofs
│   └── swarm/                 # Multi-agent outputs
├── src/                        # Source code (if using Python)
│   ├── tools/                 # Auto-discovered tools
│   └── agents/                # Specialist agents
├── mission.md                 # High-level project goals
├── .cursorrules               # IDE configuration
└── [existing project files]
```

## 🎯 Workflow Usage Guide

### 1. Initialize Workspace

**When**: Starting a new AI agent project

```powershell
/antigravity-init
```

**What it does**:
- Creates complete Antigravity structure
- Sets up Python environment
- Creates configuration files
- Adds example tools and context

### 2. Setup Existing Project

**When**: Adding Antigravity to existing project (like this web project)

```powershell
/antigravity-setup
```

**What it does**:
- Creates `.antigravity/`, `.context/`, `artifacts/` directories
- Adds `mission.md` and `.cursorrules`
- Preserves existing project structure

### 3. Create Tools

**When**: Need custom functionality for the agent

```powershell
/antigravity-tool
```

**Example**: Create a color palette generator
```python
# src/tools/color_palette.py
from pydantic import BaseModel, Field

class ColorPaletteInput(BaseModel):
    base_color: str = Field(..., description="Hex color code")
    count: int = Field(5, description="Number of colors")

def generate_color_palette(input_data: ColorPaletteInput) -> str:
    """Generate harmonious color palette."""
    # Implementation
    return '{"colors": ["#FF5733", "#FF8D33", ...]}'
```

**For web development tools**:
```powershell
/antigravity-web-tool
```

### 4. Add Context

**When**: Agent needs domain knowledge

```powershell
/antigravity-context
```

**Example**: Add design system context
```markdown
# .context/design-system.md

## Color Palette
- Primary: #FF5733
- Secondary: #33C3FF

## Typography
- Headings: 'Outfit', sans-serif
- Body: 'Inter', sans-serif
```

**For web-specific context**:
```powershell
/antigravity-web-context
```

### 5. Run Multi-Agent Swarm

**When**: Complex task needs multiple specialists

```powershell
/antigravity-swarm
```

**Example**: Build authentication system
```python
from src.swarm import SwarmOrchestrator

swarm = SwarmOrchestrator()
result = swarm.execute("""
Build user authentication with:
- Login/logout
- Password hashing
- Session management
- Tests
- Documentation
""")
```

## 🔄 Integration with VibeCoding

Antigravity workflows integrate seamlessly with VibeCoding:

| Phase | VibeCoding | Antigravity |
|-------|------------|-------------|
| **Planning** | `/start`, `/lock` | Create `mission.md` |
| **Context** | `.vibecode/prds/` | `.context/` files |
| **Execution** | `/build` | `/antigravity-swarm` |
| **Evidence** | `.vibecode/evidence/` | `artifacts/evidence/` |
| **Tools** | Manual | Auto-discovered |

**Combined Workflow**:
```powershell
# 1. VibeCoding planning
/start
/lock

# 2. Setup Antigravity
/antigravity-setup

# 3. Add context
/antigravity-context

# 4. Execute with swarm
/antigravity-swarm

# 5. VibeCoding review
/review
```

## 🎨 Web Development Use Cases

### Use Case 1: Design System Generator

**Goal**: Generate complete design system from brand colors

**Steps**:
1. Create tool: `/antigravity-web-tool`
2. Implement `generate_design_system.py`
3. Add brand context: `/antigravity-web-context`
4. Run: Agent generates CSS variables, color palettes, typography

### Use Case 2: SEO Optimization

**Goal**: Optimize website for SEO

**Steps**:
1. Add SEO context to `.context/seo-requirements.md`
2. Create SEO validation tool
3. Run swarm: Research → Audit → Fix → Validate → Document

### Use Case 3: Component Library

**Goal**: Build reusable component library

**Steps**:
1. Add component specs to `.context/component-library.md`
2. Create component generator tool
3. Run swarm: Design → Code → Test → Document

## 📚 Best Practices

### Context Management
- ✅ Keep context files focused (200-800 words)
- ✅ Update context when requirements change
- ✅ Use clear markdown formatting
- ❌ Don't store sensitive data in context
- ❌ Don't duplicate information

### Tool Development
- ✅ Use type hints for ALL parameters
- ✅ Use Pydantic for complex inputs
- ✅ Include Google-style docstrings
- ✅ Add usage examples
- ❌ No missing type hints
- ❌ No unclear parameter names

### Swarm Orchestration
- ✅ Use for complex multi-step tasks
- ✅ Define clear success criteria
- ✅ Save all artifacts
- ❌ Don't use for simple tasks
- ❌ Don't skip planning phase

## 🔧 Troubleshooting

### Tools Not Auto-Discovered

**Problem**: Tool in `src/tools/` not loading

**Solutions**:
- Check file is in `src/tools/` directory
- Verify all type hints present
- Ensure Pydantic model used for input
- Restart agent

### Context Not Injected

**Problem**: Agent doesn't reference context files

**Solutions**:
- Check files in `.context/` directory
- Verify valid markdown format
- Reduce file size if too large
- Make content more specific

### Swarm Fails

**Problem**: Multi-agent swarm doesn't complete

**Solutions**:
- Make task description more specific
- Provide more context
- Check agent system prompts
- Review swarm logs in `artifacts/swarm/`

## 📖 Additional Resources

### Official Documentation
- [Antigravity Template Repo](https://github.com/study8677/antigravity-workspace-template)
- [Quick Start Guide](https://github.com/study8677/antigravity-workspace-template/blob/main/docs/en/QUICK_START.md)
- [Philosophy](https://github.com/study8677/antigravity-workspace-template/blob/main/docs/en/PHILOSOPHY.md)
- [MCP Integration](https://github.com/study8677/antigravity-workspace-template/blob/main/docs/en/MCP_INTEGRATION.md)
- [Swarm Protocol](https://github.com/study8677/antigravity-workspace-template/blob/main/docs/en/SWARM_PROTOCOL.md)

### VibeCoding Integration
- See `GEMINI.md` for VibeCoding + Antigravity rules
- Use `/help` for all available commands
- Check `.vibecode/` for project state

## 🎯 Next Steps

1. **Choose your path**:
   - New AI agent project → `/antigravity-init`
   - Existing project → `/antigravity-setup`

2. **Add knowledge**:
   - Create context files → `/antigravity-context`
   - For web projects → `/antigravity-web-context`

3. **Build tools**:
   - Create custom tools → `/antigravity-tool`
   - For web tools → `/antigravity-web-tool`

4. **Execute complex tasks**:
   - Run multi-agent swarm → `/antigravity-swarm`

5. **Integrate with VibeCoding**:
   - Use VibeCoding for project management
   - Use Antigravity for AI execution
   - Combine for maximum productivity

---

**Version**: 1.0.0  
**Based on**: [antigravity-workspace-template](https://github.com/study8677/antigravity-workspace-template)  
**Last Updated**: 2026-01-14
