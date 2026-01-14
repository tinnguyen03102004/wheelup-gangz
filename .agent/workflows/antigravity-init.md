---
description: Khởi tạo dự án AI Agent với cấu trúc Antigravity đầy đủ
---

# Antigravity Project Initialization

Khởi tạo một dự án AI Agent mới với cấu trúc Antigravity đầy đủ, bao gồm auto-discovery tools, context injection, và multi-agent swarm.

## Prerequisites
- Python 3.8+ installed
- Git installed
- Google Gemini API key (hoặc local LLM endpoint)

## Steps

### 1. Clone Template (Nếu Bắt Đầu Mới)
```powershell
# Clone Antigravity template
git clone https://github.com/study8677/antigravity-workspace-template.git my-agent-project
cd my-agent-project

# Remove git history
Remove-Item -Recurse -Force .git
git init
```

### 2. Setup cho Workspace Hiện Tại
```powershell
# Tạo cấu trúc thư mục Antigravity
New-Item -ItemType Directory -Force -Path ".antigravity"
New-Item -ItemType Directory -Force -Path ".context"
New-Item -ItemType Directory -Force -Path "artifacts/plans"
New-Item -ItemType Directory -Force -Path "artifacts/logs"
New-Item -ItemType Directory -Force -Path "artifacts/evidence"
New-Item -ItemType Directory -Force -Path "src/tools"
New-Item -ItemType Directory -Force -Path "src/agents"
```

### 3. Create Core Files

**Create `.antigravity/rules.md`:**
```markdown
# Antigravity Agent Rules

## Core Principles
1. **Artifact-First**: Create plan before coding
2. **Evidence-Based**: Save all outputs to artifacts/
3. **Auto-Discovery**: Tools in src/tools/ are auto-loaded
4. **Context-Aware**: Files in .context/ are auto-injected

## Workflow
1. Read mission.md for high-level goals
2. Create plan in artifacts/plans/
3. Execute with auto-discovered tools
4. Save evidence in artifacts/evidence/
5. Log all actions in artifacts/logs/

## Tool Development
- ALL parameters MUST have type hints
- Use Pydantic for complex inputs
- Google-style docstrings required
- Return type must be specified
```

**Create `mission.md`:**
```markdown
# Project Mission

## High-Level Goals
[Define your project's main objectives]

## Success Criteria
[What does success look like?]

## Constraints
[Technical, time, or resource constraints]

## Stakeholders
[Who cares about this project?]
```

**Create `.cursorrules`:**
```
# Antigravity IDE Configuration

## Context
This is an Antigravity workspace with:
- Auto-discovered tools in src/tools/
- Auto-injected context from .context/
- Artifact-first development protocol

## Rules
1. Read mission.md before starting any task
2. Create plan in artifacts/plans/ before coding
3. Save all evidence to artifacts/evidence/
4. Follow .antigravity/rules.md protocols
5. Use type hints and docstrings for all code

## Tool Development
When creating tools:
- Place in src/tools/
- Use Pydantic BaseModel for inputs
- Include Google-style docstrings
- Add type hints to all parameters
```

### 4. Create Python Environment
```powershell
# Create virtual environment
python -m venv venv

# Activate (Windows)
.\venv\Scripts\activate

# Create requirements.txt
@"
google-generativeai>=0.3.0
pydantic>=2.0.0
python-dotenv>=1.0.0
"@ | Out-File -FilePath requirements.txt -Encoding utf8

# Install dependencies
pip install -r requirements.txt
```

### 5. Create Environment Configuration
```powershell
# Create .env file
@"
# Google Gemini API
GOOGLE_API_KEY=your_api_key_here

# Or use local LLM
# OPENAI_BASE_URL=http://localhost:11434/v1
# OPENAI_API_KEY=ollama

# Agent Configuration
AGENT_MODEL=gemini-2.0-flash-exp
AGENT_TEMPERATURE=0.7
"@ | Out-File -FilePath .env -Encoding utf8
```

### 6. Create Basic Agent Structure

**Create `src/agent.py`:**
```python
"""
Main Antigravity Agent Entry Point
"""
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Load environment
load_dotenv()

# Add src to path
sys.path.insert(0, str(Path(__file__).parent))

def main():
    """Main agent loop"""
    print("🪐 Antigravity Agent Starting...")
    
    # TODO: Implement agent logic
    # - Load tools from src/tools/
    # - Load context from .context/
    # - Read mission.md
    # - Execute tasks
    
    print("✅ Agent initialized")

if __name__ == "__main__":
    main()
```

### 7. Create Example Tool

**Create `src/tools/example_tool.py`:**
```python
from typing import str
from pydantic import BaseModel, Field

class ExampleInput(BaseModel):
    """Input schema for example tool."""
    message: str = Field(..., description="Message to process")

def example_tool(input_data: ExampleInput) -> str:
    """
    Example tool demonstrating auto-discovery pattern.
    
    Args:
        input_data: Input parameters
        
    Returns:
        Processed message
        
    Example:
        >>> input_data = ExampleInput(message="Hello")
        >>> result = example_tool(input_data)
        >>> print(result)
        Processed: Hello
    """
    return f"Processed: {input_data.message}"
```

### 8. Create Example Context

**Create `.context/project-overview.md`:**
```markdown
# Project Overview

## Purpose
[What this project does]

## Architecture
[High-level architecture]

## Key Technologies
[Main tech stack]

## Design Principles
[Core design principles to follow]
```

### 9. Create .gitignore
```powershell
@"
# Python
venv/
__pycache__/
*.pyc
*.pyo
*.pyd
.Python

# Environment
.env
.env.local

# IDE
.vscode/
.idea/

# Artifacts (optional - commit if you want history)
artifacts/logs/*.log
artifacts/evidence/*.png

# OS
.DS_Store
Thumbs.db
"@ | Out-File -FilePath .gitignore -Encoding utf8
```

### 10. Verify Installation
```powershell
# Check structure
Get-ChildItem -Recurse -Depth 2 | Select-Object FullName

# Test Python environment
python --version
pip list

# Test agent (should run without errors)
python src/agent.py
```

## Project Structure After Init

```
project/
├── .antigravity/
│   └── rules.md              # Agent behavior rules
├── .context/                  # Auto-injected knowledge
│   └── project-overview.md
├── artifacts/                 # Agent outputs
│   ├── plans/
│   ├── logs/
│   └── evidence/
├── src/
│   ├── agent.py              # Main agent
│   ├── tools/                # Auto-discovered tools
│   │   └── example_tool.py
│   └── agents/               # Specialist agents
├── venv/                      # Python environment
├── .cursorrules              # IDE configuration
├── .env                       # Environment variables
├── .gitignore
├── mission.md                # Project mission
└── requirements.txt          # Python dependencies
```

## Next Steps

1. **Configure API Key**: Edit `.env` with your Google Gemini API key
2. **Define Mission**: Update `mission.md` with project goals
3. **Add Context**: Create context files in `.context/`
4. **Create Tools**: Build custom tools in `src/tools/`
5. **Run Agent**: Execute `python src/agent.py`

## Integration with VibeCoding

If using with VibeCoding:
1. Run `/init` to create `.vibecode/` structure
2. Antigravity and VibeCoding work together
3. Use VibeCoding for project management
4. Use Antigravity for AI agent execution

## Verification Checklist

- ✅ All directories created
- ✅ `.antigravity/rules.md` exists
- ✅ `mission.md` defined
- ✅ `.cursorrules` configured
- ✅ Python environment activated
- ✅ Dependencies installed
- ✅ `.env` configured
- ✅ Example tool created
- ✅ Agent runs without errors

## Troubleshooting

**Python not found:**
```powershell
# Install Python from python.org
# Or use winget
winget install Python.Python.3.12
```

**pip install fails:**
```powershell
# Upgrade pip
python -m pip install --upgrade pip
```

**Agent import errors:**
```powershell
# Ensure you're in venv
.\venv\Scripts\activate
# Reinstall dependencies
pip install -r requirements.txt
```
