import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBusinessIdea = () => {
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const [loading, setLoading] = useState(false);
    const [mentors, setMentors] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "Technology",

        investmentMin: "",
        investmentMax: "",

        incomeMin: "",
        incomeMax: "",

        launchTime: "",

        difficulty: "Beginner",

        advantages: "",
        challenges: "",

        tags: "",

        image: "",

        mentor: "",
    });

    // Get verified mentors
    const fetchMentors = async () => {
        try {
            const response = await fetch(
                `${API_URL}/api/admin/mentors?status=verified`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (data.success) {
                setMentors(data.mentors);
            }
        } catch (error) {
            console.error("Error fetching mentors:", error);
        }
    };

    useEffect(() => {
        fetchMentors();
    }, []);

    // Handle input
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Create business idea
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const payload = {
                title: formData.title,
                description: formData.description,

                category: [formData.category],

                investment: {
                    min: Number(formData.investmentMin),
                    max: Number(formData.investmentMax),
                },

                estimatedIncome: {
                    min: Number(formData.incomeMin),
                    max: Number(formData.incomeMax),
                },

                launchTime: formData.launchTime,

                difficulty: formData.difficulty,

                advantages: formData.advantages
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),

                challenges: formData.challenges
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),

                tags: formData.tags
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),

                image: formData.image,

                mentor: formData.mentor || null,
            };

            const response = await fetch(
                `${API_URL}/api/admin/business-ideas/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(payload),
                }
            );

            const data = await response.json();

            if (!data.success) {
                alert(data.message);
                return;
            }

            alert("Business idea created successfully!");

            navigate("/admin/business-ideas");

        } catch (error) {
            console.error("Create business idea error:", error);

            alert("Something went wrong while creating the business idea.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl">

            {/* Header */}
            <div className="mb-8">

                <button
                    type="button"
                    onClick={() => navigate("/admin/business-ideas")}
                    className="text-sm text-gray-500 hover:text-gray-800 mb-3"
                >
                    ← Back to Business Ideas
                </button>

                <h1 className="text-2xl font-bold text-gray-800">
                    Create Business Idea
                </h1>

                <p className="text-gray-500 mt-1">
                    Add a new business idea for SkillForge learners.
                </p>

            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white border border-gray-200 rounded-xl p-6 space-y-8"
            >

                {/* Basic Information */}
                <section>

                    <h2 className="text-lg font-semibold text-gray-800 mb-5">
                        Basic Information
                    </h2>

                    <div className="space-y-5">

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Business Idea Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Example: Home Tiffin Service"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                placeholder="Describe the business idea..."
                                rows={4}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Category + Difficulty */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                                >
                                    <option value="Technology">
                                        Technology
                                    </option>

                                    <option value="Food & Beverage">
                                        Food & Beverage
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Difficulty
                                </label>

                                <select
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                                >
                                    <option value="Beginner">
                                        Beginner
                                    </option>

                                    <option value="Intermediate">
                                        Intermediate
                                    </option>

                                    <option value="Advanced">
                                        Advanced
                                    </option>
                                </select>
                            </div>

                        </div>

                    </div>

                </section>

                {/* Financial Information */}
                <section>

                    <h2 className="text-lg font-semibold text-gray-800 mb-5">
                        Financial Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Investment */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Investment Range (₹)
                            </label>

                            <div className="grid grid-cols-2 gap-3">

                                <input
                                    type="number"
                                    name="investmentMin"
                                    value={formData.investmentMin}
                                    onChange={handleChange}
                                    placeholder="Min"
                                    required
                                    className="border border-gray-300 rounded-lg px-4 py-2.5"
                                />

                                <input
                                    type="number"
                                    name="investmentMax"
                                    value={formData.investmentMax}
                                    onChange={handleChange}
                                    placeholder="Max"
                                    required
                                    className="border border-gray-300 rounded-lg px-4 py-2.5"
                                />

                            </div>

                        </div>

                        {/* Income */}
                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Estimated Monthly Income (₹)
                            </label>

                            <div className="grid grid-cols-2 gap-3">

                                <input
                                    type="number"
                                    name="incomeMin"
                                    value={formData.incomeMin}
                                    onChange={handleChange}
                                    placeholder="Min"
                                    required
                                    className="border border-gray-300 rounded-lg px-4 py-2.5"
                                />

                                <input
                                    type="number"
                                    name="incomeMax"
                                    value={formData.incomeMax}
                                    onChange={handleChange}
                                    placeholder="Max"
                                    required
                                    className="border border-gray-300 rounded-lg px-4 py-2.5"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Launch Time */}
                    <div className="mt-5">

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estimated Launch Time
                        </label>

                        <input
                            type="text"
                            name="launchTime"
                            value={formData.launchTime}
                            onChange={handleChange}
                            placeholder="Example: 2-4 weeks"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                        />

                    </div>

                </section>

                {/* Business Details */}
                <section>

                    <h2 className="text-lg font-semibold text-gray-800 mb-5">
                        Business Details
                    </h2>

                    <div className="space-y-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Advantages
                            </label>

                            <input
                                type="text"
                                name="advantages"
                                value={formData.advantages}
                                onChange={handleChange}
                                placeholder="Low investment, Home based, High demand"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                            />

                            <p className="text-xs text-gray-400 mt-1">
                                Separate multiple advantages with commas.
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Challenges
                            </label>

                            <input
                                type="text"
                                name="challenges"
                                value={formData.challenges}
                                onChange={handleChange}
                                placeholder="Competition, Marketing, Initial setup"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                            />

                            <p className="text-xs text-gray-400 mt-1">
                                Separate multiple challenges with commas.
                            </p>
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
                                placeholder="Low Investment, Home Based, Online"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                            />

                            <p className="text-xs text-gray-400 mt-1">
                                Separate tags with commas.
                            </p>
                        </div>

                    </div>

                </section>

                {/* Mentor */}
                <section>

                    <h2 className="text-lg font-semibold text-gray-800 mb-5">
                        Recommended Mentor
                    </h2>

                    <select
                        name="mentor"
                        value={formData.mentor}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    >

                        <option value="">
                            No mentor selected
                        </option>

                        {mentors.map((mentor) => (
                            <option
                                key={mentor._id}
                                value={mentor._id}
                            >
                                {mentor.user?.name} - {mentor.title}
                            </option>
                        ))}

                    </select>

                </section>

                {/* Image */}
                <section>

                    <h2 className="text-lg font-semibold text-gray-800 mb-5">
                        Cover Image
                    </h2>

                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
                    />

                </section>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-5 border-t border-gray-200">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/business-ideas")
                        }
                        className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {loading
                            ? "Creating..."
                            : "Create Business Idea"}
                    </button>

                </div>

            </form>

        </div>
    );
};

export default CreateBusinessIdea;