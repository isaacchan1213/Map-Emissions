# MapEmissions

A web application designed to track and visualize the amount of carbon emissions based on your routes. 

As someone who deeply cares about our ever growing climate crisis, this tool aims at helping you understand the environmental impact of your trips and provides suggestions for reducing emissions.

## Tech Stack

- **Frontend**:
  - [React.js](https://reactjs.org/) - A JavaScript library for building user interfaces.
  - [Axios](https://axios-http.com/) - A promise-based HTTP client for making requests.

- **Backend**:
  - [Flask](https://flask.palletsprojects.com/en/2.0.x/) - A micro web framework for Python to handle API requests and data processing.

- **APIs**:
  - [Google Maps API](https://developers.google.com/maps) - Provides data for calculating and visualizing routes and emissions.
  - [Groq API](https://www.groq.com/docs) - Offers advanced AI functionality for generating emissions reduction suggestions.
  - [Langchain API](https://www.langchain.com/docs) - Used for integrating AI-driven suggestions based on user input.

- **Data Handling**:
  - A dataset containing over 7000 vehicle models for CO2 emission data - found via Jeff Gallini on [Kaggle](https://www.kaggle.com/datasets/jeffgallini/college-football-attendance-2000-to-2018) (thank you Jeff!). 

## Getting Started

To run the development server, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-repo/mapemissions.git
    cd mapemissions
    ```

2. **Install dependencies:**

    For the frontend (React.js):
    ```bash
    cd frontend
    npm install
    # or
    yarn install
    ```

    For the backend (Flask):
    ```bash
    cd backend
    pip install -r requirements.txt
    ```

3. **Run the backend server:**

    ```bash
    cd backend
    python app.py
    ```

4. **Run the frontend development server:**

    ```bash
    cd frontend
    npm run dev
    # or
    yarn dev
    ```

5. **Open the application:**

    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

Thank you for exploring MapEmissions! I hope you find it useful for tracking and reducing your carbon footprint.
