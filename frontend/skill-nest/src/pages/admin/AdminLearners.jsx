import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaUsers,
    FaSearch,
    FaEye,
    FaRoad,
    FaUserTie,
    FaCheckCircle,
    FaClock,
} from "react-icons/fa";

const AdminLearners = () => {
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const [learners, setLearners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // =====================================================
    // FETCH LEARNERS
    // =====================================================

    const fetchLearners = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/admin/users/learners`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!data.success) {
                alert(data.message || "Failed to load learners.");
                return;
            }

            setLearners(data.learners || []);

        } catch (error) {
            console.error("Get learners error:", error);
            alert("Failed to load learners.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLearners();
    }, []);

    // =====================================================
    // SEARCH
    // =====================================================

    const filteredLearners = learners.filter((item) => {
        const learnerName =
            item.learner?.name?.toLowerCase() || "";

        const learnerEmail =
            item.learner?.email?.toLowerCase() || "";

        const businessIdea =
            item.businessIdea?.title?.toLowerCase() || "";

        const searchText = search.toLowerCase();

        return (
            learnerName.includes(searchText) ||
            learnerEmail.includes(searchText) ||
            businessIdea.includes(searchText)
        );
    });

    // =====================================================
    // HELPERS
    // =====================================================

    const getMentorName = (bookedMentor) => {
        if (!bookedMentor || bookedMentor.length === 0) {
            return "Not assigned";
        }

        return (
            bookedMentor[0]?.user?.name ||
            "Mentor assigned"
        );
    };

    const getProgress = (value) => {
        return Math.min(Math.max(Number(value) || 0, 0), 100);
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

                    <p className="mt-4 text-gray-500">
                        Loading learners...
                    </p>
                </div>
            </div>
        );
    }

    // =====================================================
    // UI
    // =====================================================

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

            {/* HEADER */}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                <div>
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                            <FaUsers size={20} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Learners
                            </h1>

                            <p className="text-sm text-gray-500">
                                Track learners and their roadmap progress
                            </p>
                        </div>
                    </div>
                </div>

                {/* TOTAL */}

                <div className="bg-white border border-gray-200 rounded-xl px-5 py-3">
                    <p className="text-xs text-gray-500">
                        Total Learners
                    </p>

                    <p className="text-2xl font-bold text-gray-900">
                        {learners.length}
                    </p>
                </div>

            </div>


            {/* SEARCH */}

            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">

                <div className="relative max-w-md">

                    <FaSearch
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={14}
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search learner or business idea..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

            </div>


            {/* TABLE */}

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

                {filteredLearners.length === 0 ? (

                    <div className="py-16 text-center">

                        <FaUsers
                            size={35}
                            className="mx-auto text-gray-300"
                        />

                        <h3 className="mt-4 font-semibold text-gray-700">
                            No learners found
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            No learner matches your search.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full min-w-[950px]">

                            <thead className="bg-gray-50 border-b border-gray-200">

                                <tr>

                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                                        Learner
                                    </th>

                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                                        Business Idea
                                    </th>

                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                                        Roadmap
                                    </th>

                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                                        Progress
                                    </th>

                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                                        Mentor
                                    </th>

                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                                        Status
                                    </th>

                                    <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody className="divide-y divide-gray-100">

                                {filteredLearners.map((item) => {

                                    const progress =
                                        getProgress(
                                            item.roadmapProgress
                                        );

                                    return (
                                        <tr
                                            key={item.progressId}
                                            className="hover:bg-gray-50 transition"
                                        >

                                            {/* LEARNER */}

                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-3">

                                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                                                        {item.learner?.name
                                                            ?.charAt(0)
                                                            ?.toUpperCase() || "L"}
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold text-gray-900">
                                                            {item.learner?.name ||
                                                                "Unknown"}
                                                        </p>

                                                        <p className="text-xs text-gray-500">
                                                            {item.learner?.email ||
                                                                "No email"}
                                                        </p>
                                                    </div>

                                                </div>

                                            </td>


                                            {/* BUSINESS IDEA */}

                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-2">

                                                    <FaRoad
                                                        className="text-blue-500"
                                                        size={14}
                                                    />

                                                    <span className="font-medium text-gray-800">
                                                        {item.businessIdea?.title ||
                                                            "Not assigned"}
                                                    </span>

                                                </div>

                                            </td>


                                            {/* ROADMAP */}

                                            <td className="px-6 py-5">

                                                <p className="text-sm text-gray-700">
                                                    {item.roadmap?.title ||
                                                        "Not assigned"}
                                                </p>

                                                {item.roadmap?.level && (
                                                    <span className="text-xs text-gray-400">
                                                        {item.roadmap.level}
                                                    </span>
                                                )}

                                            </td>


                                            {/* PROGRESS */}

                                            <td className="px-6 py-5 min-w-[180px]">

                                                <div className="flex items-center justify-between mb-1">

                                                    <span className="text-xs font-medium text-gray-600">
                                                        Roadmap
                                                    </span>

                                                    <span className="text-xs font-bold text-gray-800">
                                                        {progress}%
                                                    </span>

                                                </div>

                                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">

                                                    <div
                                                        className="h-full bg-blue-500 rounded-full transition-all"
                                                        style={{
                                                            width: `${progress}%`,
                                                        }}
                                                    />

                                                </div>

                                            </td>


                                            {/* MENTOR */}

                                            <td className="px-6 py-5">

                                                <div className="flex items-center gap-2 text-sm">

                                                    <FaUserTie
                                                        className="text-gray-400"
                                                        size={14}
                                                    />

                                                    <span className="text-gray-700">
                                                        {getMentorName(
                                                            item.bookedMentor
                                                        )}
                                                    </span>

                                                </div>

                                            </td>


                                            {/* STATUS */}

                                            <td className="px-6 py-5">

                                                {item.status === "Completed" ? (

                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">

                                                        <FaCheckCircle size={11} />

                                                        Completed

                                                    </span>

                                                ) : (

                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">

                                                        <FaClock size={11} />

                                                        Active

                                                    </span>

                                                )}

                                            </td>


                                            {/* ACTION */}

                                            <td className="px-6 py-5 text-right">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        navigate(
                                                            `/admin/learners/${item.learner?._id}`
                                                        )
                                                    }
                                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 text-sm font-medium transition"
                                                >

                                                    <FaEye size={13} />

                                                    View

                                                </button>

                                            </td>

                                        </tr>
                                    );
                                })}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
};

export default AdminLearners;