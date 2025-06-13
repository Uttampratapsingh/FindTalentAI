import React, { useState } from "react";
import LandingPage from "./pages/LandingPage";
import {
  FaSearch, FaArrowLeft, FaCheck, FaTimes, FaFilter, FaSmile, } from "react-icons/fa";
import JobRequirementsForm from "./pages/JobRequirementsForm";
import JobDescriptionReview from "./pages/JobDescriptionReview.jsx";

const Index = () => {
  const [currentStep, setCurrentStep] = useState("landing");
  const [jobRequirements, setJobRequirements] = useState("");
  const [generatedJobDescription, setGeneratedJobDescription] = useState("");

  const handleRequirementsSubmit = async (requirements, apiGeneratedDescription) => {
    setJobRequirements(requirements);
    setGeneratedJobDescription(apiGeneratedDescription);
    setCurrentStep("description");
  };

  const handleDescriptionReview = (approved) => {
    if (approved) {
      setCurrentStep('complete');
    } else {
      setCurrentStep('requirements');
    }
  };

  const renderCurrentStep = () => {
     switch (currentStep) {
      case 'landing':
        return <LandingPage setCurrentStep={setCurrentStep} />;
      case 'requirements':
        return <JobRequirementsForm handleRequirementsSubmit={handleRequirementsSubmit} setCurrentStep={setCurrentStep}/>;
      case 'description':
        return (
          <JobDescriptionReview 
            jobDescription={generatedJobDescription}
            onReview={handleDescriptionReview}
          />
        );
      case 'complete':
        return (
          <div className="min-h-screen flex items-center justify-center px-6" style={{
            background: `
            radial-gradient(circle at top left, #173d51  0%, transparent 50%),
            radial-gradient(circle at bottom right, #173d51  0%, transparent 50%),
            #16191b 
            `,}}>
            <div className="bg-gray-700 bg-opacity-100 backdrop-blur-xl rounded-2xl p-8 max-w-2xl w-full mx-auto text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl text-white font-bold mb-4">
                Job Posted Succesfully
              </h2>
              <p className="text-white text-opacity-50 mb-6">
                You've successfully generated a job description and posted that match your criteria.
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => setCurrentStep('requirements')}
                  className="flex-1 bg-gradient-to-r from-gradient-start to-gradient-end hover:from-gradient-start/80 hover:to-gradient-end/80 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Post More Jobs
                </button>
                <button 
                  onClick={() => setCurrentStep('landing')}
                  className="flex-1 border border-dark-border hover:bg-dark-secondary text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <LandingPage setCurrentStep={setCurrentStep} />;
     }
  }

  return (
    <div className="min-h-screen bg-dark-primary">
      {renderCurrentStep()}
    </div>
  )
}

export default Index
