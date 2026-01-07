import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

export const useSignupForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    profession: "",
    experienceLevel: "",
    lookingFor: "Networking",
    skills: "",
    interests: "",
    about: "",
    photourl: "",
    location: {
      city: "",
      country: "",
    },
  });

const handleChange = (e) => {
  const { name, value } = e.target;

  // ✅ Handle nested location fields
  if (name.startsWith("location.")) {
    const field = name.split(".")[1];
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
      },
    }));
    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const submitSignup = async () => {
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()),
        interests: formData.interests.split(",").map((i) => i.trim()),
      };

      const res = await axios.post(`${BASE_URL}/signup`, payload, {
        withCredentials: true,
      });

      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    setStep,
    loading,
    error,
    formData,
    handleChange,
    submitSignup,
  };
};
