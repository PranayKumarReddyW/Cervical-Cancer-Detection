# Cervical Cancer Prediction

## Overview

This project is a **full-stack web application** for **Cervical Cancer Prediction** using deep learning models. The system includes:

- **Frontend**: Built with React.js for user interaction.
- **Backend**: Developed using Node.js and Express.js to handle API requests.
- **Machine Learning Model**: A deep learning model trained on AWS SageMaker to predict cervical cancer risk.
- **Database**: Stores user data and prediction history.
- **Jupyter Notebooks**: Contains model training, evaluation, and exploratory data analysis (EDA).

## Features

- **User Authentication** (Signup/Login)
- **Cervical Cancer Risk Prediction**
- **Data Visualization for Insights**
- **API Integration with AWS SageMaker**
- **Secure and Scalable Deployment**

## Tech Stack

### Frontend:

- React.js
- Tailwind CSS
- Axios

### Backend:

- Node.js
- Express.js
- MongoDB (for user data storage)
- Flask (for managing the prediction API and invoking the SageMaker endpoint)

### Machine Learning:

- TensorFlow/Keras
- AWS SageMaker (Model Training & Deployment)
- Pandas & NumPy (Data Processing)

## AWS Infrastructure

- **SageMaker Training Instance**: `ml.g4dn.xlarge`
- **SageMaker Endpoint Instance**: `ml.m4.large`
- **EC2 Instance for Deployment**: `t2.micro` (for both frontend & backend)

## Installation & Setup

### 1. Clone the Repository:

```bash
git clone https://github.com/your-username/Cervical-Cancer-Predictor.git
cd Cervical-Cancer-Predictor
```

### 2. Backend Setup:

```bash
cd backend
npm install
npm start
```

### 3. Frontend Setup:

```bash
cd frontend
npm install
npm start
```

### 4. Jupyter Notebook:

```bash
cd notebook
jupyter notebook
```

### 5. Flask API to Invoke SageMaker Endpoint:

Create a file `predict.py`:

```python
from flask import Flask, request, jsonify
import boto3
import json

app = Flask(__name__)

def invoke_sagemaker_endpoint(data):
    client = boto3.client('sagemaker-runtime')
    endpoint_name = "your-sagemaker-endpoint-name"
    response = client.invoke_endpoint(
        EndpointName=endpoint_name,
        ContentType="application/json",
        Body=json.dumps(data)
    )
    result = json.loads(response['Body'].read().decode())
    return result

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    prediction = invoke_sagemaker_endpoint(data)
    return jsonify(prediction)

if __name__ == '__main__':
    app.run(debug=True)
```

Run the Flask API:

```bash
python predict.py
```

## API Endpoints

| Method | Endpoint   | Description                                       |
| ------ | ---------- | ------------------------------------------------- |
| `POST` | `/predict` | Sends patient data to the ML model for prediction |
| `GET`  | `/history` | Fetches previous predictions                      |

## Deployment

- **Frontend**: Deployed on AWS EC2 (`t2.micro`)
- **Backend**: Deployed on AWS EC2 (`t2.micro`)
- **ML Model**: Hosted on AWS SageMaker (`ml.m4.large` endpoint)

## Contribution

Feel free to fork the repository, create feature branches, and submit PRs.
