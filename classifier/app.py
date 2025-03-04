from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
from werkzeug.utils import secure_filename
from io import BytesIO
from PIL import Image
import numpy as np

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# Load YOLO model
model = YOLO('./best.pt')

# Classify image function
def classify(img_file):
    try:
         # Open the image file
        image = Image.open(img_file)

         # Convert the image to a format YOLO expects (NumPy array)
        img_array = np.array(image)
        
        results = model(img_array)  # Use the image file directly
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
@app.route('/api/classify', methods=['POST'])
def classify_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file uploaded"}), 400

    img_file = request.files['image']
    if img_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Perform classification
    try:
        img_data = BytesIO(img_file.read())
        result = classify(img_data)
        print(result)
        if(result["status"] == "Fail"):
            return jsonify(result), 400
        return jsonify(result), 200
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
