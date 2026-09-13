import { FiBookOpen } from "react-icons/fi";
import { RxPeople } from "react-icons/rx";
import { FaBullseye } from "react-icons/fa";
import { LuBookMarked } from "react-icons/lu";
import { useEffect, useState } from "react";
import WelcomeBanner from "../../components/Learner/LearnerDashboard/WelcomeBanner";
import Navbar from "../../components/Learner/LearnerDashboard/Navbar";
import Sidebar from "../../components/Learner/LearnerDashboard/Sidebar";
import StatsCard from "../../components/Learner/LearnerDashboard/StatsCards";
import ActiveRoadmap from "../../components/Learner/LearnerDashboard/ActiveRoadmap";
import MentorCard from "../../components/Learner/LearnerDashboard/MentorCard";
import InterestCard from "../../components/Learner/LearnerDashboard/InterestCard";
import RecommendedIdeas from "../../components/Learner/LearnerDashboard/RecommendedIdeas";
import LearningResources from "../../components/Learner/LearnerDashboard/LearningResources";
import api from "../../lib/axios";

export default function Dashboard() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/learner/dashboard")
      .then((response) => setDashboard(response.data.dashboard))
      .catch((requestError) => setError(requestError.response?.data?.message || "Unable to load dashboard."));
  }, []);

  const progress = dashboard?.roadmapProgress || 0;
  const activeMentors = dashboard?.bookedMentor?.length || 0;
  const resourceCount = dashboard?.completedResources || 0;

  return (
    <div className="bg-[#f5f2eb]  min-h-screen overflow-hidden">
      <Navbar showSidebar={showSidebar} />

      {/*sidebar*/}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      {/* main */}
      <div
        className={`${showSidebar ? "lg:ml-61" : "lg:ml-26"} ml-6 mr-6 mt-23 lg:mr-6 `}
      >
        <WelcomeBanner dashboard={dashboard} />
        {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        {/* Cards */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-3 grid grid-cols-2 gap-3 mb-4">
          <StatsCard
            icon={FaBullseye}
            iconColor="text-[#c2815b]"
            iconBgColor="bg-gray-200"
            stats={`${progress}%`}
            statName="Roadmap Progress"
            weekStat="Live"
          />
          <StatsCard
            icon={LuBookMarked}
            iconColor="text-gray-800"
            iconBgColor="bg-gray-200"
            stats={dashboard?.completedSteps || 0}
            statName="Interest Saved"
            weekStat=""
          />
          <StatsCard
            icon={FiBookOpen}
            iconColor="text-blue-600"
            iconBgColor="bg-gray-200"
            stats={resourceCount}
            statName="Resource Accessed"
            weekStat="Completed"
          />

          <StatsCard
            icon={RxPeople}
            iconColor="text-purple-600"
            iconBgColor="bg-gray-200"
            stats={activeMentors}
            statName="Active Mentor"
            weekStat=""
          />
        </div>

        <div className="lg:grid lg:grid-cols-[1.7fr_1fr] lg:gap-4">
          <ActiveRoadmap dashboard={dashboard} />
          <div className="flex flex-col gap-3">
            <MentorCard dashboard={dashboard} />
            <InterestCard dashboard={dashboard} />
          </div>
        </div>
        
        <RecommendedIdeas />
        <LearningResources dashboard={dashboard} />
      </div>
    </div>
  );
}
