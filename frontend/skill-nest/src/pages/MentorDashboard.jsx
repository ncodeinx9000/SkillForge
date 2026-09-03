import { useState } from "react";
import Navbar from "../components/MentorDashboard/Navbar";
import Sidebar from "../components/MentorDashboard/Sidebar";
import WelcomeBanner from "../components/MentorDashboard/WelcomeBanner";
import StatsCard from "../components/MentorDashboard/StatsCard";

import { CiStar } from "react-icons/ci";
import { LuBookMarked } from "react-icons/lu";
import { FiBookOpen } from "react-icons/fi";
import { RxPeople } from "react-icons/rx";
import MentorOverview from "../components/MentorDashboard/MentorOverview";
import MentorMentees from "../components/MentorDashboard/MentorMentees";
import MentorSessions from "../components/MentorDashboard/MentorSessions";
import MentorResources from "../components/MentorDashboard/MentorResources";
import MentorQA from "../components/MentorDashboard/MentorQA";
import MentorAnalytics from "../components/MentorDashboard/MentorAnalytics";

function MentorDashboard() {
  const [showSidebar, setShowSidebar] = useState(false);

  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    "Overview",
    "Mentees",
    "Sessions",
    "Resources",
    "Q&A",
    "Analytics",
  ];

  return (
    <div className="bg-[#f5f2eb]  min-h-screen overflow-hidden">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <Navbar showSidebar={showSidebar} />

      <div
        className={`${showSidebar ? "lg:ml-61" : "lg:ml-26"} ml-6 mr-6 mt-23 lg:mr-6 `}
      >
        <WelcomeBanner />

        <div className="lg:grid lg:grid-cols-4 lg:gap-3 grid grid-cols-2 gap-3 mb-6.5">
          <StatsCard
            icon={RxPeople}
            iconColor="text-[#c2815b]"
            iconBgColor="bg-[#f5f2eb]"
            stats="4"
            statName="Active Mentees"
            weekStat="+1 this month"
          />
          <StatsCard
            icon={LuBookMarked}
            iconColor="text-gray-800"
            iconBgColor="bg-[#f5f2eb]"
            stats="3"
            statName="Sessions This Week"
            weekStat=""
          />
          <StatsCard
            icon={CiStar}
            iconColor="text-orange-600"
            iconBgColor="bg-[#f5f2eb]"
            stats="4.8"
            statName="Avarage Rating"
            weekStat=""
          />

          <StatsCard
            icon={FiBookOpen}
            iconColor="text-blue-600"
            iconBgColor="bg-[#f5f2eb]"
            stats="3"
            statName="Resources Published"
            weekStat=""
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-around bg-[#e8e4da] text-[13px] text-gray-500 font-DM-Sans font-semibold px-3 py-3 rounded-2xl">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`${activeTab === tab ? "w-1/6 bg-white text-black py-2 rounded-xl":"bg-[e8e4da] text-gray-500"} `}>
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "Overview" && <MentorOverview />}

        {activeTab === "Mentees" && <MentorMentees />}

        {activeTab === "Sessions" && <MentorSessions />}

        {activeTab === "Resources" && <MentorResources />}

        {activeTab === "Q&Q" && <MentorQA />}

        {activeTab === "Analytics" && <MentorAnalytics />}


      </div>
    </div>
  );
}

export default MentorDashboard;
