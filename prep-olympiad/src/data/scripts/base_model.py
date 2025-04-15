'''
This file contains the base model to extract data from each olympiad exam for each subject. Inside "./{subject}" will be a more tailored model for that specific subject's type of exam.
What this file should do is define the key fields that need to be extracted for each subject.
The main fields are: questions, answer choices, and images. Images are part of a question so those images should be marked with the question number. Some images contain text which need to be kept during extraction.
'''