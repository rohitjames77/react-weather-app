import React from "react";
import { FiAlertCircle } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { LuRefreshCw } from "react-icons/lu";

export default function ErrorPage({ error }) {
const errorCode = 'Status Code 400'
const message = 'Bad Request';
const title = error;
    
  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <FiAlertCircle className="w-10 h-10 text-red-600" />
          </div>

          <div className="mb-2">
            <span className="text-6xl font-bold text-gray-800">
              {errorCode}
            </span>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h1>

          <p className="text-gray-600 mb-8">{message}</p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
            >
              <LuRefreshCw className="w-4 h-4" />
              Try Again
            </button>

            <button
              onClick={handleGoHome}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <FaHome className="w-4 h-4" />
              Go Home
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Sorry for the Inconvenience....
        </p>
      </div>
    </div>
  );
}
