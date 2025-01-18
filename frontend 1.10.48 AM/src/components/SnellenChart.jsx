import React, { useState } from 'react';

const SnellenChart = ({ onNext }) => {
  const [distance, setDistance] = useState(20);
  const [responses, setResponses] = useState({});
  const [error, setError] = useState('');

  // Standard Snellen chart optotypes
  const optotypes = ['C', 'D', 'E', 'F', 'L', 'N', 'O', 'P', 'T', 'Z', 'H', 'K', 'R', 'S', 'V'];

  // Snellen chart lines with randomized letters
  const lines = [
    { letters: 'E', fontSize: 200 },
    { letters: '', fontSize: 150 },
    { letters: '', fontSize: 100 },
    { letters: '', fontSize: 75 },
    { letters: '', fontSize: 50 },
    { letters: '', fontSize: 37.5 },
    { letters: '', fontSize: 25 },
    { letters: '', fontSize: 18.75 },
    { letters: '', fontSize: 12.5 },
    { letters: '', fontSize: 9.375 },
  ];

  // Generate random letters for each line (except the first line)
  lines.forEach((line, index) => {
    if (index > 0 && line.letters === '') {
      const lineLength = index + 1;
      let lineLetters = '';
      for (let i = 0; i < lineLength; i++) {
        const randIndex = Math.floor(Math.random() * optotypes.length);
        lineLetters += optotypes[randIndex] + ' ';
      }
      line.letters = lineLetters.trim();
    }
  });

  const handleTest = () => {
    const numberOfLines = lines.length;
    const correctLines = Object.keys(responses).filter((key) => responses[key]).length;

    if (correctLines === 0) {
      setError('Please indicate the lines you could read correctly.');
      return;
    }

    // Calculate visual acuity
    const visualAcuityFraction = (distance / 20) * (correctLines / numberOfLines);
    const visualAcuityDenominator = Math.round(20 / visualAcuityFraction);

    const result = `Your estimated visual acuity is 20/${visualAcuityDenominator}`;

    onNext({ snellen: result });
  };

  const handleResponseChange = (index, value) => {
    setResponses({ ...responses, [index]: value });
    setError('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Simulated Snellen Chart</h2>
      <p className="mb-4">
        Adjust the viewing distance and try to read the letters. For each line, indicate whether you could read it correctly.
      </p>

      {/* Viewing Distance */}
      <div className="mb-4">
        <label className="block mb-2 font-bold">Viewing Distance (feet): {distance} ft</label>
        <input
          type="range"
          min="6"
          max="20"
          step="1"
          value={distance}
          onChange={(e) => setDistance(parseInt(e.target.value))}
          className="w-full"
        />
        <small>
          Adjust the slider to match your actual distance from the screen. Ensure it's measured accurately.
        </small>
      </div>

      {/* Snellen Chart Display */}
      <div className="mb-4">
        {lines.map((line, index) => (
          <div key={index} className="flex items-center justify-center mb-2">
            <p
              className="text-center"
              style={{
                fontSize: `${(line.fontSize * distance) / 20}px`,
                fontFamily: 'Optician Sans, sans-serif',
                letterSpacing: '0.1em',
                marginRight: '20px',
              }}
            >
              {line.letters}
            </p>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={responses[index] || false}
                  onChange={(e) => handleResponseChange(index, e.target.checked)}
                />{' '}
                Read correctly
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Next Button */}
      <button onClick={handleTest} className="btn btn-dark px-4 py-2 rounded">
        Next
      </button>
    </div>
  );
};

export default SnellenChart;