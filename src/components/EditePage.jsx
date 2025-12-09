import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const fileInputRef = useRef(null);
  console.log(user);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "male");
  const [bio, setBio] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
  const [photo, setPhoto] = useState(user?.photourl || "");
  const [mobile, setMobile] = useState(user?.mobile || "");
  const [profession, setProfession] = useState(user?.profession || "");
  const [photos, setPhotos] = useState(user?.photos || []); // Multi-photo

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
    }
  };

  const handleMultiPhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPhotos((prev) => [...prev, ...urls]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      firstName,
      lastName,
      age,
      gender,
      bio,
      skills: skills.split(",").map((s) => s.trim()),
      photourl: photo,
      photos,
      mobile,
      profession,
    };
    console.log("Updated Profile:", updatedData);
  };

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="flex justify-center w-full bg-base-100 min-h-[calc(100vh-120px)] px-2 pt-4 pb-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl rounded p-6 flex flex-col md:flex-row gap-10"
      >
        {/* LEFT CARD */}
        <div className="flex-1 bg-base-200 rounded-2xl p-4 flex flex-col items-center gap-4 overflow-y-auto max-h-[80vh]">
          {/* Avatar */}
          <div
            className="w-32 h-32 rounded-full overflow-hidden ring ring-primary/50 cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <img src={photo} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />

          {/* Multi-photo upload */}
          <div className="w-full flex flex-col gap-2 mt-4">
            <label className="label-text font-semibold">Add More Photos</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleMultiPhotoChange}
              className="input input-bordered w-full rounded-2xl"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {photos.map((p, idx) => (
                <div key={idx} className="w-20 h-20 rounded overflow-hidden">
                  <img src={p} alt={`photo-${idx}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Personal Info */}
          <div className="w-full flex flex-col gap-3 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full rounded-2xl"
                placeholder="First Name"
                required
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full rounded-2xl"
                placeholder="Last Name"
                required
              />
            </div>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered w-full rounded-2xl"
              placeholder="Age"
              required
            />
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="input input-bordered w-full rounded-2xl"
              placeholder="Mobile Number"
            />
            <input
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="input input-bordered w-full rounded-2xl"
              placeholder="Profession"
            />

            {/* Gender Selection */}
            <div className="flex flex-col text-center items-center gap-2 mt-2 w-full">
              <label className="label-text">Gender</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                    className="radio"
                  />
                  Male
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                    className="radio"
                  />
                  Female
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={gender === "other"}
                    onChange={(e) => setGender(e.target.value)}
                    className="radio"
                  />
                  Other
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="flex-1 bg-base-200 rounded-2xl p-4 flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
          {/* Bio */}
          <label className="label">
            <span className="label-text font-semibold">Bio</span>
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="textarea rounded-2xl w-full"
            rows={5}
          ></textarea>

          {/* Skills */}
          <label className="label mt-2">
            <span className="label-text font-semibold">Skills (comma separated)</span>
          </label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="input input-bordered w-full rounded-2xl"
            placeholder="React, JavaScript, Tailwind"
          />

          {/* Social Media */}
          <label className="label mt-2">
            <span className="label-text font-semibold">Social Media Links</span>
          </label>
          <input
            type="text"
            placeholder="Twitter URL"
            className="input input-bordered w-full rounded-2xl"
          />
          <input
            type="text"
            placeholder="Instagram URL"
            className="input input-bordered w-full rounded-2xl"
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            className="input input-bordered w-full rounded-2xl"
          />

          {/* Save Changes Button */}
          <div className="mt-4 flex justify-center md:justify-start">
            <button type="submit" className="btn btn-primary btn-block w-full md:w-auto">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
