import React, { useEffect, useState } from "react";

const AdminResources = () => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [resources, setResources] = useState([]);
    const [loadingResources, setLoadingResources] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [statusFilter, setStatusFilter] = useState("all");

    // =========================
    // GET ALL RESOURCES
    // =========================

    const fetchResources = async () => {
        try {
            setLoadingResources(true);

            let url = `${API_URL}/api/admin/resources`;

            // Apply status filter only when selected
            if (statusFilter !== "all") {
                url += `?status=${statusFilter}`;
            }

            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();

            if (data.success) {
                setResources(data.resources || []);
            } else {
                alert(data.message || "Failed to load resources");
            }
        } catch (error) {
            console.error("Error fetching resources:", error);
            alert("Failed to load resources");
        } finally {
            setLoadingResources(false);
        }
    };

    useEffect(() => {
        fetchResources();
    }, [statusFilter]);

    // =========================
    // APPROVE / REJECT
    // =========================

    const updateStatus = async (resourceId, status) => {
        try {
            setActionLoading(resourceId);

            const response = await fetch(
                `${API_URL}/api/admin/resources/${resourceId}/${status}`,
                {
                    method: "PATCH",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!data.success) {
                alert(data.message || "Failed to update resource");
                return;
            }

            // Refresh resources after update
            await fetchResources();
        } catch (error) {
            console.error("Error updating resource:", error);
            alert("Failed to update resource.");
        } finally {
            setActionLoading(null);
        }
    };

    // =========================
    // PUBLISH / UNPUBLISH
    // =========================

    const updatePublishStatus = async (resourceId, action) => {
        try {
            setActionLoading(resourceId);

            const response = await fetch(
                `${API_URL}/api/admin/resources/${resourceId}/${action}`,
                {
                    method: "PATCH",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!data.success) {
                alert(data.message || "Failed to update publish status");
                return;
            }

            await fetchResources();
        } catch (error) {
            console.error(
                "Error updating publish status:",
                error
            );

            alert("Failed to update resource.");
        } finally {
            setActionLoading(null);
        }
    };

    // =========================
    // DELETE
    // =========================

    const deleteResource = async (resourceId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this resource?"
        );

        if (!confirmed) return;

        try {
            setActionLoading(resourceId);

            const response = await fetch(
                `${API_URL}/api/admin/resources/${resourceId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!data.success) {
                alert(data.message || "Failed to delete resource");
                return;
            }

            setResources((prev) =>
                prev.filter(
                    (resource) => resource._id !== resourceId
                )
            );
        } catch (error) {
            console.error("Error deleting resource:", error);
            alert("Failed to delete resource.");
        } finally {
            setActionLoading(null);
        }
    };

    // =========================
    // LOADING
    // =========================

    if (loadingResources) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">
                    Loading resources...
                </p>
            </div>
        );
    }

    // =========================
    // STATS
    // =========================

    const totalResources = resources.length;

    const approvedResources = resources.filter(
        (resource) => resource.status === "approved"
    ).length;

    const publishedResources = resources.filter(
        (resource) => resource.isPublished === true
    ).length;

    const rejectedResources = resources.filter(
        (resource) => resource.status === "rejected"
    ).length;


    return (
        <div>

            {/* ================= HEADER ================= */}

            <div className="mb-8">

                <h1 className="text-2xl font-bold text-gray-800">
                    Resources
                </h1>

                <p className="text-gray-500 mt-1">
                    Review and manage learning resources.
                </p>

            </div>


            {/* ================= STATS ================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                <div className="bg-white border border-gray-200 rounded-xl p-5">

                    <p className="text-sm text-gray-500">
                        Total Resources
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-2">
                        {totalResources}
                    </h2>

                </div>


                <div className="bg-white border border-gray-200 rounded-xl p-5">

                    <p className="text-sm text-gray-500">
                        Approved
                    </p>

                    <h2 className="text-2xl font-bold text-green-600 mt-2">
                        {approvedResources}
                    </h2>

                </div>


                <div className="bg-white border border-gray-200 rounded-xl p-5">

                    <p className="text-sm text-gray-500">
                        Published
                    </p>

                    <h2 className="text-2xl font-bold text-blue-600 mt-2">
                        {publishedResources}
                    </h2>

                </div>


                <div className="bg-white border border-gray-200 rounded-xl p-5">

                    <p className="text-sm text-gray-500">
                        Rejected
                    </p>

                    <h2 className="text-2xl font-bold text-red-500 mt-2">
                        {rejectedResources}
                    </h2>

                </div>

            </div>

            {/* ================= FILTER ================= */}

            <div className="bg-white border border-gray-200 rounded-xl mb-6">

                <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div>

                        <h2 className="font-semibold text-gray-800">
                            Learning Resources
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Review resources submitted to the platform.
                        </p>

                    </div>


                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none"
                    >

                        <option value="all">
                            All Resources
                        </option>

                        <option value="approved">
                            Approved
                        </option>

                        <option value="rejected">
                            Rejected
                        </option>

                    </select>

                </div>

            </div>


            {/* ================= TABLE ================= */}

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

                {resources.length === 0 ? (

                    <div className="p-10 text-center">

                        <p className="text-gray-500">
                            No resources found.
                        </p>

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Resource
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Type
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Category
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Level
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Status
                                    </th>

                                    <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody className="divide-y divide-gray-100">

                                {resources.map((resource) => (

                                    <tr
                                        key={resource._id}
                                        className="hover:bg-gray-50"
                                    >

                                        {/* Resource */}

                                        <td className="px-6 py-4">

                                            <div className="max-w-xs">

                                                <p className="font-medium text-gray-800">
                                                    {resource.title}
                                                </p>

                                                <p className="text-sm text-gray-500 truncate mt-1">
                                                    {resource.description}
                                                </p>

                                            </div>

                                        </td>


                                        {/* Type */}

                                        <td className="px-6 py-4">

                                            <span className="px-2 py-1 text-xs bg-indigo-50 text-indigo-600 rounded">
                                                {resource.type}
                                            </span>

                                        </td>


                                        {/* Category */}

                                        <td className="px-6 py-4">

                                            <span className="text-sm text-gray-600">
                                                {resource.category || "-"}
                                            </span>

                                        </td>


                                        {/* Level */}

                                        <td className="px-6 py-4">

                                            <span className="text-sm text-gray-600">
                                                {resource.level}
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
                                                        resource.status ===
                                                        "approved"
                                                            ? "bg-green-100 text-green-700"
                                                            : resource.status ===
                                                              "rejected"
                                                            ? "bg-red-100 text-red-600"
                                                            : "bg-yellow-100 text-yellow-700"
                                                    }
                                                `}
                                            >
                                                {resource.status}
                                            </span>

                                        </td>


                                        {/* Actions */}

                                        <td className="px-6 py-4">

                                            <div className="flex justify-end gap-2 flex-wrap">

                                                {/* Open Resource */}

                                                <a
                                                    href={resource.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="px-3 py-2 text-xs font-medium border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50"
                                                >
                                                    View
                                                </a>


                                                {/* Approve */}

                                                {resource.status !==
                                                    "approved" && (

                                                    <button
                                                        disabled={
                                                            actionLoading ===
                                                            resource._id
                                                        }
                                                        onClick={() =>
                                                            updateStatus(
                                                                resource._id,
                                                                "approve"
                                                            )
                                                        }
                                                        className="px-3 py-2 text-xs font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                                                    >
                                                        Approve
                                                    </button>

                                                )}


                                                {/* Reject */}

                                                {resource.status !==
                                                    "rejected" && (

                                                    <button
                                                        disabled={
                                                            actionLoading ===
                                                            resource._id
                                                        }
                                                        onClick={() => {

                                                            const confirmed =
                                                                window.confirm(
                                                                    "Are you sure you want to reject this resource?"
                                                                );

                                                            if (
                                                                confirmed
                                                            ) {
                                                                updateStatus(
                                                                    resource._id,
                                                                    "reject"
                                                                );
                                                            }

                                                        }}
                                                        className="px-3 py-2 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-50"
                                                    >
                                                        Reject
                                                    </button>

                                                )}


                                                {/* Publish */}

                                                {resource.status ===
                                                    "approved" &&
                                                    !resource.isPublished && (

                                                        <button
                                                            disabled={
                                                                actionLoading ===
                                                                resource._id
                                                            }
                                                            onClick={() =>
                                                                updatePublishStatus(
                                                                    resource._id,
                                                                    "publish"
                                                                )
                                                            }
                                                            className="px-3 py-2 text-xs font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                                                        >
                                                            Publish
                                                        </button>

                                                    )}


                                                {/* Unpublish */}

                                                {resource.isPublished && (

                                                    <button
                                                        disabled={
                                                            actionLoading ===
                                                            resource._id
                                                        }
                                                        onClick={() =>
                                                            updatePublishStatus(
                                                                resource._id,
                                                                "unpublish"
                                                            )
                                                        }
                                                        className="px-3 py-2 text-xs font-medium bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50"
                                                    >
                                                        Unpublish
                                                    </button>

                                                )}


                                                {/* Delete */}

                                                <button
                                                    disabled={
                                                        actionLoading ===
                                                        resource._id
                                                    }
                                                    onClick={() =>
                                                        deleteResource(
                                                            resource._id
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

export default AdminResources;
