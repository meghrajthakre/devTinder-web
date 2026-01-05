import React from 'react'

const Step1BasicInfo = ({ onNext, onChange }) => {
  return (
   <div className="flex flex-col gap-4 mt-6">
      <input name="firstName" required placeholder="First Name"
        className="input input-bordered w-full" onChange={onChange} />

      <input name="lastName" required placeholder="Last Name"
        className="input input-bordered w-full" onChange={onChange} />

      <button type="button" onClick={onNext}
        className="btn btn-primary w-full">
        Next
      </button> 
    </div>
  )
}

export default Step1BasicInfo

