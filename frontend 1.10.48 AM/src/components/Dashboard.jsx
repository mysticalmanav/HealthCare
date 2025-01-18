import React, { useEffect, useState } from 'react';
import {
  Eye,
  User,
  Activity,
  BookOpen,
  Tv,
  Computer,
  GraduationCap,
} from 'lucide-react';

function App() {
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('userInput');
    const inputData = JSON.parse(data);
    const data2 = localStorage.getItem('vision_test_results');
    const result = JSON.parse(data2);
    const name = localStorage.getItem('name');
    const snellen = result.snellen;
    const astigmatism = result.astigmatism;
    const blur = result.blur;
    const age = inputData.age;
    const acd = inputData.acd;
    const lt = inputData.lt;
    const vcd = inputData.vcd;
    const sporthr = inputData.sporthr;
    const diopterhr = inputData.diopterhr;
    const gender = inputData.gender;
    const mommy = inputData.mommy;
    const dadmy = inputData.dadmy;
    const spheq = inputData.spheq;
    const al = inputData.al;
    const readhr = inputData.readhr;
    const comphr = inputData.comphr;
    const tvhr = inputData.tvhr;
    const studyhr = inputData.studyhr;
    const result_myopia = parseFloat(localStorage.getItem('result_myopia'));

    if (
      name &&
      snellen &&
      astigmatism &&
      blur &&
      age &&
      gender &&
      mommy &&
      dadmy &&
      spheq &&
      al &&
      readhr &&
      comphr &&
      tvhr &&
      studyhr &&
      !isNaN(result_myopia)
    ) {
      setTestData({
        name,
        vision_test_results: {
          snellen,
          astigmatism,
          blurSensitivity: null,
          blur,
        },
        user_input: {
          age,
          gender,
          mommy,
          dadmy,
          spheq,
          al,
          acd,
          lt,
          vcd,
          sporthr,
          readhr,
          comphr,
          tvhr,
          diopterhr,
          studyhr,
        },
        result_myopia,
      });
    }
  }, []);

  if (!testData) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <p className="text-base-content">No test results found</p>
      </div>
    );
  }

  const getRiskLevel = (probability) => {
    if (probability <= 0.3) return ['Low Risk', 'badge-success'];
    if (probability <= 0.6) return ['Medium Risk', 'badge-warning'];
    return ['High Risk', 'badge-error'];
  };

  const [riskLevel, riskBadgeClass] = getRiskLevel(testData.result_myopia);

  return (
    <div
      data-theme="chatgpt"
      className="relative w-full min-h-screen bg-base-200 overflow-y-auto"
    >
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-base-200 rounded-lg  p-6 mb-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-base-content">
                  Vision Health Dashboard 
                </h1>
                <p className="text-base-content opacity-70">
                  Test Results Summary
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-base-content" />
                <span className="text-base-content font-medium">
                  {testData.name}
                </span>
              </div>
            </div>

            {/* Myopia Risk Assessment */}
            <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    Myopia Risk Assessment
                  </h2>
                  <p className="text-lg opacity-90">
                    Probability Score:{' '}
                    {(testData.result_myopia * 100).toFixed(1)}%
                  </p>
                </div>
                <div className={`badge ${riskBadgeClass} p-4`}>
                  {riskLevel}
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Vision Test Results */}
              <div className="card bg-base-100 shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Eye className="w-6 h-6 text-primary mr-2" />
                  <h3 className="text-xl font-semibold text-base-content">
                    Vision Test Results
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="font-medium mr-2">Snellen Test:</span>
                    <span className="text-base-content opacity-70">
                      {testData.vision_test_results.snellen}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">Astigmatism:</span>
                    <span className="text-base-content opacity-70">
                      {testData.vision_test_results.astigmatism}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">Blur Test:</span>
                    <span className="text-base-content opacity-70">
                      {testData.vision_test_results.blur}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Daily Activities */}
              <div className="card bg-base-100 shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Activity className="w-6 h-6 text-primary mr-2" />
                  <h3 className="text-xl font-semibold text-base-content">
                    Daily Activities (Hours)
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="flex items-center text-base-content opacity-70">
                      <BookOpen className="w-4 h-4 mr-2" /> Reading:{' '}
                      {testData.user_input.readhr}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center text-base-content opacity-70">
                      <Computer className="w-4 h-4 mr-2" /> Computer:{' '}
                      {testData.user_input.comphr}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center text-base-content opacity-70">
                      <Tv className="w-4 h-4 mr-2" /> TV:{' '}
                      {testData.user_input.tvhr}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center text-base-content opacity-70">
                      <GraduationCap className="w-4 h-4 mr-2" /> Study:{' '}
                      {testData.user_input.studyhr}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="card bg-base-100 shadow-md p-6">
              <div className="flex items-center mb-4">
                <User className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-xl font-semibold text-base-content">
                  Personal Information
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-base-content opacity-70">
                    Age: {testData.user_input.age}
                  </p>
                  <p className="text-base-content opacity-70">
                    Gender: {testData.user_input.gender}
                  </p>
                </div>
                <div>
                  <p className="text-base-content opacity-70">
                    Mother Myopic:{' '}
                    {testData.user_input.mommy === '1' ? 'Yes' : 'No'}
                  </p>
                  <p className="text-base-content opacity-70">
                    Father Myopic:{' '}
                    {testData.user_input.dadmy === '1' ? 'Yes' : 'No'}
                  </p>
                </div>
                <div>
                  <p className="text-base-content opacity-70">
                    SPHEQ: {testData.user_input.spheq}
                  </p>
                  <p className="text-base-content opacity-70">
                    AL: {testData.user_input.al}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> {/* Closing main content div */}
    </div>
  );
}

export default App;