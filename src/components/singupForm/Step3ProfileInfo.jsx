import React from 'react'

const Step3ProfileInfo = ({ onNext, onBack, onChange }) => {
  return (
   <div className="flex flex-col gap-4 mt-6">
      <input name="age" type="number" required placeholder="Age"
        className="input input-bordered w-full" onChange={onChange} />

      <select name="gender" required className="select select-bordered w-full"
        onChange={onChange}>
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <input name="profession" required placeholder="Profession"
        className="input input-bordered w-full" onChange={onChange} />

      <select name="experienceLevel" required
        className="select select-bordered w-full"
        onChange={onChange}>
        <option value="">Experience Level</option>
        <option>Student</option>
        <option>Fresher</option>
        <option>Junior</option>
        <option>Mid</option>
        <option>Senior</option>
      </select>

      <div className="flex gap-2">
        <button onClick={onBack} className="btn btn-ghost w-1/2">Back</button>
        <button onClick={onNext} className="btn btn-primary w-1/2">Next</button>
      </div>
    </div>
  )
}

export default Step3ProfileInfo
