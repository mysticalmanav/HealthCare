import React, { useState } from 'react';

const BlurSensitivityTest = ({ onNext }) => {
  const [blurLevel, setBlurLevel] = useState(0);
  const [textSharpness, setTextSharpness] = useState('');
  const [contrastLevel, setContrastLevel] = useState(100);
  const [fontSize, setFontSize] = useState(24);
  const [error, setError] = useState('');
  const [testTaken, setTestTaken] = useState(false);
  const [result, setResult] = useState('');

  const handleTest = () => {
    if (textSharpness === '') {
      setError('Please describe how the text appears to you.');
      return;
    }

    let evaluation = 'Your sensitivity to blur seems normal.';
    if (blurLevel > 2 && (textSharpness === 'sharp' || textSharpness === 'slightly blurred')) {
      evaluation =
        'You may have difficulty detecting blurred text. Consider consulting an eye care professional.';
    } else if (blurLevel <= 1 && (textSharpness === 'blurred' || textSharpness === 'very blurred')) {
      evaluation =
        'You may have heightened sensitivity to blur. If you experience discomfort, consider consulting an eye care professional.';
    }

    const detailedResult = `
      Blur Level: ${blurLevel}px
      Contrast Level: ${contrastLevel}%
      Font Size: ${fontSize}px
      User's Perception: ${textSharpness}
      Evaluation: ${evaluation}
    `;

    // Set the result to state to display it
    setResult(detailedResult.trim());
    setTestTaken(true);

    // If you want to pass the result to a parent component
    if (onNext) {
      onNext({ blur:evaluation });
    }
  };

  const textStyle = {
    filter: `blur(${blurLevel}px)`,
    color: `hsl(0, 0%, ${contrastLevel}%)`,
    fontSize: `${fontSize}px`,
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blur Sensitivity Test</h2>
      {!testTaken ? (
        <>
          <p className="mb-4">
            Adjust the settings below to match your viewing conditions. Then, look at the text and describe how it appears to you.
          </p>

          {/* Calibration Guidance */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              For accurate results, please ensure your screen brightness is at a comfortable level and you are at your typical viewing distance.
            </p>
          </div>

          {/* Controls */}
          <div className="mb-4">
            <label className="block mb-2 font-bold">Adjust Blur Level:</label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={blurLevel}
              onChange={(e) => setBlurLevel(parseFloat(e.target.value))}
              className="w-full"
            />
            <span>{blurLevel.toFixed(1)} px</span>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold">Adjust Contrast Level:</label>
            <input
              type="range"
              min="50"
              max="100"
              step="5"
              value={contrastLevel}
              onChange={(e) => setContrastLevel(parseInt(e.target.value))}
              className="w-full"
            />
            <span>{contrastLevel}%</span>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold">Adjust Text Size:</label>
            <input
              type="range"
              min="16"
              max="32"
              step="1"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="w-full"
            />
            <span>{fontSize}px</span>
          </div>

          {/* Sample Text */}
          <div className="form-control mb-6">
  <p className="text-center text-lg text-base-content" style={textStyle}>
    The quick brown fox jumps over the lazy dog.
  </p>
</div>

          {/* User Input */}
          <div className="form-control mb-4">
  <label className="label">
    <span className="label-text font-bold">How does the text appear to you?</span>
  </label>
  <select
    value={textSharpness}
    onChange={(e) => {
      setTextSharpness(e.target.value);
      setError('');
    }}
    className="select select-bordered w-full"
  >
    <option value="">Select an option</option>
    <option value="sharp">Sharp</option>
    <option value="slightly blurred">Slightly Blurred</option>
    <option value="blurred">Blurred</option>
    <option value="very blurred">Very Blurred</option>
  </select>
  {error && <p className="text-error mt-2">{error}</p>}
</div>

          {/* Disclaimer */}
          <p className="text-sm text-gray-600 mb-4">
            Note: This test provides an estimate and does not replace a professional eye examination. For accurate results and eye health assessment, please consult an eye care professional.
          </p>

          {/* Next Button */}
          <button onClick={handleTest} className="btn btn-primary px-4 py-2 rounded">
            View Results
          </button>
        </>
      ) : (
        // Display the result report
        <div>
          <h3 className="text-xl font-semibold mb-4">Test Results</h3>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 mb-4">{result}</pre>
          <p className="text-sm text-gray-600 mb-4">
            Thank you for completing the blur sensitivity test. If you have concerns about your vision, please consult an eye care professional.
          </p>
          <button
            onClick={() => {
              // Reset the test if the user wants to retake it
              setTestTaken(false);
              setTextSharpness('');
              setError('');
              setResult('');
            }}
            className="btn btn-secondary px-4 py-2 rounded"
          >
            Retake Test
          </button>
        </div>
      )}
    </div>
  );
};

export default BlurSensitivityTest;