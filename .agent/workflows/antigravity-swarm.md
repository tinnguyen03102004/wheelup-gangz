---
description: Run multi-agent swarm for complex task decomposition (Antigravity)
---

# Antigravity Multi-Agent Swarm

Orchestrate multiple specialist agents to tackle complex tasks through decomposition and collaboration.

## Prerequisites
- Antigravity workspace initialized
- Python environment activated
- Understanding of the complex task to decompose

## What is Multi-Agent Swarm?

**Concept**: Instead of one agent doing everything, decompose complex tasks into subtasks and assign each to a specialist agent.

**Architecture:**
```
User Task
    ↓
Router Agent (Orchestrator)
    ├─→ Coder Agent (Writes code)
    ├─→ Reviewer Agent (Reviews code)
    ├─→ Researcher Agent (Gathers info)
    ├─→ Designer Agent (Creates UI)
    └─→ Tester Agent (Validates)
         ↓
    Synthesizer (Combines results)
         ↓
    Final Output
```

## When to Use Swarm

✅ **Use Swarm When:**
- Task has multiple distinct phases
- Different expertise needed (code + design + docs)
- Quality requires review/validation
- Research needed before execution
- Complex multi-step workflows

❌ **Don't Use Swarm When:**
- Simple single-step tasks
- Time-sensitive quick fixes
- Exploratory prototyping
- Learning/experimentation

## Steps

### 1. Define the Complex Task

**Example Tasks:**
- "Build a complete authentication system with tests and docs"
- "Create a landing page with design system and SEO optimization"
- "Refactor legacy code with migration plan and rollback strategy"

**Task Template:**
```markdown
# Task: [Task Name]

## Objective
[What needs to be accomplished]

## Deliverables
1. [Deliverable 1]
2. [Deliverable 2]
3. [Deliverable 3]

## Constraints
- [Constraint 1]
- [Constraint 2]

## Success Criteria
- [Criterion 1]
- [Criterion 2]
```

### 2. Create Swarm Configuration

**Create `src/swarm.py`:**
```python
"""
Multi-Agent Swarm Orchestrator
"""
from typing import List, Dict, Any
from dataclasses import dataclass
import json

@dataclass
class Agent:
    """Specialist agent definition."""
    name: str
    role: str
    expertise: str
    system_prompt: str

class SwarmOrchestrator:
    """Orchestrates multiple specialist agents."""
    
    def __init__(self):
        self.agents = self._initialize_agents()
        self.results = {}
    
    def _initialize_agents(self) -> Dict[str, Agent]:
        """Initialize specialist agents."""
        return {
            "router": Agent(
                name="Router",
                role="Task Decomposition",
                expertise="Breaking down complex tasks",
                system_prompt="You decompose complex tasks into subtasks."
            ),
            "coder": Agent(
                name="Coder",
                role="Implementation",
                expertise="Writing clean, efficient code",
                system_prompt="You write production-ready code."
            ),
            "reviewer": Agent(
                name="Reviewer",
                role="Code Review",
                expertise="Finding bugs and improvements",
                system_prompt="You review code for quality and correctness."
            ),
            "researcher": Agent(
                name="Researcher",
                role="Information Gathering",
                expertise="Finding relevant information",
                system_prompt="You research and synthesize information."
            ),
            "designer": Agent(
                name="Designer",
                role="UI/UX Design",
                expertise="Creating beautiful interfaces",
                system_prompt="You design stunning user interfaces."
            ),
            "tester": Agent(
                name="Tester",
                role="Quality Assurance",
                expertise="Testing and validation",
                system_prompt="You ensure code works correctly."
            ),
            "documenter": Agent(
                name="Documenter",
                role="Documentation",
                expertise="Writing clear documentation",
                system_prompt="You create comprehensive documentation."
            )
        }
    
    def execute(self, task: str) -> Dict[str, Any]:
        """
        Execute task using multi-agent swarm.
        
        Args:
            task: Complex task description
            
        Returns:
            Dictionary with results from each agent
        """
        print(f"🪐 Swarm executing: {task}")
        
        # Phase 1: Decompose task
        subtasks = self._decompose_task(task)
        print(f"📋 Decomposed into {len(subtasks)} subtasks")
        
        # Phase 2: Route to specialists
        for subtask in subtasks:
            agent_name = self._route_subtask(subtask)
            result = self._execute_subtask(agent_name, subtask)
            self.results[subtask['id']] = result
        
        # Phase 3: Synthesize results
        final_result = self._synthesize_results()
        
        # Phase 4: Save artifacts
        self._save_artifacts(task, final_result)
        
        return final_result
    
    def _decompose_task(self, task: str) -> List[Dict]:
        """Decompose complex task into subtasks."""
        # Use Router agent to break down task
        # This would call LLM with router's system prompt
        return [
            {"id": "research", "description": "Research requirements", "agent": "researcher"},
            {"id": "design", "description": "Create design", "agent": "designer"},
            {"id": "implement", "description": "Write code", "agent": "coder"},
            {"id": "test", "description": "Test implementation", "agent": "tester"},
            {"id": "review", "description": "Review code", "agent": "reviewer"},
            {"id": "document", "description": "Write docs", "agent": "documenter"}
        ]
    
    def _route_subtask(self, subtask: Dict) -> str:
        """Route subtask to appropriate agent."""
        return subtask.get("agent", "coder")
    
    def _execute_subtask(self, agent_name: str, subtask: Dict) -> str:
        """Execute subtask with specialist agent."""
        agent = self.agents.get(agent_name)
        print(f"  🤖 {agent.name} working on: {subtask['description']}")
        
        # This would call LLM with agent's system prompt
        # For now, return placeholder
        return f"[{agent.name}] Completed: {subtask['description']}"
    
    def _synthesize_results(self) -> Dict[str, Any]:
        """Combine results from all agents."""
        return {
            "status": "completed",
            "results": self.results,
            "summary": "All subtasks completed successfully"
        }
    
    def _save_artifacts(self, task: str, result: Dict):
        """Save swarm execution artifacts."""
        import os
        from datetime import datetime
        
        # Create artifacts directory
        os.makedirs("artifacts/swarm", exist_ok=True)
        
        # Save execution log
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        log_file = f"artifacts/swarm/swarm_{timestamp}.json"
        
        with open(log_file, 'w') as f:
            json.dump({
                "task": task,
                "timestamp": timestamp,
                "result": result
            }, f, indent=2)
        
        print(f"📁 Artifacts saved to: {log_file}")

# Example usage
if __name__ == "__main__":
    swarm = SwarmOrchestrator()
    result = swarm.execute("Build a user authentication system")
    print(json.dumps(result, indent=2))
```

### 3. Define Specialist Agents

**Create `src/agents/coder_agent.py`:**
```python
"""Coder Agent - Writes production-ready code."""

SYSTEM_PROMPT = """
You are a Coder Agent specializing in writing clean, efficient code.

Your responsibilities:
1. Write production-ready code
2. Follow best practices and design patterns
3. Include error handling
4. Add inline comments for complex logic
5. Use type hints (Python) or types (TypeScript)

Your output format:
- File path
- Complete code
- Brief explanation of approach
"""

def execute(task: str, context: dict) -> str:
    """
    Execute coding task.
    
    Args:
        task: Coding task description
        context: Additional context from other agents
        
    Returns:
        Generated code with explanation
    """
    # Implementation would call LLM with SYSTEM_PROMPT
    return f"Code for: {task}"
```

**Create `src/agents/reviewer_agent.py`:**
```python
"""Reviewer Agent - Reviews code for quality."""

SYSTEM_PROMPT = """
You are a Reviewer Agent specializing in code review.

Your responsibilities:
1. Check for bugs and logic errors
2. Verify best practices are followed
3. Suggest improvements
4. Validate error handling
5. Check for security issues

Your output format:
- Overall assessment (PASS/FAIL/NEEDS_WORK)
- Issues found (with severity)
- Suggestions for improvement
- Positive aspects
"""

def execute(code: str, context: dict) -> str:
    """
    Review code.
    
    Args:
        code: Code to review
        context: Additional context
        
    Returns:
        Review report
    """
    return f"Review of code: {code[:100]}..."
```

### 4. Create Swarm Execution Plan

**Create `artifacts/plans/swarm_plan.md`:**
```markdown
# Swarm Execution Plan

## Task
[Complex task description]

## Decomposition

### Phase 1: Research
- **Agent**: Researcher
- **Goal**: Gather requirements and best practices
- **Output**: Research report

### Phase 2: Design
- **Agent**: Designer
- **Goal**: Create UI/UX design
- **Output**: Design mockups and specifications

### Phase 3: Implementation
- **Agent**: Coder
- **Goal**: Write code based on design
- **Output**: Source code files

### Phase 4: Testing
- **Agent**: Tester
- **Goal**: Validate implementation
- **Output**: Test results

### Phase 5: Review
- **Agent**: Reviewer
- **Goal**: Code review and quality check
- **Output**: Review report with issues

### Phase 6: Documentation
- **Agent**: Documenter
- **Goal**: Write comprehensive docs
- **Output**: Documentation files

## Dependencies
- Phase 2 depends on Phase 1
- Phase 3 depends on Phase 2
- Phase 4 depends on Phase 3
- Phase 5 depends on Phase 3
- Phase 6 depends on Phase 3

## Success Criteria
- All phases complete
- Review passes
- Tests pass
- Documentation complete
```

### 5. Execute Swarm

**Run swarm orchestrator:**
```powershell
# Activate Python environment
.\venv\Scripts\activate

# Execute swarm
python src/swarm.py
```

**Or use programmatically:**
```python
from src.swarm import SwarmOrchestrator

swarm = SwarmOrchestrator()
result = swarm.execute("""
Build a complete user authentication system with:
- Login/logout functionality
- Password hashing
- Session management
- Unit tests
- API documentation
""")

print(result)
```

### 6. Monitor Swarm Execution

**Watch progress:**
```
🪐 Swarm executing: Build authentication system
📋 Decomposed into 6 subtasks
  🤖 Researcher working on: Research auth best practices
  🤖 Designer working on: Design login UI
  🤖 Coder working on: Implement auth logic
  🤖 Tester working on: Write and run tests
  🤖 Reviewer working on: Review implementation
  🤖 Documenter working on: Write API docs
📁 Artifacts saved to: artifacts/swarm/swarm_20260114_082000.json
✅ Swarm completed successfully
```

### 7. Review Swarm Results

**Check artifacts:**
```powershell
# View swarm execution log
cat artifacts/swarm/swarm_20260114_082000.json

# Check individual agent outputs
ls artifacts/swarm/
```

**Artifact structure:**
```json
{
  "task": "Build authentication system",
  "timestamp": "20260114_082000",
  "result": {
    "status": "completed",
    "results": {
      "research": "[Researcher] Research report...",
      "design": "[Designer] UI mockups...",
      "implement": "[Coder] Source code...",
      "test": "[Tester] Test results...",
      "review": "[Reviewer] Review report...",
      "document": "[Documenter] Documentation..."
    },
    "summary": "All subtasks completed successfully"
  }
}
```

## Swarm Patterns

### Pattern 1: Sequential Pipeline
```
Research → Design → Code → Test → Review → Document
```
Each phase depends on previous phase.

### Pattern 2: Parallel Execution
```
        ┌─→ Code Feature A ─┐
Task ──→├─→ Code Feature B ─┼─→ Integrate → Test
        └─→ Code Feature C ─┘
```
Independent subtasks run in parallel.

### Pattern 3: Iterative Refinement
```
Code → Review → Fix → Review → Fix → ... → Approve
```
Loop until quality criteria met.

### Pattern 4: Hierarchical Decomposition
```
Main Task
  ├─→ Subtask 1
  │    ├─→ Sub-subtask 1.1
  │    └─→ Sub-subtask 1.2
  └─→ Subtask 2
       ├─→ Sub-subtask 2.1
       └─→ Sub-subtask 2.2
```
Recursive task breakdown.

## Advanced: Custom Swarm Workflows

**Create custom workflow:**
```python
# src/workflows/auth_workflow.py
from src.swarm import SwarmOrchestrator

class AuthWorkflow:
    """Custom workflow for authentication tasks."""
    
    def __init__(self):
        self.swarm = SwarmOrchestrator()
    
    def execute(self):
        """Execute authentication workflow."""
        # Phase 1: Research
        research = self.swarm.execute_subtask("researcher", 
            "Research OAuth 2.0 best practices")
        
        # Phase 2: Design (uses research)
        design = self.swarm.execute_subtask("designer",
            f"Design login UI based on: {research}")
        
        # Phase 3: Implement (uses design)
        code = self.swarm.execute_subtask("coder",
            f"Implement auth based on: {design}")
        
        # Phase 4: Review (iterative)
        review = self.swarm.execute_subtask("reviewer", code)
        while "FAIL" in review:
            code = self.swarm.execute_subtask("coder", 
                f"Fix issues: {review}")
            review = self.swarm.execute_subtask("reviewer", code)
        
        return {
            "research": research,
            "design": design,
            "code": code,
            "review": review
        }
```

## Verification Checklist

After swarm execution:
- ✅ All subtasks completed
- ✅ Artifacts saved to `artifacts/swarm/`
- ✅ Review passed
- ✅ Tests passed (if applicable)
- ✅ Documentation generated
- ✅ Final output meets requirements

## Troubleshooting

**Swarm fails to decompose:**
- Make task description more specific
- Provide more context
- Break down manually first

**Agent produces poor results:**
- Refine agent's system prompt
- Provide better context
- Add examples to prompt

**Swarm takes too long:**
- Reduce subtask count
- Use parallel execution
- Cache intermediate results

## Next Steps

- Create custom specialist agents
- Build domain-specific workflows
- Optimize swarm performance
- Document swarm patterns
