import React from "react";

const ConfirmModal = ({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-base-100 rounded-2xl shadow-xl w-full max-w-md p-6 animate-scaleIn">
        
        {/* TITLE */}
        <h2 className="text-xl font-semibold text-center mb-3">
          {title}
        </h2>

        {/* MESSAGE */}
        <p className="text-sm text-gray-500 text-center mb-6">
          {message}
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex justify-center gap-4">
          <button
            className="btn btn-outline"
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            className="btn btn-error"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
