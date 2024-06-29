"use client";
import React, { useEffect, useState } from "react";

const Loader: React.FC<{ loading: boolean }> = ({ loading }) => {
  const [loadingText, setLoadingText] = useState("Loading..");

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (loading) {
      timeout = setTimeout(() => {
        setLoadingText("Cloning."); // Initial text
      }, 5000);

      timeout = setTimeout(() => {
        setLoadingText("Unpacking.."); // Second stage
      }, 7000);

      timeout = setTimeout(() => {
        setLoadingText("Reading..."); // Final stage
      }, 10000);
      timeout = setTimeout(() => {
        setLoadingText("Getting the data..."); // Final stage
      }, 14000);
    } else {
      clearTimeout(timeout!);
      setLoadingText("Uff.. weaving your data");
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [loading]);

  if (!loading) {
    return null; // Render nothing if not loading
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <p className="text-lg font-semibold mb-4">{loadingText}</p>
        <div className="flex space-x-4">
          <div className="animate-bounce w-4 h-4 bg-blue-500 rounded-full"></div>
          <div className="animate-bounce w-4 h-4 bg-blue-500 rounded-full"></div>
          <div className="animate-bounce w-4 h-4 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
