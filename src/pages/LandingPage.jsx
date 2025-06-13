
const LandingPage = ({setCurrentStep}) => {
  return (
    <div
        className="min-h-screen flex flex-col items-center justify-center p-8"
        style={{
            background: `
            radial-gradient(circle at top left, #173d51  0%, transparent 50%),
            radial-gradient(circle at bottom right, #173d51  0%, transparent 50%),
            #16191b 
            `,
        }}
        >
        {/* Main Content - Centered Button */}
        <div className="flex items-center justify-center">
            <button onClick={()=>{setCurrentStep("requirements")}}
                className="
                    inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium
                    transition-all duration-200 ease-in-out
                    bg-gradient-to-b from-gray-200 to-gray-300 text-black
                    border-2 border-gray-400 shadow-[0_2px_0_0_#9ca3af]
                    hover:bg-gradient-to-b hover:from-gray-100 hover:to-gray-200
                    hover:border-gray-300 hover:shadow-[0_3px_0_0_#9ca3af,0_6px_0_0_#6b7280]
                    active:bg-gradient-to-b active:from-gray-400 active:to-gray-500
                    active:border-gray-600 active:shadow-none active:translate-y-1
                    focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-800
                    disabled:bg-gradient-to-b disabled:from-gray-500 disabled:to-gray-600
                    disabled:text-gray-400 disabled:border-gray-600 disabled:cursor-not-allowed disabled:opacity-50
                    disabled:shadow-none
                "
                >
                Find Talent
            </button>
        </div>
    </div>
  );
};

export default LandingPage;
