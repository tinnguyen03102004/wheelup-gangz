---
description: Create auto-discovered web development tools for Antigravity
---

# Antigravity Web Development Tool Creation

Create Python tools that are auto-discovered by the Antigravity agent for web development tasks.

## Prerequisites
- Antigravity workspace structure exists (run `/antigravity-setup` first)
- Python 3.8+ installed
- Understanding of the tool you want to create

## Tool Categories for Web Development

1. **Design Tools**: Color palette generation, gradient creation, typography analysis
2. **SEO Tools**: Meta tag validation, sitemap generation, schema markup
3. **Performance Tools**: Image optimization, CSS minification, bundle analysis
4. **Accessibility Tools**: ARIA validation, contrast checking, semantic HTML analysis
5. **Content Tools**: Lorem ipsum generation, markdown to HTML, image placeholder

## Steps

### 1. Choose Tool Type
Decide what tool you need based on your current task.

### 2. Create Tool File
Create a new Python file in `src/tools/` with descriptive name:
```powershell
# Example: src/tools/color_palette_generator.py
```

### 3. Write Tool Code

**Template Structure:**
```python
from typing import str, List, Optional, Dict
from pydantic import BaseModel, Field

class ToolNameInput(BaseModel):
    """Input schema for the tool."""
    param1: str = Field(..., description="Description of parameter 1")
    param2: Optional[int] = Field(10, description="Description of parameter 2")

def tool_name(input_data: ToolNameInput) -> str:
    """
    Brief description of what the tool does.
    
    Args:
        input_data: Input parameters for the tool
        
    Returns:
        Result of the tool operation
        
    Example:
        >>> input_data = ToolNameInput(param1="test", param2=5)
        >>> result = tool_name(input_data)
    """
    # Implementation here
    return f"Result: {input_data.param1}"
```

### 4. Tool Requirements (MUST FOLLOW)

✅ **Required:**
- ALL parameters MUST have type hints
- Return type MUST be specified
- Google-style docstrings required
- Use Pydantic BaseModel for complex inputs
- Include usage examples in docstring

❌ **Forbidden:**
- No type hints
- Missing docstrings
- Unclear parameter descriptions

### 5. Example Web Tools

**Color Palette Generator:**
```python
from typing import List
from pydantic import BaseModel, Field
import colorsys

class ColorPaletteInput(BaseModel):
    base_color: str = Field(..., description="Hex color code (e.g., #FF5733)")
    count: int = Field(5, description="Number of colors to generate")
    scheme: str = Field("analogous", description="Color scheme: analogous, complementary, triadic")

def generate_color_palette(input_data: ColorPaletteInput) -> str:
    """
    Generate a harmonious color palette based on color theory.
    
    Args:
        input_data: Base color and palette configuration
        
    Returns:
        JSON string with color palette and CSS variables
    """
    # Implementation
    return '{"colors": ["#FF5733", "#FF8D33", "#FFC133"], "css": ":root { --color-1: #FF5733; }"}'
```

**SEO Meta Validator:**
```python
from typing import Dict
from pydantic import BaseModel, Field

class SEOValidatorInput(BaseModel):
    html_content: str = Field(..., description="HTML content to validate")
    check_og: bool = Field(True, description="Check Open Graph tags")

def validate_seo_meta(input_data: SEOValidatorInput) -> str:
    """
    Validate SEO meta tags in HTML content.
    
    Returns:
        JSON report with validation results and recommendations
    """
    # Implementation
    return '{"valid": true, "warnings": [], "recommendations": []}'
```

### 6. Test Your Tool

Create a test file in `artifacts/logs/`:
```python
# Test your tool
from src.tools.your_tool import tool_name, ToolNameInput

input_data = ToolNameInput(param1="test")
result = tool_name(input_data)
print(result)
```

### 7. Restart Agent
The tool is auto-discovered on agent restart. No manual registration needed!

## Common Web Development Tools to Create

| Tool Name | Purpose | Input | Output |
|-----------|---------|-------|--------|
| `generate_gradient` | Create CSS gradients | Colors, direction | CSS code |
| `optimize_image_meta` | Generate image metadata | Image path | Alt text, title |
| `validate_html_semantics` | Check semantic HTML | HTML string | Validation report |
| `generate_css_variables` | Create design tokens | Color palette | CSS variables |
| `check_accessibility` | ARIA and contrast check | HTML content | A11y report |

## Verification

After creating a tool:
1. ✅ File exists in `src/tools/`
2. ✅ All type hints present
3. ✅ Docstring complete
4. ✅ Pydantic model for complex inputs
5. ✅ Test passes

## Next Steps

- Create multiple tools for different tasks
- Use tools in agent prompts
- Document tool usage in `artifacts/plans/`
