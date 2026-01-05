import React from 'react'
const StepIndicator = ({ step }) => {
    return (
        <div className="flex items-center justify-center gap-4 mb-6 mx-auto">
            {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex items-center gap-2">
                    <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full
              text-sm font-semibold
              ${step >= num
                                ? "bg-primary text-white"
                                : "bg-base-300 text-base-content/50"
                            }`}
                    >
                        {num}
                    </div>

                    {num !== 4 && (
                        <div
                            className={`w-8 h-[2px]
                ${step > num ? "bg-primary" : "bg-base-300"}`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};


export default StepIndicator
