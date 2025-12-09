import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Back from "./buttons/Back";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    // FORM STATE
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("male");
    const [about, setBio] = useState("");
    const [skills, setSkills] = useState("");
    const [photo, setPhoto] = useState("");
    const [photos, setPhotos] = useState([]);
    const [mobile, setMobile] = useState("");
    const [profession, setProfession] = useState("");

    // ✅ Sync Redux user → local state
    useEffect(() => {
        if (!user) return;

        setFirstName(user.firstName || "");
        setLastName(user.lastName || "");
        setAge(user.age || "");
        setGender(user.gender || "male");
        setBio(user.about || "");
        setSkills(user.skills?.join(", ") || "");
        setPhoto(user.photourl || "");
        setPhotos(user.photos || []);
        setMobile(user.mobile || "");
        setProfession(user.profession || "");
    }, [user]);

    // SINGLE PHOTO
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setPhoto(url);
    };

    // MULTI PHOTO
    const handleMultiPhotoChange = (e) => {
        const files = Array.from(e.target.files);
        const urls = files.map((file) => URL.createObjectURL(file));
        setPhotos((prev) => [...prev, ...urls]);
    };

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                {
                    firstName,
                    lastName,
                    age,
                    gender,
                    about,
                    skills: skills
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    photourl: photo,
                    photos,
                    mobile,
                    profession,
                },
                { withCredentials: true }
            );
            dispatch(addUser(res.data.user));

            setLoading(false)
            // navigate('/profile')
        } catch (err) {
            console.error(err);
        }
    };

    if (!user) {
        return <p className="text-center mt-10">Loading profile...</p>;
    }

    return (
        <div className="flex flex-col justify-center w-full bg-base-100 pb-20 min-h-[calc(100vh-120px)]">
            {/* BACK */}
            <Back />

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-10 overflow-auto"
            >
                {/* LEFT CARD */}
                <div className="flex-1 bg-base-200 rounded-2xl p-4 flex flex-col items-center gap-4">
                    {/* AVATAR */}
                    <div
                        className="w-32 h-32 rounded-full overflow-hidden ring ring-primary/50 cursor-pointer"
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

                    {/* PERSONAL INFO */}
                    <div className="w-full flex flex-col gap-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="input input-bordered w-full rounded-2xl"
                                placeholder="First Name"
                                required
                            />
                            <input
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="input input-bordered w-full rounded-2xl"
                                placeholder="Last Name"
                                required
                            />
                        </div>

                        <input
                            type="number"
                            min="18"
                            max="100"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="input input-bordered w-full rounded-2xl"
                            placeholder="Age"
                            required
                        />

                        <input
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="input input-bordered w-full rounded-2xl"
                            placeholder="Mobile Number"
                        />

                        <input
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            className="input input-bordered w-full rounded-2xl"
                            placeholder="Profession"
                        />

                        {/* GENDER */}
                        <div className="flex flex-col items-center gap-2 mt-2">
                            <span className="font-semibold text-primary">Gender</span>
                            <div className="flex gap-4">
                                {["male", "female", "other"].map((g) => (
                                    <label key={g} className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={g}
                                            checked={gender === g}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="radio"
                                        />
                                        {g.charAt(0).toUpperCase() + g.slice(1)}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT CARD */}
                <div className="flex-1 bg-base-200 rounded-2xl p-4 flex flex-col gap-4">
                    {/* BIO */}
                    <label className="label">
                        <span className="label-text font-semibold text-primary">Bio</span>
                    </label>

                    <textarea
                        value={about}
                        onChange={(e) => setBio(e.target.value)}
                        className="textarea rounded-xl w-full"
                        rows={3}
                    />

                    {/* SKILLS */}
                    <label className="label">
                        <span className="label-text font-semibold text-primary">
                            Skills (comma separated)
                        </span>
                    </label>

                    <input
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        className="input input-bordered w-full rounded-2xl"
                        placeholder="React, JavaScript, Tailwind"
                    />

                    {/* SOCIAL */}
                    <label className="label">
                        <span className="label-text font-semibold text-primary">
                            Social Media
                        </span>
                    </label>

                    <input
                        type="text"
                        placeholder="Twitter URL"
                        className="input input-bordered w-full rounded-2xl"
                    />

                    <input
                        type="text"
                        placeholder="LinkedIn URL"
                        className="input input-bordered w-full rounded-2xl"
                    />

                    <div className="mt-4 flex justify-center">
                        <button type="submit" className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? "Saving.... " : "Save Changes"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
