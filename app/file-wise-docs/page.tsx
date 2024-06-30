"use client";

import React, { useEffect, useState } from "react";
import { dummyResponse } from "../Mock/dummy";
import Loader from "../components/Loader";
import FolderStructure from "../components/FolderStructure";

const FileWiseDocs = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [dirString, setDirString] = useState<any>({});
  const [summary, setSummary] = useState("");
  const [repoName, setRepoName] = useState('');

  const getResponseUsingURL = async (formData: any) => {
    setLoading(true);

    try {
        const response = await fetch(
          "https://df0e-2401-4900-1c19-2ea9-54-737c-c168-166a.ngrok-free.app/api/directory",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setRepoName(dummyResponse?.directory_structure?.substring(0, dummyResponse?.directory_structure?.indexOf('/')))
        // setDirString(dummyResponse?.documentation);
        setDirString(data?.directory_structure);
        setSummary(dummyResponse?.summary);
    } catch (error) {
      console.error("Error in fetch request:", error);
      throw error;
    }
    setLoading(false);
  };

  useEffect(() => {
    const repo = localStorage.getItem("repo") || "";
    const { url, branch, accessToken } = JSON.parse(repo);

    const formData = new FormData();
    formData.append("github_url", url);
    formData.append("branch", branch);

    if (accessToken) {
      formData.append("accessToken", accessToken);
    }

    getResponseUsingURL(formData);
  }, []);

  return (
    <div style={{background: '#333'}}>
      <Loader loading={loading} />
      <FolderStructure  repoSummary={summary} documentation={dirString} repoName={repoName}/>
    </div>
  );
};

export default FileWiseDocs;
