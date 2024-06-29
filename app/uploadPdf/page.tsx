"use client";
import { useState, DragEvent } from "react";

export default function UploadPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    validateFile(selectedFile ?? null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    validateFile(droppedFile);
  };

  const validateFile = (selectedFile: File | null) => {
    if (
      selectedFile &&
      (selectedFile.type === "application/pdf" ||
        selectedFile.type === "application/msword" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFile(selectedFile);
      setMessage("");
    } else {
      setFile(null);
      setMessage("Please upload a valid PDF or Word file.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("No file selected. Please upload a PDF or Word file.");
      return;
    }

    // Form submission logic here
    console.log("File submitted:", file);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl mb-4 text-white">Upload a File</h2>
        <div
          className="border-2 border-dashed border-blue-500 rounded-lg p-6 cursor-pointer mb-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}>
          <input
            id="file-input"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <p className="text-gray-700">
            Drag and drop a PDF or Word file here, or click to select one
          </p>
        </div>
        {file && <p className="text-gray-700">Selected file: {file.name}</p>}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4">
          Submit
        </button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
}
