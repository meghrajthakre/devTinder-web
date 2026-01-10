import React, { useRef } from "react";

const StepProfileInfo = ({ formData, setFormData, photo, setPhoto, onNext }) => {
  const fileRef = useRef(null);

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 pb-8">
      {/* CARD */}
      <div className="bg-base-100 rounded-xl shadow w-full max-w-3xl p-6 md:p-8 space-y-6">
        
        <h2 className="text-xl font-semibold text-center">
          Profile Information
        </h2>

        {/* PROFILE PHOTO */}
        <div
          className="w-28 h-28 mx-auto rounded-full overflow-hidden ring ring-primary cursor-pointer"
          onClick={() => fileRef.current.click()}
        >
          <img
            src={photo}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

        <input
          ref={fileRef}
          type="file"
          hidden
          accept="image/*"
          onChange={(e) =>
            setPhoto(URL.createObjectURL(e.target.files[0]))
          }
        />

        {/* INPUT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["firstName", "lastName", "age", "mobile", "profession"].map(
            (f) => (
              <input
                key={f}
                value={formData[f]}
                onChange={(e) =>
                  setFormData({ ...formData, [f]: e.target.value })
                }
                className="input input-bordered w-full"
                placeholder={f}
              />
            )
          )}
        </div>

        {/* ABOUT */}
        <textarea
          className="textarea textarea-bordered w-full resize-none"
          rows={4}
          placeholder="Tell something about yourself"
          value={formData.about}
          onChange={(e) =>
            setFormData({ ...formData, about: e.target.value })
          }
        />

        {/* ACTION */}
        <div className="flex justify-end pt-2">
          <button className="btn btn-primary px-8" onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepProfileInfo;
