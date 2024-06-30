"use client";
import { useState, DragEvent } from "react";
import { useRouter } from "next/navigation";
export default function UploadZipCard() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    if (selectedFile && selectedFile.type === "application/zip") {
      setFile(selectedFile);
      setMessage("");
    } else {
      setFile(null);
      setMessage("Please upload a valid .zip file.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("No file selected. Please upload a .zip file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://df0e-2401-4900-1c19-2ea9-54-737c-c168-166a.ngrok-free.app/api/zip-file",
        {
          method: 'POST',
          body: formData
        },
      );
      const data = await response.json();
      localStorage.setItem('directory_structure', JSON.stringify(data?.directory_structure))
      router.push("/file-wise-docs");
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        background: "linear-gradient(to top left, #000 30%, #111, #333)",
      }}
      className="max-w-md mx-auto p-6 border border-[#333] rounded-lg shadow-lg text-center">
      <h2 className="text-2xl mb-4 text-white">Upload a File</h2>
      <div
        className="border-2 border-dashed border-blue-500 rounded-lg p-6 cursor-pointer mb-4"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}>
        <input
          id="file-input"
          type="file"
          accept=".zip"
          onChange={handleFileChange}
          className="hidden"
        />
        <p className="text-white">
          Drag and drop a .zip file here, or click to select one
        </p>
      </div>
      {file && <p className="text-white">Selected file: {file.name}</p>}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4">
        {loading ? 'fetching...' : 'Submit'}
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}