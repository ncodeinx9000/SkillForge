import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/MentorDashboard/Navbar";
import Sidebar from "../components/MentorDashboard/Sidebar";
import WelcomeBanner from "../components/MentorDashboard/WelcomeBanner";
import StatsCard from "../components/MentorDashboard/StatsCard";
import { CiStar } from "react-icons/ci";
import { LuBookMarked } from "react-icons/lu";
import { FiBookOpen } from "react-icons/fi";
import { RxPeople } from "react-icons/rx";
import api from "../lib/axios";
import MentorOverview from "../components/MentorDashboard/MentorOverview";
import MentorMentees from "../components/MentorDashboard/MentorMentees";
import MentorSessions from "../components/MentorDashboard/MentorSessions";
import MentorResources from "../components/MentorDashboard/MentorResources";
import MentorQA from "../components/MentorDashboard/MentorQA";
import MentorAnalytics from "../components/MentorDashboard/MentorAnalytics";

const tabs = [["Overview", "/mentor/dashboard"], ["Mentees", "/mentor/my-mentees"], ["Sessions", "/mentor/sessions"], ["Resources", "/mentor/resources"], ["Q&A", "/mentor/q&a"], ["Analytics", "/mentor/analytics"]];
const views = { Overview: MentorOverview, Mentees: MentorMentees, Sessions: MentorSessions, Resources: MentorResources, "Q&A": MentorQA, Analytics: MentorAnalytics };

function MentorDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ mentees: 0, sessions: 0, rating: 0, resources: 0 });
  const activeTab = tabs.find(([, path]) => path === location.pathname)?.[0] || "Overview";
  const Content = views[activeTab];

  useEffect(() => { Promise.all([api.get("/mentor/me"), api.get("/mentor/analytics")]).then(([profile, analytics]) => setStats({ mentees: analytics.data.analytics?.activeMentees || 0, sessions: analytics.data.analytics?.confirmedSessions || 0, rating: profile.data.mentor?.rating || 0, resources: analytics.data.analytics?.resources || 0 })).catch(() => {}); }, []);

  return <div className="min-h-screen bg-[#f5f2eb]"><Sidebar /><Navbar />
    <main className="ml-0 px-4 pt-22 pb-8 md:px-6 lg:ml-60"><WelcomeBanner />
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatsCard icon={RxPeople} iconColor="text-[#c2815b]" iconBgColor="bg-[#f5f2eb]" stats={stats.mentees} statName="Active Mentees" weekStat="Live" />
        <StatsCard icon={LuBookMarked} iconColor="text-gray-800" iconBgColor="bg-[#f5f2eb]" stats={stats.sessions} statName="Confirmed Sessions" weekStat="Live" />
        <StatsCard icon={CiStar} iconColor="text-orange-600" iconBgColor="bg-[#f5f2eb]" stats={stats.rating || "—"} statName="Average Rating" weekStat="Reviews" />
        <StatsCard icon={FiBookOpen} iconColor="text-blue-600" iconBgColor="bg-[#f5f2eb]" stats={stats.resources} statName="Resources Published" weekStat="Live" />
      </div>
      <nav className="flex overflow-x-auto rounded-2xl bg-[#e8e4da] p-2">{tabs.map(([tab, path]) => <button key={tab} onClick={() => navigate(path)} className={`min-w-max flex-1 rounded-xl px-4 py-2 text-sm font-semibold ${activeTab === tab ? "bg-white text-[#1e3a1e] shadow-sm" : "text-gray-500 hover:text-[#1e3a1e]"}`}>{tab}</button>)}</nav>
      <Content />
    </main></div>;
}

export default MentorDashboard;
