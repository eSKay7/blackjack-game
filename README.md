Blackjack Game

A web-based implementation of the classic Blackjack card game, developed using HTML, CSS, JavaScript, and a Flask backend.
The game logic runs in the browser, while the bank balance (virtual money) is updated through the backend server.

Features:
Interactive player and dealer hands with card images.

Automatic dealer logic (dealer draws until reaching 17 or higher).

Ace handling logic (counts as 1 or 11 depending on the situation).

Game state management (win, lose, tie, or Blackjack).

Bank system: winnings and losses are calculated on the backend (Flask), ensuring separation between frontend logic and server logic.


Technologies:
Frontend

HTML5 – Structure of the application
CSS3 – Styling and layout
JavaScript – Game logic, DOM updates, and API calls to backend

Backend

Python (Flask) – Handles bank updates and serves API endpoints
Flask-CORS – Enables communication between frontend and backend


Getting Started
1. Clone the repository
git clone https://github.com/eSKay7/blackjack-game
cd blackjack-game

2. Install dependencies
Make sure Python is installed, then install Flask and Flask-CORS:
pip install flask flask-cors

3. Run the backend
Start the Flask server:
python app.py

This will start a development server on:
http://127.0.0.1:5000

4. Run the frontend
Open frontend/index.html in your browser.
Note: The bank system will only work if the Flask server is running, since the game sends POST requests to /update_bank.

Project Structure
Blackjack/
│
├── backend/
│   └── app.py               # Flask backend server
│
├── frontend/
│   ├── index.html            # Main game page
│   ├── css/
│   │   └── index.css         # Styling
│   ├── js/
│   │   └── index.js          # Game logic
│   └── images/               # Card and table images
│
└── README.md

Notes
The backend is not deployed; it runs locally on your machine.

If the Flask server is not running, the game will still work, but the bank value will not update.

This project is structured to resemble a real-world deployment scenario with frontend and backend separated.