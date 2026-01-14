---
description: Create a new auto-discovered tool for Antigravity agent
---

# Create Antigravity Auto-Discovered Tool

Create a Python tool that is automatically discovered and loaded by the Antigravity agent.

## Prerequisites
- Antigravity workspace initialized (run `/antigravity-setup` or `/antigravity-init`)
- Python 3.8+ installed
- Understanding of the tool's purpose

## Core Concept

**Auto-Discovery**: Any Python file in `src/tools/` with proper type hints and Pydantic models is automatically discovered and made available to the agent. No manual registration needed!

## Steps

### 1. Define Tool Purpose
Ask yourself:
- What does this tool do?
- What inputs does it need?
- What output does it produce?
- When should the agent use it?

### 2. Create Tool File
```powershell
# Create new tool file
New-Item -ItemType File -Path "src/tools/my_tool_name.py"
```

**Naming Convention:**
- Use snake_case
- Be descriptive: `generate_color_palette.py` not `colors.py`
- One tool per file

### 3. Write Tool Code

**Basic Template:**
```python
from typing import str
from pydantic import BaseModel, Field

class MyToolInput(BaseModel):
    """Input schema for my tool."""
    param1: str = Field(..., description="Description of parameter 1")
    param2: int = Field(default=10, description="Optional parameter with default")

def my_tool(input_data: MyToolInput) -> str:
    """
    Brief description of what this tool does.
    
    This tool performs X operation on Y input to produce Z output.
    Use this when you need to accomplish [specific task].
    
    Args:
        input_data: Input parameters for the tool
        
    Returns:
        Description of the return value
        
    Example:
        >>> input_data = MyToolInput(param1="test", param2=5)
        >>> result = my_tool(input_data)
        >>> print(result)
        Result: test (processed 5 times)
    """
    # Implementation
    result = f"Result: {input_data.param1} (processed {input_data.param2} times)"
    return result
```

### 4. Tool Requirements (CRITICAL)

✅ **MUST HAVE:**
1. **Type Hints**: ALL parameters and return types
2. **Pydantic Model**: For input parameters (even single param)
3. **Field Descriptions**: Every field must have description
4. **Docstring**: Google-style with Args, Returns, Example
5. **Clear Function Name**: Verb-based, descriptive

❌ **FORBIDDEN:**
1. No type hints
2. Missing docstrings
3. Unclear parameter names
4. No usage examples
5. Side effects without documentation

### 5. Advanced Example: Web Development Tool

**Color Palette Generator:**
```python
from typing import List, Dict
from pydantic import BaseModel, Field
import json

class ColorPaletteInput(BaseModel):
    """Input for color palette generation."""
    base_color: str = Field(
        ..., 
        description="Base hex color (e.g., '#FF5733')",
        pattern=r"^#[0-9A-Fa-f]{6}$"
    )
    count: int = Field(
        default=5,
        description="Number of colors to generate",
        ge=2,
        le=10
    )
    scheme: str = Field(
        default="analogous",
        description="Color scheme type: analogous, complementary, triadic, monochromatic"
    )

def generate_color_palette(input_data: ColorPaletteInput) -> str:
    """
    Generate harmonious color palette based on color theory.
    
    Creates a set of colors that work well together based on the
    specified color scheme. Returns CSS-ready color values and
    variable declarations.
    
    Args:
        input_data: Base color and palette configuration
        
    Returns:
        JSON string containing:
        - colors: List of hex color codes
        - css_vars: CSS custom property declarations
        - scheme: Applied color scheme
        
    Example:
        >>> input_data = ColorPaletteInput(
        ...     base_color="#FF5733",
        ...     count=5,
        ...     scheme="analogous"
        ... )
        >>> result = generate_color_palette(input_data)
        >>> palette = json.loads(result)
        >>> print(palette['colors'])
        ['#FF5733', '#FF8D33', '#FFC133', '#F4FF33', '#C1FF33']
    """
    # Parse hex to RGB
    hex_color = input_data.base_color.lstrip('#')
    r, g, b = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
    
    # Generate palette based on scheme
    colors = [input_data.base_color]  # Start with base
    
    # Simple analogous scheme (rotate hue)
    if input_data.scheme == "analogous":
        for i in range(1, input_data.count):
            # Rotate hue by 30 degrees
            new_color = f"#{r:02x}{g:02x}{b:02x}"
            colors.append(new_color)
            # Adjust for next iteration
            r = (r + 30) % 256
    
    # Generate CSS variables
    css_vars = "\n".join([
        f"  --color-{i+1}: {color};"
        for i, color in enumerate(colors)
    ])
    
    result = {
        "colors": colors,
        "css_vars": f":root {{\n{css_vars}\n}}",
        "scheme": input_data.scheme,
        "count": len(colors)
    }
    
    return json.dumps(result, indent=2)
```

### 6. Tool Categories & Examples

**File Operations:**
```python
class FileReaderInput(BaseModel):
    file_path: str = Field(..., description="Path to file to read")
    encoding: str = Field(default="utf-8", description="File encoding")

def read_file_content(input_data: FileReaderInput) -> str:
    """Read and return file content."""
    with open(input_data.file_path, 'r', encoding=input_data.encoding) as f:
        return f.read()
```

**Data Processing:**
```python
class JSONValidatorInput(BaseModel):
    json_string: str = Field(..., description="JSON string to validate")

def validate_json(input_data: JSONValidatorInput) -> str:
    """Validate JSON and return formatted or error message."""
    try:
        data = json.loads(input_data.json_string)
        return json.dumps(data, indent=2)
    except json.JSONDecodeError as e:
        return f"Invalid JSON: {str(e)}"
```

**Web Scraping:**
```python
class URLFetcherInput(BaseModel):
    url: str = Field(..., description="URL to fetch")
    timeout: int = Field(default=10, description="Request timeout in seconds")

def fetch_url_content(input_data: URLFetcherInput) -> str:
    """Fetch content from URL."""
    import requests
    response = requests.get(input_data.url, timeout=input_data.timeout)
    return response.text
```

### 7. Test Your Tool

Create test file in `artifacts/logs/test_my_tool.py`:
```python
import sys
from pathlib import Path

# Add src to path
sys.path.insert(0, str(Path(__file__).parent.parent.parent / "src"))

from tools.my_tool_name import my_tool, MyToolInput

# Test the tool
input_data = MyToolInput(param1="test value", param2=5)
result = my_tool(input_data)
print(f"✅ Tool test result: {result}")
```

Run test:
```powershell
python artifacts/logs/test_my_tool.py
```

### 8. Document the Tool

Create documentation in `artifacts/plans/tool_my_tool_name.md`:
```markdown
# Tool: my_tool_name

## Purpose
[What this tool does]

## When to Use
[Scenarios where this tool is useful]

## Parameters
- `param1`: [Description]
- `param2`: [Description]

## Returns
[What the tool returns]

## Examples
[Usage examples]

## Notes
[Any special considerations]
```

### 9. Restart Agent
The tool is now auto-discovered! No manual registration needed.

## Common Tool Patterns

### Pattern 1: Simple Transform
```python
def transform_text(input_data: TextInput) -> str:
    """Transform text in some way."""
    return input_data.text.upper()
```

### Pattern 2: Complex Processing
```python
def process_data(input_data: DataInput) -> str:
    """Multi-step data processing."""
    # Step 1: Validate
    # Step 2: Transform
    # Step 3: Format
    return json.dumps(result)
```

### Pattern 3: External API Call
```python
def call_api(input_data: APIInput) -> str:
    """Call external API and return result."""
    import requests
    response = requests.post(input_data.endpoint, json=input_data.payload)
    return response.text
```

## Verification Checklist

After creating a tool:
- ✅ File in `src/tools/` directory
- ✅ All type hints present
- ✅ Pydantic BaseModel for input
- ✅ Field descriptions complete
- ✅ Google-style docstring
- ✅ Usage example in docstring
- ✅ Test passes
- ✅ Documentation created

## Troubleshooting

**Tool not discovered:**
- Check file is in `src/tools/`
- Verify function has type hints
- Ensure Pydantic model is used
- Restart agent

**Type errors:**
- Add type hints to ALL parameters
- Specify return type
- Use proper Pydantic field types

**Import errors:**
- Check Python path includes `src/`
- Verify dependencies installed
- Use absolute imports

## Next Steps

- Create multiple tools for different tasks
- Organize tools by category
- Document tool usage patterns
- Share tools across projects
