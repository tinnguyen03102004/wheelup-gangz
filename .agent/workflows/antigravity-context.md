---
description: Add context files to Antigravity workspace for auto-injection into agent prompts
---

# Antigravity Context Management

Add knowledge files to `.context/` directory for automatic injection into every agent prompt.

## Prerequisites
- Antigravity workspace initialized
- Understanding of what domain knowledge the agent needs

## What is Context Auto-Injection?

**Concept**: Files in `.context/` are automatically loaded and injected into EVERY agent prompt, giving the agent persistent domain knowledge without manual copying.

**Benefits:**
- 🧠 Agent remembers project context
- 📚 Domain knowledge always available
- 🔄 Update once, applies everywhere
- 💾 Reduces token waste from repetition

## Steps

### 1. Identify Knowledge Gaps

Ask yourself:
- What does the agent keep forgetting?
- What do I explain repeatedly?
- What are the project's core principles?
- What constraints must always be followed?

### 2. Create Context Files
```powershell
# Create context directory if not exists
New-Item -ItemType Directory -Force -Path ".context"

# Create context files
New-Item -ItemType File -Path ".context/project-overview.md"
New-Item -ItemType File -Path ".context/technical-stack.md"
New-Item -ItemType File -Path ".context/design-principles.md"
```

### 3. Context File Templates

**Project Overview:**
```markdown
# Project Overview

## Project Name
[Your project name]

## Purpose
[What this project does and why it exists]

## Target Audience
[Who uses this project]

## Key Features
1. Feature 1
2. Feature 2
3. Feature 3

## Success Metrics
- Metric 1: [Target]
- Metric 2: [Target]

## Current Status
[Development stage, version, etc.]
```

**Technical Stack:**
```markdown
# Technical Stack

## Languages
- Primary: [Language + version]
- Secondary: [Language + version]

## Frameworks & Libraries
- Framework: [Name + version]
- Library 1: [Name + version]
- Library 2: [Name + version]

## Tools & Services
- Build: [Tool name]
- Testing: [Tool name]
- Deployment: [Platform]
- CI/CD: [Service]

## Development Environment
- OS: [Operating system]
- IDE: [Preferred IDE]
- Package Manager: [npm, pip, etc.]

## Dependencies
[List critical dependencies and their purposes]
```

**Design Principles:**
```markdown
# Design Principles

## Core Values
1. **[Principle 1]**: [Explanation]
2. **[Principle 2]**: [Explanation]
3. **[Principle 3]**: [Explanation]

## Code Style
- Naming: [Convention]
- Formatting: [Standard]
- Comments: [When and how]

## Architecture Patterns
- Pattern 1: [When to use]
- Pattern 2: [When to use]

## Best Practices
- Practice 1
- Practice 2
- Practice 3

## Anti-Patterns (Avoid)
- ❌ Anti-pattern 1
- ❌ Anti-pattern 2
```

### 4. Specialized Context Examples

**API Documentation:**
```markdown
# API Documentation

## Base URL
`https://api.example.com/v1`

## Authentication
- Type: Bearer Token
- Header: `Authorization: Bearer {token}`

## Endpoints

### GET /users
Retrieve user list
- Auth: Required
- Rate Limit: 100/hour

**Response:**
\`\`\`json
{
  "users": [...],
  "total": 42
}
\`\`\`

### POST /users
Create new user
- Auth: Required
- Body: `{ "name": "...", "email": "..." }`
```

**Database Schema:**
```markdown
# Database Schema

## Users Table
\`\`\`sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

## Relationships
- User has many Posts
- Post belongs to User
- Post has many Comments

## Indexes
- `users.email` (unique)
- `posts.user_id`
- `posts.created_at`
```

**Business Rules:**
```markdown
# Business Rules

## User Management
1. Email must be unique
2. Passwords must be 8+ characters
3. Users can delete their own account only

## Content Moderation
1. Posts require approval if user is new (<7 days)
2. Comments can be flagged by any user
3. 3 flags = automatic hide pending review

## Pricing
- Free tier: 100 requests/day
- Pro tier: 10,000 requests/day
- Enterprise: Unlimited
```

### 5. Context Organization Strategies

**By Domain:**
```
.context/
├── business/
│   ├── rules.md
│   ├── workflows.md
│   └── stakeholders.md
├── technical/
│   ├── architecture.md
│   ├── stack.md
│   └── deployment.md
└── design/
    ├── principles.md
    ├── components.md
    └── brand.md
```

**By Role:**
```
.context/
├── developer.md      # Technical context
├── designer.md       # Design context
├── product.md        # Product context
└── operations.md     # Ops context
```

**By Feature:**
```
.context/
├── authentication.md
├── payment.md
├── notifications.md
└── analytics.md
```

### 6. Context Best Practices

✅ **Do:**
- Keep files focused and modular
- Use clear markdown formatting
- Include examples where helpful
- Update when requirements change
- Use tables for structured data
- Add diagrams (ASCII or mermaid)

❌ **Don't:**
- Create massive monolithic files
- Include temporary information
- Duplicate content across files
- Use vague descriptions
- Store sensitive data (API keys, passwords)
- Include code (use for knowledge only)

### 7. Context File Size Guidelines

| File Type | Recommended Size | Max Size |
|-----------|------------------|----------|
| Overview | 200-500 words | 1000 words |
| Technical | 300-800 words | 1500 words |
| API Docs | 500-1000 words | 2000 words |
| Business Rules | 200-600 words | 1200 words |

**Why?** Larger files dilute focus and waste tokens.

### 8. Dynamic Context (Advanced)

For context that changes frequently, use templates:

**Create `.context/templates/feature-template.md`:**
```markdown
# Feature: {FEATURE_NAME}

## Status
{STATUS}

## Description
{DESCRIPTION}

## Implementation
{IMPLEMENTATION_NOTES}

## Dependencies
{DEPENDENCIES}
```

Generate actual context files from templates as needed.

### 9. Verify Context Loading

**Test context injection:**
1. Add a unique phrase to a context file
2. Ask agent about that phrase
3. Agent should reference it without you mentioning it

**Example:**
```markdown
# .context/test.md
The secret code is BANANA-42.
```

Ask agent: "What's the secret code?"
Expected: "BANANA-42" (without you mentioning it)

### 10. Context Maintenance

**Weekly:**
- Review context files for accuracy
- Remove outdated information
- Add new learnings

**Monthly:**
- Reorganize if structure is unclear
- Consolidate duplicate information
- Archive old context to `artifacts/`

**Per Release:**
- Update technical stack versions
- Document new features
- Update business rules

## Context vs. Other Files

| File Type | Purpose | Auto-Injected? |
|-----------|---------|----------------|
| `.context/*.md` | Domain knowledge | ✅ Yes |
| `.antigravity/rules.md` | Agent behavior | ✅ Yes |
| `mission.md` | Project goals | 🔶 Manual |
| `artifacts/plans/*.md` | Task plans | ❌ No |
| `README.md` | Human docs | ❌ No |

## Example: Complete Web Project Context

**Minimal Setup (3 files):**
```
.context/
├── overview.md          # What the project is
├── tech-stack.md        # Technologies used
└── design-system.md     # Design guidelines
```

**Standard Setup (5-7 files):**
```
.context/
├── overview.md
├── tech-stack.md
├── design-system.md
├── api-docs.md
├── business-rules.md
├── deployment.md
└── troubleshooting.md
```

**Enterprise Setup (10+ files):**
```
.context/
├── business/
│   ├── rules.md
│   ├── workflows.md
│   └── compliance.md
├── technical/
│   ├── architecture.md
│   ├── stack.md
│   ├── database.md
│   └── apis.md
├── design/
│   ├── system.md
│   ├── components.md
│   └── brand.md
└── operations/
    ├── deployment.md
    ├── monitoring.md
    └── security.md
```

## Verification Checklist

After adding context:
- ✅ Files in `.context/` directory
- ✅ Markdown formatted
- ✅ No sensitive data
- ✅ Clear, focused content
- ✅ Examples included
- ✅ Agent references context in responses

## Troubleshooting

**Agent ignores context:**
- Check file is in `.context/`
- Verify file is valid markdown
- Reduce file size if too large
- Make content more specific

**Context conflicts:**
- Remove duplicate information
- Organize by priority
- Use clear headings

**Too much context:**
- Split into smaller files
- Remove outdated info
- Focus on essential knowledge

## Next Steps

- Create initial context files
- Test context injection
- Refine based on agent responses
- Document context maintenance process
