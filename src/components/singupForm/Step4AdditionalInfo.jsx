import React, { useState } from "react";
import { MapPin } from "lucide-react";

const Step4AdditionalInfo = ({
  onBack,
  onSubmit,
  onChange,
  loading,
  error,
   formData = {
    skills: "",
    interests: "",
    about: "",
    photourl: "",
    location: { city: "", country: "" },
  },
}) => {
  const [locationLoading, setLocationLoading] = useState(false);

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Example: use any reverse geocoding API
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          console.log("Reverse geocoding data:", data);

          onChange({  
            target: {
              name: "location.city",
              value:
                data.address.city ||
                data.address.town ||
                data.address.village ||
                "",
            },
          });

          onChange({
            target: {
              name: "location.country",
              value: data.address.country || "",
            },
          });
        } catch (err) {
          console.error("Location error", err);
        } finally {
          setLocationLoading(false);
        }
      },
      () => {
        alert("Unable to fetch location");
        setLocationLoading(false);
      }
    );
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <input
        name="skills"
        placeholder="Skills (React, Node)"
        className="input input-bordered w-full"
        value={formData.skills}
        onChange={onChange}
        required
      />

      <input
        name="interests"
        placeholder="Interests"
        className="input input-bordered w-full"
        value={formData.interests}
        onChange={onChange}
        required
      />

      {/* Location */}
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            name="location.city"
            placeholder="City"
            className="input input-bordered w-full pl-10"
            value={formData.location?.city || ""}
            onChange={onChange}
            required
          />
        </div>

        <input
          name="location.country"
          placeholder="Country"
          className="input input-bordered w-full"
          value={formData.location?.country || ""}
          onChange={onChange}
          required
        />

        <button
          type="button"
          onClick={detectLocation}
          disabled={locationLoading}
          className="btn btn-ghost"
          title="Detect location"
        >
          {locationLoading ? "..." : "📍"}
        </button>
      </div>

      <input
        name="photourl"
        placeholder="Profile Photo URL"
        className="input input-bordered w-full"
        value={formData.photourl}
        onChange={onChange}
        required
      />

      <textarea
        name="about"
        placeholder="About you"
        className="textarea textarea-bordered w-full"
        value={formData.about}
        onChange={onChange}
        required
      />

      {error && <p className="text-error text-sm">{error}</p>}

      <div className="flex gap-2">
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
