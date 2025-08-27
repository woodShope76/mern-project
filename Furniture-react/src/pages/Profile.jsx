import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState("");

  const defaultImage = "https://www.w3schools.com/howto/img_avatar.png";

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setImage(res.data.user.image || "");
      })
      .catch((err) => {
        console.error("Profile fetch failed:", err);
        setUser(null);
      });
  }, []);

  if (!user)
    return (
      <div className="p-6 text-center text-gray-600 mt-20 font-medium">
        Loading or Not Logged In
      </div>
    );

  const name = user.name || user.email.split("@")[0];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-amber-100 px-4 font-[Poppins]">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md text-center space-y-6">
        <div className="relative">
          <img
            src={image || defaultImage}
            alt="Profile"
            onError={(e) => (e.target.src = defaultImage)}
            className="w-32 h-32 object-cover rounded-full border-4 border-amber-400 mx-auto"
          />
          <div className="mt-3 flex justify-center space-x-3">
            {/* Disabled Choose File button */}
            <label
              className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed opacity-60"
              title="Disabled"
            >
              Choose File
              <input type="file" disabled className="hidden" />
            </label>

            {/* Disabled Upload button */}
            <button
              disabled
              className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed opacity-60"
            >
              Upload
            </button>
          </div>
        </div>

        <div className="text-left text-gray-700 text-lg space-y-3">
          <div>
            <p className="font-semibold text-gray-500">Name:</p>
            <p className="text-xl font-bold break-words">{name}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-500">Email:</p>
            <p className="break-words">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
