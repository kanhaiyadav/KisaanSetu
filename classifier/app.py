from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
from werkzeug.utils import secure_filename
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# Load YOLO model
model = YOLO('./best.pt')

# Configure upload folder
UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Classify image function
def classify(img_file):
    results = model(img_file)  # Use the image file directly
    names = results[0].names
    probs = results[0].probs

    name = names[probs.top1]
    conf = float(probs.top1conf)
    if conf < 0.5:
        return {"status": "Fail", "confidence": conf}
    return {"name": name, "confidence": conf}

# Route for image classification
@app.route('/api/classify', methods=['POST'])
def classify_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file uploaded"}), 400

    img_file = request.files['image']
    if img_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the image securely
    filename = secure_filename(img_file.filename)
    img_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    img_file.save(img_path)

    # Perform classification
    try:
        result = classify(img_path)
        # os.remove(img_path)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        # Remove the image file
        os.remove(img_path)

if __name__ == '__main__':
    app.run(debug=True)
