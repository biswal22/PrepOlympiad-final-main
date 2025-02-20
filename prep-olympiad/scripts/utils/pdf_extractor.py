import fitz
import base64
from typing import Tuple, List, Dict
import requests
from io import BytesIO
import pytesseract
from PIL import Image
import logging

logger = logging.getLogger(__name__)

def extract_pdf_content(source: str) -> Tuple[str, List[Dict]]:
    """Extract text and images from PDF, including text within images."""
    try:
        logger.info(f"Downloading PDF from {source}")
        response = requests.get(source)
        response.raise_for_status()
        logger.debug(f"PDF download response status: {response.status_code}")
        
        pdf_stream = BytesIO(response.content)
        logger.info("Opening PDF with PyMuPDF")
        doc = fitz.open(stream=pdf_stream, filetype="pdf")
        logger.info(f"PDF opened successfully. Pages: {len(doc)}")
        
        text = ""
        images = []
        
        for page_num, page in enumerate(doc):
            logger.debug(f"Processing page {page_num + 1}")
            text += page.get_text()
            
            # Extract images using the new method
            image_list = page.get_images()
            logger.debug(f"Found {len(image_list)} images on page {page_num + 1}")
            
            for img_index, img in enumerate(image_list):
                try:
                    logger.debug(f"Processing image {img_index + 1} on page {page_num + 1}")
                    xref = img[0]
                    base_image = doc.extract_image(xref)
                    
                    # Convert image data directly to PIL Image
                    image_bytes = base_image["image"]
                    image_format = base_image["ext"]
                    pil_image = Image.open(BytesIO(image_bytes))
                    
                    # Extract text from image using OCR
                    try:
                        image_text = pytesseract.image_to_string(pil_image)
                    except Exception as ocr_error:
                        logger.warning(f"OCR failed for image {img_index + 1} on page {page_num + 1}: {str(ocr_error)}")
                        image_text = ""
                    
                    position_marker = f"[Image {page_num + 1}.{img_index + 1}]"
                    
                    image_info = {
                        "data": base64.b64encode(image_bytes).decode(),
                        "format": image_format,
                        "position_marker": position_marker,
                        "image_text": image_text.strip(),
                        "width": pil_image.width,
                        "height": pil_image.height
                    }
                    images.append(image_info)
                    
                    text += f"\n{position_marker}\n"
                    if image_text.strip():
                        text += f"[Image Text: {image_text.strip()}]\n"
                        
                except Exception as e:
                    logger.error(f"Error processing image {img_index + 1} on page {page_num + 1}: {str(e)}", exc_info=True)
                    continue  # Skip this image and continue with the next one
        
        doc.close()
        logger.info("PDF processing completed successfully")
        return text, images
        
    except Exception as e:
        logger.error(f"Error extracting PDF content: {str(e)}", exc_info=True)
        raise 