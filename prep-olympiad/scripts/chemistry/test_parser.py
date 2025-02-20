import json
import sys
import logging
from pathlib import Path
sys.path.append(str(Path(__file__).parent.parent.parent))

from scripts.chemistry.parse_exam import parse_chemistry_exam

# Set up logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def test_chemistry_parser():
    # Test URLs
    test_exam_url = "https://www.acs.org/content/dam/acsorg/education/students/highschool/olympiad/pastexams/2022-usnco-local-exam.pdf"
    test_solutions_url = "https://www.acs.org/content/dam/acsorg/education/students/highschool/olympiad/pastexams/2022-usnco-local-solutions.pdf"
    
    try:
        logger.info("Starting chemistry exam parsing test")
        logger.debug(f"Exam URL: {test_exam_url}")
        logger.debug(f"Solutions URL: {test_solutions_url}")

        # Try to download and check the PDFs first
        import requests
        logger.info("Testing PDF accessibility...")
        
        exam_response = requests.get(test_exam_url)
        logger.debug(f"Exam PDF response status: {exam_response.status_code}")
        logger.debug(f"Exam PDF headers: {exam_response.headers}")
        
        solutions_response = requests.get(test_solutions_url)
        logger.debug(f"Solutions PDF response status: {solutions_response.status_code}")
        logger.debug(f"Solutions PDF headers: {solutions_response.headers}")

        if exam_response.status_code != 200 or solutions_response.status_code != 200:
            raise Exception("Failed to download PDFs")

        # Parse exam
        logger.info("Starting exam parsing...")
        questions = parse_chemistry_exam(test_exam_url, test_solutions_url)
        logger.info(f"Successfully parsed {len(questions)} questions")
        
        # Save output
        output_path = Path(__file__).parent / "test_output.json"
        logger.info(f"Saving output to {output_path}")
        with open(output_path, "w") as f:
            json.dump(
                {
                    "total_questions": len(questions),
                    "sample_question": questions[0] if questions else None,
                    "all_questions": questions
                }, 
                f, 
                indent=2
            )
        
        # Print summary
        if questions:
            q = questions[0]
            logger.info("\nSample Question Details:")
            logger.info(f"Question text: {q['text'][:100]}...")
            logger.info(f"Number of choices: {len(q['choices'])}")
            logger.info(f"Has images: {any(choice.get('image') for choice in q['choices'])}")
            logger.info(f"Difficulty: {q['difficulty']}")
    
    except Exception as e:
        logger.error(f"Error during parsing: {str(e)}", exc_info=True)

if __name__ == "__main__":
    test_chemistry_parser() 