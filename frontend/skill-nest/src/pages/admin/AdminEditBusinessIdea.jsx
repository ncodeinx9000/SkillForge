import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../lib/axios";

const AdminEditBusinessIdea = () => {
  const { ideaId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [mentors, setMentors] = useState([]);
  const [roadmaps, setRoadmaps] = useState([]);
  const [loadingAssignments, setLoadingAssignments] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: [],
    investmentMin: "",
    investmentMax: "",
    incomeMin: "",
    incomeMax: "",
    launchTime: "",
    difficulty: "",
    advantages: "",
    challenges: "",
    governmentSchemes: "",
    tags: "",
    image: "",
    mentor: "",
    roadmap: "",
    resources: [],
  });

  useEffect(() => {
    fetchBusinessIdea();
    fetchAssignmentOptions();
  }, [ideaId]);

  const fetchBusinessIdea = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/admin/business-ideas/${ideaId}`);

      const data = response.data;

      if (!data.success) {
        setError(data.message || "Failed to load business idea");
        return;
      }

      const idea = data.businessIdea;

      setFormData({
        title: idea.title || "",
        description: idea.description || "",
        category: idea.category || [],
        investmentMin: idea.investment?.min ?? "",
        investmentMax: idea.investment?.max ?? "",
        incomeMin: idea.estimatedIncome?.min ?? "",
        incomeMax: idea.estimatedIncome?.max ?? "",
        launchTime: idea.launchTime || "",
        difficulty: idea.difficulty || "",
        advantages: Array.isArray(idea.advantages)
          ? idea.advantages.join("\n")
          : idea.advantages || "",
        challenges: Array.isArray(idea.challenges)
          ? idea.challenges.join("\n")
          : idea.challenges || "",
        governmentSchemes: Array.isArray(idea.governmentSchemes)
          ? idea.governmentSchemes.join("\n")
          : idea.governmentSchemes || "",
        tags: Array.isArray(idea.tags) ? idea.tags.join(", ") : idea.tags || "",
        image: idea.image || "",
        mentor: idea.mentor?._id || idea.mentor || "",
        roadmap: idea.roadmap?._id || idea.roadmap || "",
        resources: idea.resources || [],
      });
    } catch (error) {
      console.error("Failed to fetch business idea:", error);

      setError(error.response?.data?.message || "Failed to load business idea");
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignmentOptions = async () => {
    try {
      setLoadingAssignments(true);

      const [mentorResponse, roadmapResponse] = await Promise.all([
        api.get("/admin/mentors?status=verified"),
        api.get("/admin/roadmaps"),
      ]);

      if (mentorResponse.data.success) {
        setMentors(mentorResponse.data.mentors || []);
      }

      if (roadmapResponse.data.success) {
        const allRoadmaps = roadmapResponse.data.roadmaps || [];

        // Only roadmaps belonging to this business idea
        const matchingRoadmaps = allRoadmaps.filter(
          (roadmap) =>
            roadmap.businessIdea?._id === ideaId ||
            roadmap.businessIdea === ideaId,
        );

        setRoadmaps(matchingRoadmaps);
      }
    } catch (error) {
      console.error("Failed to fetch mentor/roadmap options:", error);
    } finally {
      setLoadingAssignments(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleCategory = (category) => {
    setFormData((prev) => {
      const exists = prev.category.includes(category);

      return {
        ...prev,
        category: exists
          ? prev.category.filter((item) => item !== category)
          : [...prev.category, category],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Title is required.");
      return;
    }

    if (!formData.description.trim()) {
      alert("Description is required.");
      return;
    }

    if (formData.category.length === 0) {
      alert("Please select at least one category.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,

        investment: {
          min: Number(formData.investmentMin) || 0,
          max: Number(formData.investmentMax) || 0,
        },

        estimatedIncome: {
          min: Number(formData.incomeMin) || 0,
          max: Number(formData.incomeMax) || 0,
        },

        launchTime: formData.launchTime.trim(),

        difficulty: formData.difficulty.trim(),

        advantages: formData.advantages
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        challenges: formData.challenges
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        governmentSchemes: formData.governmentSchemes
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),

        tags: formData.tags
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        image: formData.image.trim(),

        mentor: formData.mentor || null,

        roadmap: formData.roadmap || null,

        resources: formData.resources,
      };

      const response = await api.put(
        `/admin/business-ideas/${ideaId}`,
        payload,
      );

      if (!response.data.success) {
        alert(response.data.message || "Failed to update business idea");
        return;
      }

      alert("Business idea updated successfully.");

      navigate(`/admin/business-ideas/${ideaId}`);
    } catch (error) {
      console.error("Update business idea error:", error);

      alert(error.response?.data?.message || "Failed to update business idea.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Loading business idea...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <p className="text-red-500 mb-4">{error}</p>

        <button
          onClick={() => navigate("/admin/business-ideas")}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg"
        >
          Back to Business Ideas
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <button
            type="button"
            onClick={() => navigate(`/admin/business-ideas/${ideaId}`)}
            className="text-sm text-gray-500 hover:text-gray-900 mb-2"
          >
            ← Back to Details
          </button>

          <h1 className="text-2xl font-bold text-gray-800">
            Edit Business Idea
          </h1>

          <p className="text-gray-500 mt-1">
            Update the business idea information.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">
            Basic Information
          </h2>

          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Business idea title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Describe the business idea..."
              />
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>

              <div className="flex flex-wrap gap-3">
                {["Technology", "Food & Beverage"].map((category) => (
                  <button
                    type="button"
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-4 py-2 rounded-lg border text-sm ${
                      formData.category.includes(category)
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-700 border-gray-300"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>

              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white"
              >
                <option value="">Select difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </section>

        {/* Financial Information */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">
            Financial Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Investment
              </label>

              <input
                type="number"
                name="investmentMin"
                value={formData.investmentMin}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Investment
              </label>

              <input
                type="number"
                name="investmentMax"
                value={formData.investmentMax}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Estimated Income
              </label>

              <input
                type="number"
                name="incomeMin"
                value={formData.incomeMin}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Estimated Income
              </label>

              <input
                type="number"
                name="incomeMax"
                value={formData.incomeMax}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
              />
            </div>
          </div>
        </section>

        {/* Launch */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">
            Launch Information
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Launch Time
            </label>

            <input
              type="text"
              name="launchTime"
              value={formData.launchTime}
              onChange={handleChange}
              placeholder="e.g. 2-3 months"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
            />
          </div>
        </section>

        {/* Lists */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Additional Information
          </h2>

          <p className="text-sm text-gray-500 mb-5">Enter one item per line.</p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Advantages
              </label>

              <textarea
                name="advantages"
                value={formData.advantages}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                placeholder={"Low investment\nHigh demand\nEasy to start"}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Challenges
              </label>

              <textarea
                name="challenges"
                value={formData.challenges}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                placeholder={"Competition\nMarketing\nInitial setup"}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Government Schemes
              </label>

              <textarea
                name="governmentSchemes"
                value={formData.governmentSchemes}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                placeholder={"PMEGP\nMUDRA\nStartup India"}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>

              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                placeholder="business, startup, handmade"
              />

              <p className="text-xs text-gray-400 mt-1">
                Separate tags using commas.
              </p>
            </div>
          </div>
        </section>

        {/* Image */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-5">Image</h2>

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
            placeholder="Image URL"
          />
        </section>

        {/* Mentor & Roadmap Assignment */}
        <section className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Assignment
          </h2>

          <p className="text-sm text-gray-500 mb-5">
            Assign a verified mentor and the roadmap for this business idea.
          </p>

          {loadingAssignments ? (
            <p className="text-sm text-gray-500">
              Loading mentors and roadmaps...
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Mentor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recommended Mentor
                </label>

                <select
                  name="mentor"
                  value={formData.mentor}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">No mentor assigned</option>

                  {mentors.map((mentor) => (
                    <option key={mentor._id} value={mentor._id}>
                      {mentor.user?.name || "Unnamed Mentor"}
                      {mentor.user?.email ? ` - ${mentor.user.email}` : ""}
                    </option>
                  ))}
                </select>

                {mentors.length === 0 && (
                  <p className="text-xs text-gray-400 mt-2">
                    No verified mentors available.
                  </p>
                )}
              </div>

              {/* Roadmap */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roadmap
                </label>

                <select
                  name="roadmap"
                  value={formData.roadmap}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">No roadmap assigned</option>

                  {roadmaps.map((roadmap) => (
                    <option key={roadmap._id} value={roadmap._id}>
                      {roadmap.title}
                    </option>
                  ))}
                </select>

                {roadmaps.length === 0 && (
                  <p className="text-xs text-gray-400 mt-2">
                    No roadmap exists for this business idea yet.
                  </p>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(`/admin/business-ideas/${ideaId}`)}
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditBusinessIdea;
