import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { generateJobDescription } from "../utils/generateJobDescription";

export default function JobRequirementsForm({ handleRequirementsSubmit,setCurrentStep }) {
  const [requirements, setRequirements] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!requirements.trim()) return;
    setIsLoading(true);
    try {
      const desc = await generateJobDescription(requirements);
      handleRequirementsSubmit(requirements, desc);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{
            background: `
            radial-gradient(circle at top left, #173d51  0%, transparent 50%),
            radial-gradient(circle at bottom right, #173d51  0%, transparent 50%),
            #16191b 
            `,
        }}>
      <div className="bg-gray-800 bg-opacity-100 backdrop-blur-xl rounded-2xl p-8 max-w-2xl w-full mx-auto">
        {/* Header */}
        <div className="flex items-center mb-2">
          <button
            onClick={()=>setCurrentStep("landing")}
            className="text-gray-400 hover:text-white transition mr-4"
          >
            <FaArrowLeft size={20} />
          </button>
          <h2 className="flex-1 text-center text-3xl font-bold text-white">
            Define Your Job Requirements
          </h2>
        </div>
        <p className="text-gray-400 text-center mb-6">
        AI will generate a complete job description
        </p>

        {/* Textarea */}
        <textarea
          id="requirements"
          placeholder="Founding Frontend Engineer with 3+ years of experience…"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="w-full min-h-[200px] bg-gray-700 border border-gray-600 placeholder-gray-400 rounded-lg p-4 text-white resize-none focus:outline-none focus:border-blue-600 mb-6"
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!requirements.trim() || isLoading}
          className="w-full flex items-center justify-center text-white font-semibold py-4 text-lg rounded-xl transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" style={{
            background: `
            radial-gradient(circle at top left, #173d51  0%, transparent 50%),
            radial-gradient(circle at bottom right, #173d51  0%, transparent 50%),
            #16191b 
            `,
        }}
        >
          {isLoading ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
              Generating…
            </>
          ) : (
            <>
              Generate&nbsp;&amp;&nbsp;Continue
              <FaArrowRight className="ml-2 w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
