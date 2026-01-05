
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../utils/userSlice";
import StepIndicator from "./StepIndicator";
import Back from "../../components/buttons/Back";

import { useSignupForm } from "./useSignupForm";
import Step1BasicInfo from "./Step1BasicInfo";
import Step2AuthInfo from "./Step2AuthInfo";
import Step3ProfileInfo from "./Step3ProfileInfo";
import Step4AdditionalInfo from "./Step4AdditionalInfo";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    step, setStep, loading, error,
    handleChange, submitSignup
  } = useSignupForm();

  const handleSubmit = async () => {
    const data = await submitSignup();
    dispatch(addUser(data.user));
    navigate("/feed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="absolute top-6 left-6"><Back /></div>

      <div className="w-full max-w-md bg-base-100 rounded-3xl p-8 shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-primary">
          devTinder Sign Up
        </h2>

        <StepIndicator step={step} />

        <div className="space-y-4 ">
          {step === 1 && <Step1BasicInfo onNext={() => setStep(2)} onChange={handleChange} />}
          {step === 2 && <Step2AuthInfo onNext={() => setStep(3)} onBack={() => setStep(1)} onChange={handleChange} />}
          {step === 3 && <Step3ProfileInfo onNext={() => setStep(4)} onBack={() => setStep(2)} onChange={handleChange} />}
          {step === 4 && <Step4AdditionalInfo
            onBack={() => setStep(3)}
            onSubmit={handleSubmit}
            onChange={handleChange}
            loading={loading}
            error={error}
          />}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
