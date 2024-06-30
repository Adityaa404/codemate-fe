import UploadZipCard from "@/app/components/upload";
import React from "react";

const upload = () => {
  return (
    <div style={{background: 'linear-gradient(to bottom right, #000 30%, #111, #333)'}} className="flex items-center justify-center min-h-screen">
      <UploadZipCard />
    </div>
  );
};

export default upload;
