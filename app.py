from flask import Flask, request, jsonify

app = Flask(__name__)

# Hardcoded user details
USER_ID = "john_doe_17091999"  # Replace with your full name and DOB
COLLEGE_EMAIL_ID = "john@xyz.com"  # Replace with your college email
COLLEGE_ROLL_NUMBER = "123456"  # Replace with your roll number

# GET endpoint
@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    return jsonify({"operation_code": 1}), 200

# POST endpoint
@app.route('/bfhl', methods=['POST'])
def process_data():
    try:
        # Parse the JSON request
        data = request.json.get('data', [])
        
        # Extract numbers and alphabets
        numbers = [item for item in data if isinstance(item, int) or (isinstance(item, str) and item.isdigit())]
        alphabets = [item for item in data if isinstance(item, str) and item.isalpha()]
        
        # Convert numbers to integers
        numbers = [int(num) for num in numbers]
        
        # Find the highest alphabet (case insensitive)
        highest_alphabet = max(alphabets, key=lambda x: x.lower(), default=None)
        
        # Prepare the response
        response = {
            "is_success": True,
            "user_id": USER_ID,
            "college_email_id": COLLEGE_EMAIL_ID,
            "college_roll_number": COLLEGE_ROLL_NUMBER,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": [highest_alphabet] if highest_alphabet else []
        }
        
        return jsonify(response), 200
    
    except Exception as e:
        return jsonify({"is_success": False, "error_message": str(e)}), 400

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
