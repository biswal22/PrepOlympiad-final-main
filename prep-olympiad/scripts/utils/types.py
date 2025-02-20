from typing import TypedDict, List, Literal, Union
from enum import Enum

class Subject(str, Enum):
    CHEMISTRY = "chemistry"
    MATHEMATICS = "mathematics"
    PHYSICS = "physics"
    BIOLOGY = "biology"
    EARTH_SCIENCE = "earth-science"

class Difficulty(str, Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"

class ImageData(TypedDict):
    data: str  # base64 encoded
    format: str  # file extension
    position_marker: str  # reference in text

class Choice(TypedDict):
    type: Literal["text", "image"]
    content: Union[str, ImageData]  # text or image data

class Question(TypedDict):
    content: str  # question text with LaTeX and image markers
    choices: List[Choice]
    correctAnswer: str
    difficulty: Difficulty
    category: str
    images: List[ImageData]
    subject: Subject 