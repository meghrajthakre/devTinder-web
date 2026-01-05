import React from 'react'

const Step2AuthInfo = ({ onNext, onBack, onChange }) => {
  return (
   <div className="flex flex-col gap-4 mt-6">
      <input name="email" type="email" required placeholder="Email"
        className="input input-bordered w-full" onChange={onChange} />

      <input name="password" type="password" required placeholder="Password"
        className="input input-bordered w-full" onChange={onChange} />

      <div className="flex gap-2">
        <button onClick={onBack} className="btn btn-ghost w-1/2">Back</button>
        <button onClick={onNext} className="btn btn-primary w-1/2">Next</button>
      </div>
    </div>
  )
}

export default Step2AuthInfo
