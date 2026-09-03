import React, { useEffect, useState } from "react";

const AdminProfile = () => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [profile, setProfile] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        bio: "",
        profilePicture: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // ==========================================
    // GET ADMIN PROFILE
    // ==========================================

    const fetchProfile = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/admin/profile`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!data.success) {
                alert(
                    data.message ||
                        "Failed to load profile"
                );
                return;
            }

            setProfile(data.admin);

            setFormData({
                name: data.admin?.name || "",
                phoneNumber:
                    data.admin?.phoneNumber || "",
                bio: data.admin?.bio || "",
                profilePicture:
                    data.admin?.profilePicture || "",
            });
        } catch (error) {
            console.error(
                "Error fetching admin profile:",
                error
            );

            alert("Failed to load profile.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // ==========================================
    // INPUT CHANGE
    // ==========================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ==========================================
    // UPDATE ADMIN PROFILE
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const response = await fetch(
                `${API_URL}/api/admin/profile`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (!data.success) {
                alert(
                    data.message ||
                        "Failed to update profile"
                );
                return;
            }

            setProfile(data.admin);

            setFormData({
                name: data.admin?.name || "",
                phoneNumber:
                    data.admin?.phoneNumber || "",
                bio: data.admin?.bio || "",
                profilePicture:
                    data.admin?.profilePicture || "",
            });

            alert("Profile updated successfully.");
        } catch (error) {
            console.error(
                "Error updating admin profile:",
                error
            );

            alert("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">
                    Loading profile...
                </p>
            </div>
        );
    }

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="max-w-3xl">

            {/* HEADER */}

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">
                    Admin Profile
                </h1>

                <p className="text-gray-500 mt-1">
                    Manage your administrator profile
                    information.
                </p>
            </div>

            {/* PROFILE CARD */}

            <div className="bg-white border border-gray-200 rounded-xl p-6">

                {/* PROFILE IMAGE */}

                <div className="flex items-center gap-5 mb-8">

                    {profile?.profilePicture ? (
                        <img
                            src={profile.profilePicture}
                            alt="Admin"
                            className="w-20 h-20 rounded-full object-cover border border-gray-200"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-bold">
                            {formData.name
                                ?.charAt(0)
                                ?.toUpperCase() || "A"}
                        </div>
                    )}

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            {profile?.name || "Admin"}
                        </h2>

                        <p className="text-sm text-gray-500">
                            Administrator
                        </p>
                    </div>

                </div>

                {/* FORM */}

                <form onSubmit={handleSubmit}>

                    {/* NAME */}

                    <div className="mb-5">

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                    </div>

                    {/* EMAIL */}

                    <div className="mb-5">

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            value={profile?.email || ""}
                            disabled
                            className="w-full px-4 py-2.5 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg"
                        />

                        <p className="text-xs text-gray-400 mt-1">
                            Email cannot be changed here.
                        </p>

                    </div>

                    {/* PHONE */}

                    <div className="mb-5">

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="phoneNumber"
                            value={
                                formData.phoneNumber
                            }
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                    </div>

                    {/* BIO */}

                    <div className="mb-5">

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bio
                        </label>

                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                            placeholder="Write something about yourself..."
                        />

                    </div>

                    {/* PROFILE PICTURE */}

                    <div className="mb-6">

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile Picture URL
                        </label>

                        <input
                            type="text"
                            name="profilePicture"
                            value={
                                formData.profilePicture
                            }
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                    </div>

                    {/* BUTTON */}

                    <div className="flex justify-end">

                        <button
                            type="submit"
                            disabled={saving}
                            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
};

export default AdminProfile;