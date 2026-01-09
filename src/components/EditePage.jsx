import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Back from "./buttons/Back";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  // ================= FORM STATE =================
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState(""); // string for input
  const [profession, setProfession] = useState("");
  const [mobile, setMobile] = useState("");

  const [photo, setPhoto] = useState("");
  const [photos, setPhotos] = useState([]);

  // ✅ LOCATION (VERY IMPORTANT)
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  // ================= LOAD USER DATA =================
  useEffect(() => {
    if (!user) return;

    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setAge(user.age || "");
    setGender(user.gender || "Male");
    setAbout(user.about || "");
    setSkills(user.skills?.join(", ") || "");
    setProfession(user.profession || "");
    setMobile(user.mobile || "");

    setPhoto(user.photourl || "");
    setPhotos(user.photos || []);

    // ✅ SAFE ACCESS (FIXES YOUR ERROR)
    setCity(user.location?.city || "");
    setCountry(user.location?.country || "");
  }, [user]);

  // ================= PHOTO HANDLERS =================
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
          about,
          profession,
          mobile,
          photourl: photo,
          photos,
          skills: skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),

          // ✅ LOCATION OBJECT (Schema match)
          location: {
            city,
            country,
          },
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      toast.success("Profile updated successfully");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-base-100 pt-[70px] pb-20">
      <Back />

      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* ================= LEFT CARD ================= */}
        <div className="bg-base-200 rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-32 h-32 rounded-full overflow-hidden ring ring-primary cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={photo}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />

            <input
              type="file"
              multiple
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={handleMultiPhotoChange}
            />
          </div>

          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered rounded-xl"
            placeholder="First Name"
            required
          />

          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered rounded-xl"
            placeholder="Last Name"
            required
          />

          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="input input-bordered rounded-xl"
            placeholder="Age"
          />

          <input
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="input input-bordered rounded-xl"
            placeholder="Profession"
          />

          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="input input-bordered rounded-xl"
            placeholder="Mobile Number"
          />

          {/* GENDER */}
          <div>
            <p className="font-semibold mb-1">Gender</p>
            <div className="flex gap-4">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={gender === g}
                    onChange={(e) => setGender(e.target.value)}
                    className="radio"
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT CARD ================= */}
        <div className="bg-base-200 rounded-2xl p-6 flex flex-col gap-4">
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="textarea textarea-bordered rounded-xl"
            rows={4}
            placeholder="About yourself"
          />

          <input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="input input-bordered rounded-xl"
            placeholder="Skills (React, Node, MongoDB)"
          />

          {/* LOCATION */}
          <div className="grid grid-cols-2 gap-3">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input input-bordered rounded-xl"
              placeholder="City"
            />
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="input input-bordered rounded-xl"
              placeholder="Country"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
