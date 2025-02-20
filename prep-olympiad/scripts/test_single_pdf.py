import os
from parse_olympiad_pdfs import extract_text_and_images_from_pdf_url, parse_questions_by_subject

def test_single_pdf():
    # Test URL - use a single olympiad PDF URL
    test_url = "your_test_pdf_url"
    subject = "mathematics"  # or whichever subject you're testing
    
    # Extract content
    text, images = extract_text_and_images_from_pdf_url(test_url)
    print("Text extracted successfully")
    print(f"Found {len(images)} images")
    
    # Parse questions
    questions = parse_questions_by_subject(text, images, subject)
    print(f"\nParsed {len(questions)} questions")
    
    # Save sample output
    import json
    with open("sample_parsed_question.json", "w") as f:
        json.dump(questions[0] if questions else {}, f, indent=2)
        print("\nSample question saved to sample_parsed_question.json")

if __name__ == "__main__":
    test_single_pdf() 