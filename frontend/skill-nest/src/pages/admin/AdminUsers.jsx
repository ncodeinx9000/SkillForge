import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const [roleFilter, setRoleFilter] = useState("all");

  // ==========================================
  // GET ALL USERS
  // ==========================================

  const fetchUsers = async () => {
    try {
      setLoading(true);

      let url = `${API_URL}/api/admin/users`;

      if (roleFilter !== "all") {
        url += `?role=${roleFilter}`;
      }

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setUsers(data.users || []);
      } else {
        alert(data.message || "Failed to load users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);

      alert("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const updateUserStatus = async (userId, isActive) => {
    try {
      setActionLoading(userId);

      const action = isActive ? "deactivate" : "activate";

      const response = await fetch(
        `${API_URL}/api/admin/users/${userId}/${action}`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to update user");
        return;
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? {
                ...user,
                isActive: data.user.isActive,
              }
            : user,
        ),
      );
    } catch (error) {
      console.error("Update user status error:", error);

      alert("Failed to update user.");
    } finally {
      setActionLoading(null);
    }
  };

  // ==========================================
  // ACTIVATE / DEACTIVATE USER
  // ==========================================

  const updateActiveStatus = async (userId, isActive) => {
    try {
      setActionLoading(userId);

      const action = isActive ? "activate" : "deactivate";

      const response = await fetch(
        `${API_URL}/api/admin/users/${userId}/${action}`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to update user");
        return;
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? {
                ...user,
                isActive: data.user.isActive,
              }
            : user,
        ),
      );
    } catch (error) {
      console.error("Error updating active status:", error);

      alert("Failed to update user.");
    } finally {
      setActionLoading(null);
    }
  };

  // ==========================================
  // VERIFY / UNVERIFY USER
  // ==========================================

  const updateVerificationStatus = async (userId, isVerified) => {
    try {
      setActionLoading(userId);

      const action = isVerified ? "verify" : "unverify";

      const response = await fetch(
        `${API_URL}/api/admin/users/${userId}/${action}`,
        {
          method: "PATCH",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to update verification");
        return;
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? {
                ...user,
                isVerified: data.user.isVerified,
              }
            : user,
        ),
      );
    } catch (error) {
      console.error("Error updating verification:", error);

      alert("Failed to update verification.");
    } finally {
      setActionLoading(null);
    }
  };

  // ==========================================
  // DELETE USER
  // ==========================================

  const deleteUser = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionLoading(userId);

      const response = await fetch(`${API_URL}/api/admin/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to delete user");
        return;
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);

      alert("Failed to delete user.");
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
        <p className="text-gray-500">Loading users...</p>
      </div>
    );
  }

  // ==========================================
  // STATS
  // ==========================================

  const totalUsers = users.length;

  const learnerCount = users.filter((user) => user.role === "learner").length;

  const mentorCount = users.filter((user) => user.role === "mentor").length;

  const activeCount = users.filter((user) => user.isActive).length;

  // ==========================================
  // UI
  // ==========================================

  return (
    <div>
      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Users</h1>

          <p className="text-gray-500 mt-1">
            Manage learners, mentors and other users.
          </p>
        </div>

        {/* ROLE FILTER */}

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Role:</label>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
          >
            <option value="all">All Users</option>

            <option value="learner">Learners</option>

            <option value="mentor">Mentors</option>

            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Total */}

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">Total Users</p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            {totalUsers}
          </h2>
        </div>

        {/* Learners */}

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">Learners</p>

          <h2 className="text-2xl font-bold text-indigo-600 mt-2">
            {learnerCount}
          </h2>
        </div>

        {/* Mentors */}

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">Mentors</p>

          <h2 className="text-2xl font-bold text-purple-600 mt-2">
            {mentorCount}
          </h2>
        </div>

        {/* Active */}

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">Active Users</p>

          <h2 className="text-2xl font-bold text-green-600 mt-2">
            {activeCount}
          </h2>
        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800">All Users</h2>

          <p className="text-sm text-gray-500 mt-1">
            View and manage registered users.
          </p>
        </div>

        {/* EMPTY */}

        {users.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-gray-500">No users found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* ================= THEAD ================= */}

              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    User
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    Role
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    Verification
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    Joined
                  </th>

                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* ================= TBODY ================= */}

              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    {/* USER */}

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.profilePicture ? (
                          <img
                            src={user.profilePicture}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-sm font-semibold text-gray-500">
                              {user.name?.charAt(0)?.toUpperCase()}
                            </span>
                          </div>
                        )}

                        <div>
                          <p className="font-medium text-gray-800">
                            {user.name}
                          </p>

                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* ROLE */}

                    <td className="px-6 py-4">
                      <span className="capitalize text-sm text-gray-600">
                        {user.role}
                      </span>
                    </td>

                    {/* VERIFICATION */}

                    <td className="px-6 py-4">
                      {user.isVerified ? (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Verified
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                          Not Verified
                        </span>
                      )}
                    </td>

                    {/* STATUS */}

                    <td className="px-6 py-4">
                      {user.isActive ? (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* JOINED */}

                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "-"}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2 flex-wrap">
                        {/* VIEW */}

                        <button
                          onClick={() => navigate(`/admin/users/${user._id}`)}
                          className="px-3 py-2 text-xs font-medium border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50"
                        >
                          View
                        </button>

                        {/* ACTIVATE / DEACTIVATE */}

                        {user.isActive ? (
                          <button
                            disabled={actionLoading === user._id}
                            onClick={() =>
                              updateActiveStatus(user._id, user.isActive)
                            }
                            className="px-3 py-2 text-xs font-medium bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50"
                          >
                            {user.isActive ? "Deactivate" : "Activate"}
                          </button>
                        ) : (
                          <button
                            disabled={actionLoading === user._id}
                            onClick={() => updateActiveStatus(user._id, true)}
                            className="px-3 py-2 text-xs font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                          >
                            Activate
                          </button>
                        )}

                        {/* VERIFY / UNVERIFY */}

                        {user.isVerified ? (
                          <button
                            disabled={actionLoading === user._id}
                            onClick={() =>
                              updateVerificationStatus(user._id, false)
                            }
                            className="px-3 py-2 text-xs font-medium bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                          >
                            Unverify
                          </button>
                        ) : (
                          <button
                            disabled={actionLoading === user._id}
                            onClick={() =>
                              updateVerificationStatus(user._id, true)
                            }
                            className="px-3 py-2 text-xs font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                          >
                            Verify
                          </button>
                        )}

                        {/* DELETE */}

                        <button
                          disabled={actionLoading === user._id}
                          onClick={() => deleteUser(user._id)}
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

export default AdminUsers;
