import React, { useState, useEffect } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { updateUserProfile } from "../lib/api";
import { Shuffle } from "lucide-react"; // Lucide v0.257+
import toast, { Toaster } from "react-hot-toast";

function ProfilePage() {
  const { authUser, setAuthUser } = useAuthUser();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    nativeLanguage: "",
    learningLanguage: "",
    location: "",
    profilePic: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName || "",
        bio: authUser.bio || "",
        nativeLanguage: authUser.nativeLanguage || "",
        learningLanguage: authUser.learningLanguage || "",
        location: authUser.location || "",
        profilePic: authUser.profilePic || "",
      });
    }
  }, [authUser]);

  if (!authUser) return <div className="p-4">Loading user data...</div>;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedUser = await updateUserProfile(formData);
      setAuthUser(updatedUser);
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // Random avatar generator
  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    toast.promise(
      (async () => {
        setFormData((prev) => ({ ...prev, profilePic: randomAvatar }));
        await new Promise((resolve) => setTimeout(resolve, 500));
      })()
    );
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Toast container */}
      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        <button
          className="btn btn-sm btn-outline"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
        <img
          src={formData.profilePic || "/default-avatar.png"}
          alt={formData.fullName}
          className="w-24 h-24 rounded-full object-cover border border-gray-300"
          referrerPolicy="no-referrer"
        />
        {editMode && (
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleRandomAvatar}
              className="btn btn-accent flex items-center gap-2"
            >
              <Shuffle className="w-4 h-4" />
              Generate Random Avatar
            </button>
          </div>
        )}
        {!editMode && (
          <div>
            <h2 className="text-xl font-semibold">{authUser.fullName}</h2>
            <p className="text-gray-500">{authUser.email}</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block font-semibold mb-1">Full Name</label>
          {editMode ? (
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          ) : (
            <p>{authUser.fullName}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label className="block font-semibold mb-1">Bio</label>
          {editMode ? (
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
            />
          ) : (
            <p>{authUser.bio || "No bio available"}</p>
          )}
        </div>

        {/* Languages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Native Language</label>
            {editMode ? (
              <input
                type="text"
                name="nativeLanguage"
                value={formData.nativeLanguage}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            ) : (
              <p>{authUser.nativeLanguage || "N/A"}</p>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1">
              Learning Language
            </label>
            {editMode ? (
              <input
                type="text"
                name="learningLanguage"
                value={formData.learningLanguage}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            ) : (
              <p>{authUser.learningLanguage || "N/A"}</p>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block font-semibold mb-1">Location</label>
          {editMode ? (
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          ) : (
            <p>{authUser.location || "N/A"}</p>
          )}
        </div>

        {editMode && (
          <button
            type="submit"
            className="btn btn-primary mt-2"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        )}
      </form>
    </div>
  );
}

export default ProfilePage;
