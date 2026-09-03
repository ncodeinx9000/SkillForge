import React, { useEffect, useState } from "react";

const AdminMentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch all mentors
  const fetchMentors = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/admin/mentors`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setMentors(data.mentors);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching mentors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  // Approve mentor
  const approveMentor = async (mentorId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/mentors/${mentorId}/approve`,
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

      // Update UI immediately
      setMentors((prevMentors) =>
        prevMentors.map((mentor) =>
          mentor._id === mentorId
            ? {
                ...mentor,
                verificationStatus: "verified",
              }
            : mentor
        )
      );

    } catch (error) {
      console.error("Error approving mentor:", error);
    }
  };

  // Reject mentor
  const rejectMentor = async (mentorId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/mentors/${mentorId}/reject`,
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

      // Update UI immediately
      setMentors((prevMentors) =>
        prevMentors.map((mentor) =>
          mentor._id === mentorId
            ? {
                ...mentor,
                verificationStatus: "rejected",
              }
            : mentor
        )
      );

    } catch (error) {
      console.error("Error rejecting mentor:", error);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">
          Loading mentors...
        </p>
      </div>
    );
  }

  // Stats
  const totalMentors = mentors.length;

  const verifiedMentors = mentors.filter(
    (mentor) => mentor.verificationStatus === "verified"
  ).length;

  const pendingMentors = mentors.filter(
    (mentor) => mentor.verificationStatus === "pending"
  ).length;

  const rejectedMentors = mentors.filter(
    (mentor) => mentor.verificationStatus === "rejected"
  ).length;

  return (
    <div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Mentors
        </h1>

        <p className="text-gray-500 mt-1">
          Manage and verify SkillForge mentors.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        {/* Total */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Total Mentors
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            {totalMentors}
          </h2>
        </div>

        {/* Verified */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Verified
          </p>

          <h2 className="text-2xl font-bold text-green-600 mt-2">
            {verifiedMentors}
          </h2>
        </div>

        {/* Pending */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Pending
          </p>

          <h2 className="text-2xl font-bold text-yellow-600 mt-2">
            {pendingMentors}
          </h2>
        </div>

        {/* Rejected */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Rejected
          </p>

          <h2 className="text-2xl font-bold text-red-600 mt-2">
            {rejectedMentors}
          </h2>
        </div>

      </div>

      {/* Mentor Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800">
            All Mentors
          </h2>
        </div>

        {mentors.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-gray-500">
              No mentors found.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">
                <tr>

                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    Mentor
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    Expertise
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    Experience
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    Status
                  </th>

                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {mentors.map((mentor) => (

                  <tr key={mentor._id}>

                    {/* Mentor */}
                    <td className="px-6 py-4">

                      <div>
                        <p className="font-medium text-gray-800">
                          {mentor.user?.name || "Unknown"}
                        </p>

                        <p className="text-sm text-gray-500">
                          {mentor.user?.email || ""}
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          {mentor.title}
                        </p>
                      </div>

                    </td>

                    {/* Expertise */}
                    <td className="px-6 py-4">

                      <div className="flex flex-wrap gap-1">

                        {mentor.expertise
                          ?.slice(0, 3)
                          .map((item, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                            >
                              {item}
                            </span>
                          ))}

                      </div>

                    </td>

                    {/* Experience */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {mentor.yearsOfExperience || 0} years
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          mentor.verificationStatus === "verified"
                            ? "bg-green-100 text-green-700"
                            : mentor.verificationStatus === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {mentor.verificationStatus}
                      </span>

                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        {mentor.verificationStatus !== "verified" && (
                          <button
                            onClick={() =>
                              approveMentor(mentor._id)
                            }
                            className="px-3 py-2 text-xs font-medium bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            Approve
                          </button>
                        )}

                        {mentor.verificationStatus !== "rejected" && (
                          <button
                            onClick={() =>
                              rejectMentor(mentor._id)
                            }
                            className="px-3 py-2 text-xs font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                          >
                            Reject
                          </button>
                        )}

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

export default AdminMentors;