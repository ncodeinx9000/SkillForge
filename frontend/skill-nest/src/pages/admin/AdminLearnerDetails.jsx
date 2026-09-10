import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaArrowLeft,
    FaUser,
    FaRoad,
    FaTasks,
    FaBook,
    FaUserTie,
    FaCheckCircle,
    FaClock,
    FaExternalLinkAlt,
} from "react-icons/fa";

const AdminLearnerDetails = () => {
    const { learnerId } = useParams();
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const [learner, setLearner] = useState(null);
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);

    // =====================================================
    // FETCH LEARNER
    // =====================================================

    const fetchLearner = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/admin/users/learners/${learnerId}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!data.success) {
                alert(data.message || "Failed to load learner.");
                return;
            }

            setLearner(data.learner);
            setProgress(data.progress || []);

        } catch (error) {
            console.error(
                "Get learner details error:",
                error
            );

            alert("Failed to load learner details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLearner();
    }, [learnerId]);

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                <div className="text-center">

                    <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

                    <p className="mt-4 text-gray-500">
                        Loading learner...
                    </p>

                </div>

            </div>
        );
    }

    if (!learner) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                <div className="text-center">

                    <h2 className="text-xl font-semibold text-gray-800">
                        Learner not found
                    </h2>

                    <button
                        onClick={() =>
                            navigate("/admin/learners")
                        }
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Back to Learners
                    </button>

                </div>

            </div>
        );
    }

    // =====================================================
    // UI
    // =====================================================

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

            {/* BACK */}

            <button
                onClick={() =>
                    navigate("/admin/learners")
                }
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
            >
                <FaArrowLeft size={13} />

                Back to Learners
            </button>


            {/* LEARNER HEADER */}

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">

                <div className="flex flex-col md:flex-row md:items-center gap-5">

                    <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold">
                        {learner.name
                            ?.charAt(0)
                            ?.toUpperCase() || "L"}
                    </div>

                    <div className="flex-1">

                        <h1 className="text-2xl font-bold text-gray-900">
                            {learner.name}
                        </h1>

                        <p className="text-gray-500 mt-1">
                            {learner.email}
                        </p>

                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">

                        <FaUser size={13} />

                        Learner

                    </div>

                </div>

            </div>


            {/* NO PROGRESS */}

            {progress.length === 0 ? (

                <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">

                    <FaRoad
                        size={40}
                        className="mx-auto text-gray-300"
                    />

                    <h2 className="mt-4 font-semibold text-gray-800">
                        No roadmap progress
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        This learner has not started a roadmap yet.
                    </p>

                </div>

            ) : (

                <div className="space-y-6">

                    {progress.map((record) => (

                        <LearnerProgressCard
                            key={record.progressId}
                            record={record}
                        />

                    ))}

                </div>

            )}

        </div>
    );
};


// =========================================================
// PROGRESS CARD
// =========================================================

const LearnerProgressCard = ({ record }) => {

    const roadmap = record.roadmap;
    const businessIdea = record.businessIdea;

    const roadmapProgress =
        Math.min(
            Math.max(
                Number(record.roadmapProgress) || 0,
                0
            ),
            100
        );

    const resourceProgress =
        Math.min(
            Math.max(
                Number(record.resourceProgress) || 0,
                0
            ),
            100
        );


    // =====================================================
    // COUNTS
    // =====================================================

    const steps =
        roadmap?.steps || [];

    const totalTasks = steps.reduce(
        (total, step) =>
            total + (step.tasks?.length || 0),
        0
    );

    const completedTasks =
        record.completedTask?.length || 0;

    const totalResources = steps.reduce(
        (total, step) =>
            total + (step.resources?.length || 0),
        0
    );

    const completedResources =
        record.completedResources?.length || 0;

    const completedSteps =
        record.completedSteps?.length || 0;


    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

            {/* BUSINESS IDEA */}

            <div className="p-6 border-b border-gray-200">

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                    <div>

                        <p className="text-xs font-semibold uppercase text-blue-600 mb-2">
                            Business Idea
                        </p>

                        <h2 className="text-xl font-bold text-gray-900">
                            {businessIdea?.title ||
                                "Business Idea"}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            {businessIdea?.description ||
                                "No description available."}
                        </p>

                    </div>


                    {/* STATUS */}

                    {record.status === "Completed" ? (

                        <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-100 text-green-700 text-sm font-medium">

                            <FaCheckCircle />

                            Completed

                        </span>

                    ) : (

                        <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-100 text-blue-700 text-sm font-medium">

                            <FaClock />

                            Active

                        </span>

                    )}

                </div>

            </div>


            {/* ROADMAP */}

            <div className="p-6 border-b border-gray-200">

                <div className="flex items-center gap-3 mb-4">

                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                        <FaRoad />
                    </div>

                    <div>

                        <p className="text-xs text-gray-500">
                            Roadmap
                        </p>

                        <h3 className="font-semibold text-gray-900">
                            {roadmap?.title ||
                                "Roadmap"}
                        </h3>

                    </div>

                </div>


                {/* PROGRESS */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <ProgressBar
                        label="Roadmap Progress"
                        value={roadmapProgress}
                    />

                    <ProgressBar
                        label="Resource Progress"
                        value={resourceProgress}
                    />

                </div>

            </div>


            {/* STATS */}

            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-200">

                <Stat
                    icon={<FaRoad />}
                    label="Steps"
                    value={`${completedSteps}/${steps.length}`}
                />

                <Stat
                    icon={<FaTasks />}
                    label="Tasks"
                    value={`${completedTasks}/${totalTasks}`}
                />

                <Stat
                    icon={<FaBook />}
                    label="Resources"
                    value={`${completedResources}/${totalResources}`}
                />

                <Stat
                    icon={<FaUserTie />}
                    label="Mentors"
                    value={
                        record.bookedMentor?.length || 0
                    }
                />

            </div>


            {/* MENTOR */}

            <MentorSection
                mentors={record.bookedMentor || []}
            />


            {/* STEPS */}

            <div className="p-6">

                <div className="flex items-center gap-2 mb-5">

                    <FaTasks className="text-blue-500" />

                    <h3 className="font-semibold text-gray-900">
                        Roadmap Steps
                    </h3>

                </div>


                <div className="space-y-4">

                    {steps.map((step, index) => {

                        const stepId =
                            step._id?.toString();

                        const completed =
                            record.completedSteps?.some(
                                (item) =>
                                    item.stepId?.toString() ===
                                    stepId
                            );

                        return (
                            <StepCard
                                key={stepId || index}
                                step={step}
                                index={index}
                                completed={completed}
                                completedTaskIds={
                                    record.completedTask || []
                                }
                                completedResourceIds={
                                    record.completedResources || []
                                }
                            />
                        );

                    })}

                </div>

            </div>


            {/* DATES */}

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex flex-col sm:flex-row sm:justify-between gap-2">

                <span>
                    Started:{" "}
                    {record.startedAt
                        ? new Date(
                              record.startedAt
                          ).toLocaleDateString()
                        : "N/A"}
                </span>

                <span>
                    Completed:{" "}
                    {record.completedAt
                        ? new Date(
                              record.completedAt
                          ).toLocaleDateString()
                        : "Not completed"}
                </span>

            </div>

        </div>
    );
};


// =========================================================
// PROGRESS BAR
// =========================================================

const ProgressBar = ({ label, value }) => {

    return (
        <div>

            <div className="flex justify-between mb-2">

                <span className="text-sm text-gray-600">
                    {label}
                </span>

                <span className="text-sm font-semibold text-gray-800">
                    {value}%
                </span>

            </div>

            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">

                <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{
                        width: `${value}%`,
                    }}
                />

            </div>

        </div>
    );
};


// =========================================================
// STAT
// =========================================================

const Stat = ({ icon, label, value }) => {

    return (
        <div className="p-5 border-r border-gray-200 last:border-r-0">

            <div className="flex items-center gap-2 text-gray-400">

                {icon}

                <span className="text-xs">
                    {label}
                </span>

            </div>

            <p className="text-lg font-bold text-gray-900 mt-2">
                {value}
            </p>

        </div>
    );
};


// =========================================================
// MENTOR
// =========================================================

const MentorSection = ({ mentors }) => {

    return (
        <div className="p-6 border-b border-gray-200">

            <div className="flex items-center gap-2 mb-4">

                <FaUserTie className="text-blue-500" />

                <h3 className="font-semibold text-gray-900">
                    Booked Mentor
                </h3>

            </div>


            {mentors.length === 0 ? (

                <p className="text-sm text-gray-500">
                    No mentor booked.
                </p>

            ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {mentors.map((mentor) => (

                        <div
                            key={mentor._id}
                            className="border border-gray-200 rounded-lg p-4"
                        >

                            <p className="font-semibold text-gray-900">
                                {mentor.user?.name ||
                                    "Mentor"}
                            </p>

                            <p className="text-sm text-gray-500">
                                {mentor.title ||
                                    "Mentor"}
                            </p>

                            {mentor.expertise?.length > 0 && (

                                <div className="flex flex-wrap gap-2 mt-3">

                                    {mentor.expertise.map(
                                        (item, index) => (

                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600"
                                            >
                                                {item}
                                            </span>

                                        )
                                    )}

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};


// =========================================================
// STEP CARD
// =========================================================

const StepCard = ({
    step,
    index,
    completed,
    completedTaskIds,
    completedResourceIds,
}) => {

    const isTaskCompleted = (taskId) => {

        return completedTaskIds.some(
            (item) =>
                (
                    typeof item === "string"
                        ? item
                        : item.taskId
                )?.toString() ===
                taskId?.toString()
        );

    };


    const isResourceCompleted = (resourceId) => {

        return completedResourceIds.some(
            (item) =>
                (
                    typeof item === "string"
                        ? item
                        : item.resourceId?._id ||
                          item.resourceId
                )?.toString() ===
                resourceId?.toString()
        );

    };


    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">

            {/* STEP HEADER */}

            <div className="p-4 bg-gray-50 flex items-start gap-3">

                <div
                    className={`
                        w-9 h-9
                        rounded-full
                        flex items-center justify-center
                        text-sm
                        font-bold
                        shrink-0
                        ${
                            completed
                                ? "bg-green-100 text-green-600"
                                : "bg-blue-100 text-blue-600"
                        }
                    `}
                >
                    {completed ? (
                        <FaCheckCircle />
                    ) : (
                        index + 1
                    )}
                </div>

                <div className="flex-1">

                    <h4 className="font-semibold text-gray-900">
                        {step.title}
                    </h4>

                    {step.description && (
                        <p className="text-sm text-gray-500 mt-1">
                            {step.description}
                        </p>
                    )}

                </div>

            </div>


            {/* TASKS */}

            {step.tasks?.length > 0 && (

                <div className="p-4 border-t border-gray-200">

                    <p className="text-xs font-semibold uppercase text-gray-500 mb-3">
                        Tasks
                    </p>

                    <div className="space-y-2">

                        {step.tasks.map((task) => {

                            const taskCompleted =
                                isTaskCompleted(
                                    task._id
                                );

                            return (
                                <div
                                    key={task._id}
                                    className="flex items-center gap-2 text-sm"
                                >

                                    {taskCompleted ? (

                                        <FaCheckCircle className="text-green-500 shrink-0" />

                                    ) : (

                                        <span className="w-4 h-4 border border-gray-300 rounded-full shrink-0" />

                                    )}

                                    <span
                                        className={
                                            taskCompleted
                                                ? "text-gray-400 line-through"
                                                : "text-gray-700"
                                        }
                                    >
                                        {task.title}
                                    </span>

                                </div>
                            );
                        })}

                    </div>

                </div>

            )}


            {/* RESOURCES */}

            {step.resources?.length > 0 && (

                <div className="p-4 border-t border-gray-200">

                    <p className="text-xs font-semibold uppercase text-gray-500 mb-3">
                        Learning Resources
                    </p>

                    <div className="space-y-3">

                        {step.resources.map(
                            (resource) => {

                                const resourceCompleted =
                                    isResourceCompleted(
                                        resource._id
                                    );

                                return (
                                    <div
                                        key={resource._id}
                                        className="flex items-start justify-between gap-4"
                                    >

                                        <div className="flex items-start gap-2">

                                            {resourceCompleted ? (

                                                <FaCheckCircle className="text-green-500 mt-1 shrink-0" />

                                            ) : (

                                                <FaBook className="text-gray-400 mt-1 shrink-0" />

                                            )}

                                            <div>

                                                <p
                                                    className={`text-sm font-medium ${
                                                        resourceCompleted
                                                            ? "text-gray-400"
                                                            : "text-gray-700"
                                                    }`}
                                                >
                                                    {resource.title}
                                                </p>

                                                {resource.type && (
                                                    <p className="text-xs text-gray-400">
                                                        {resource.type}
                                                    </p>
                                                )}

                                            </div>

                                        </div>


                                        {resource.url && (

                                            <a
                                                href={resource.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-500 hover:text-blue-700"
                                                title="Open resource"
                                            >
                                                <FaExternalLinkAlt
                                                    size={12}
                                                />
                                            </a>

                                        )}

                                    </div>
                                );
                            }
                        )}

                    </div>

                </div>

            )}

        </div>
    );
};

export default AdminLearnerDetails;