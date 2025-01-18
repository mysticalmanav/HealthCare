import React, { useState } from 'react';
import img from "./pngwing.com.png"
const AstigmatismGridTest = ({ onNext }) => {
  const [selectedLines, setSelectedLines] = useState([]);
  const [error, setError] = useState('');

  const handleLineClick = (index) => {
    if (selectedLines.includes(index)) {
      setSelectedLines(selectedLines.filter((i) => i !== index));
    } else {
      setSelectedLines([...selectedLines, index]);
    }
  };

  const handleTest = () => {
    if (selectedLines.length === 0) {
      setError('Please select any lines that appear blurry or distorted.');
      return;
    }

    const result =
      selectedLines.length === 0
        ? 'No signs of astigmatism detected.'
        : 'Possible signs of astigmatism detected.';

    onNext({ astigmatism: result });
  };

  // Generate lines for the Astigmatic Dial (Clock Chart)
  const generateLines = () => {
    const lines = [];
    for (let i = 0; i < 12; i++) {
      const angle = i * 30 - 90; // Adjusted to start at vertical
      const isSelected = selectedLines.includes(i);

      lines.push(
        <div
          key={i}
          onClick={() => handleLineClick(i)}
          className={`absolute cursor-pointer ${
            isSelected ? 'bg-error' : 'bg-base-content'
          }`}
          style={{
            width: isSelected ? '3px' : '2px',
            height: '100%',
            transform: `rotate(${angle}deg)`,
            transformOrigin: 'center center',
          }}
        ></div>
      );
    }
    return lines;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Astigmatism Test</h2>
      <p className="mb-4">
        Look at the charts below. For each chart, click on any lines or areas that appear <strong>blurry</strong>,
        <strong> distorted</strong>, or different from the others.
      </p>

      {/* Astigmatic Dial (Clock Chart) */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Astigmatic Dial</h3>
        <div className="flex justify-center items-center mb-2">
          <div
            className="relative"
            style={{
              paddingLeft:"20%",
              width: '300px',
              height: '300px',
            }}
          >
            {generateLines()}
          </div>
        </div>
        <p className="text-center">
          Click on any lines that appear <strong>blurry</strong> or <strong>less sharp</strong> than others.
        </p>
      </div>

      {/* Siemens Star */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Siemens Star</h3>
        <div className="flex justify-center items-center mb-2">
          <img
            src={img} // Updated image URL
            alt="Siemens Star"
            className="w-72 h-72 cursor-pointer"
            onClick={() => {
              // For simplicity, assume clicking the image indicates distortion
              setSelectedLines(['siemensStar']);
            }}
          />
        </div>
        <p className="text-center">
          Click on the image if any areas appear <strong>blurry</strong> or <strong>distorted</strong>.
        </p>
      </div>

      {/* Error Message */}
      {error && <p className="text-error mb-4">{error}</p>}

      {/* Disclaimer */}
      <p className="text-sm text-base-content-secondary mb-4">
        Note: This test provides an estimate and does not replace a professional eye examination.
        For accurate results and eye health assessment, please consult an eye care professional.
      </p>

      {/* Next Button */}
      <button onClick={handleTest} className="btn btn-primary px-4 py-2 rounded">
        Next
      </button>
    </div>
  );
};

export default AstigmatismGridTest;