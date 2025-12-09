import React from 'react'
import { useNavigate } from 'react-router-dom'

const Back = () => {
    const navigate = useNavigate(); // hook for back navigation

    return (
        <div className=" px-4 py-4">
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="cursor-pointer hover:text-primary -mt-20"
            >
                &larr; Back
            </button>
        </div>
    )
}

export default Back
