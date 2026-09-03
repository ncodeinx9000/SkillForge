import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminBusinessIdeas = () => {
    const navigate = useNavigate();

    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL;

    // =========================
    // GET ALL BUSINESS IDEAS
    // =========================
    const fetchBusinessIdeas = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/admin/business-ideas/all`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (data.success) {
                setIdeas(data.businessIdeas || []);
            } else {
                console.error(data.message);
                alert(data.message);
            }

        } catch (error) {
            console.error(
                "Error fetching business ideas:",
                error
            );

            alert("Failed to load business ideas.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBusinessIdeas();
    }, []);

    // =========================
    // PUBLISH / UNPUBLISH / ARCHIVE
    // =========================
    const updateStatus = async (ideaId, status) => {
        try {
            setActionLoading(ideaId);

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
                `${API_URL}/api/admin/business-ideas/${ideaId}/${endpoint}`,
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

            setIdeas((prevIdeas) =>
                prevIdeas.map((idea) =>
                    idea._id === ideaId
                        ? {
                              ...idea,
                              status: data.businessIdea.status,
                              isPublished:
                                  data.businessIdea.status ===
                                  "published",
                          }
                        : idea
                )
            );

        } catch (error) {
            console.error(
                "Error updating business idea:",
                error
            );

            alert("Failed to update business idea.");
        } finally {
            setActionLoading(null);
        }
    };

    // =========================
    // DELETE BUSINESS IDEA
    // =========================
    const deleteBusinessIdea = async (ideaId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this business idea?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setActionLoading(ideaId);

            const response = await fetch(
                `${API_URL}/api/admin/business-ideas/${ideaId}`,
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

            setIdeas((prevIdeas) =>
                prevIdeas.filter(
                    (idea) => idea._id !== ideaId
                )
            );

        } catch (error) {
            console.error(
                "Error deleting business idea:",
                error
            );

            alert("Failed to delete business idea.");
        } finally {
            setActionLoading(null);
        }
    };

    
    // =========================
    // LOADING
    // =========================
    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">
                    Loading business ideas...
                </p>
            </div>
        );
    }

    // =========================
    // STATS
    // =========================
    const totalIdeas = ideas.length;

    const publishedIdeas = ideas.filter(
        (idea) => idea.status === "published"
    ).length;

    const draftIdeas = ideas.filter(
        (idea) => idea.status === "draft"
    ).length;

    const archivedIdeas = ideas.filter(
        (idea) => idea.status === "archived"
    ).length;

    // =========================
    // UI
    // =========================
    return (
        <div>

            {/* ================= HEADER ================= */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Business Ideas
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage the business ideas available
                        to learners.
                    </p>
                </div>

                <button
                    onClick={() =>
                        navigate(
                            "/admin/business-ideas/create"
                        )
                    }
                    className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                    + Create Business Idea
                </button>

            </div>

            {/* ================= STATS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                {/* Total */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <p className="text-sm text-gray-500">
                        Total Ideas
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-2">
                        {totalIdeas}
                    </h2>
                </div>

                {/* Published */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <p className="text-sm text-gray-500">
                        Published
                    </p>

                    <h2 className="text-2xl font-bold text-green-600 mt-2">
                        {publishedIdeas}
                    </h2>
                </div>

                {/* Draft */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <p className="text-sm text-gray-500">
                        Draft
                    </p>

                    <h2 className="text-2xl font-bold text-yellow-600 mt-2">
                        {draftIdeas}
                    </h2>
                </div>

                {/* Archived */}
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <p className="text-sm text-gray-500">
                        Archived
                    </p>

                    <h2 className="text-2xl font-bold text-gray-500 mt-2">
                        {archivedIdeas}
                    </h2>
                </div>

            </div>

            {/* ================= TABLE ================= */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

                {/* Table Header */}
                <div className="px-6 py-4 border-b border-gray-200">

                    <h2 className="font-semibold text-gray-800">
                        All Business Ideas
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Create, publish, archive or remove
                        business ideas.
                    </p>

                </div>

                {/* Empty */}
                {ideas.length === 0 ? (

                    <div className="p-10 text-center">

                        <p className="text-gray-500">
                            No business ideas found.
                        </p>

                        <button
                            onClick={() =>
                                navigate(
                                    "/admin/business-ideas/create"
                                )
                            }
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                        >
                            Create First Idea
                        </button>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            {/* ================= THEAD ================= */}
                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Business Idea
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Category
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Difficulty
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Investment
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

                                {ideas.map((idea) => (

                                    <tr
                                        key={idea._id}
                                        className="hover:bg-gray-50"
                                    >

                                        {/* Business Idea */}
                                        <td className="px-6 py-4">

                                            <div className="max-w-xs">

                                                <p className="font-medium text-gray-800">
                                                    {idea.title}
                                                </p>

                                                <p className="text-sm text-gray-500 truncate mt-1">
                                                    {idea.description}
                                                </p>

                                            </div>

                                        </td>

                                        {/* Category */}
                                        <td className="px-6 py-4">

                                            <div className="flex flex-wrap gap-1">

                                                {idea.category?.map(
                                                    (
                                                        category,
                                                        index
                                                    ) => (

                                                        <span
                                                            key={
                                                                index
                                                            }
                                                            className="px-2 py-1 text-xs bg-indigo-50 text-indigo-600 rounded"
                                                        >
                                                            {
                                                                category
                                                            }
                                                        </span>

                                                    )
                                                )}

                                            </div>

                                        </td>

                                        {/* Difficulty */}
                                        <td className="px-6 py-4">

                                            <span className="text-sm text-gray-600">
                                                {
                                                    idea.difficulty
                                                }
                                            </span>

                                        </td>

                                        {/* Investment */}
                                        <td className="px-6 py-4">

                                            <span className="text-sm text-gray-600">

                                                ₹
                                                {idea.investment?.min?.toLocaleString(
                                                    "en-IN"
                                                )}

                                                {" - "}

                                                ₹
                                                {idea.investment?.max?.toLocaleString(
                                                    "en-IN"
                                                )}

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
                                                        idea.status ===
                                                        "published"
                                                            ? "bg-green-100 text-green-700"
                                                            : idea.status ===
                                                              "archived"
                                                            ? "bg-gray-100 text-gray-600"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }
                                                `}
                                            >
                                                {idea.status}
                                            </span>

                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4">

                                            <div className="flex justify-end gap-2 flex-wrap">

                                                {/* View/Edit */}
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/admin/business-ideas/${idea._id}`
                                                        )
                                                    }
                                                    className="px-3 py-2 text-xs font-medium border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50"
                                                >
                                                    View
                                                </button>

                                                {/* Publish */}
                                                {idea.status !==
                                                    "published" &&
                                                    idea.status !==
                                                        "archived" && (

                                                        <button
                                                            disabled={
                                                                actionLoading ===
                                                                idea._id
                                                            }
                                                            onClick={() =>
                                                                updateStatus(
                                                                    idea._id,
                                                                    "published"
                                                                )
                                                            }
                                                            className="px-3 py-2 text-xs font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                                                        >
                                                            Publish
                                                        </button>

                                                    )}

                                                {/* Unpublish */}
                                                {idea.status ===
                                                    "published" && (

                                                    <button
                                                        disabled={
                                                            actionLoading ===
                                                            idea._id
                                                        }
                                                        onClick={() =>
                                                            updateStatus(
                                                                idea._id,
                                                                "draft"
                                                            )
                                                        }
                                                        className="px-3 py-2 text-xs font-medium bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50"
                                                    >
                                                        Unpublish
                                                    </button>

                                                )}

                                                {/* Archive */}
                                                {idea.status !==
                                                    "archived" && (

                                                    <button
                                                        disabled={
                                                            actionLoading ===
                                                            idea._id
                                                        }
                                                        onClick={() => {

                                                            const confirmed =
                                                                window.confirm(
                                                                    "Are you sure you want to archive this business idea?"
                                                                );

                                                            if (
                                                                confirmed
                                                            ) {
                                                                updateStatus(
                                                                    idea._id,
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
                                                        idea._id
                                                    }
                                                    onClick={() =>
                                                        deleteBusinessIdea(
                                                            idea._id
                                                        )
                                                    }
                                                    className="px-3 py-2 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-50"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
};

export default AdminBusinessIdeas;