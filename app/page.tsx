// import React from 'react';
// import Card from './components/Cards';

// const Home: React.FC = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//         <Card title="Input Your URL">
//           <input
//             type="text"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter URL"
//           />
//         </Card>
//         <Card title="Drop Your ZIP Code">
//           <input
//             type="text"
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter ZIP Code"
//           />
//         </Card>
//         <Card title="Export PDF File">
//           <button className="w-full px-3 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600">
//             Export PDF
//           </button>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import Card from "./components/Cards";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8">CODEMATE.AI</h1>
        <p className="text-lg text-center mb-8">
          Upload a zip file or a GitHub repository URL to analyze its code structure and generate summaries. You can get detailed code file structure, summaries per file, a complete code summary, and export a Product Requirements Document (PRD) in PDF format.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Using Git Repo"
          description="Upload a GitHub repository URL to analyze its code structure and generate summaries."
        />
        <Card
          title="Using Zip File"
          description="Upload a zip file containing code to analyze its structure and generate summaries."
        />
        <Card
          title="Show PRD Document"
          description="Generate a Product Requirements Document (PRD) in PDF format based on the uploaded code."
        />
      </div>
    </div>
  );
};

export default HomePage;
