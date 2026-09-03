import { useState } from "react";
import Sidebar from "../../components/Learner/LearnerDashboard.jsx/Sidebar";
import Navbar from "../../components/Learner/LearnerDashboard.jsx/Navbar";
import WelcomeBanner from "../../components/Learner/LearnerProgress/WelcomeCard";
import StatCard from "../../components/Learner/LearnerProgress/StatCard";

import { FaBullseye } from "react-icons/fa";
import { LuBookMarked } from "react-icons/lu";
import { FiBookOpen } from "react-icons/fi";
import { RxPeople } from "react-icons/rx";
import { GrEmptyCircle } from "react-icons/gr";
import { LuWrench } from "react-icons/lu";
import { LuShield } from "react-icons/lu";
import { MdCurrencyRupee } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { FiPlay } from "react-icons/fi";
import { GrDocumentText } from "react-icons/gr";
import { BiNotepad } from "react-icons/bi";

function MyProgress() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="bg-[#f5f2eb]  min-h-screen overflow-hidden">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <Navbar />

      <div
        className={`${showSidebar ? "lg:pl-60  px-6 py-5 mt-23" : "lg:pl-50 lg:pr-30 px-6 py-5 mt-23"}`}
      >
        <WelcomeBanner />

        <div className="lg:grid lg:grid-cols-4 lg:gap-3 grid grid-cols-2 gap-3 mb-6">
          <StatCard
            icon={FaBullseye}
            iconColor="text-[#c2815b]"
            iconBgColor="bg-gray-200"
            stats="49%"
            statName="Roadmap Progress"
            weekStat="+12% this week"
          />
          <StatCard
            icon={LuBookMarked}
            iconColor="text-gray-800"
            iconBgColor="bg-gray-200"
            stats="2"
            statName="Interest Saved"
            weekStat=""
          />
          <StatCard
            icon={FiBookOpen}
            iconColor="text-blue-600"
            iconBgColor="bg-gray-200"
            stats="7"
            statName="Resource Accessed"
            weekStat="+2 today"
          />

          <StatCard
            icon={RxPeople}
            iconColor="text-purple-600"
            iconBgColor="bg-gray-200"
            stats="1"
            statName="Active Mentor"
            weekStat=""
          />
        </div>

        <div className="grid grid-cols-3 w-full bg-[#e8e4da] py-2 text-[13px] font-DM-Sans rounded-2xl mb-6">
          <div className="text-center">
            <p>Overview</p>
          </div>
          <div className="text-center">Badges</div>
          <div className="text-center">Activity</div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white px-6 py-5 rounded-2xl">
            <h3 className="mb-3 text-[18px] font-Outfit font-extrabold">
              Roadmap Steps
            </h3>

            <div className="flex items-center justify-between mb-3">
              <div className="bg-[#1e3a1e] text-white px-2 py-2 rounded-2xl">
                <GrEmptyCircle />
              </div>
              <div className="w-[90%]">
                <div className="flex items-center justify-between text-[12px] font-DM-Sans font-semibold mb-1">
                  <p>Idea Validation</p>
                  <p>100%</p>
                </div>
                <div className="py-[3px] bg-[#1e3a1e] rounded-2xl"></div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="bg-[#1e3a1e] text-white px-2 py-2 rounded-2xl">
                <LuWrench />
              </div>
              <div className="w-[90%]">
                <div className="flex items-center justify-between text-[12px] font-DM-Sans font-semibold mb-1">
                  <p>Skills & Tools Audit</p>
                  <p>100%</p>
                </div>
                <div className="py-[3px] bg-[#1e3a1e] rounded-2xl"></div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="bg-[#c4622a] text-white px-2 py-2 rounded-2xl">
                <LuShield />
              </div>
              <div className="w-[90%]">
                <div className="flex items-center justify-between text-[12px] font-DM-Sans font-semibold mb-1">
                  <p>Legal & MSME Registration</p>
                  <p>45%</p>
                </div>
                <div className="py-[3px] bg-[#c4622a] rounded-2xl"></div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="bg-[#e8e4da] text-[#6f6c63]  px-2 py-2 rounded-2xl">
                <MdCurrencyRupee />
              </div>
              <div className="w-[90%]">
                <div className="flex items-center justify-between text-[12px] font-DM-Sans font-semibold mb-1">
                  <p>Cost Estimation & Pricing</p>
                  <p>0%</p>
                </div>
                <div className="py-[3px] bg-[#e8e4da] rounded-2xl"></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="bg-[#e8e4da] text-[#49473f]  px-2 py-2 rounded-2xl">
                <CiGlobe />
              </div>
              <div className="w-[90%]">
                <div className="flex items-center justify-between text-[12px] font-DM-Sans font-semibold mb-1">
                  <p>Marketing & First Customers</p>
                  <p>0%</p>
                </div>
                <div className="py-[3px] bg-[#e8e4da] rounded-2xl"></div>
              </div>
            </div>
          </div>

          <div className="bg-white px-6 py-5 rounded-2xl">
            <h3 className="mb-3 text-[18px] font-Outfit font-extrabold">
              Resource Program
            </h3>

            <div className="flex items-center justify-between mb-2">
              <div className="bg-pink-100 text-red-500 px-2 py-2.5 rounded-xl">
                <FiPlay />
              </div>
              <div className="flex flex-col justify-center w-[80%]">
                <p className=" text-[12px] font-DM-Sans font-semibold mb-0.5">
                  How to Validate Your Business Idea in 7 Days
                </p>
                <div className="w-[100%] py-[3px] bg-green-500 rounded-2xl"></div>
              </div>
              <div className=" text-[10px] text-gray-600 font-DM-Sans font-semibold mb-1">
                <p>100%</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 text-blue-500 px-2 py-2.5 rounded-xl">
                <GrDocumentText />
              </div>
              <div className="flex flex-col justify-center w-[80%]">
                <p className=" text-[12px] font-DM-Sans font-semibold mb-0.5">
                  How to Validate Your Business Idea in 7 Days
                </p>
                <div className="w-[100%] py-[3px] bg-green-500 rounded-2xl"></div>
              </div>
              <div className=" text-[10px] text-gray-600 font-DM-Sans font-semibold mb-1">
                <p>100%</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 text-green-500 px-2 py-2.5 rounded-xl">
                <BiNotepad />
              </div>
              <div className="flex flex-col justify-center w-[80%]">
                <p className=" text-[12px] font-DM-Sans font-semibold mb-0.5">
                  How to Validate Your Business Idea in 7 Days
                </p>
                <div className="w-[100%] py-[3px] bg-green-500 rounded-2xl"></div>
              </div>
              <div className=" text-[10px] text-gray-600 font-DM-Sans font-semibold mb-1">
                <p>33%</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <div className="bg-pink-100 text-red-500 px-2 py-2.5 rounded-xl">
                <FiPlay />
              </div>
              <div className="flex flex-col justify-center w-[80%]">
                <p className=" text-[12px] font-DM-Sans font-semibold mb-0.5">
                  How to Validate Your Business Idea in 7 Days
                </p>
                <div className="w-[100%] py-[3px] bg-green-500 rounded-2xl"></div>
              </div>
              <div className=" text-[10px] text-gray-600 font-DM-Sans font-semibold mb-1">
                <p>60%</p>
              </div>
            </div>

             <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 text-blue-500 px-2 py-2.5 rounded-xl">
                <GrDocumentText />
              </div>
              <div className="flex flex-col justify-center w-[80%]">
                <p className=" text-[12px] font-DM-Sans font-semibold mb-0.5">
                  How to Validate Your Business Idea in 7 Days
                </p>
                <div className="w-[100%] py-[3px] bg-green-500 rounded-2xl"></div>
              </div>
              <div className=" text-[10px] text-gray-600 font-DM-Sans font-semibold mb-1">
                <p>0%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProgress;
