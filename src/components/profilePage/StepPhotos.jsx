import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { X, UploadCloud, Loader2 } from "lucide-react";
import { BASE_URL } from "../../utils/constant";

const StepPhotos = ({ photos, setPhotos, onNext, onBack }) => {
  const fileRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  /* ================= UPLOAD TO SERVER ================= */
  const uploadPhotos = async (files) => {
    const formData = new FormData();

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files allowed ❌");
        return;
      }
      formData.append("photos", file);
    });

    if (!formData.has("photos")) return;

    try {
      setUploading(true);

      const res = await fetch(`${BASE_URL}/profile/uploadPhotos`, {
        method: "POST",
        body: formData,
        credentials: "include", // important for auth
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Upload failed");
      }

      // Cloudinary URLs returned from backend
      setPhotos((prev) => [...prev, ...data.photos]);
      toast.success("Photos uploaded successfully ✅");
    } catch (err) {
      console.error(err);
      toast.error("Photo upload failed ❌");
    } finally {
      setUploading(false);
    }
  };

  /* ================= EVENTS ================= */
  const handleInputChange = (e) => {
    uploadPhotos(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    uploadPhotos(e.dataTransfer.files);
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 mb-6 pb-20">
      <div className="bg-base-100 w-full max-w-4xl rounded-2xl shadow p-6 md:p-8 space-y-6">

        <h2 className="text-xl font-semibold text-center">
          Upload Your Photos
        </h2>

        {/* Upload Box */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition
            ${dragActive ? "border-primary bg-primary/10" : "border-base-300"}
          `}
        >
          {uploading ? (
            <Loader2 className="mx-auto mb-3 animate-spin" size={40} />
          ) : (
            <UploadCloud className="mx-auto mb-3 opacity-70" size={40} />
          )}

          <p className="font-medium">
            {uploading ? "Uploading photos..." : "Drag & drop images here"}
          </p>
          <p className="text-sm text-base-content/60 mt-1">
            or click to browse (JPG, PNG)
          </p>

          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
          />
        </div>

        {/* Preview Grid */}
        {photos.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {photos
              .filter(Boolean)
              .map((img, i) => (
                <div
                  key={i}
                  className="relative group rounded-lg overflow-hidden"
                >
                  <img
                    src={img}
                    alt="uploaded"
                    className="aspect-square w-full h-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
          </div>
        )}


        {/* Actions */}
        <div className="flex justify-between pt-4">
          <button className="btn btn-outline px-6" onClick={onBack}>
            Back
          </button>
          <button
            className="btn btn-primary px-8"
            disabled={!photos.length || uploading}
            onClick={onNext}
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default StepPhotos;
