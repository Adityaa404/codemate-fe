import React from "react";
import Card from "./components/Cards";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8">CODEMATE.AI</h1>
        <p className="text-lg text-center mb-8">
          Upload a zip file or a GitHub repository URL to analyze its code
          structure and generate summaries. You can get detailed code file
          structure, summaries per file, a complete code summary, and export a
          Product Requirements Document (PRD) in PDF format.
        </p>
      </div>
      <div className="flex gap-4">
        <Card
          title="Using Git Repo"
          description="Upload a GitHub repository URL to analyze its code structure and generate summaries."
          url={"/github-repo-form"}
        />
        <Card
          title="Using Zip File"
          description="Upload a zip file containing code to analyze its structure and generate summaries."
          url={"/upload"}
        />
        <Card
          title="Show PRD Document"
          description="Generate summaried report for Product Requirements Document (PRD).  Upcoming Feature..."
          url={"/uploadPdf"}
        />
      </div>
    </div>
  );
};

export default HomePage;
