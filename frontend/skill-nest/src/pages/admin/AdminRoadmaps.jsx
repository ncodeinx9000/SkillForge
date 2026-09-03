import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminRoadmaps = () => {
    const navigate = useNavigate();

    const [roadmaps, setRoadmaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL;

    // ==========================================
    // GET ALL ROADMAPS
    // ==========================================

    const fetchRoadmaps = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/admin/roadmaps`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (data.success) {
                setRoadmaps(data.roadmaps || []);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error fetching roadmaps:", error);
            alert("Failed to load roadmaps.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoadmaps();
    }, []);

    // ==========================================
    // UPDATE ROADMAP STATUS
    // ==========================================

    const updateStatus = async (roadmapId, status) => {
        try {
            setActionLoading(roadmapId);

            let endpoint = "";

            if (status === "published") {
                endpoint = "publish";
            } else if (status === "draft") {
                endpoint = "unpublish";
            } else if (status === "archived") {
                endpoint = "archive";
            }

            if (!endpoint) {
                return;
            }

            const response = await fetch(
                `${API_URL}/api/admin/roadmaps/${roadmapId}/${endpoint}`,
                {
                    method: "PATCH",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!data.success) {
                alert(data.message);
                return;
            }

            setRoadmaps((prevRoadmaps) =>
                prevRoadmaps.map((roadmap) =>
                    roadmap._id === roadmapId
                        ? {
                              ...roadmap,
                              status: data.roadmap.status,
                          }
                        : roadmap
                )
            );
        } catch (error) {
            console.error(
                "Error updating roadmap:",
                error
            );

            alert("Failed to update roadmap.");
        } finally {
            setActionLoading(null);
        }
    };

    // ==========================================
    // DELETE ROADMAP
    // ==========================================

    const deleteRoadmap = async (roadmapId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this roadmap?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setActionLoading(roadmapId);

            const response = await fetch(
                `${API_URL}/api/admin/roadmaps/${roadmapId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!data.success) {
                alert(data.message);
                return;
            }

            setRoadmaps((prevRoadmaps) =>
                prevRoadmaps.filter(
                    (roadmap) =>
                        roadmap._id !== roadmapId
                )
            );
        } catch (error) {
            console.error(
                "Error deleting roadmap:",
                error
            );

            alert("Failed to delete roadmap.");
        } finally {
            setActionLoading(null);
        }
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">
                    Loading roadmaps...
                </p>
            </div>
        );
    }

    // ==========================================
    // STATS
    // ==========================================

    const totalRoadmaps = roadmaps.length;

    const publishedRoadmaps = roadmaps.filter(
        (roadmap) =>
            roadmap.status === "published"
    ).length;

    const draftRoadmaps = roadmaps.filter(
        (roadmap) =>
            roadmap.status === "draft"
    ).length;

    const archivedRoadmaps = roadmaps.filter(
        (roadmap) =>
            roadmap.status === "archived"
    ).length;

    // ==========================================
    // UI
    // ==========================================

    return (
        <div>

            {/* ================= HEADER ================= */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Roadmaps
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage learning roadmaps
                        available to learners.
                    </p>
                </div>

                <button
                    onClick={() =>
                        navigate(
                            "/admin/roadmaps/create"
                        )
                    }
                    className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                    + Create Roadmap
                </button>

            </div>


            {/* ================= STATS ================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                {/* Total */}

                <div className="bg-white border border-gray-200 rounded-xl p-5">

                    <p className="text-sm text-gray-500">
                        Total Roadmaps
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-2">
                        {totalRoadmaps}
                    </h2>

                </div>


                {/* Published */}

                <div className="bg-white border border-gray-200 rounded-xl p-5">

                    <p className="text-sm text-gray-500">
                        Published
                    </p>

                    <h2 className="text-2xl font-bold text-green-600 mt-2">
                        {publishedRoadmaps}
                    </h2>

                </div>


                {/* Draft */}

                <div className="bg-white border border-gray-200 rounded-xl p-5">

                    <p className="text-sm text-gray-500">
                        Draft
                    </p>

                    <h2 className="text-2xl font-bold text-yellow-600 mt-2">
                        {draftRoadmaps}
                    </h2>

                </div>


                {/* Archived */}

                <div className="bg-white border border-gray-200 rounded-xl p-5">

                    <p className="text-sm text-gray-500">
                        Archived
                    </p>

                    <h2 className="text-2xl font-bold text-gray-500 mt-2">
                        {archivedRoadmaps}
                    </h2>

                </div>

            </div>


            {/* ================= TABLE ================= */}

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

                {/* Table Header */}

                <div className="px-6 py-4 border-b border-gray-200">

                    <h2 className="font-semibold text-gray-800">
                        All Roadmaps
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Create, publish, archive or
                        remove roadmaps.
                    </p>

                </div>


                {/* Empty */}

                {roadmaps.length === 0 ? (

                    <div className="p-10 text-center">

                        <p className="text-gray-500">
                            No roadmaps found.
                        </p>

                        <button
                            onClick={() =>
                                navigate(
                                    "/admin/roadmaps/create"
                                )
                            }
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                        >
                            Create First Roadmap
                        </button>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            {/* ================= THEAD ================= */}

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Roadmap
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Business Idea
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Level
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Duration
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Steps
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Status
                                    </th>

                                    <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            {/* ================= TBODY ================= */}

                            <tbody className="divide-y divide-gray-100">

                                {roadmaps.map(
                                    (roadmap) => (

                                        <tr
                                            key={
                                                roadmap._id
                                            }
                                            className="hover:bg-gray-50"
                                        >

                                            {/* Roadmap */}

                                            <td className="px-6 py-4">

                                                <div className="max-w-xs">

                                                    <p className="font-medium text-gray-800">
                                                        {
                                                            roadmap.title
                                                        }
                                                    </p>

                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {
                                                            roadmap.category
                                                        }
                                                    </p>

                                                </div>

                                            </td>


                                            {/* Business Idea */}

                                            <td className="px-6 py-4">

                                                <span className="text-sm text-gray-600">

                                                    {roadmap.businessIdea
                                                        ?.title ||
                                                        "Not linked"}

                                                </span>

                                            </td>


                                            {/* Level */}

                                            <td className="px-6 py-4">

                                                <span className="text-sm text-gray-600">

                                                    {
                                                        roadmap.level
                                                    }

                                                </span>

                                            </td>


                                            {/* Duration */}

                                            <td className="px-6 py-4">

                                                <span className="text-sm text-gray-600">

                                                    {
                                                        roadmap.estimatedDuration ||
                                                        "-"
                                                    }

                                                </span>

                                            </td>


                                            {/* Steps */}

                                            <td className="px-6 py-4">

                                                <span className="text-sm text-gray-600">

                                                    {
                                                        roadmap.steps
                                                            ?.length ||
                                                        0
                                                    }

                                                </span>

                                            </td>


                                            {/* Status */}

                                            <td className="px-6 py-4">

                                                <span
                                                    className={`
                                                        px-3 py-1
                                                        rounded-full
                                                        text-xs
                                                        font-medium
                                                        ${
                                                            roadmap.status ===
                                                            "published"
                                                                ? "bg-green-100 text-green-700"
                                                                : roadmap.status ===
                                                                  "archived"
                                                                ? "bg-gray-100 text-gray-600"
                                                                : "bg-yellow-100 text-yellow-700"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        roadmap.status
                                                    }
                                                </span>

                                            </td>


                                            {/* Actions */}

                                            <td className="px-6 py-4">

                                                <div className="flex justify-end gap-2 flex-wrap">

                                                    {/* View / Edit */}

                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/roadmaps/${roadmap._id}`
                                                            )
                                                        }
                                                        className="px-3 py-2 text-xs font-medium border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50"
                                                    >
                                                        View
                                                    </button>


                                                    {/* Publish */}

                                                    {roadmap.status !==
                                                        "published" &&
                                                        roadmap.status !==
                                                            "archived" && (

                                                            <button
                                                                disabled={
                                                                    actionLoading ===
                                                                    roadmap._id
                                                                }
                                                                onClick={() =>
                                                                    updateStatus(
                                                                        roadmap._id,
                                                                        "published"
                                                                    )
                                                                }
                                                                className="px-3 py-2 text-xs font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                                                            >
                                                                Publish
                                                            </button>

                                                        )}


                                                    {/* Unpublish */}

                                                    {roadmap.status ===
                                                        "published" && (

                                                        <button
                                                            disabled={
                                                                actionLoading ===
                                                                roadmap._id
                                                            }
                                                            onClick={() =>
                                                                updateStatus(
                                                                    roadmap._id,
                                                                    "draft"
                                                                )
                                                            }
                                                            className="px-3 py-2 text-xs font-medium bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50"
                                                        >
                                                            Unpublish
                                                        </button>

                                                    )}


                                                    {/* Archive */}

                                                    {roadmap.status !==
                                                        "archived" && (

                                                        <button
                                                            disabled={
                                                                actionLoading ===
                                                                roadmap._id
                                                            }
                                                            onClick={() => {

                                                                const confirmed =
                                                                    window.confirm(
                                                                        "Are you sure you want to archive this roadmap?"
                                                                    );

                                                                if (
                                                                    confirmed
                                                                ) {
                                                                    updateStatus(
                                                                        roadmap._id,
                                                                        "archived"
                                                                    );
                                                                }

                                                            }}
                                                            className="px-3 py-2 text-xs font-medium bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                                                        >
                                                            Archive
                                                        </button>

                                                    )}


                                                    {/* Delete */}

                                                    <button
                                                        disabled={
                                                            actionLoading ===
                                                            roadmap._id
                                                        }
                                                        onClick={() =>
                                                            deleteRoadmap(
                                                                roadmap._id
                                                            )
                                                        }
                                                        className="px-3 py-2 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-50"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
};

export default AdminRoadmaps;