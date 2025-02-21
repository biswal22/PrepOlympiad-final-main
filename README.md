# PrepOlympiad-final
<--!
# What the project is about:
This project is a full stack web application that allows users to practice for the olympiad exams. On the backend, I will likely have an OpenAI API key to read and parse the open sourced olympiad questions and answers. This backend will be built with Flask as Python allows for easier syntax for the API. The frontend and part of the backend will be using Next.js and TailwindCSS and I am hoping to use the inbuilt REST API of Next.js to communicate with the Flask backend. I need to keep a database of the questions and answers and the users' progress, likely through PostgreSQL and Auth0 for authentication. 

# How I think it should work:
Postgres will be used to store the questions and answers and user progress (stat tracking). Auth0 will be used to store the users' progress. The OpenAI API will be used to read and parse the open sourced olympiad questions and answers (this will be done to essentially seed the database and only needs to be done once). The Flask backend will be used to communicate with the frontend and the database. The Next.js frontend will be used to display the questions and answers to the user.

# Questions:
- Do I need to use Flask in this project since I am using Next.js?
-->

