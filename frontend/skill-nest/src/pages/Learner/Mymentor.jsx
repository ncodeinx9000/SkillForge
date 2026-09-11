import { useEffect, useState } from "react";
import Sidebar from "../../components/Learner/LearnerDashboard/Sidebar";
import Navbar from "../../components/Learner/LearnerDashboard/Navbar";
import LearnerMentorCard from "../../components/Learner/LearnerMentorCard";
import api from "../../lib/axios";

function Mymentor() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sessions, setSessions] = useState([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    fetchMentors();
    fetchSessions();
  }, []);

  const fetchMentors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/mentor/all");

      if (response.data.success) {
        setMentors(response.data.mentors || []);
      }
    } catch (error) {
      console.error("Failed to fetch mentors:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load mentors. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async () => {
    try {
      setLoadingSessions(true);

      const response = await api.get("/session/learner/all");

      if (response.data.success) {
        setSessions(response.data.sessions || []);
      }
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
    } finally {
      setLoadingSessions(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f3ee]">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <Navbar showSidebar={showSidebar} />

      <main
        className={`min-h-screen pt-[82px] transition-all duration-300 ease-in-out ${
          showSidebar ? "md:ml-[220px]" : "md:ml-[88px]"
        }`}
      >
        <div className="px-4 sm:px-6 py-8 max-w-[1400px] mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold font-DM-Sans text-[#1e3a1e]">
              Find your mentor
            </h1>

            <p className="text-sm text-gray-600 mt-1 font-DM-Sans">
              Connect with experienced mentors who can guide you through your
              entrepreneurship journey.
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search mentors..."
              className="w-full max-w-md px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-green-200 font-DM-Sans text-sm"
            />
          </div>

          {/* Loading */}
          {loading && (
            <div className="bg-white rounded-2xl p-8 text-center">
              <p className="text-sm text-gray-500 font-DM-Sans">
                Loading mentors...
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
              <p className="text-sm text-red-600 font-DM-Sans">{error}</p>

              <button
                onClick={fetchMentors}
                className="mt-3 px-4 py-2 bg-[#1e3a1e] text-white rounded-xl text-sm font-DM-Sans"
              >
                Try Again
              </button>
            </div>
          )}

          {/* No mentors */}
          {!loading && !error && mentors.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center">
              <p className="text-sm text-gray-500 font-DM-Sans">
                No verified mentors are available right now.
              </p>
            </div>
          )}

          {/* Mentor cards */}
          {!loading && !error && mentors.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {mentors.map((mentor) => (
                <LearnerMentorCard key={mentor._id} mentor={mentor} />
              ))}
            </div>
          )}

          {/* My Sessions */}
          <div className="mt-10">
            <div className="mb-5">
              <h2 className="text-xl font-bold font-DM-Sans text-[#1e3a1e]">
                My Sessions
              </h2>

              <p className="text-sm text-gray-600 mt-1 font-DM-Sans">
                Track your mentor session requests and upcoming sessions.
              </p>
            </div>

            {loadingSessions ? (
              <div className="bg-white rounded-2xl p-6 text-center">
                <p className="text-sm text-gray-500 font-DM-Sans">
                  Loading sessions...
                </p>
              </div>
            ) : sessions.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center">
                <p className="text-sm text-gray-500 font-DM-Sans">
                  You haven't booked any mentor sessions yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {sessions.map((session) => {
                  const mentorName =
                    session.mentor?.user?.name ||
                    session.mentor?.name ||
                    "Mentor";

                  const sessionDate = new Date(session.date);

                  return (
                    <div key={session._id} className="bg-white rounded-2xl p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-semibold font-DM-Sans text-[#1e3a1e]">
                            {session.title}
                          </h3>

                          <p className="text-xs text-gray-500 mt-1">
                            with {mentorName}
                          </p>
                        </div>

                        <span
                          className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                            session.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : session.status === "completed"
                                ? "bg-blue-100 text-blue-700"
                                : session.status === "rejected"
                                  ? "bg-red-100 text-red-700"
                                  : session.status === "cancelled"
                                    ? "bg-gray-100 text-gray-700"
                                    : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {session.status}
                        </span>
                      </div>

                      {session.description && (
                        <p className="text-xs text-gray-600 mt-3">
                          {session.description}
                        </p>
                      )}

                      <div className="border-t border-gray-100 mt-4 pt-4 grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-[10px] text-gray-500">Date</p>

                          <p className="text-xs font-semibold mt-1">
                            {sessionDate.toLocaleDateString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] text-gray-500">Time</p>

                          <p className="text-xs font-semibold mt-1">
                            {sessionDate.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] text-gray-500">Duration</p>

                          <p className="text-xs font-semibold mt-1">
                            {session.duration || 30} minutes
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] text-gray-500">Status</p>

                          <p className="text-xs font-semibold mt-1 capitalize">
                            {session.status}
                          </p>
                        </div>
                      </div>

                      {session.meetingLink &&
                        session.status === "confirmed" && (
                          <a
                            href={session.meetingLink}
                            target="_blank"
                            rel="noreferrer"
                            className="block text-center mt-4 bg-[#1e3a1e] text-white py-2 rounded-xl text-xs font-semibold"
                          >
                            Join Session
                          </a>
                        )}

                      {session.status === "pending" && (
                        <div className="mt-4 bg-yellow-50 text-yellow-700 px-3 py-2 rounded-xl text-xs">
                          Waiting for mentor confirmation.
                        </div>
                      )}

                      {session.status === "rejected" && (
                        <div className="mt-4 bg-red-50 text-red-700 px-3 py-2 rounded-xl text-xs">
                          Your mentor rejected this session request.
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Mymentor;
