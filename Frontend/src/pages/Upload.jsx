import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const UploadComponent = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validTypes.includes(file.type)) {
            setError("Only JPG, JPEG, and PNG formats are allowed.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setError("File size should not exceed 5MB.");
            return;
        }

        setImage(file);
        setPreview(URL.createObjectURL(file));
        setError("");
    };

    const handleUpload = async () => {
        if (!image) return alert("Please select an image.");

        setLoading(true);
        const formData = new FormData();
        formData.append("file", image);

        try {
            const response = await fetch("http://44.204.157.21:5000/predict", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            let maxIndex = 0;
            for (let i = 0; i < data.prediction.predictions[0].length; i++) {
                if (data.prediction.predictions[0][i] > data.prediction.predictions[0][maxIndex]) {
                    maxIndex = i;
                }
            }

            const resultType = maxIndex === 0 ? 1 : maxIndex === 1 ? 2 : 3;
            setResult(`Type ${resultType}`);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Error uploading image.");
        } finally {
            setLoading(false);
        }
    };


    const handleReset = () => {
        setImage(null);
        setPreview(null);
        setResult("");
        setError("");
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white rounded-lg p-6 w-[550px] flex flex-col items-center space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800">Upload Skin Image</h2>

                <div className="w-full">
                    <Label htmlFor="file" className="block text-sm font-medium text-gray-700">
                        Select an Image:
                    </Label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        id="file"
                        className="mt-2 w-full border rounded-md p-2"
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>

                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-48 h-48 object-cover rounded-lg border shadow-md"
                    />
                )}

                <div className="flex w-full space-x-2">
                    <Button
                        onClick={handleUpload}
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center justify-center"
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Upload & Predict"}
                    </Button>
                    <Button onClick={handleReset} className="w-full bg-gray-500 hover:bg-gray-600 text-white">
                        Reset
                    </Button>
                </div>

                {result && (
                    <p className="mt-4 text-lg font-semibold text-green-600">
                        Prediction: {result}
                    </p>
                )}
            </div>
        </div>
    );
};

export default UploadComponent;
