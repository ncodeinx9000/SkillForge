import { FiBookOpen } from "react-icons/fi";
import { RxPeople } from "react-icons/rx";
import { FaBullseye } from "react-icons/fa";
import { LuBookMarked } from "react-icons/lu";
import { useState } from "react";
import WelcomeBanner from "../../components/Learner/LearnerDashboard.jsx/WelcomeBanner";
import Navbar from "../../components/Learner/LearnerDashboard.jsx/Navbar";
import Sidebar from "../../components/Learner/LearnerDashboard.jsx/Sidebar";
import StatsCard from "../../components/Learner/LearnerDashboard.jsx/StatsCards";
import ActiveRoadmap from "../../components/Learner/LearnerDashboard.jsx/ActiveRoadmap";
import MentorCard from "../../components/Learner/LearnerDashboard.jsx/MentorCard";
import InterestCard from "../../components/Learner/LearnerDashboard.jsx/InterestCard";
import RecommendedIdeas from "../../components/Learner/LearnerDashboard.jsx/RecommendedIdeas";
import LearningResources from "../../components/Learner/LearnerDashboard.jsx/LearningResources";
import api from "../../lib/axios";

export default function Dashboard() {

  const getLearnerDashboard = async()=> {
    try {
       const res = await api.get('/api/learner/dashboard')
    } catch (error) {
      console.log(error);
      
    }
  }

 
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="bg-[#f5f2eb]  min-h-screen overflow-hidden">
      <Navbar />

      {/*sidebar*/}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      {/* main */}
      <div
        className={`${showSidebar ? "lg:ml-61" : "lg:ml-26"} ml-6 mr-6 mt-23 lg:mr-6 `}
      >
        <WelcomeBanner />

        {/* Cards */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-3 grid grid-cols-2 gap-3 mb-4">
          <StatsCard
            icon={FaBullseye}
            iconColor="text-[#c2815b]"
            iconBgColor="bg-gray-200"
            stats="49%"
            statName="Roadmap Progress"
            weekStat="+12% this week"
          />
          <StatsCard
            icon={LuBookMarked}
            iconColor="text-gray-800"
            iconBgColor="bg-gray-200"
            stats="2"
            statName="Interest Saved"
            weekStat=""
          />
          <StatsCard
            icon={FiBookOpen}
            iconColor="text-blue-600"
            iconBgColor="bg-gray-200"
            stats="7"
            statName="Resource Accessed"
            weekStat="+2 today"
          />

          <StatsCard
            icon={RxPeople}
            iconColor="text-purple-600"
            iconBgColor="bg-gray-200"
            stats="1"
            statName="Active Mentor"
            weekStat=""
          />
        </div>

        <div className="lg:grid lg:grid-cols-[1.7fr_1fr] lg:gap-4">
          <ActiveRoadmap />
          <div className="flex flex-col gap-3">
            <MentorCard />
            <InterestCard />
          </div>
        </div>
        
        <RecommendedIdeas />
        <LearningResources />
      </div>
    </div>
  );
}
