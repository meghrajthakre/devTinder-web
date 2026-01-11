import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Camera } from "lucide-react";

const StepProfileInfo = ({ formData, setFormData, photo, setPhoto, onNext }) => {
  const fileRef = useRef(null);
  const [error, setError] = useState("");

  const validate = () => {
    if (!formData.firstName.trim()) return "First name is required";
    if (!formData.lastName.trim()) return "Last name is required";
    if (!formData.gender) return "Please select gender";
    return "";
  };

  const handleNext = () => {
    const err = validate();
    if (err) {
      setError(err);
      toast.error(err);
      return;
    }
    setError("");
    onNext();
  };

  return (
    <div className="flex items-center justify-center pb-20">
      <div className="bg-base-100 rounded-xl shadow w-full max-w-4xl p-6 md:p-8 max-h-[520px] overflow-y-auto scrollbar-thin scrollbar-thumb-base-300 space-y-6">

        <h2 className="text-2xl font-semibold text-center">
          Profile Information
        </h2>

        {/* PROFILE PHOTO */}
        <div className="flex justify-center mb-4">
          <div
            onClick={() => fileRef.current.click()}
            className="relative w-28 h-28 rounded-full overflow-hidden border border-base-300 cursor-pointer group"
          >
            <img
              src={photo || "/avatar.png"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
              <Camera size={24} />
            </div>
          </div>
          <input
            ref={fileRef}
            type="file"
            hidden
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;

              const form = new FormData();
              form.append("photos", file);

              try {
                const res = await fetch(
                  "http://localhost:3001/profile/uploadPhotos",
                  { method: "POST", credentials: "include", body: form }
                );
                const data = await res.json();
                if (!data.success) throw new Error("Upload failed");

                const cloudinaryUrl = data.photos[data.photos.length - 1];
                setPhoto(cloudinaryUrl);
                toast.success("Profile photo uploaded");
              } catch {
                toast.error("Upload failed");
              }
            }}
          />
        </div>

        {/* INPUTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="input input-bordered w-full"
            placeholder="First Name *"
          />
          <input
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Last Name *"
          />
          <input
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Age"
            type="number"
          />
          <input
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Mobile"
          />
          <input
            value={formData.profession}
            onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Profession"
          />
          <select
            className="select select-bordered w-full"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          >
            <option value="">Select Gender *</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input
            value={formData.city || ""}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="input input-bordered w-full"
            placeholder="City"
          />
          <input
            value={formData.country || ""}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Country"
          />
        </div>

        {/* ABOUT */}
        <textarea
          className="textarea textarea-bordered w-full resize-none"
          rows={4}
          placeholder="Tell something about yourself"
          value={formData.about}
          onChange={(e) => setFormData({ ...formData, about: e.target.value })}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* NEXT BUTTON */}
        <div className="flex justify-end pt-2">
          <button className="btn btn-primary px-8" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepProfileInfo;
