import React, { useState } from "react";
import { X } from "lucide-react";

const PromoCodeModal = ({ isOpen, onClose }) => {
  const [promoCode, setPromoCode] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!promoCode.trim()) {
      alert("Please enter a promo code");
      return;
    }

    alert(`Promo code "${promoCode}" applied!`);
    setPromoCode("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      {/* Modal */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          <X size={22} />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="/assets/logo.png"
            alt="DevStinder Logo"
            className="w-12 h-12"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center">
          ENTER YOUR PROMO CODE
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1 mb-6">
          Unlock in-app rewards
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Promo Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-black"
          />

          <p className="text-xs text-gray-400 text-center">
            By tapping Submit, you agree to our{" "}
            <span className="underline cursor-pointer">Terms</span> and{" "}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>

          <button
            type="submit"
            className={`w-full py-3 rounded-full font-semibold transition ${
              promoCode
                ? "bg-black text-white hover:bg-gray-900"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!promoCode}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};



export default PromoCodeModal
