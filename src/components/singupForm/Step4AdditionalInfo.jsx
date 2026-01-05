import React from 'react'

const Step4AdditionalInfo = ({ onBack, onSubmit, onChange, loading, error }) => {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <input name="skills" required placeholder="Skills (React, Node)"
        className="input input-bordered w-full" onChange={onChange} />

      <input name="interests" required placeholder="Interests"
        className="input input-bordered w-full" onChange={onChange} />

      <input name="location.city" required placeholder="City"
        className="input input-bordered w-full" onChange={onChange} />

      <input name="location.country" required placeholder="Country"
        className="input input-bordered w-full" onChange={onChange} />

      <input name="photourl" required placeholder="Profile Photo URL"
        className="input input-bordered w-full" onChange={onChange} />

      <textarea name="about" required placeholder="About you"
        className="textarea textarea-bordered w-full" onChange={onChange} />

      {error && <p className="text-error text-sm">{error}</p>}

      <div className="flex gap-2">
        <button onClick={onBack} className="btn btn-ghost w-1/2">Back</button>
        <button onClick={onSubmit} disabled={loading}
          className="btn btn-primary w-1/2">
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  )
}

export default Step4AdditionalInfo
