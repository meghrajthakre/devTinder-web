import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { X, UploadCloud } from "lucide-react";

const StepPhotos = ({ photos, setPhotos, onNext, onBack }) => {
  const fileRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const processFiles = (files) => {
    const validImages = [];

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed ❌");
        return;
      }
      validImages.push(URL.createObjectURL(file));
    });

    if (validImages.length) {
      setPhotos((prev) => [...prev, ...validImages]);
    }
  };

  const handleInputChange = (e) => {
    processFiles(e.target.files);
    e.target.value = ""; // reset input
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    processFiles(e.dataTransfer.files);
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4">
      <div className="bg-base-100 w-full max-w-4xl rounded-2xl shadow p-6 md:p-8 space-y-6">

        <h2 className="text-xl font-semibold text-center">
          Upload Your Photos
        </h2>

        {/* Drag & Drop Area */}
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
          <UploadCloud className="mx-auto mb-3 opacity-70" size={40} />

          <p className="font-medium">
            Drag & drop images here
          </p>
          <p className="text-sm text-base-content/60 mt-1">
            or click to browse (JPG, PNG only)
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

        {/* Photos Preview */}
        {photos.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {photos.map((img, i) => (
              <div
                key={i}
                className="relative group rounded-lg overflow-hidden"
              >
                <img
                  src={img}
                  alt="uploaded"
                  className="aspect-square w-full h-full object-cover"
                />

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition cursor-pointer"
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
            disabled={!photos.length}
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
