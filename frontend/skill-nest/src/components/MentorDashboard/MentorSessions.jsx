import { useEffect, useState } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { IoTimeOutline } from "react-icons/io5";
import { FaCheck, FaXmark } from "react-icons/fa6";
import api from "../../lib/axios";

function MentorSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(null);

  const [rejectingSession, setRejectingSession] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const fetchSessions = async () => {
    try {
      setLoading(true);

      const response = await api.get("/session/mentor");

      if (response.data.success) {
        setSessions(response.data.sessions || []);
      }
    } catch (error) {
      console.error("Failed to fetch mentor sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleConfirm = async (sessionId) => {
    try {
      setActionLoading(sessionId);

      const response = await api.patch(
        `/session/${sessionId}/confirm`
      );

      if (response.data.success) {
        await fetchSessions();
      }
    } catch (error) {
      console.error("Failed to confirm session:", error);

      alert(
        error.response?.data?.message ||
          "Failed to confirm session."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (sessionId) => {
    try {
      setActionLoading(sessionId);

      const response = await api.patch(
        `/session/${sessionId}/reject`,
        {
          cancellationReason:
            rejectionReason.trim() ||
            "Session request rejected by mentor.",
        }
      );

      if (response.data.success) {
        setRejectingSession(null);
        setRejectionReason("");
        await fetchSessions();
      }
    } catch (error) {
      console.error("Failed to reject session:", error);

      alert(
        error.response?.data?.message ||
          "Failed to reject session."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleComplete = async (sessionId) => {
    try {
      setActionLoading(sessionId);

      const response = await api.patch(
        `/session/${sessionId}/complete`
      );

      if (response.data.success) {
        await fetchSessions();
      }
    } catch (error) {
      console.error("Failed to complete session:", error);

      alert(
        error.response?.data?.message ||
          "Failed to complete session."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";

      case "completed":
        return "bg-blue-100 text-blue-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "cancelled":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl mt-4 p-8 text-center">
        <p className="text-sm text-gray-500 font-DM-Sans">
          Loading sessions...
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4">

      {/* Header */}
      <div className="bg-white rounded-2xl px-6 py-5 mb-4">
        <h4 className="text-[18px] font-Outfit font-bold">
          Mentor Sessions
        </h4>

        <p className="text-[12px] text-gray-500 font-DM-Sans mt-1">
          Manage your learner session requests and upcoming
          sessions.
        </p>
      </div>

      {/* Empty State */}
      {sessions.length === 0 && (
        <div className="bg-white rounded-2xl p-8 text-center">
          <p className="text-sm text-gray-500 font-DM-Sans">
            No sessions found.
          </p>
        </div>
      )}

      {/* Sessions */}
      <div className="space-y-4">

        {sessions.map((session) => {

          const learnerName =
            session.learner?.name ||
            session.learner?.fullName ||
            "Learner";

          const learnerEmail =
            session.learner?.email || "";

          const isPending =
            session.status === "pending";

          const isConfirmed =
            session.status === "confirmed";

          return (
            <div
              key={session._id}
              className="bg-white rounded-2xl px-6 py-5"
            >

              {/* Top */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

                <div>
                  <h3 className="text-[15px] font-Outfit font-bold">
                    {session.title}
                  </h3>

                  <p className="text-[12px] text-gray-600 font-DM-Sans mt-1">
                    {learnerName}
                  </p>

                  {learnerEmail && (
                    <p className="text-[10px] text-gray-400 font-DM-Sans">
                      {learnerEmail}
                    </p>
                  )}
                </div>

                <span
                  className={`self-start text-[10px] font-DM-Sans font-semibold px-3 py-1 rounded-full capitalize ${getStatusClass(
                    session.status
                  )}`}
                >
                  {session.status}
                </span>

              </div>

              {/* Description */}
              {session.description && (
                <div className="mt-4">
                  <p className="text-[11px] text-gray-500 font-DM-Sans">
                    {session.description}
                  </p>
                </div>
              )}

              {/* Session Details */}
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">

                <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                  <LuCalendarDays />

                  <span>
                    {formatDate(session.date)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                  <IoTimeOutline />

                  <span>
                    {formatTime(session.date)}
                  </span>
                </div>

                <div className="text-[11px] text-gray-600">
                  {session.duration || 30} minutes
                </div>

              </div>

              {/* Pending Actions */}
              {isPending && (
                <div className="mt-5">

                  {rejectingSession === session._id ? (
                    <div className="bg-[#f5f2eb] rounded-xl p-4">

                      <p className="text-[12px] font-semibold font-DM-Sans mb-2">
                        Reason for rejection
                      </p>

                      <textarea
                        value={rejectionReason}
                        onChange={(e) =>
                          setRejectionReason(
                            e.target.value
                          )
                        }
                        placeholder="Enter reason..."
                        rows={3}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-[11px] outline-none resize-none"
                      />

                      <div className="flex gap-2 mt-3">

                        <button
                          type="button"
                          onClick={() => {
                            setRejectingSession(null);
                            setRejectionReason("");
                          }}
                          className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 text-[11px] font-semibold"
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          disabled={
                            actionLoading === session._id
                          }
                          onClick={() =>
                            handleReject(session._id)
                          }
                          className="px-4 py-2 rounded-xl bg-red-600 text-white text-[11px] font-semibold disabled:opacity-50"
                        >
                          {actionLoading === session._id
                            ? "Rejecting..."
                            : "Confirm Reject"}
                        </button>

                      </div>

                    </div>
                  ) : (
                    <div className="flex gap-2">

                      <button
                        type="button"
                        disabled={
                          actionLoading === session._id
                        }
                        onClick={() =>
                          handleConfirm(session._id)
                        }
                        className="flex items-center justify-center gap-1.5 flex-1 bg-[#1e3a1e] text-white py-2 rounded-xl text-[11px] font-DM-Sans font-semibold disabled:opacity-50"
                      >
                        <FaCheck />

                        {actionLoading === session._id
                          ? "Confirming..."
                          : "Confirm Session"}
                      </button>

                      <button
                        type="button"
                        disabled={
                          actionLoading === session._id
                        }
                        onClick={() =>
                          setRejectingSession(
                            session._id
                          )
                        }
                        className="flex items-center justify-center gap-1.5 flex-1 bg-red-50 text-red-600 py-2 rounded-xl text-[11px] font-DM-Sans font-semibold disabled:opacity-50"
                      >
                        <FaXmark />
                        Reject
                      </button>

                    </div>
                  )}

                </div>
              )}

              {/* Confirmed Session */}
              {isConfirmed && (
                <div className="mt-5 flex gap-2">

                  {session.meetingLink && (
                    <a
                      href={session.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center bg-[#1e3a1e] text-white py-2 rounded-xl text-[11px] font-semibold"
                    >
                      Join Session
                    </a>
                  )}

                  <button
                    type="button"
                    disabled={
                      actionLoading === session._id
                    }
                    onClick={() =>
                      handleComplete(session._id)
                    }
                    className="flex-1 bg-blue-50 text-blue-700 py-2 rounded-xl text-[11px] font-semibold disabled:opacity-50"
                  >
                    {actionLoading === session._id
                      ? "Completing..."
                      : "Mark Completed"}
                  </button>

                </div>
              )}

              {/* Completed */}
              {session.status === "completed" && (
                <div className="mt-4 bg-blue-50 text-blue-700 px-3 py-2 rounded-xl text-[11px] font-DM-Sans">
                  This session has been completed.
                </div>
              )}

              {/* Rejected */}
              {session.status === "rejected" && (
                <div className="mt-4 bg-red-50 text-red-700 px-3 py-2 rounded-xl text-[11px] font-DM-Sans">
                  {session.cancellationReason ||
                    "This session request was rejected."}
                </div>
              )}

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default MentorSessions;