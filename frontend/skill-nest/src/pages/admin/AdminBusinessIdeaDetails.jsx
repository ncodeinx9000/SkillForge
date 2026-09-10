import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../lib/axios";

const AdminBusinessIdeaDetails = () => {
    const { ideaId } = useParams();
    const navigate = useNavigate();

    const [businessIdea, setBusinessIdea] = useState(null);
    const [roadmap, setRoadmap] = useState(null);
    const [learners, setLearners] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBusinessIdea();
    }, [ideaId]);

    const fetchBusinessIdea = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                `/admin/business-ideas/${ideaId}`
            );

            if (response.data.success) {
                setBusinessIdea(response.data.businessIdea);
                setRoadmap(response.data.roadmap);
                setLearners(response.data.learners || []);
            }
        } catch (error) {
            console.error(
                "Failed to fetch business idea:",
                error
            );

            setError(
                error.response?.data?.message ||
                    "Failed to load business idea"
            );
        } finally {
            setLoading(false);
        }
    };

    const getMentorName = (mentor) => {
        if (!mentor) return "Not assigned";

        if (mentor.user?.name) {
            return mentor.user.name;
        }

        return "Mentor assigned";
    };

    const getLearnerName = (learner) => {
        if (!learner) return "Unknown learner";

        return learner.name || learner.email || "Unknown learner";
    };

    const getProgress = (learnerProgress) => {
        return learnerProgress?.roadmapProgress || 0;
    };

    const getStatus = (learnerProgress) => {
        return learnerProgress?.status || "Active";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl p-8 text-center">
                        <p className="text-gray-500">
                            Loading business idea...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-xl p-8">
                        <p className="text-red-500 mb-4">
                            {error}
                        </p>

                        <button
                            onClick={() =>
                                navigate("/admin/business-ideas")
                            }
                            className="px-4 py-2 bg-gray-900 text-white rounded-lg"
                        >
                            Back to Business Ideas
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!businessIdea) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                    <div>
                        <button
                            onClick={() =>
                                navigate("/admin/business-ideas")
                            }
                            className="text-sm text-gray-500 hover:text-gray-900 mb-2"
                        >
                            ← Back to Business Ideas
                        </button>

                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {businessIdea.title}
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Business Idea Details
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            navigate(
                                `/admin/business-ideas/${ideaId}/edit`
                            )
                        }
                        className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
                    >
                        Edit Business Idea
                    </button>
                </div>

                {/* Business Idea Overview */}
                <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-6">

                        {/* Image */}
                        {businessIdea.image ? (
                            <img
                                src={businessIdea.image}
                                alt={businessIdea.title}
                                className="w-full lg:w-64 h-48 object-cover rounded-xl"
                            />
                        ) : (
                            <div className="w-full lg:w-64 h-48 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                                No image
                            </div>
                        )}

                        <div className="flex-1">

                            <div className="flex flex-wrap gap-2 mb-4">
                                {(businessIdea.category || []).map(
                                    (category) => (
                                        <span
                                            key={category}
                                            className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
                                        >
                                            {category}
                                        </span>
                                    )
                                )}

                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        businessIdea.status ===
                                        "published"
                                            ? "bg-green-100 text-green-700"
                                            : businessIdea.status ===
                                              "archived"
                                            ? "bg-gray-200 text-gray-600"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                                >
                                    {businessIdea.status}
                                </span>
                            </div>

                            <p className="text-gray-700 leading-relaxed mb-5">
                                {businessIdea.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Investment
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        ₹
                                        {businessIdea.investment?.min?.toLocaleString?.() ||
                                            0}{" "}
                                        - ₹
                                        {businessIdea.investment?.max?.toLocaleString?.() ||
                                            0}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Estimated Income
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        ₹
                                        {businessIdea.estimatedIncome?.min?.toLocaleString?.() ||
                                            0}{" "}
                                        - ₹
                                        {businessIdea.estimatedIncome?.max?.toLocaleString?.() ||
                                            0}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Launch Time
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {businessIdea.launchTime ||
                                            "Not specified"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500">
                                        Difficulty
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {businessIdea.difficulty ||
                                            "Not specified"}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                {/* Recommended Mentor */}
                <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6">

                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Recommended Mentor
                            </h2>

                            <p className="text-sm text-gray-500">
                                Mentor assigned to this business idea
                            </p>
                        </div>
                    </div>

                    {businessIdea.mentor ? (
                        <div className="border border-gray-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    {getMentorName(
                                        businessIdea.mentor
                                    )}
                                </h3>

                                {businessIdea.mentor.user?.email && (
                                    <p className="text-sm text-gray-500">
                                        {
                                            businessIdea.mentor.user
                                                .email
                                        }
                                    </p>
                                )}
                            </div>

                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                                Recommended Mentor
                            </span>
                        </div>
                    ) : (
                        <div className="p-5 rounded-xl bg-gray-50 text-gray-500">
                            No mentor has been assigned.
                        </div>
                    )}
                </section>

                {/* Roadmap */}
                <section className="bg-white rounded-xl border border-gray-200 p-6 mb-6">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Roadmap
                            </h2>

                            <p className="text-sm text-gray-500">
                                Steps, tasks and learning resources
                            </p>
                        </div>

                        {roadmap && (
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    roadmap.status === "published"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}
                            >
                                {roadmap.status}
                            </span>
                        )}
                    </div>

                    {!roadmap ? (
                        <div className="p-6 rounded-xl bg-gray-50 text-gray-500 text-center">
                            No roadmap assigned to this business idea.
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {roadmap.title}
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    {roadmap.level} •{" "}
                                    {roadmap.estimatedDuration ||
                                        "Duration not specified"}
                                </p>
                            </div>

                            <div className="space-y-5">
                                {(roadmap.steps || []).map(
                                    (step, index) => (
                                        <div
                                            key={
                                                step._id ||
                                                `${step.order}-${index}`
                                            }
                                            className="border border-gray-200 rounded-xl p-5"
                                        >
                                            {/* Step header */}
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="w-9 h-9 shrink-0 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">
                                                    {step.order ||
                                                        index + 1}
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold text-gray-900">
                                                        {step.title}
                                                    </h4>

                                                    {step.description && (
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {
                                                                step.description
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Tasks */}
                                            <div className="ml-0 sm:ml-13 mb-5">
                                                <h5 className="text-sm font-semibold text-gray-700 mb-2">
                                                    Tasks (
                                                    {
                                                        (
                                                            step.tasks ||
                                                            []
                                                        ).length
                                                    }
                                                    )
                                                </h5>

                                                {step.tasks?.length ? (
                                                    <ul className="space-y-2">
                                                        {step.tasks.map(
                                                            (
                                                                task,
                                                                taskIndex
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        task._id ||
                                                                        taskIndex
                                                                    }
                                                                    className="flex gap-2 text-sm text-gray-600"
                                                                >
                                                                    <span>
                                                                        •
                                                                    </span>

                                                                    <span>
                                                                        {
                                                                            task.title
                                                                        }
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                ) : (
                                                    <p className="text-sm text-gray-400">
                                                        No tasks
                                                    </p>
                                                )}
                                            </div>

                                            {/* Resources */}
                                            <div>
                                                <h5 className="text-sm font-semibold text-gray-700 mb-3">
                                                    Learning Resources (
                                                    {
                                                        (
                                                            step.resources ||
                                                            []
                                                        ).length
                                                    }
                                                    )
                                                </h5>

                                                {step.resources?.length ? (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {step.resources.map(
                                                            (
                                                                resource
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        resource._id
                                                                    }
                                                                    className="border border-gray-200 rounded-lg p-4"
                                                                >
                                                                    <div className="flex items-start justify-between gap-3">
                                                                        <div>
                                                                            <h6 className="font-medium text-gray-900">
                                                                                {
                                                                                    resource.title
                                                                                }
                                                                            </h6>

                                                                            <p className="text-xs text-gray-500 mt-1">
                                                                                {
                                                                                    resource.type
                                                                                }
                                                                                {resource.level &&
                                                                                    ` • ${resource.level}`}
                                                                            </p>
                                                                        </div>

                                                                        <span
                                                                            className={`text-xs px-2 py-1 rounded-full ${
                                                                                resource.isPublished
                                                                                    ? "bg-green-100 text-green-700"
                                                                                    : "bg-gray-100 text-gray-500"
                                                                            }`}
                                                                        >
                                                                            {resource.isPublished
                                                                                ? "Published"
                                                                                : resource.status}
                                                                        </span>
                                                                    </div>

                                                                    {resource.description && (
                                                                        <p className="text-sm text-gray-600 mt-3">
                                                                            {
                                                                                resource.description
                                                                            }
                                                                        </p>
                                                                    )}

                                                                    {resource.url && (
                                                                        <a
                                                                            href={
                                                                                resource.url
                                                                            }
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            className="inline-block mt-3 text-sm text-blue-600 hover:underline"
                                                                        >
                                                                            Open Resource →
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-gray-400">
                                                        No resources attached
                                                        to this step.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </>
                    )}
                </section>

                {/* Learners */}
                <section className="bg-white rounded-xl border border-gray-200 p-6">

                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Learners Using This Idea
                            </h2>

                            <p className="text-sm text-gray-500">
                                Track learner progress and mentors
                            </p>
                        </div>

                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                            {learners.length} Learner
                            {learners.length !== 1 ? "s" : ""}
                        </span>
                    </div>

                    {learners.length === 0 ? (
                        <div className="p-8 rounded-xl bg-gray-50 text-center">
                            <p className="text-gray-500">
                                No learners are currently using this
                                business idea.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px]">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">
                                            Learner
                                        </th>

                                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">
                                            Roadmap
                                        </th>

                                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">
                                            Progress
                                        </th>

                                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">
                                            Mentor
                                        </th>

                                        <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">
                                            Status
                                        </th>

                                        <th className="text-right py-3 px-3 text-xs font-semibold text-gray-500 uppercase">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {learners.map(
                                        (learnerProgress) => {
                                            const learner =
                                                learnerProgress.learner;

                                            const progress =
                                                getProgress(
                                                    learnerProgress
                                                );

                                            const mentor =
                                                learnerProgress
                                                    .bookedMentor?.[0];

                                            return (
                                                <tr
                                                    key={
                                                        learnerProgress._id
                                                    }
                                                    className="border-b border-gray-100 last:border-0"
                                                >
                                                    <td className="py-4 px-3">
                                                        <div>
                                                            <p className="font-medium text-gray-900">
                                                                {getLearnerName(
                                                                    learner
                                                                )}
                                                            </p>

                                                            <p className="text-xs text-gray-500">
                                                                {
                                                                    learner?.email
                                                                }
                                                            </p>
                                                        </div>
                                                    </td>

                                                    <td className="py-4 px-3 text-sm text-gray-600">
                                                        {learnerProgress
                                                            .roadmap
                                                            ?.title ||
                                                            "Not assigned"}
                                                    </td>

                                                    <td className="py-4 px-3">
                                                        <div className="w-32">
                                                            <div className="flex justify-between text-xs mb-1">
                                                                <span className="text-gray-500">
                                                                    Progress
                                                                </span>

                                                                <span className="font-medium">
                                                                    {
                                                                        progress
                                                                    }
                                                                    %
                                                                </span>
                                                            </div>

                                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-gray-900 rounded-full"
                                                                    style={{
                                                                        width: `${progress}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="py-4 px-3 text-sm text-gray-600">
                                                        {getMentorName(
                                                            mentor
                                                        )}
                                                    </td>

                                                    <td className="py-4 px-3">
                                                        <span
                                                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                                getStatus(
                                                                    learnerProgress
                                                                ) ===
                                                                "Completed"
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-blue-100 text-blue-700"
                                                            }`}
                                                        >
                                                            {getStatus(
                                                                learnerProgress
                                                            )}
                                                        </span>
                                                    </td>

                                                    <td className="py-4 px-3 text-right">
                                                        <button
                                                            onClick={() =>
                                                                navigate(
                                                                    `/admin/learners/${learner?._id}`
                                                                )
                                                            }
                                                            className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                                        >
                                                            View
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default AdminBusinessIdeaDetails;