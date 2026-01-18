import React from "react";
import Back from "../../components/buttons/Back";
const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-700">
       <div className=" absolute top-6 left-6">
        <Back />
     </div>
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        Your privacy is important to us. This Privacy Policy explains how
        DevTinder collects, uses, and protects your personal information.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Information We Collect</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Personal details such as name, email, and profile information</li>
        <li>Messages and interactions within the platform</li>
        <li>Usage data and device information</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">How We Use Your Data</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>To provide and improve our services</li>
        <li>To ensure platform safety and security</li>
        <li>To communicate updates and support</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Data Security</h2>
      <p>
        We implement industry-standard security measures to protect your data.
        However, no system is 100% secure.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, contact us at
        <strong> support@devstinder.site</strong>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
