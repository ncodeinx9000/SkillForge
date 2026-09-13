import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../lib/axios";

const labels = [["totalUsers", "Total Users"], ["totalLearners", "Learners"], ["totalMentors", "Mentors"], ["pendingMentors", "Pending Mentors"], ["verifiedMentors", "Verified Mentors"], ["publishedBusinessIdeas", "Published Ideas"], ["publishedRoadmaps", "Published Roadmaps"], ["pendingResources", "Pending Resources"], ["openReports", "Open Reports"], ["totalSessions", "Sessions"]];

const AdminDashboard = () => {
  const user = useSelector((state) => state.user.user);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => { api.get("/admin/dashboard").then((response) => setData(response.data.data)).catch((requestError) => setError(requestError.response?.data?.message || "Unable to load dashboard.")); }, []);
  return <div><div className="mb-8"><p className="text-xs font-semibold tracking-wide text-[#c4662a]">ADMINISTRATION</p><h1 className="mt-2 font-Outfit text-3xl font-extrabold text-[#1e3a1e]">Dashboard</h1><p className="mt-1 text-gray-500">Welcome {user?.name || "Admin"}. Here&apos;s what&apos;s happening in SkillForge.</p></div>{error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}{!data && !error ? <div className="rounded-2xl bg-white p-8 text-sm text-gray-500">Loading dashboard...</div> : <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{labels.map(([key, label]) => <div key={key} className="rounded-2xl border border-[#e4ded2] bg-white p-5"><p className="text-sm text-gray-500">{label}</p><h2 className="mt-2 font-Outfit text-3xl font-bold text-[#1e3a1e]">{data?.[key] || 0}</h2></div>)}</div>}</div>;
};

export default AdminDashboard;
