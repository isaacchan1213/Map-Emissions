# Setup Backend Environment
In order to get backend running, you must have Python installed on your device. You then must install dependencies by doing firstly **python -m venv venv** to setup the environment, then follow that with **.\venv\Scripts\activate** for Windows or **source venv/bin/activate** for MacOS/Linux. Then finally install Flask by using **pip install Flask**. You will also need to install CORS by doing **pip install Flask-CORS**.

In terms of using the AI involved, you need to install Langchain and the LLM Groq. Simply type **pip install langchain-groq** and then setup a Groq API key on their website.

# Running Backend Environment
Type in terminal **flask run** to run backend server. 
