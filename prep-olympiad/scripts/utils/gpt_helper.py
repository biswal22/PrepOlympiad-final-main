from openai import OpenAI
from typing import Dict, Any
from .config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

def get_completion(
    prompt: str,
    system_message: str = "You are a helpful assistant that parses olympiad questions.",
    model: str = "gpt-4o-mini"
) -> Dict[str, Any]:
    """
    Get completion from OpenAI API with error handling and retries.
    """
    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error in GPT completion: {e}")
        return None 