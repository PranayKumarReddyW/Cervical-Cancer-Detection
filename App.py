from flask import Flask, request, jsonify
import json
import boto3
import numpy as np
from tensorflow.keras.preprocessing import image
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# AWS SageMaker Endpoint details
ENDPOINT_NAME = "tensorflow-inference-2025-03-24-07-50-33-780"  # Replace with your actual endpoint
REGION = "us-east-1"  # Change based on your deployment region

# Initialize SageMaker Runtime client
sagemaker_runtime = boto3.client("sagemaker-runtime", region_name=REGION)

def preprocess_image(img_path):
    """Load and preprocess image for SageMaker prediction."""
    img = image.load_img(img_path, target_size=(128, 128))  # Resize
    img_array = image.img_to_array(img)  # Convert to array
    img_array = img_array / 255.0  # Normalize
    img_array = np.reshape(img_array, (1, 128, 128, 3))  # Ensure correct shape
    return img_array

@app.route("/predict", methods=["POST"])
def predict():
    """API endpoint to receive an image and return a prediction."""
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    file_path = "temp.jpg"
    file.save(file_path)

    # Preprocess Image
    img_array = preprocess_image(file_path)
    payload = json.dumps(img_array.tolist())

    try:
        # Invoke SageMaker Endpoint
        response = sagemaker_runtime.invoke_endpoint(
            EndpointName=ENDPOINT_NAME,
            ContentType="application/json",
            Body=payload
        )

        response_body = response["Body"].read().decode("utf-8")
        result = json.loads(response_body)
        return jsonify({"prediction": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run Flask app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
