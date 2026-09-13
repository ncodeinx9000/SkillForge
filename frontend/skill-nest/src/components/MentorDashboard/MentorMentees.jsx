import { useEffect, useState } from "react";
import { LuDot } from "react-icons/lu";
import { BiComment } from "react-icons/bi";
import api from "../../lib/axios";

function MentorMentees() {
    const [mentees, setMentees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchMentees = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/mentor/mentees");

            if (response.data.success) {
                setMentees(response.data.mentees || []);
            }
        } catch (error) {
            console.error(
                "Failed to fetch mentees:",
                error
            );

            setError(
                error.response?.data?.message ||
                    "Failed to load mentees."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMentees();
    }, []);

    const getProgressStatus = (progress) => {
        if (progress >= 75) {
            return {
                label: "On Track",
                className:
                    "bg-green-100 text-green-700",
            };
        }

        if (progress >= 40) {
            return {
                label: "On Track",
                className:
                    "bg-blue-100 text-blue-600",
            };
        }

        return {
            label: "Needs Help",
            className:
                "bg-red-100 text-red-600",
        };
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl p-6 mt-4">
                <h4 className="text-[14px] font-Outfit font-bold border-b py-4 px-3 mb-3">
                    My Mentees
                </h4>

                <p className="text-[12px] text-gray-500 font-DM-Sans text-center py-6">
                    Loading mentees...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-2xl p-6 mt-4">
                <h4 className="text-[14px] font-Outfit font-bold border-b py-4 px-3 mb-3">
                    My Mentees
                </h4>

                <p className="text-[12px] text-red-500 font-DM-Sans text-center py-6">
                    {error}
                </p>

                <button
                    onClick={fetchMentees}
                    className="block mx-auto bg-[#1e3a1e] text-white px-4 py-2 rounded-xl text-[11px] font-semibold"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl mt-4">

            <h4 className="text-[14px] font-Outfit font-bold border-b py-4 px-6">
                My Mentees
            </h4>

            {mentees.length === 0 ? (
                <div className="px-6 py-10 text-center">
                    <p className="text-[12px] text-gray-500 font-DM-Sans">
                        You don't have any active mentees yet.
                    </p>

                    <p className="text-[10px] text-gray-400 mt-1">
                        Learners who book a session with you
                        will appear here.
                    </p>
                </div>
            ) : (
                <div className="divide-y divide-gray-100">

                    {mentees.map((mentee) => {
                        const learner =
                            mentee.learner;

                        const progress =
                            mentee.roadmapProgress || 0;

                        const status =
                            getProgressStatus(progress);

                        const learnerName =
                            learner?.name ||
                            "Learner";

                        const businessIdea =
                            mentee.businessIdea?.title ||
                            "Business Idea";

                        const roadmap =
                            mentee.roadmap?.title ||
                            "Roadmap";

                        const firstLetter =
                            learnerName
                                .charAt(0)
                                .toUpperCase();

                        return (
                            <div
                                key={
                                    learner?._id ||
                                    `${businessIdea}-${mentee.startedAt}`
                                }
                                className="flex gap-3 w-full px-6 py-5"
                            >

                                {/* Avatar */}
                                {learner?.profilePicture ? (
                                    <img
                                        src={
                                            learner.profilePicture
                                        }
                                        alt={learnerName}
                                        className="w-10 h-10 object-cover rounded-xl"
                                    />
                                ) : (
                                    <div className="w-10 h-10 flex-shrink-0 bg-[#e8e4da] text-[#1e3a1e] flex items-center justify-center rounded-xl font-bold text-sm">
                                        {firstLetter}
                                    </div>
                                )}

                                <div className="w-full">

                                    {/* Name + Status */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1.5">

                                        <p className="text-[13px] font-semibold">
                                            {learnerName}
                                        </p>

                                        <div
                                            className={`self-start text-[10px] font-DM-Sans font-semibold px-2 py-0.5 rounded-2xl ${status.className}`}
                                        >
                                            {status.label}
                                        </div>

                                    </div>

                                    {/* Business + Roadmap */}
                                    <div className="flex flex-wrap items-center text-[11px] text-gray-600">

                                        <p>
                                            {businessIdea}
                                        </p>

                                        <LuDot />

                                        <p>
                                            {roadmap}
                                        </p>

                                    </div>

                                    {/* Progress */}
                                    <div className="mt-3">

                                        <div className="flex justify-between mb-1">

                                            <p className="text-[10px] text-gray-500">
                                                Roadmap Progress
                                            </p>

                                            <p className="text-[10px] font-semibold">
                                                {progress}%
                                            </p>

                                        </div>

                                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">

                                            <div
                                                className="h-full bg-[#1e3a1e] rounded-full"
                                                style={{
                                                    width: `${progress}%`,
                                                }}
                                            />

                                        </div>

                                    </div>

                                    {/* Bottom Info */}
                                    <div className="flex items-center justify-between mt-3">

                                        <div className="flex items-center gap-3 text-[10px] text-gray-500">

                                            <p>
                                                Steps:{" "}
                                                <span className="font-semibold text-gray-700">
                                                    {
                                                        mentee.completedSteps
                                                    }
                                                </span>
                                            </p>

                                            <p>
                                                Tasks:{" "}
                                                <span className="font-semibold text-gray-700">
                                                    {
                                                        mentee.completedTasks
                                                    }
                                                </span>
                                            </p>

                                        </div>

                                        <button
                                            type="button"
                                            className="text-gray-500 border px-2 py-1.5 rounded-lg hover:bg-gray-100 transition"
                                            title="Message learner"
                                        >
                                            <BiComment />
                                        </button>

                                    </div>

                                </div>
                            </div>
                        );
                    })}

                </div>
            )}

        </div>
    );
}

export default MentorMentees;