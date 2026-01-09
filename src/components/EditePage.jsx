import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  // ================= STATE =================
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [mobile, setMobile] = useState("");
  const [profession, setProfession] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Student");

  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [lookingFor, setLookingFor] = useState("Networking");

  const [photo, setPhoto] = useState("");
  const [photos, setPhotos] = useState([]);

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // ================= LOAD USER =================
  useEffect(() => {
    if (!user) return;

    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setAge(user.age || "");
    setGender(user.gender || "Male");
    setMobile(user.mobile || "");
    setProfession(user.profession || "");
    setExperienceLevel(user.experienceLevel || "Student");

    setAbout(user.about || "");
    setSkills(user.skills?.join(", ") || "");
    setInterests(user.interests?.join(", ") || "");
    setLookingFor(user.lookingFor || "Networking");

    setPhoto(user.photourl || "");
    setPhotos(user.photos || []);

    setCity(user.location?.city || "");
    setCountry(user.location?.country || "");
  }, [user]);

  // ================= IMAGE =================
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
  };

  const handleMultiPhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPhotos((prev) => [...prev, ...urls]);
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          age,
          gender,
          mobile,
          profession,
          experienceLevel,
          about,
          lookingFor,

          skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
          interests: interests.split(",").map((i) => i.trim()).filter(Boolean),

          photourl: photo,
          photos,

          location: {
            city,
            country,
          },
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      toast.success("Profile updated");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  // ================= UI =================
 return (
  <div className="bg-base-200 min-h-screen flex flex-col pb-5">
    {/* Spacer for top navbar */}
    <div className="h-[70px] flex-shrink-0"></div>

    {/* Main content */}
    <div className="flex-1 flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* ================= LEFT PANEL ================= */}
        <div className="bg-base-100 rounded-2xl shadow p-6 flex flex-col items-center gap-6">
          {/* Profile Photo */}
          <div
            className="w-32 h-32 rounded-full overflow-hidden ring ring-primary cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <img src={photo} className="w-full h-full object-cover" />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />

          {/* Multi-photo upload */}
          <input
            type="file"
            multiple
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={handleMultiPhotoChange}
          />

          {/* Looking For Selector */}
          <select
            value={lookingFor}
            onChange={(e) => setLookingFor(e.target.value)}
            className="select select-bordered w-full"
          >
            <option>Networking</option>
            <option>Dating</option>
            <option>Friendship</option>
            <option>Hiring</option>
          </select>

            {/* About */}
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="textarea textarea-bordered"
            rows={4}
            placeholder="About"
          />
  {/* About */}
         

        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="lg:col-span-2 bg-base-100 rounded-2xl shadow p-6 flex flex-col gap-6">
          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered"
              placeholder="First Name"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered"
              placeholder="Last Name"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered"
              placeholder="Age"
            />
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="input input-bordered"
              placeholder="Mobile"
            />
          </div>

          <input
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="input input-bordered"
            placeholder="Profession"
          />

          <select
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="select select-bordered"
          >
            <option>Student</option>
            <option>Fresher</option>
            <option>Junior</option>
            <option>Mid</option>
            <option>Senior</option>
          </select>

        
          {/* Skills & Interests */}
          <input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="input input-bordered"
            placeholder="Skills (comma separated)"
          />
          <input
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="input input-bordered"
            placeholder="Interests (comma separated)"
          />

          {/* Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input input-bordered"
              placeholder="City"
            />
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="input input-bordered"
              placeholder="Country"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              className="btn btn-primary px-10"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>

    {/* Spacer for bottom navbar */}
    <div className="h-[50px] flex-shrink-0"></div>
  </div>
);


};

export default EditProfile;
