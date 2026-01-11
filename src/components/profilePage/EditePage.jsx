import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../../utils/constant";
import { addUser } from "../../utils/userSlice";
import StepIndicator from "./StepIndicator";
import StepProfileInfo from "./StepProfileInfo";
import StepPhotos from "./StepPhotos";
import StepDevProfile from "./StepDevProfile";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [photos, setPhotos] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "Male",
    mobile: "",
    profession: "",
    experienceLevel: "Student",
    about: "",
    skills: "",
    interests: "",
    githubUsername: "",
    githubProfileUrl: "",
    linkedinProfileUrl: "",
    portfolioUrl: "",
    currentRole: "",
    preferredTechStack: "",
    matchSkills: "",
    matchExperience: "",
    locationPreference: "Anywhere",
  });

  /* ===== LOAD USER ===== */
  useEffect(() => {
    if (!user) return;

    setFormData({
      ...formData,
      ...user,
      skills: user.skills?.join(", ") || "",
      interests: user.interests?.join(", ") || "",
      preferredTechStack: user.preferredTechStack?.join(", ") || "",
      matchSkills: user.matchPreferences?.skills?.join(", ") || "",
      matchExperience: user.matchPreferences?.experienceLevel?.join(", ") || "",
      locationPreference:
        user.matchPreferences?.locationPreference || "Anywhere",
    });

    setPhoto(user.photourl || "");
    setPhotos(user.photos || []);
  }, [user]);




  /* ===== SUBMIT ===== */
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          ...formData,
          skills: formData.skills.split(",").map((s) => s.trim()),
          interests: formData.interests.split(",").map((i) => i.trim()),
          preferredTechStack: formData.preferredTechStack.split(",").map((t) => t.trim()),
          photourl: photo,
          photos,
          location: {
            city: formData.city,
            country: formData.country,
          },
          matchPreferences: {
            skills: formData.matchSkills.split(",").map((s) => s.trim()),
            experienceLevel: formData.matchExperience.split(",").map((e) => e.trim()),
            locationPreference: formData.locationPreference,
          },
        },
        { withCredentials: true }
      );


      dispatch(addUser(res.data.user));
      toast.success("Profile updated");
      navigate("/profile");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-base-200 px-4 pt-22 ">
      <div className=" mx-auto">


        {/* STEP CONTENT */}
        {step === 1 && (
          <StepProfileInfo
            formData={formData}
            setFormData={setFormData}
            photo={photo}
            setPhoto={setPhoto}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <StepPhotos
            photos={photos}
            setPhotos={setPhotos}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <StepDevProfile
            formData={formData}
            setFormData={setFormData}
            onBack={() => setStep(2)}
            onSubmit={handleSubmit}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default EditProfile;
