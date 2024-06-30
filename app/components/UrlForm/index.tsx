import { useState } from "react";
import { useRouter } from "next/navigation";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [branch, setBranch] = useState("");
  const [repoType, setRepoType] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = {
      url,
      branch,
      accessToken,
    };

    localStorage.setItem("repo", JSON.stringify(formData));
    router.push("/file-wise-docs");
  };

  return (
    <div
      style={{
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        background: "linear-gradient(to bottom right, #000, #333)",
      }}
      className="bg-[#333] text-white flex justify-center items-center w-screen h-screen"
    >
      <div style={{
        background: 'linear-gradient(to top left, #000 30%, #111, #333)'
      }} className="w-full max-w-md p-8 space-y-4 bg-[#222] rounded-lg shadow-lg">
        <h1 className="text-lg font-bold text-center">Add GitHub Repository</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-300"
            >
              GitHub URL
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full p-2 mt-1 text-gray-900 bg-gray-200 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="branch"
              className="block text-sm font-medium text-gray-300"
            >
              Branch
            </label>
            <input
              type="text"
              id="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
              className="w-full p-2 mt-1 text-gray-900 bg-gray-200 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-gray-300">
              Repository Type
            </legend>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="repoType"
                checked={repoType === "public"}
                onChange={() => {
                  setRepoType("public");
                  setAccessToken("");
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span>Public</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="repoType"
                checked={repoType === "private"}
                onChange={() => setRepoType("private")}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span>Private</span>
            </label>
          </fieldset>
          {repoType === "private" && (
            <div>
              <label
                htmlFor="accessToken"
                className="block text-sm font-medium text-gray-300"
              >
                Access Token
              </label>
              <input
                type="password"
                id="accessToken"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                required
                className="w-full p-2 mt-1 text-gray-900 bg-gray-200 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full p-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UrlForm;
