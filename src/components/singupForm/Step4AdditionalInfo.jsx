import React from "react";
import { MapPin, Camera, User, Sparkles } from "lucide-react";

const Step4AdditionalInfo = ({ onBack, onSubmit, onChange, loading, error, formData }) => {
  const {
    skills = "",
    interests = "",
    about = "",
    photourl = "",
    location = { city: "", country: "" },
  } = formData;

  return (
    <div className="flex flex-col gap-5 mt-6">
      {/* Skills */}
      <div className="relative">
        <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          name="skills"
          placeholder="Skills (React, Node, MongoDB)"
          className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
          value={skills}
          onChange={onChange}
          required
        />
      </div>

      {/* Interests */}
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          name="interests"
          placeholder="Interests (Startups, Open Source)"
          className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
          value={interests}
          onChange={onChange}
          required
        />
      </div>

      {/* Location */}
      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            name="location.city"
            placeholder="City"
            className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
            value={location.city || ""}
            onChange={onChange}
            required
          />
        </div>

        <input
          name="location.country"
          placeholder="Country"
          className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
          value={location.country || ""}
          onChange={onChange}
          required
        />
      </div>

      {/* Photo URL */}
      <div className="relative">
        <Camera className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          name="photourl"
          placeholder="Profile photo URL"
          className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary"
          value={photourl}
          onChange={onChange}
          required
        />
      </div>

      {/* About */}
      <textarea
        name="about"
        placeholder="Tell us about yourself..."
        rows={4}
        className="textarea textarea-bordered w-full resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        value={about}
        onChange={onChange}
        required
      />

      {/* Error */}
      {error && (
        <p className="text-error text-sm bg-error/10 p-2 rounded">
          {error}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="btn btn-ghost w-1/2">
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="btn btn-primary w-1/2"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default Step4AdditionalInfo;
