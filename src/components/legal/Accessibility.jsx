import React from "react";
import Back from "../../components/buttons/Back";

const Accessibility = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-700">
     <div className=" absolute top-6 left-6">
        <Back />
     </div>

      <h1 className="text-3xl font-bold mb-6">Accessibility Statement</h1>

      <p className="mb-4">
        DevTinder is committed to ensuring digital accessibility for all users,
        including people with disabilities.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">Our Commitment</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Keyboard-friendly navigation</li>
        <li>Readable text and contrast</li>
        <li>Screen reader compatibility</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">Feedback</h2>
      <p>
        If you experience accessibility issues, please contact us at
        <strong> accessibility@devstinder.site</strong>.
      </p>
    </div>
  );
};

export default Accessibility;
