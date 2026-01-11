import React, { useState } from "react";
import { ImageIcon, X } from "lucide-react";

const ProfilePhotos = ({ user }) => {
  const photos =
    user.photos?.length > 0
      ? user.photos
      : user.photourl
      ? [user.photourl]
      : [];

  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="bg-base-100 rounded-xl border border-base-300 p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Photos</h3>
          <span className="text-xs opacity-60">{photos.length} uploads</span>
        </div>

        {/* Grid */}
        {photos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((img, i) => (
              <div
                key={i}
                className="relative group rounded-lg overflow-hidden border hover:border-primary transition cursor-pointer"
                onClick={() => setSelected(img)}
              >
                <img
                  src={img}
                  className="w-full h-32 object-cover group-hover:scale-105 transition"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-semibold">
                  View
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-32 border border-dashed rounded-lg flex flex-col items-center justify-center text-sm opacity-60">
            <ImageIcon className="mb-2" size={20} />
            No photos uploaded yet
          </div>
        )}
      </div>

      {/* FULL SCREEN IMAGE VIEWER */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
          <div className="relative max-w-2xl w-full">
            <img
              src={selected}
              className="w-full max-h-[80vh] object-contain rounded-xl shadow-xl"
            />

            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-4 -right-4 bg-base-100 p-2 rounded-full shadow hover:bg-base-200 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePhotos;
