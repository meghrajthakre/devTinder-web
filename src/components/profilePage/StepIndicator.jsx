import React from 'react'

const StepIndicator = ({ step, progress }) => {
  const steps = ["Profile", "Photos", "Developer"];

  return (
    <div className="bg-base-100 rounded-xl shadow p-4 space-y-4">
      <div className="flex justify-between">
        {steps.map((s, i) => (
          <div
            key={s}
            className={`text-sm font-semibold ${
              step === i + 1 ? "text-primary" : "text-gray-400"
            }`}
          >
            {i + 1}. {s}
          </div>
        ))}
      </div>

      <progress
        className="progress progress-primary w-full"
        value={progress}
        max="100"
      />
    </div>
  );
};

export default StepIndicator;
