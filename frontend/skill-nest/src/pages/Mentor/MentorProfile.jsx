import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiSave,
  FiXCircle,
} from "react-icons/fi";
import api from "../../lib/axios";
import { uploadAsset } from "../../lib/upload";

const initialForm = {
  title: "",
  experience: "",
  yearsOfExperience: "",
  expertise: "",
  languages: "",
  bio: "",
  location: "",
  availability: true,
  linkedin: "",
  twitter: "",
  website: "",
  youtube: "",
};

function MentorProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [mentor, setMentor] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // --------------------------------------------------
  // Get existing mentor profile
  // --------------------------------------------------
  useEffect(() => {
    const fetchMentorProfile = async () => {
      try {
        const res = await api.get("/mentor/me");

        const data = res.data?.mentor;

        if (data) {
          setMentor(data);

          setForm({
            title: data.title || "",
            experience: data.experience || "",
            yearsOfExperience: data.yearsOfExperience ?? "",
            expertise: Array.isArray(data.expertise)
              ? data.expertise.join(", ")
              : "",
            languages: Array.isArray(data.languages)
              ? data.languages.join(", ")
              : "",
            bio: data.bio || "",
            location: data.location || "",
            availability: data.availability ?? true,
            linkedin: data.socialLinks?.linkedin || "",
            twitter: data.socialLinks?.twitter || "",
            website: data.socialLinks?.website || "",
            youtube: data.socialLinks?.youtube || "",
          });
        }
      } catch (err) {
        // 404 simply means the mentor has not created a profile yet.
        if (err.response?.status !== 404) {
          setError(
            err.response?.data?.message ||
              "Failed to load mentor profile."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMentorProfile();
  }, []);

  // --------------------------------------------------
  // Handle input
  // --------------------------------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setSuccess("");
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setUploadingPhoto(true);
      const asset = await uploadAsset(file, "profile-images");
      const response = await api.put("/auth/profile", { name: mentor?.user?.name || "Mentor", profilePicture: asset.url });
      setMentor((current) => ({ ...current, user: response.data.user }));
      setSuccess("Profile photo updated successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload profile photo.");
    } finally {
      setUploadingPhoto(false);
      event.target.value = "";
    }
  };

  // --------------------------------------------------
  // Convert comma-separated values into arrays
  // --------------------------------------------------
  const toArray = (value) => {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  // --------------------------------------------------
  // Submit
  // --------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.title.trim()) {
      setError("Mentor title is required.");
      return;
    }

    setSaving(true);

    const payload = {
      title: form.title.trim(),
      experience: form.experience.trim(),
      yearsOfExperience: Number(form.yearsOfExperience) || 0,
      expertise: toArray(form.expertise),
      languages: toArray(form.languages),
      bio: form.bio.trim(),
      location: form.location.trim(),
      availability: form.availability,
      socialLinks: {
        linkedin: form.linkedin.trim(),
        twitter: form.twitter.trim(),
        website: form.website.trim(),
        youtube: form.youtube.trim(),
      },
    };

    try {
      let res;

      if (mentor) {
        res = await api.put("/mentor/update", payload);
      } else {
        res = await api.post("/mentor/create", payload);
      }

      setMentor(res.data.mentor);

      setSuccess(
        mentor
          ? "Profile updated successfully."
          : "Profile submitted successfully. It is now waiting for admin approval."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to save mentor profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f2eb] flex items-center justify-center">
        <p className="text-gray-600 font-DM-Sans">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f2eb] p-6 md:p-10 font-DM-Sans">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            type="button"
            onClick={() => navigate("/mentor/dashboard")}
            className="p-2.5 rounded-xl bg-white hover:bg-gray-100 transition"
          >
            <FiArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-[#1e3a1e]">
              My Mentor Profile
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Complete your profile so learners can learn about you.
            </p>
          </div>
        </div>

        {/* Verification Status */}
        {mentor && (
          <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">
                  Profile Status
                </p>

                <div className="flex items-center gap-2 mt-1">
                  {mentor.verificationStatus === "verified" && (
                    <>
                      <FiCheckCircle className="text-green-600" />
                      <span className="font-semibold text-green-700">
                        Verified
                      </span>
                    </>
                  )}

                  {mentor.verificationStatus === "pending" && (
                    <>
                      <FiClock className="text-yellow-600" />
                      <span className="font-semibold text-yellow-700">
                        Pending Review
                      </span>
                    </>
                  )}

                  {mentor.verificationStatus === "rejected" && (
                    <>
                      <FiXCircle className="text-red-600" />
                      <span className="font-semibold text-red-700">
                        Rejected
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="text-right text-xs text-gray-500">
                {mentor.verificationStatus === "verified" &&
                  "Learners can discover your profile."}

                {mentor.verificationStatus === "pending" &&
                  "An admin is reviewing your profile."}

                {mentor.verificationStatus === "rejected" &&
                  "Please update your profile and submit again."}
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-5 text-sm">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Information */}
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1e3a1e] mb-5">
              Basic Information
            </h2>

            <div className="mb-5 flex items-center gap-4">
              {mentor?.user?.profilePicture ? <img src={mentor.user.profilePicture} alt="Mentor profile" className="h-16 w-16 rounded-2xl object-cover" /> : <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1e3a1e] text-xl font-bold text-white">{mentor?.user?.name?.charAt(0) || "M"}</div>}
              <label className="cursor-pointer text-sm font-semibold text-[#c4662a]">{uploadingPhoto ? "Uploading..." : "Upload profile photo"}<input type="file" accept="image/*" onChange={handlePhotoUpload} disabled={uploadingPhoto} className="hidden" /></label>
            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">
                  Mentor Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Entrepreneurship & Startup Mentor"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#c4662a]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Years of Experience
                </label>

                <input
                  type="number"
                  name="yearsOfExperience"
                  min="0"
                  value={form.yearsOfExperience}
                  onChange={handleChange}
                  placeholder="e.g. 7"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#c4662a]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Varanasi, India"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#c4662a]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Expertise
                </label>

                <input
                  type="text"
                  name="expertise"
                  value={form.expertise}
                  onChange={handleChange}
                  placeholder="Entrepreneurship, Marketing, Business Strategy"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#c4662a]"
                />

                <p className="text-xs text-gray-400 mt-1">
                  Separate multiple skills with commas.
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Languages
                </label>

                <input
                  type="text"
                  name="languages"
                  value={form.languages}
                  onChange={handleChange}
                  placeholder="Hindi, English"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#c4662a]"
                />

                <p className="text-xs text-gray-400 mt-1">
                  Separate languages with commas.
                </p>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1e3a1e] mb-5">
              Experience
            </h2>

            <label className="block text-sm font-semibold mb-2">
              Professional Experience
            </label>

            <textarea
              name="experience"
              value={form.experience}
              onChange={handleChange}
              rows={5}
              placeholder="Describe your professional experience, businesses you've worked with, industries you've worked in, etc."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none focus:border-[#c4662a]"
            />
          </section>

          {/* Bio */}
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1e3a1e] mb-5">
              About You
            </h2>

            <label className="block text-sm font-semibold mb-2">
              Bio
            </label>

            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={6}
              placeholder="Tell learners about yourself, your mentoring approach and how you can help them."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none focus:border-[#c4662a]"
            />
          </section>

          {/* Social Links */}
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#1e3a1e] mb-5">
              Social Links
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-semibold mb-2">
                  LinkedIn
                </label>

                <input
                  type="url"
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#c4662a]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Twitter / X
                </label>

                <input
                  type="url"
                  name="twitter"
                  value={form.twitter}
                  onChange={handleChange}
                  placeholder="https://x.com/..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#c4662a]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Website
                </label>

                <input
                  type="url"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#c4662a]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  YouTube
                </label>

                <input
                  type="url"
                  name="youtube"
                  value={form.youtube}
                  onChange={handleChange}
                  placeholder="https://youtube.com/..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#c4662a]"
                />
              </div>
            </div>
          </section>

          {/* Availability */}
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">

              <div>
                <h2 className="text-lg font-bold text-[#1e3a1e]">
                  Availability
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Let learners know whether you are currently available
                  for mentoring.
                </p>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="availability"
                  checked={form.availability}
                  onChange={handleChange}
                  className="w-5 h-5 accent-[#c4662a]"
                />

                <span className="font-semibold text-sm">
                  Available
                </span>
              </label>
            </div>
          </section>

          {/* Submit */}
          <div className="flex justify-end pb-10">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-[#c4662a] hover:bg-[#ae5723] disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              <FiSave />

              {saving
                ? "Saving..."
                : mentor
                ? "Update Profile"
                : "Submit for Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MentorProfile;