import React from "react";
import Back from "../../components/buttons/Back";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-700">
       <div className=" absolute top-6 left-6">
        <Back />
     </div>
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <p className="mb-4">
        By accessing or using DevTinder, you agree to comply with these Terms
        and Conditions.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">User Responsibilities</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>You must provide accurate information</li>
        <li>You are responsible for your account activity</li>
        <li>No misuse, harassment, or illegal activity</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Account Termination</h2>
      <p>
        We reserve the right to suspend or terminate accounts that violate
        our policies.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Limitation of Liability</h2>
      <p>
        DevTinder is not liable for any indirect or consequential damages
        arising from platform use.
      </p>

      <p className="mt-8 text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default Terms;
