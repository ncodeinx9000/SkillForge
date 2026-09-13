import { useEffect, useState } from "react";
import { LuDot } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import { IoTimeOutline } from "react-icons/io5";
import api from "../../lib/axios";

function MentorOverview() {
    const [mentees, setMentees] = useState([]);
    const [sessions, setSessions] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOverviewData();
    }, []);

    const fetchOverviewData = async () => {
        try {
            setLoading(true);
            setError("");

            const [menteeResponse, sessionResponse] =
                await Promise.all([
                    api.get("/mentor/mentees"),
                    api.get("/session/mentor"),
                ]);

            if (menteeResponse.data.success) {
                setMentees(
                    menteeResponse.data.mentees || []
                );
            }

            if (sessionResponse.data.success) {
                setSessions(
                    sessionResponse.data.sessions || []
                );
            }
        } catch (error) {
            console.error(
                "Failed to load mentor overview:",
                error
            );

            setError(
                error.response?.data?.message ||
                    "Failed to load overview."
            );
        } finally {
            setLoading(false);
        }
    };

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

    const isToday = (date) => {
        const sessionDate = new Date(date);
        const today = new Date();

        return (
            sessionDate.getDate() === today.getDate() &&
            sessionDate.getMonth() === today.getMonth() &&
            sessionDate.getFullYear() === today.getFullYear()
        );
    };

    const todaySessions = sessions
        .filter(
            (session) =>
                session.status === "confirmed" &&
                isToday(session.date)
        )
        .sort(
            (a, b) =>
                new Date(a.date) -
                new Date(b.date)
        );

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };

    if (loading) {
        return (
            <div className="mt-4 bg-white rounded-2xl p-8 text-center">
                <p className="text-[12px] text-gray-500 font-DM-Sans">
                    Loading overview...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-4 bg-white rounded-2xl p-8 text-center">
                <p className="text-[12px] text-red-500 font-DM-Sans">
                    {error}
                </p>

                <button
                    onClick={fetchOverviewData}
                    className="mt-3 bg-[#1e3a1e] text-white px-4 py-2 rounded-xl text-[11px] font-semibold"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-4 mt-4">

            {/* Mentee Progress */}
            <div className="w-full lg:w-[50%] bg-white px-7 py-4 rounded-2xl">

                <div className="flex items-center justify-between mb-3">

                    <h4 className="font-Outfit font-bold text-[18px]">
                        Mentee Progress
                    </h4>

                    <span className="text-[10px] text-gray-500 font-DM-Sans">
                        {mentees.length} active
                    </span>

                </div>

                {mentees.length === 0 ? (
                    <div className="py-8 text-center">
                        <p className="text-[12px] text-gray-500 font-DM-Sans">
                            No active mentees yet.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-5">

                        {mentees.slice(0, 5).map((mentee) => {

                            const learnerName =
                                mentee.learner?.name ||
                                "Learner";

                            const progress =
                                mentee.roadmapProgress || 0;

                            const status =
                                getProgressStatus(progress);

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
                                        mentee.learner?._id
                                    }
                                    className="flex gap-3 w-full"
                                >

                                    {/* Avatar */}
                                    {mentee.learner
                                        ?.profilePicture ? (
                                        <img
                                            src={
                                                mentee
                                                    .learner
                                                    .profilePicture
                                            }
                                            alt={
                                                learnerName
                                            }
                                            className="w-9 h-9 object-cover rounded-xl"
                                        />
                                    ) : (
                                        <div className="w-9 h-9 flex-shrink-0 bg-[#e8e4da] text-[#1e3a1e] flex items-center justify-center rounded-xl text-xs font-bold">
                                            {firstLetter}
                                        </div>
                                    )}

                                    <div className="w-full">

                                        <div className="flex justify-between mb-1.5">

                                            <p className="text-[13px]">
                                                {learnerName}
                                            </p>

                                            <div
                                                className={`text-[10px] font-DM-Sans font-semibold px-2 py-0.5 rounded-2xl ${status.className}`}
                                            >
                                                {status.label}
                                            </div>

                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">

                                            <div
                                                className="h-full bg-[#1e3a1e] rounded-full"
                                                style={{
                                                    width: `${progress}%`,
                                                }}
                                            />

                                        </div>

                                        <div className="flex items-center text-[11px] text-gray-600 mt-1">

                                            <p>
                                                {progress}%
                                            </p>

                                            <LuDot />

                                            <p>
                                                {roadmap}
                                            </p>

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                )}

            </div>


            {/* Today's Sessions */}
            <div className="bg-white w-full lg:w-[50%] px-7 py-4 rounded-2xl">

                <div className="flex items-center justify-between mb-3">

                    <h4 className="font-Outfit font-bold text-[18px]">
                        Today's Sessions
                    </h4>

                    <span className="text-[10px] text-gray-500 font-DM-Sans">
                        {todaySessions.length} today
                    </span>

                </div>

                {todaySessions.length === 0 ? (
                    <div className="py-8 text-center">
                        <p className="text-[12px] text-gray-500 font-DM-Sans">
                            No confirmed sessions today.
                        </p>
                    </div>
                ) : (
                    <div>

                        {todaySessions.map((session) => {

                            const learnerName =
                                session.learner?.name ||
                                "Learner";

                            return (
                                <div
                                    key={session._id}
                                    className="flex gap-3 w-full mb-5 pb-3 border-b border-gray-300 last:border-b-0 last:mb-0"
                                >

                                    {/* Avatar */}
                                    {session.learner
                                        ?.profilePicture ? (
                                        <img
                                            src={
                                                session
                                                    .learner
                                                    .profilePicture
                                            }
                                            alt={
                                                learnerName
                                            }
                                            className="w-9 h-9 object-cover rounded-xl"
                                        />
                                    ) : (
                                        <div className="w-9 h-9 flex-shrink-0 bg-[#e8e4da] text-[#1e3a1e] flex items-center justify-center rounded-xl text-xs font-bold">
                                            {learnerName
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                    )}

                                    <div className="w-full">

                                        <div className="flex justify-between mb-1.5">

                                            <p className="text-[13px]">
                                                {learnerName}
                                            </p>

                                            <div className="flex items-center gap-1 text-[11px] font-DM-Sans font-semibold">
                                                <IoTimeOutline />
                                                {formatTime(
                                                    session.date
                                                )}
                                            </div>

                                        </div>

                                        <div className="flex items-center justify-between text-[11px] text-gray-600">

                                            <div className="flex items-center gap-1">
                                                <LuCalendarDays />

                                                <p>
                                                    {
                                                        session.title
                                                    }
                                                </p>
                                            </div>

                                            {session.meetingLink && (
                                                <a
                                                    href={
                                                        session.meetingLink
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-[#c4622a] font-semibold"
                                                >
                                                    Join
                                                </a>
                                            )}

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                )}

            </div>

        </div>
    );
}

export default MentorOverview;