import React, { useEffect, useState } from "react";

const AdminReports = () => {
    const API_URL = import.meta.env.VITE_API_URL;

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [statusFilter, setStatusFilter] = useState("all");

    // ==========================================
    // GET REPORTS
    // ==========================================

    const fetchReports = async () => {
        try {
            setLoading(true);

            let url = `${API_URL}/api/admin/reports`;

            if (statusFilter !== "all") {
                url += `?status=${statusFilter}`;
            }

            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();

            if (data.success) {
                setReports(data.reports || []);
            } else {
                alert(data.message || "Failed to load reports");
            }
        } catch (error) {
            console.error("Error fetching reports:", error);
            alert("Failed to load reports");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [statusFilter]);

    // ==========================================
    // RESOLVE REPORT
    // ==========================================

    const resolveReport = async (reportId) => {
        try {
            setActionLoading(reportId);

            const response = await fetch(
                `${API_URL}/api/admin/reports/${reportId}/resolve`,
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

            fetchReports();
        } catch (error) {
            console.error("Error resolving report:", error);
            alert("Failed to resolve report");
        } finally {
            setActionLoading(null);
        }
    };

    // ==========================================
    // DISMISS REPORT
    // ==========================================

    const dismissReport = async (reportId) => {
        const confirmed = window.confirm(
            "Are you sure you want to dismiss this report?"
        );

        if (!confirmed) return;

        try {
            setActionLoading(reportId);

            const response = await fetch(
                `${API_URL}/api/admin/reports/${reportId}/dismiss`,
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

            fetchReports();
        } catch (error) {
            console.error("Error dismissing report:", error);
            alert("Failed to dismiss report");
        } finally {
            setActionLoading(null);
        }
    };

    // ==========================================
    // DELETE REPORT
    // ==========================================

    const deleteReport = async (reportId) => {
        const confirmed = window.confirm(
            "Are you sure you want to permanently delete this report?"
        );

        if (!confirmed) return;

        try {
            setActionLoading(reportId);

            const response = await fetch(
                `${API_URL}/api/admin/reports/${reportId}`,
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

            setReports((prev) =>
                prev.filter((report) => report._id !== reportId)
            );
        } catch (error) {
            console.error("Error deleting report:", error);
            alert("Failed to delete report");
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
                    Loading reports...
                </p>
            </div>
        );
    }

    // ==========================================
    // STATS
    // ==========================================

    const totalReports = reports.length;

    const openReports = reports.filter(
        (report) => report.status === "open"
    ).length;

    const resolvedReports = reports.filter(
        (report) => report.status === "resolved"
    ).length;

    const dismissedReports = reports.filter(
        (report) => report.status === "dismissed"
    ).length;

    // ==========================================
    // UI
    // ==========================================

    return (
        <div>

            {/* HEADER */}

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">
                    Reports
                </h1>

                <p className="text-gray-500 mt-1">
                    Review and manage user reports.
                </p>
            </div>


            {/* STATS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <p className="text-sm text-gray-500">
                        Total Reports
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-2">
                        {totalReports}
                    </h2>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <p className="text-sm text-gray-500">
                        Open
                    </p>

                    <h2 className="text-2xl font-bold text-yellow-600 mt-2">
                        {openReports}
                    </h2>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <p className="text-sm text-gray-500">
                        Resolved
                    </p>

                    <h2 className="text-2xl font-bold text-green-600 mt-2">
                        {resolvedReports}
                    </h2>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5">
                    <p className="text-sm text-gray-500">
                        Dismissed
                    </p>

                    <h2 className="text-2xl font-bold text-gray-500 mt-2">
                        {dismissedReports}
                    </h2>
                </div>

            </div>


            {/* REPORTS CARD */}

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

                {/* TOP */}

                <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div>
                        <h2 className="font-semibold text-gray-800">
                            All Reports
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Review reports submitted by users.
                        </p>
                    </div>


                    {/* FILTER */}

                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none"
                    >
                        <option value="all">
                            All Reports
                        </option>

                        <option value="open">
                            Open
                        </option>

                        <option value="resolved">
                            Resolved
                        </option>

                        <option value="dismissed">
                            Dismissed
                        </option>
                    </select>

                </div>


                {/* EMPTY */}

                {reports.length === 0 ? (

                    <div className="p-10 text-center">
                        <p className="text-gray-500">
                            No reports found.
                        </p>
                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Reporter
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Type
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Reason
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Status
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Date
                                    </th>

                                    <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody className="divide-y divide-gray-100">

                                {reports.map((report) => (

                                    <tr
                                        key={report._id}
                                        className="hover:bg-gray-50"
                                    >

                                        {/* REPORTER */}

                                        <td className="px-6 py-4">

                                            <p className="font-medium text-gray-800">
                                                {report.reporter?.name ||
                                                    "Unknown"}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {report.reporter?.email ||
                                                    "-"}
                                            </p>

                                        </td>


                                        {/* TYPE */}

                                        <td className="px-6 py-4">

                                            <span className="text-sm text-gray-600 capitalize">
                                                {report.type}
                                            </span>

                                        </td>


                                        {/* REASON */}

                                        <td className="px-6 py-4">

                                            <div className="max-w-xs">

                                                <p className="text-sm font-medium text-gray-700 truncate">
                                                    {report.reason}
                                                </p>

                                                {report.description && (
                                                    <p className="text-xs text-gray-500 mt-1 truncate">
                                                        {
                                                            report.description
                                                        }
                                                    </p>
                                                )}

                                            </div>

                                        </td>


                                        {/* STATUS */}

                                        <td className="px-6 py-4">

                                            <span
                                                className={`
                                                    px-3 py-1
                                                    rounded-full
                                                    text-xs
                                                    font-medium
                                                    ${
                                                        report.status ===
                                                        "open"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : report.status ===
                                                              "resolved"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-gray-100 text-gray-600"
                                                    }
                                                `}
                                            >
                                                {report.status}
                                            </span>

                                        </td>


                                        {/* DATE */}

                                        <td className="px-6 py-4">

                                            <span className="text-sm text-gray-600">
                                                {new Date(
                                                    report.createdAt
                                                ).toLocaleDateString()}
                                            </span>

                                        </td>


                                        {/* ACTIONS */}

                                        <td className="px-6 py-4">

                                            <div className="flex justify-end gap-2 flex-wrap">

                                                {report.status ===
                                                    "open" && (

                                                    <>
                                                        <button
                                                            disabled={
                                                                actionLoading ===
                                                                report._id
                                                            }
                                                            onClick={() =>
                                                                resolveReport(
                                                                    report._id
                                                                )
                                                            }
                                                            className="px-3 py-2 text-xs font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                                                        >
                                                            Resolve
                                                        </button>

                                                        <button
                                                            disabled={
                                                                actionLoading ===
                                                                report._id
                                                            }
                                                            onClick={() =>
                                                                dismissReport(
                                                                    report._id
                                                                )
                                                            }
                                                            className="px-3 py-2 text-xs font-medium bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                                                        >
                                                            Dismiss
                                                        </button>
                                                    </>

                                                )}

                                                <button
                                                    disabled={
                                                        actionLoading ===
                                                        report._id
                                                    }
                                                    onClick={() =>
                                                        deleteReport(
                                                            report._id
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

export default AdminReports;