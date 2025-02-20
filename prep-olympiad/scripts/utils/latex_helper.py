import re

def format_latex(text: str) -> str:
    """Format text with LaTeX math notation."""
    if not text:
        return text
        
    # Escape backslashes in the replacement pattern
    for letter in ['alpha', 'beta', 'gamma', 'delta', 'theta']:
        text = re.sub(fr'\b{letter}\b', fr'$\\{letter}$', text, flags=re.IGNORECASE)
        
    # Handle subscripts and superscripts
    text = re.sub(r'(\d+)', r'$\1$', text)  # Numbers
    text = re.sub(r'([A-Z][a-z]?)(\d+)', r'$\1_\2$', text)  # Chemical formulas
    
    return text 