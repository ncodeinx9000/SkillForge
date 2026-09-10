import React, { useEffect, useState } from "react";
import { FaPlus, FaExternalLinkAlt, FaEdit, FaTrash } from "react-icons/fa";

const AdminResources = () => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [resources, setResources] = useState([]);
    const [loadingResources, setLoadingResources] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    const [statusFilter, setStatusFilter] = useState("all");

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingResource, setEditingResource] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const emptyForm = {
        title: "",
        description: "",
        type: "Article",
        url: "",
        thumbnail: "",
        estimatedDuration: "",
        category: "",
        level: "Beginner",
        tags: "",
    };

    const [formData, setFormData] = useState(emptyForm);

    // =====================================================
    // FETCH RESOURCES
    // =====================================================

    const fetchResources = async () => {
        try {
            setLoadingResources(true);

            let url = `${API_URL}/api/admin/resources`;

            if (statusFilter !== "all") {
                url += `?status=${statusFilter}`;
            }

            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();

            if (!data.success) {
                alert(data.message || "Failed to load resources");
                return;
            }

            setResources(data.resources || []);
        } catch (error) {
            console.error("Fetch resources error:", error);
            alert("Failed to load resources");
        } finally {
            setLoadingResources(false);
        }
    };

    useEffect(() => {
        fetchResources();
    }, [statusFilter]);

    // =====================================================
    // FORM CHANGE
    // =====================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // =====================================================
    // OPEN CREATE FORM
    // =====================================================

    const openCreateForm = () => {
        setEditingResource(null);
        setFormData(emptyForm);
        setShowCreateForm(true);
    };

    // =====================================================
    // OPEN EDIT FORM
    // =====================================================

    const openEditForm = (resource) => {
        setEditingResource(resource);

        setFormData({
            title: resource.title || "",
            description: resource.description || "",
            type: resource.type || "Article",
            url: resource.url || "",
            thumbnail: resource.thumbnail || "",
            estimatedDuration: resource.estimatedDuration || "",
            category: resource.category || "",
            level: resource.level || "Beginner",
            tags: Array.isArray(resource.tags)
                ? resource.tags.join(", ")
                : "",
        });

        setShowCreateForm(true);
    };

    // =====================================================
    // CLOSE FORM
    // =====================================================

    const closeForm = () => {
        setShowCreateForm(false);
        setEditingResource(null);
        setFormData(emptyForm);
    };

    // =====================================================
    // CREATE / UPDATE RESOURCE
    // =====================================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            alert("Resource title is required.");
            return;
        }

        if (!formData.url.trim()) {
            alert("Resource URL is required.");
            return;
        }

        try {
            setSubmitting(true);

            const payload = {
                title: formData.title.trim(),
                description: formData.description.trim(),
                type: formData.type,
                url: formData.url.trim(),
                thumbnail: formData.thumbnail.trim(),
                estimatedDuration:
                    formData.estimatedDuration.trim(),
                category: formData.category.trim(),
                level: formData.level,
                tags: formData.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean),
            };

            const isEditing = Boolean(editingResource);

            const url = isEditing
                ? `${API_URL}/api/admin/resources/${editingResource._id}`
                : `${API_URL}/api/admin/resources`;

            const response = await fetch(url, {
                method: isEditing ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!data.success) {
                alert(
                    data.message ||
                        `Failed to ${
                            isEditing ? "update" : "create"
                        } resource`
                );
                return;
            }

            alert(
                isEditing
                    ? "Resource updated successfully."
                    : "Resource created successfully."
            );

            closeForm();

            await fetchResources();
        } catch (error) {
            console.error(
                "Create/update resource error:",
                error
            );

            alert(
                `Failed to ${
                    editingResource ? "update" : "create"
                } resource.`
            );
        } finally {
            setSubmitting(false);
        }
    };

    // =====================================================
    // APPROVE / REJECT
    // =====================================================

    const updateStatus = async (resourceId, action) => {
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
                alert(
                    data.message ||
                        "Failed to update resource status."
                );
                return;
            }

            await fetchResources();
        } catch (error) {
            console.error("Update resource status error:", error);

            alert("Failed to update resource status.");
        } finally {
            setActionLoading(null);
        }
    };

    // =====================================================
    // PUBLISH / UNPUBLISH
    // =====================================================

    const updatePublishStatus = async (
        resourceId,
        action
    ) => {
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
                alert(
                    data.message ||
                        "Failed to update publish status."
                );
                return;
            }

            await fetchResources();
        } catch (error) {
            console.error(
                "Update publish status error:",
                error
            );

            alert("Failed to update publish status.");
        } finally {
            setActionLoading(null);
        }
    };

    // =====================================================
    // DELETE
    // =====================================================

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
                alert(
                    data.message ||
                        "Failed to delete resource."
                );
                return;
            }

            setResources((prev) =>
                prev.filter(
                    (resource) =>
                        resource._id !== resourceId
                )
            );
        } catch (error) {
            console.error("Delete resource error:", error);

            alert("Failed to delete resource.");
        } finally {
            setActionLoading(null);
        }
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loadingResources) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">
                    Loading resources...
                </p>
            </div>
        );
    }

    // =====================================================
    // STATISTICS
    // =====================================================

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

    // =====================================================
    // UI
    // =====================================================

    return (
        <div>
            {/* =================================================
                HEADER
            ================================================= */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Resources
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Create and manage learning resources
                        for roadmap steps.
                    </p>
                </div>

                <button
                    onClick={openCreateForm}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                    <FaPlus size={13} />
                    Create Resource
                </button>
            </div>

            {/* =================================================
                STATS
            ================================================= */}

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

            {/* =================================================
                FILTER
            ================================================= */}

            <div className="bg-white border border-gray-200 rounded-xl mb-6">
                <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="font-semibold text-gray-800">
                            Learning Resources
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Resources can later be attached
                            to individual roadmap steps.
                        </p>
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
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

            {/* =================================================
                RESOURCE TABLE
            ================================================= */}

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {resources.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-gray-500">
                            No resources found.
                        </p>

                        <button
                            onClick={openCreateForm}
                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            <FaPlus size={12} />
                            Create First Resource
                        </button>
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
                                        {/* RESOURCE */}

                                        <td className="px-6 py-4">
                                            <div className="max-w-xs">
                                                <p className="font-medium text-gray-800">
                                                    {resource.title}
                                                </p>

                                                <p className="text-sm text-gray-500 truncate mt-1">
                                                    {resource.description ||
                                                        "No description"}
                                                </p>
                                            </div>
                                        </td>

                                        {/* TYPE */}

                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs bg-indigo-50 text-indigo-600 rounded">
                                                {resource.type}
                                            </span>
                                        </td>

                                        {/* CATEGORY */}

                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {resource.category ||
                                                "-"}
                                        </td>

                                        {/* LEVEL */}

                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {resource.level}
                                        </td>

                                        {/* STATUS */}

                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span
                                                    className={`
                                                        inline-flex
                                                        w-fit
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
                                                    {
                                                        resource.status
                                                    }
                                                </span>

                                                {resource.isPublished && (
                                                    <span className="text-xs text-blue-600">
                                                        Published
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        {/* ACTIONS */}

                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2 flex-wrap">
                                                {/* VIEW */}

                                                <a
                                                    href={
                                                        resource.url
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50"
                                                >
                                                    <FaExternalLinkAlt
                                                        size={
                                                            10
                                                        }
                                                    />
                                                    View
                                                </a>

                                                {/* EDIT */}

                                                <button
                                                    onClick={() =>
                                                        openEditForm(
                                                            resource
                                                        )
                                                    }
                                                    disabled={
                                                        actionLoading ===
                                                        resource._id
                                                    }
                                                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                                                >
                                                    <FaEdit
                                                        size={
                                                            11
                                                        }
                                                    />
                                                    Edit
                                                </button>

                                                {/* APPROVE */}

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

                                                {/* REJECT */}

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

                                                {/* PUBLISH */}

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

                                                {/* UNPUBLISH */}

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

                                                {/* DELETE */}

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
                                                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 disabled:opacity-50"
                                                >
                                                    <FaTrash
                                                        size={
                                                            11
                                                        }
                                                    />
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

            {/* =================================================
                CREATE / EDIT MODAL
            ================================================= */}

            {showCreateForm && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl">
                        {/* MODAL HEADER */}

                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    {editingResource
                                        ? "Edit Resource"
                                        : "Create Learning Resource"}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Add a resource that can be
                                    attached to roadmap steps.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeForm}
                                className="text-gray-400 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* FORM */}

                        <form
                            onSubmit={handleSubmit}
                            className="p-6 space-y-5"
                        >
                            {/* TITLE */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Resource Title *
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. How to validate a business idea"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            {/* DESCRIPTION */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={
                                        formData.description
                                    }
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Explain what the learner will learn from this resource..."
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                />
                            </div>

                            {/* TYPE + LEVEL */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Resource Type *
                                    </label>

                                    <select
                                        name="type"
                                        value={
                                            formData.type
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="Article">
                                            Article
                                        </option>

                                        <option value="Video">
                                            Video
                                        </option>

                                        <option value="PDF">
                                            PDF
                                        </option>

                                        <option value="Template">
                                            Template
                                        </option>

                                        <option value="Website">
                                            Website
                                        </option>

                                        <option value="Course">
                                            Course
                                        </option>
                                    </select>
                                </div>

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
                            </div>

                            {/* URL */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Resource URL *
                                </label>

                                <input
                                    type="url"
                                    name="url"
                                    value={formData.url}
                                    onChange={handleChange}
                                    placeholder="https://example.com/resource"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            {/* THUMBNAIL */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Thumbnail URL
                                </label>

                                <input
                                    type="url"
                                    name="thumbnail"
                                    value={
                                        formData.thumbnail
                                    }
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* DURATION + CATEGORY */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                                        placeholder="e.g. 15 minutes"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
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
                                        placeholder="e.g. Business Validation"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>

                            {/* TAGS */}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tags
                                </label>

                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    placeholder="validation, startup, business, beginner"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                />

                                <p className="text-xs text-gray-400 mt-1">
                                    Separate tags using commas.
                                </p>
                            </div>

                            {/* BUTTONS */}

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {submitting
                                        ? "Saving..."
                                        : editingResource
                                        ? "Update Resource"
                                        : "Create Resource"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminResources;