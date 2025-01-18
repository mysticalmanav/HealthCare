import React, { useState } from 'react';
import SnellenChart from '../components/SnellenChart';
import AstigmatismGridTest from '../components/AstigmatismGridTest';
import BlurSensitivityTest from '../components/BlurSensitivityTest';
import SummaryReport from '../components/SummaryReport';

function App() {
  const [step, setStep] = useState(0);
  const [results, setResults] = useState({
    snellen: null,
    astigmatism: null,
    blurSensitivity: null,
  });

  const handleNext = (data) => {
    setResults({ ...results, ...data });
    setStep(step + 1);
  };

  const steps = [
    {
      title: 'Welcome',
      content: (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Digital Vision Testing</h1>
          <p className="mb-8 text-gray-600">
            Welcome! We'll guide you through a series of tests to assess your vision.
          </p>
          <button onClick={() => setStep(step + 1)} className="btn btn-primary">
            Start Test
          </button>
        </div>
      ),
    },
    {
      title: 'Simulated Snellen Chart',
      content: <SnellenChart onNext={handleNext} />,
    },
    {
      title: 'Astigmatism Grid Test',
      content: <AstigmatismGridTest onNext={handleNext} />,
    },
    {
      title: 'Blur Sensitivity Test',
      content: <BlurSensitivityTest onNext={handleNext} />,
    },
    {
      title: 'Summary Report',
      content: <SummaryReport results={results} />,
    },
  ];

  return (
    <div className="w-full relative flex flex-col items-center h-screen overflow-scroll bg-base-200 text-base-content">
      <div className="w-full max-w-3xl p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">{steps[step].title}</h2>
            <div className="text-sm text-gray-500">
              Step {step + 1} of {steps.length}
            </div>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <div>{steps[step].content}</div>
      </div>
    </div>
  );
}

export default App;