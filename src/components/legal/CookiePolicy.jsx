import React from "react";
import Back from "../../components/buttons/Back";
const CookiePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-700">
       <div className=" absolute top-6 left-6">
        <Back />
     </div>
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

      <p className="mb-4">
        DevTinder uses cookies to enhance user experience and improve platform
        performance.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device to help websites
        function efficiently.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">How We Use Cookies</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Authentication and session management</li>
        <li>Analytics and performance tracking</li>
        <li>User preferences</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Managing Cookies</h2>
      <p>
        You can control or disable cookies through your browser settings.
      </p>
    </div>
  );
};

export default CookiePolicy;
