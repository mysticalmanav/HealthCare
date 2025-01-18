import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SummaryReport = ({ results }) => {
  const Navigate = useNavigate();
  useEffect(() => {
    // localStorage.setItem('userInput', JSON.stringify(formData));
    localStorage.setItem('vision_test_results', JSON.stringify(results));
  },[])
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Summary Report</h2>
      <div className="w-full max-w-xl space-y-4">
        {/* Snellen Chart Result */}
        <div className="chat chat-start">
          <div className="chat-bubble">
            <h3 className="font-bold mb-1">Snellen Chart Result:</h3>
            <p>{results.snellen || 'No data available.'}</p>
          </div>
        </div>

        {/* Astigmatism Test Result */}
        <div className="chat chat-start">
          <div className="chat-bubble">
            <h3 className="font-bold mb-1">Astigmatism Test Result:</h3>
            <p>{results.astigmatism || 'No data available.'}</p>
          </div>
        </div>

        {/* Blur Sensitivity Test Result */}
        <div className="chat chat-start">
          <div className="chat-bubble">
            <h3 className="font-bold mb-1">Blur Sensitivity Test Result:</h3>
            <p>{results.blurSensitivity || 'No data available.'}</p>
          </div>
        </div>

        {/* Additional Message */}
        <div className="chat chat-end">
          <div className="chat-bubble">
            <p>
              Thank you for completing the tests! Remember, this assessment is preliminary. For a comprehensive eye examination, please consult an eye care professional.
            </p>
          </div>
        </div>
      </div>

      {/* Redirect Button */}
      
      <div className="mt-8">
        <button
          onClick={() => {
            Navigate('/bot')
          }}
          className="btn btn-ghost"

        >
          Consult to Chat Bot
        </button>
      </div>
    </div>
  );
};

export default SummaryReport;