"use client"; // Error components must be Client Components
import { client } from "@/utils/directUs";
import { createItem } from "@directus/sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Error({ error }) {
  const navigate = useRouter();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    console.error(error);
  }, [error]);

  const errorHandler = async () => {
    const payload = {
      page_url: window.location.href,
      error_message: error.message,
    };
    const res = await client.request(createItem("report_errors", payload));
    if (res.id) navigate.push("/");
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(error?.message || "Unknown error")
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full space-y-6">
        <div className="flex items-center space-x-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800">Unexpected Error</h2>
        </div>

        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <div className="flex items-center justify-between">
            <p>{error?.message || "An unexpected error occurred."}</p>
            <span
              onClick={copyToClipboard}
              className="right-0 inline-block text-gray-700"
            >
              {isCopied ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#888888"
                      d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12V1Z"
                    />
                  </svg>
                </>
              )}
            </span>
          </div>
        </div>

        <button
          onClick={errorHandler}
          className="w-full justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 bg-primary-500 transition-all hover:text-white hover:bg-secondary-500 hover:border-secondary-500 space-x-2 inline-flex items-center  font-body tracking-wide"
        >
          Report Error
        </button>
      </div>
    </div>
  );
}
