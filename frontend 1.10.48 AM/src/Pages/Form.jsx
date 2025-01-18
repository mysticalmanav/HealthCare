import React, { useState } from 'react';
import axios from 'axios';
import{useNavigate}from 'react-router-dom'
const MyopiaForm = () => {
  const Navigate = useNavigate()
  const [loading,setLoading] = useState()
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    mommy: '0',
    dadmy: '0',
    spheq: '',
    al: '',
    acd: '',
    lt: '',
    vcd: '',
    sporthr: '',
    readhr: '',
    comphr: '',
    tvhr: '',
    diopterhr: '',
    studyhr: '',
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [result, setResult] = useState(null); // State to store the result
  const totalSteps = 3;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    localStorage.setItem('userInput', JSON.stringify(formData));
    e.preventDefault();
    let gender = 0;
    if (formData.gender == 'Male') gender = 1;
    let data = {
       'AGE': formData.age,
    'SPHEQ': formData.spheq,
    'AL': formData.al,
    'ACD': formData.acd,
    'LT': formData.lt,
    'VCD': formData.vcd,
    'SPORTHR': formData.sporthr,
    'READHR': formData.readhr,
    'COMPHR': formData.comphr,
    'STUDYHR': formData.studyhr,
      'TVHR': formData.tvhr,
      'GENDER': gender,
      'MOMMY': formData.mommy == "Yes" ? '1' :'0',
       'DADMY':formData.dadmy=="Yes"?'1':'0',
       'DIOPTERHR': formData.diopterhr
     }
    try {
      const response = await axios.post(
        'https://c195-35-227-4-55.ngrok-free.app/endpoint2',
        { formData:data },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      setLoading(false)
      setResult(response.data.prob);
      localStorage.setItem('result_myopia',response.data.prob)// Store the result
    } catch (error) {
      console.error('Error making request:', error);
    }
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const progress = (currentStep / totalSteps) * 100;

  return (loading ? (<div className='flex flex-col justify-center items-center mx-auto'>
    <span className="loading loading-infinity loading-lg mx-auto"></span>
    <p className="mt-2 text-lg font-semibold text-light">Fetching results...</p>
  </div>) : <div className="relative w-full h-full h-screen bg-base-200 overflow-y-auto">
    <div className="max-w-5xl mx-auto my-auto bg-base-200 p-6 rounded-lg">
      {!result ? (
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <p>Step {currentStep} of {totalSteps}</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {currentStep === 1 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Demographics and Parental History</h2>
              <p className="mb-4">Please provide your demographic information and parental myopia history. (If some details are not available just write NA)</p>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Age at First Visit</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Age"
                  required
                  min="0"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Gender</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                    
                </select>
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Is your mother myopic?</span>
                </label>
                <select
                  name="mommy"
                  value={formData.mommy}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select an option</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Is your father myopic?</span>
                </label>
                <select
                  name="dadmy"
                  value={formData.dadmy}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select an option</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Eye Measurements</h2>
              <p className="mb-4">Please provide your eye measurement data. (If some details are not available just write NA)</p>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Spherical Equivalent Refraction (SPHEQ)</span>
                </label>
                <input
                  type="number"
                  name="spheq"
                  value={formData.spheq}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter SPHEQ"
                  required
                  step="0.01"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Axial Length (AL) (mm)</span>
                </label>
                <input
                  type="number"
                  name="al"
                  value={formData.al}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Axial Length"
                  required
                  step="0.01"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Anterior Chamber Depth (ACD) (mm)</span>
                </label>
                <input
                  type="number"
                  name="acd"
                  value={formData.acd}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Anterior Chamber Depth"
                  required
                  step="0.01"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Lens Thickness (LT) (mm)</span>
                </label>
                <input
                  type="number"
                  name="lt"
                  value={formData.lt}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Lens Thickness"
                  required
                  step="0.01"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Vitreous Chamber Depth (VCD)</span>
                </label>
                <input
                  type="number"
                  name="vcd"
                  value={formData.vcd}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Vitreous Chamber Depth"
                  required
                  step="0.01"
                />
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Lifestyle and Activities</h2>
              <p className="mb-4">Please provide information about your weekly activities. (If some details are not available just write NA)</p>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Sports/Outdoor Activities (hrs/week)</span>
                </label>
                <input
                  type="number"
                  name="sporthr"
                  value={formData.sporthr}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Hours per Week"
                  required
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Reading for Pleasure (hrs/week)</span>
                </label>
                <input
                  type="number"
                  name="readhr"
                  value={formData.readhr}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Hours per Week"
                  required
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Computer Use (hrs/week)</span>
                </label>
                <input
                  type="number"
                  name="comphr"
                  value={formData.comphr}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Hours per Week"
                  required
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Watching TV (hrs/week)</span>
                </label>
                <input
                  type="number"
                  name="tvhr"
                  value={formData.tvhr}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Hours per Week"
                  required
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Near-Work Activities (hrs/week)</span>
                </label>
                <input
                  type="number"
                  name="diopterhr"
                  value={formData.diopterhr}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Hours per Week"
                  required
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-weight-100">Study Hours (hrs/week)</span>
                </label>
                <input
                  type="number"
                  name="studyhr"
                  value={formData.studyhr}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter Study Hours"
                  required
                  step="0.01"
                  min="0"
                />
              </div>
            </>
          )}

          <div className="flex justify-between mt-6">
            {currentStep > 1 && (
              <button type="button" className="btn btn-dark" onClick={prevStep}>
                Previous
              </button>
            )}
            {currentStep < totalSteps && (
              <button type="button" className="btn btn-light ml-auto" onClick={nextStep}>
                Next
              </button>
            )}
            {currentStep === totalSteps && (
              <button type="submit" className="btn btn-dark ml-auto">
                Submit
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="bg-base-200 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Results</h2>
            <div className="bg-neutral text-neutral-content p-4 rounded-lg mb-4">
              <p className="mb-2 text-lg">
                <span className="font-semibold">Prediction:</span> {result > 0.5 ? 'Myopic' : 'Non-Myopic'}
              </p>
              <p className="mb-2 text-lg">
                <span className="font-semibold">Probability of Myopia:</span> {(result * 100).toFixed(2)}%
              </p>
            </div>
            <div className="flex justify-center">
              <button
                className="btn btn-dark btn-wide"
                onClick={() => Navigate('/bot')}
              >
                Talk to AI Bot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>);
    
  
};

export default MyopiaForm;