---
description: Setup Antigravity workspace structure for current project
---

# Antigravity Workspace Setup

This workflow initializes the Antigravity workspace structure for the current project.

## Prerequisites
- Python 3.8+ installed
- Git installed
- Current workspace is a web project (HTML/CSS/JS)

## Steps

### 1. Create Directory Structure
```powershell
# Create core Antigravity directories
New-Item -ItemType Directory -Force -Path ".antigravity"
New-Item -ItemType Directory -Force -Path ".context"
New-Item -ItemType Directory -Force -Path "artifacts/plans"
New-Item -ItemType Directory -Force -Path "artifacts/logs"
New-Item -ItemType Directory -Force -Path "artifacts/evidence"
New-Item -ItemType Directory -Force -Path "src/tools"
New-Item -ItemType Directory -Force -Path "src/agents"
```

### 2. Create Antigravity Rules File
Create `.antigravity/rules.md` with project-specific rules and context.

### 3. Create Mission File
Create `mission.md` at project root defining high-level goals.

### 4. Create Context Files
Add domain knowledge files to `.context/` directory:
- `web-design-principles.md` - Design guidelines
- `project-requirements.md` - Project requirements
- `tech-stack.md` - Technology stack documentation

### 5. Setup Python Environment (Optional)
If you need Python-based tools:
```powershell
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

### 6. Create .cursorrules (IDE Integration)
Create `.cursorrules` file to auto-configure IDE behavior.

## What Gets Created

```
project/
├── .agent/workflows/          # Workflow definitions
├── .antigravity/
│   └── rules.md              # Antigravity-specific rules
├── .context/                  # Auto-injected knowledge base
│   ├── web-design-principles.md
│   ├── project-requirements.md
│   └── tech-stack.md
├── artifacts/                 # AI outputs
│   ├── plans/
│   ├── logs/
│   └── evidence/
├── src/                       # Source code
│   ├── tools/                # Auto-discovered tools
│   └── agents/               # Specialist agents
├── mission.md                # High-level project goals
└── .cursorrules              # IDE configuration
```

## Verification

After setup, verify:
1. All directories exist
2. `.antigravity/rules.md` contains project rules
3. `mission.md` defines project goals
4. `.context/` has at least one knowledge file

## Next Steps

After setup:
- Use `/antigravity-tool` to create custom tools
- Use `/antigravity-context` to add knowledge files
- Use `/antigravity-swarm` for multi-agent tasks
