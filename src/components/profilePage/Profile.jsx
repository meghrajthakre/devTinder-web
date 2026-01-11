import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addUser } from "../../utils/userSlice";

import ProfileSidebar from "./ProfileSidebar";
import ProfilePhotos from "./ProfilePhotos";
import ProfileSkills from "./ProfileSkills";
import ProfileTechStack from "./ProfileTechStack";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [photo, setPhoto] = useState("/avatar.png");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    if (user?.photourl) {
      setPhoto(user.photourl);
    }
  }, [user?.photourl]);

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPG and PNG files are allowed");
      return;
    }

    setUploading(true);
    const form = new FormData();
    form.append("photo", file);

    try {
      const res = await fetch("http://localhost:3001/profile/profilePicture", {
        method: "POST",
        credentials: "include",
        body: form,
      });

      const data = await res.json();
      if (!data.success) throw new Error();

      setPhoto(data.photourl);
      dispatch(addUser({ ...user, photourl: data.photourl }));
      toast.success("Profile photo updated");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 mt-[72px] py-6 pb-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">

        <ProfileSidebar
          user={user}
          photo={photo}
          uploading={uploading}
          fileRef={fileRef}
          navigate={navigate}
          handlePhotoChange={handlePhotoChange}
        />

        <div className="md:col-span-2 space-y-6">
          <ProfilePhotos user={user} />
          <ProfileSkills user={user} />
        </div>

      </div>
    </div>
  );
};

export default Profile;
