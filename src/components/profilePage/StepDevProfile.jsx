import React from "react";

const StepDevProfile = ({ formData, setFormData, onBack, onSubmit, loading }) => {
  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4">
      <div className="bg-base-100 w-full max-w-4xl rounded-2xl shadow p-6 md:p-8 space-y-6">

        <h2 className="text-2xl font-semibold text-center">
          Developer Profile
        </h2>

        {/* Skills & Interests */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            value={formData.skills}
            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Skills (React, Node...)"
          />
          <input
            value={formData.interests}
            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Interests (Comma separated)"
          />
        </div>

        {/* Dev Accounts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            value={formData.githubUsername}
            onChange={(e) => setFormData({ ...formData, githubUsername: e.target.value })}
            className="input input-bordered w-full"
            placeholder="GitHub Username"
          />
          <input
            value={formData.githubProfileUrl}
            onChange={(e) => setFormData({ ...formData, githubProfileUrl: e.target.value })}
            className="input input-bordered w-full"
            placeholder="GitHub Profile URL"
          />
          <input
            value={formData.linkedinProfileUrl}
            onChange={(e) => setFormData({ ...formData, linkedinProfileUrl: e.target.value })}
            className="input input-bordered w-full"
            placeholder="LinkedIn Profile URL"
          />
          <input
            value={formData.portfolioUrl}
            onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Portfolio URL"
          />
        </div>

        {/* Current Role & Tech Stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            value={formData.currentRole}
            onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Current Role"
          />
          <input
            value={formData.preferredTechStack}
            onChange={(e) => setFormData({ ...formData, preferredTechStack: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Tech Stack (React, Node...)"
          />
        </div>

        {/* Match Preferences */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            value={formData.matchSkills}
            onChange={(e) => setFormData({ ...formData, matchSkills: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Preferred Skills"
          />
          <input
            value={formData.matchExperience}
            onChange={(e) => setFormData({ ...formData, matchExperience: e.target.value })}
            className="input input-bordered w-full"
            placeholder="Preferred Experience Level"
          />
        </div>

        {/* Location Preference */}
        <select
          className="select select-bordered w-full"
          value={formData.locationPreference}
          onChange={(e) => setFormData({ ...formData, locationPreference: e.target.value })}
        >
          <option>Anywhere</option>
          <option>Remote</option>
          <option>Same City</option>
        </select>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-2">
          <button className="btn btn-outline w-full sm:w-auto" onClick={onBack}>
            Back
          </button>
          <button
            className="btn btn-primary w-full sm:w-auto"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepDevProfile;
