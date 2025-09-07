from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

# Tells flask that this is the main file.
app = Flask(__name__)
CORS(app)

# Route decorator - Whenever someone visits root URL, run home function. 
@app.route("/")
def home():
    return "Flask is running!"            # Sends index.html file from templates folder to browser.

# Whenever Javascript sends a POST request to /update_bank, run update_bank function.
@app.route("/update_bank", methods=["POST"])        # Methods = ["POST"] lets front end send data to server.
def update_bank():
    data = request.get_json()                       # Reads JSON sent from Javascript and stores it as python dictionary. 
    bank = data.get("bank")                         # Bank variable stores value of "bank" key.
    result = data.get("result")                     # Result variable stores value of "result" key.

    # If - Elif condition to change the value of bank based on the result.
    if result == "win":
        bank *= 1.5
    elif result == "lose":
        bank /= 2
    
    # Function returns and sends updated bank value to Javascript as JSON.
    return jsonify({"bank" : bank})

# If file is run directly, start the Flask server.
if __name__ == "__main__":
    app.run(debug=True)                             # debug = True - Shows errors in terminal/console.