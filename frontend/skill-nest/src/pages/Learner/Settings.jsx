import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Learner/LearnerDashboard/Navbar";
import Sidebar from "../../components/Learner/LearnerDashboard/Sidebar";
import { updateUser } from "../../redux/userSlice";
import api from "../../lib/axios";
import { uploadAsset } from "../../lib/upload";

function Settings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [showSidebar, setShowSidebar] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", phoneNumber: user?.phoneNumber || "", bio: user?.bio || "", profilePicture: user?.profilePicture || "" });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const uploadPhoto = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const asset = await uploadAsset(file, "profile-images");
      setForm((current) => ({ ...current, profilePicture: asset.url }));
    } catch (error) {
      setMessage(error.response?.data?.message || "Photo upload failed.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };
  const submit = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      const { data } = await api.put("/auth/profile", form);
      dispatch(updateUser(data.user));
      setMessage(data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to save profile.");
    } finally {
      setSaving(false);
    }
  };

  return <div className="min-h-screen bg-[#f5f2eb]"><Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} /><Navbar showSidebar={showSidebar} /><main className={`${showSidebar ? "lg:pl-60" : "lg:pl-50 lg:pr-30"} mt-23 px-6 py-5`}><p className="text-xs font-semibold tracking-wide text-[#c4622a]">MY PROFILE</p><h1 className="mb-2 mt-2 font-Outfit text-2xl font-extrabold">Learner Profile</h1><p className="mb-6 text-sm text-gray-500">Manage your profile information and profile photo.</p><form onSubmit={submit} className="max-w-2xl rounded-2xl bg-white p-6"><div className="mb-5 flex items-center gap-4">{form.profilePicture ? <img src={form.profilePicture} alt="Profile" className="h-16 w-16 rounded-2xl object-cover" /> : <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1e3a1e] text-2xl font-bold text-white">{form.name.charAt(0).toUpperCase() || "U"}</div>}<label className="cursor-pointer text-sm font-semibold text-[#c4622a]">{uploading ? "Uploading..." : "Upload photo"}<input type="file" accept="image/*" onChange={uploadPhoto} className="hidden" /></label></div><div className="space-y-4"><input required name="name" value={form.name} onChange={change} placeholder="Full name" className="w-full rounded-xl border p-3 text-sm" /><input readOnly value={user?.email || ""} className="w-full rounded-xl border bg-gray-50 p-3 text-sm text-gray-500" /><input name="phoneNumber" value={form.phoneNumber} onChange={change} placeholder="Phone number" className="w-full rounded-xl border p-3 text-sm" /><textarea name="bio" value={form.bio} onChange={change} placeholder="Tell us about yourself" rows="4" className="w-full rounded-xl border p-3 text-sm" /></div>{message && <p className="mt-3 text-sm text-[#1e3a1e]">{message}</p>}<button disabled={saving || uploading} className="mt-5 rounded-xl bg-[#c4622a] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{saving ? "Saving..." : "Save Changes"}</button></form></main></div>;
}

export default Settings;
