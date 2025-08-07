import React from "react";
import { useState } from "react";
import Expenditure from "../components/Card";

import axios from "axios";

export default function Upload({onParsedData, onClose}) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handlefileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid CSV file.");
    }
  };
  const handleupload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    const filename = file.name;

    try {
      const res = await axios.post(
        "https://lb2rl4zsdc.execute-api.ap-south-1.amazonaws.com/dev/get-upload",
        { filename },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const uploadURL = res.data.uploadURL;
      console.log("Upload URL:", uploadURL);
      await axios.put(uploadURL, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      alert("✅ File uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed!");
    }
    setLoading(true);

    try {
      const response = await axios.post(
        "https://xy3ycpannd.execute-api.ap-south-1.amazonaws.com/dev/parse-csv",
        { filename },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Parsed Sucessfully:", response.data);
  
      alert("File Parsed successfully!");
      onParsedData(response.data)
    } catch (error) {
      console.error("Error parsing file:", error);
      alert("Error parsing file. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="w-[90%] max-w-md bg-white rounded-lg shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>
        <div className="bg-sky-600 bg-opacity-90 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">
            🧾💸 Upload Your Expenses
          </h2>
          <p className="text-white text-md font-bold italic mt-2">
            Drop your CSV & let SmartSpendAI slay those insights 😎📊✨
          </p>
        </div>

        <div className="bg-white p-6 flex items-center justify-center">
          <input
            type="file"
            accept=".csv"
            className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0 file:text-sm file:font-semibold
        file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200"
            onChange={handlefileChange}
          />
          <button
            onClick={handleupload}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload & Parse
          </button>
          {loading && (
            <p className="mt-4 text-yellow-600">Parsing your file...</p>
          )}
        </div>
      </div>
    </div>
  );
}
