import React, { useState } from "react";
import PromoCodeModal from "./PromoCodeModal";

const PromoCode = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cursor-pointer"
      >
        Enter Promo Code
      </button>

      <PromoCodeModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};


export default PromoCode
