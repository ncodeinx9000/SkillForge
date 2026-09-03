import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminCreateRoadmap = () => {
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const [businessIdeas, setBusinessIdeas] = useState([]);

    const [loadingIdeas, setLoadingIdeas] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        businessIdea: "",
        title: "",
        category: "",
        level: "Beginner",
        investmentRange: "",
        estimatedIncome: "",
        estimatedDuration: "",
        steps: [],
    });

    // ==========================================
    // FETCH BUSINESS IDEAS
    // ==========================================

    const fetchBusinessIdeas = async () => {
        try {
            setLoadingIdeas(true);

            const response = await fetch(
                `${API_URL}/api/admin/business-ideas/all`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!data.success) {
                alert(data.message || "Failed to load business ideas.");
                return;
            }

            setBusinessIdeas(data.businessIdeas || []);

        } catch (error) {
            console.error(
                "Error fetching business ideas:",
                error
            );

            alert("Failed to load business ideas.");
        } finally {
            setLoadingIdeas(false);
        }
    };

    useEffect(() => {
        fetchBusinessIdeas();
    }, []);

    // ==========================================
    // HANDLE BASIC INPUT
    // ==========================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ==========================================
    // BUSINESS IDEA CHANGE
    // ==========================================

    const handleBusinessIdeaChange = (e) => {
        const businessIdeaId = e.target.value;

        const selectedIdea = businessIdeas.find(
            (idea) => idea._id === businessIdeaId
        );

        setFormData((prev) => ({
            ...prev,
            businessIdea: businessIdeaId,
            title: selectedIdea?.title || "",
            category:
                selectedIdea?.category?.[0] ||
                selectedIdea?.category ||
                "",
        }));
    };

    // ==========================================
    // ADD STEP
    // ==========================================

    const addStep = () => {
        setFormData((prev) => ({
            ...prev,
            steps: [
                ...prev.steps,
                {
                    order: prev.steps.length + 1,
                    title: "",
                    description: "",
                    tip: "",
                    estimatedDays: 0,
                    estimatedCost: 0,
                    tasks: [],
                    resources: [],
                },
            ],
        }));
    };

    // ==========================================
    // REMOVE STEP
    // ==========================================

    const removeStep = (stepIndex) => {
        setFormData((prev) => {
            const updatedSteps = prev.steps
                .filter((_, index) => index !== stepIndex)
                .map((step, index) => ({
                    ...step,
                    order: index + 1,
                }));

            return {
                ...prev,
                steps: updatedSteps,
            };
        });
    };

    // ==========================================
    // UPDATE STEP
    // ==========================================

    const updateStep = (stepIndex, field, value) => {
        setFormData((prev) => {
            const updatedSteps = [...prev.steps];

            updatedSteps[stepIndex] = {
                ...updatedSteps[stepIndex],
                [field]: value,
            };

            return {
                ...prev,
                steps: updatedSteps,
            };
        });
    };

    // ==========================================
    // ADD TASK
    // ==========================================

    const addTask = (stepIndex) => {
        setFormData((prev) => {
            const updatedSteps = [...prev.steps];

            updatedSteps[stepIndex] = {
                ...updatedSteps[stepIndex],
                tasks: [
                    ...updatedSteps[stepIndex].tasks,
                    {
                        title: "",
                    },
                ],
            };

            return {
                ...prev,
                steps: updatedSteps,
            };
        });
    };

    // ==========================================
    // UPDATE TASK
    // ==========================================

    const updateTask = (
        stepIndex,
        taskIndex,
        value
    ) => {
        setFormData((prev) => {
            const updatedSteps = [...prev.steps];

            const updatedTasks = [
                ...updatedSteps[stepIndex].tasks,
            ];

            updatedTasks[taskIndex] = {
                ...updatedTasks[taskIndex],
                title: value,
            };

            updatedSteps[stepIndex] = {
                ...updatedSteps[stepIndex],
                tasks: updatedTasks,
            };

            return {
                ...prev,
                steps: updatedSteps,
            };
        });
    };

    // ==========================================
    // REMOVE TASK
    // ==========================================

    const removeTask = (
        stepIndex,
        taskIndex
    ) => {
        setFormData((prev) => {
            const updatedSteps = [...prev.steps];

            updatedSteps[stepIndex] = {
                ...updatedSteps[stepIndex],
                tasks: updatedSteps[stepIndex].tasks.filter(
                    (_, index) => index !== taskIndex
                ),
            };

            return {
                ...prev,
                steps: updatedSteps,
            };
        });
    };

    // ==========================================
    // CREATE ROADMAP
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.businessIdea) {
            alert("Please select a business idea.");
            return;
        }

        if (!formData.title.trim()) {
            alert("Roadmap title is required.");
            return;
        }

        if (!formData.category.trim()) {
            alert("Category is required.");
            return;
        }

        try {
            setSubmitting(true);

            const payload = {
                ...formData,

                steps: formData.steps.map((step) => ({
                    ...step,
                    estimatedDays:
                        Number(step.estimatedDays) || 0,
                    estimatedCost:
                        Number(step.estimatedCost) || 0,
                    tasks: step.tasks.filter(
                        (task) =>
                            task.title.trim() !== ""
                    ),
                })),
            };

            const response = await fetch(
                `${API_URL}/api/admin/roadmaps`,
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
                alert(
                    data.message ||
                        "Failed to create roadmap."
                );
                return;
            }

            alert("Roadmap created successfully.");

            navigate("/admin/roadmaps");

        } catch (error) {
            console.error(
                "Create roadmap error:",
                error
            );

            alert("Failed to create roadmap.");
        } finally {
            setSubmitting(false);
        }
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loadingIdeas) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">
                    Loading business ideas...
                </p>
            </div>
        );
    }

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="max-w-6xl mx-auto">

            {/* HEADER */}
            <div className="mb-8">

                <button
                    type="button"
                    onClick={() =>
                        navigate("/admin/roadmaps")
                    }
                    className="text-sm text-gray-500 hover:text-gray-800 mb-4"
                >
                    ← Back to Roadmaps
                </button>

                <h1 className="text-2xl font-bold text-gray-800">
                    Create Roadmap
                </h1>

                <p className="text-gray-500 mt-1">
                    Create a step-by-step roadmap for a
                    business idea.
                </p>

            </div>

            <form onSubmit={handleSubmit}>

                {/* ==================================
                    BASIC INFORMATION
                ================================== */}

                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">

                    <h2 className="text-lg font-semibold text-gray-800 mb-5">
                        Basic Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Business Idea */}

                        <div className="md:col-span-2">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Business Idea *
                            </label>

                            <select
                                name="businessIdea"
                                value={
                                    formData.businessIdea
                                }
                                onChange={
                                    handleBusinessIdeaChange
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >

                                <option value="">
                                    Select Business Idea
                                </option>

                                {businessIdeas.map(
                                    (idea) => (
                                        <option
                                            key={
                                                idea._id
                                            }
                                            value={
                                                idea._id
                                            }
                                        >
                                            {idea.title}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                        {/* Title */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Roadmap Title *
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={
                                    formData.title
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Example: Start a Home Tiffin Service"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />

                        </div>

                        {/* Category */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>

                            <input
                                type="text"
                                name="category"
                                value={
                                    formData.category
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Example: Food & Catering"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />

                        </div>

                        {/* Level */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Level
                            </label>

                            <select
                                name="level"
                                value={
                                    formData.level
                                }
                                onChange={
                                    handleChange
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
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

                        {/* Investment */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Investment Range
                            </label>

                            <input
                                type="text"
                                name="investmentRange"
                                value={
                                    formData.investmentRange
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="₹5,000 - ₹15,000"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>

                        {/* Income */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Estimated Income
                            </label>

                            <input
                                type="text"
                                name="estimatedIncome"
                                value={
                                    formData.estimatedIncome
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="₹15,000 - ₹40,000/month"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>

                        {/* Duration */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Estimated Duration
                            </label>

                            <input
                                type="text"
                                name="estimatedDuration"
                                value={
                                    formData.estimatedDuration
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="2 - 4 weeks"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                        </div>

                    </div>

                </div>

                {/* ==================================
                    ROADMAP STEPS
                ================================== */}

                <div className="mb-6">

                    <div className="flex items-center justify-between mb-5">

                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Roadmap Steps
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Add the steps learners need
                                to follow.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={addStep}
                            className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            + Add Step
                        </button>

                    </div>

                    {formData.steps.length === 0 ? (

                        <div className="bg-white border border-dashed border-gray-300 rounded-xl p-10 text-center">

                            <p className="text-gray-500">
                                No steps added yet.
                            </p>

                            <button
                                type="button"
                                onClick={addStep}
                                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                            >
                                Add First Step
                            </button>

                        </div>

                    ) : (

                        <div className="space-y-5">

                            {formData.steps.map(
                                (step, stepIndex) => (

                                    <div
                                        key={
                                            stepIndex
                                        }
                                        className="bg-white border border-gray-200 rounded-xl p-6"
                                    >

                                        {/* STEP HEADER */}

                                        <div className="flex items-center justify-between mb-5">

                                            <div className="flex items-center gap-3">

                                                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">
                                                    {
                                                        step.order
                                                    }
                                                </div>

                                                <h3 className="font-semibold text-gray-800">
                                                    Step{" "}
                                                    {
                                                        step.order
                                                    }
                                                </h3>

                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeStep(
                                                        stepIndex
                                                    )
                                                }
                                                className="text-sm text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>

                                        </div>

                                        {/* STEP FIELDS */}

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                            {/* Title */}

                                            <div className="md:col-span-2">

                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Step Title *
                                                </label>

                                                <input
                                                    type="text"
                                                    value={
                                                        step.title
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        updateStep(
                                                            stepIndex,
                                                            "title",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    placeholder="Example: Validate Your Business Idea"
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                                />

                                            </div>

                                            {/* Description */}

                                            <div className="md:col-span-2">

                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Description
                                                </label>

                                                <textarea
                                                    value={
                                                        step.description
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        updateStep(
                                                            stepIndex,
                                                            "description",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    rows="3"
                                                    placeholder="Explain what the learner should do in this step..."
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                                />

                                            </div>

                                            {/* Mentor Tip */}

                                            <div className="md:col-span-2">

                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Mentor Tip
                                                </label>

                                                <textarea
                                                    value={
                                                        step.tip
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        updateStep(
                                                            stepIndex,
                                                            "tip",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    rows="2"
                                                    placeholder="Give a useful tip to the learner..."
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                                />

                                            </div>

                                            {/* Estimated Days */}

                                            <div>

                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Estimated Days
                                                </label>

                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={
                                                        step.estimatedDays
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        updateStep(
                                                            stepIndex,
                                                            "estimatedDays",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                                />

                                            </div>

                                            {/* Estimated Cost */}

                                            <div>

                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Estimated Cost
                                                </label>

                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={
                                                        step.estimatedCost
                                                    }
                                                    onChange={(
                                                        e
                                                    ) =>
                                                        updateStep(
                                                            stepIndex,
                                                            "estimatedCost",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                                />

                                            </div>

                                        </div>

                                        {/* ==================================
                                            TASKS
                                        ================================== */}

                                        <div className="mt-6 pt-6 border-t border-gray-100">

                                            <div className="flex items-center justify-between mb-4">

                                                <div>
                                                    <h4 className="font-medium text-gray-800">
                                                        Checklist
                                                    </h4>

                                                    <p className="text-sm text-gray-500">
                                                        Add tasks learners
                                                        should complete.
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        addTask(
                                                            stepIndex
                                                        )
                                                    }
                                                    className="text-sm px-3 py-2 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50"
                                                >
                                                    + Add Task
                                                </button>

                                            </div>

                                            <div className="space-y-3">

                                                {step.tasks.map(
                                                    (
                                                        task,
                                                        taskIndex
                                                    ) => (

                                                        <div
                                                            key={
                                                                taskIndex
                                                            }
                                                            className="flex items-center gap-3"
                                                        >

                                                            <input
                                                                type="checkbox"
                                                                disabled
                                                                className="w-4 h-4"
                                                            />

                                                            <input
                                                                type="text"
                                                                value={
                                                                    task.title
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) =>
                                                                    updateTask(
                                                                        stepIndex,
                                                                        taskIndex,
                                                                        e
                                                                            .target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder="Enter checklist task"
                                                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                                                            />

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeTask(
                                                                        stepIndex,
                                                                        taskIndex
                                                                    )
                                                                }
                                                                className="text-sm text-red-500 hover:text-red-700"
                                                            >
                                                                Remove
                                                            </button>

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

                {/* ==================================
                    ACTIONS
                ================================== */}

                <div className="flex items-center justify-end gap-3 pb-10">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/roadmaps")
                        }
                        className="px-5 py-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {submitting
                            ? "Creating..."
                            : "Create Roadmap"}
                    </button>

                </div>

            </form>

        </div>
    );
};

export default AdminCreateRoadmap;