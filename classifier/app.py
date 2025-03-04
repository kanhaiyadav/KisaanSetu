from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
from werkzeug.utils import secure_filename
from io import BytesIO
from PIL import Image
import numpy as np
import os

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173"],
        "supports_credentials": True,
        "allow_headers": ["Content-Type"],
        "methods": ["POST", "OPTIONS"]
    }
})

# Load YOLO model
MODEL_PATH = os.getenv("MODEL_PATH", "./best.pt")  # Ensure model path is correctly set
try:
    model = YOLO(MODEL_PATH)
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Classify image function
def classify(img_file):
    try:
        # Open and process the image
        image = Image.open(img_file)
        img_array = np.array(image)

        # Ensure the model is loaded
        if model is None:
            return {"error": "Model not loaded properly", "status": "Fail"}

        results = model(img_array)  # Use YOLO for classification
        names = results[0].names
        probs = results[0].probs

        name = names[probs.top1]
        conf = float(probs.top1conf)

        if conf < 0.5:
            return {"status": "Fail", "confidence": conf}

        return {"status": "Success", "name": name, "confidence": conf}

    except Exception as e:
        return {"error": f"Unsupported image type or processing error: {str(e)}", "status": "Fail"}

# Route for image classification
@app.route('/api/classify', methods=['POST', 'OPTIONS'])
@cross_origin()
def classify_image():
    if 'image' not in request.files:
        response = jsonify({"error": "No image file uploaded"})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        return response, 400

    img_file = request.files['image']
    if img_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        img_data = BytesIO(img_file.read())
        result = classify(img_data)
        print(result)

        if result["status"] == "Fail":
            return jsonify(result), 400
        response = jsonify(result)
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        return response

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Get PORT from Render
    app.run(host='0.0.0.0', port=port, debug=True)  # Bind to 0.0.0.0 for Render
