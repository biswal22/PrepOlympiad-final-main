import sys
from pathlib import Path
import re
sys.path.append(str(Path(__file__).parent.parent.parent))

from typing import List, Dict, Tuple
import json
import logging
from scripts.utils.pdf_extractor import extract_pdf_content
from scripts.utils.gpt_helper import get_completion
from scripts.utils.types import Question, Choice, Difficulty
from scripts.utils.latex_helper import format_latex

logger = logging.getLogger(__name__)

def clean_json_string(json_str: str) -> str:
    """Clean JSON string by removing trailing commas and other common issues."""
    # Remove trailing commas in arrays
    json_str = re.sub(r',(\s*[\]}])', r'\1', json_str)
    # Remove any markdown code block markers
    json_str = json_str.strip()
    if json_str.startswith("```json"):
        json_str = json_str[7:]
    if json_str.startswith("```"):
        json_str = json_str[3:]
    if json_str.endswith("```"):
        json_str = json_str[:-3]
    return json_str.strip()

def parse_chemistry_exam(exam_url: str, solutions_url: str) -> List[Question]:
    # Extract content from both PDFs
    exam_text, exam_images = extract_pdf_content(exam_url)
    # Temporarily comment out solutions extraction
    # solutions_text, solutions_images = extract_pdf_content(solutions_url)
    
    # Parse exam content
    exam_prompt = f"""
    Parse this chemistry exam including the answer key.
    Preserve all chemical formulas, mathematical notation, and image references.
    
    For each question (1-60):
    1. Extract the question text with any [Image X.Y] markers and [Image Text: ...] content
    2. Extract the four answer choices (A-D), noting if they are text or images
    3. Extract the correct answer
    
    Return ONLY valid JSON with this exact format:
    {{
        "questions": [
            {{
                "number": 1,
                "text": "What is shown in [Image 1.1]? [Image Text: Molecular structure with C-C bond]",
                "choices": [
                    {{"type": "text", "text": "A) Ethane"}},
                    {{"type": "image", "imageRef": "[Image 1.2]"}},
                    {{"type": "text", "text": "C) CH₃CH₂OH"}},
                    {{"type": "text", "text": "D) CH₃CHO"}}
                ],
                "correctAnswer": "A"
            }}
        ]
    }}

    Parse the following exam:
    {exam_text}
    """
    
    try:
        exam_response = get_completion(exam_prompt)
        logger.debug(f"Raw GPT response: {exam_response[:500]}...")
        
        cleaned_response = clean_json_string(exam_response)
        exam_parsed = json.loads(cleaned_response)
        
        # Process each question
        questions = []
        for question in exam_parsed["questions"]:
            choices = []
            for choice in question["choices"]:
                image_data = None
                if "imageRef" in choice and choice["imageRef"]:
                    try:
                        image = next(
                            (img for img in exam_images 
                             if img["position_marker"] == choice["imageRef"]),
                            None
                        )
                        if image:
                            image_data = image["data"]
                    except Exception as e:
                        logger.warning(f"Failed to find image for choice {choice}: {str(e)}")
                
                choices.append(Choice(
                    text=format_latex(choice["text"]) if "text" in choice else "",
                    image=image_data,
                    is_correct=choice.get("isCorrect", False)
                ))
            
            # Add question with default values for solution-related fields
            questions.append(Question(
                number=question["number"],
                text=format_latex(question["text"]),
                choices=choices,
                solution="",  # Default empty solution
                difficulty="Medium",  # Default difficulty
                subtopics=[]  # Default empty subtopics
            ))
        
        return questions

    except Exception as e:
        logger.error(f"Error in parse_chemistry_exam: {str(e)}", exc_info=True)
        raise

if __name__ == "__main__":
    # Example usage
    exam_url = "https://path.to/chemistry/exam.pdf"
    solutions_url = "https://path.to/chemistry/solutions.pdf"
    questions = parse_chemistry_exam(exam_url, solutions_url)
    
    # Save to output directory
    from scripts.utils.config import OUTPUT_DIR
    output_file = OUTPUT_DIR / "chemistry_exam.json"
    with open(output_file, "w") as f:
        json.dump({"questions": questions}, f, indent=2) 