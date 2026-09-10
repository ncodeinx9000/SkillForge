import { GoDash } from "react-icons/go";

import { useState } from "react";
import Navbar from "../../components/Learner/LearnerDashboard/Navbar";
import Sidebar from "../../components/Learner/LearnerDashboard/Sidebar";

import { IoIosArrowDown } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaHandPointRight } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { TbMinusVertical } from "react-icons/tb";
import { CiFilter } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { MdArrowRightAlt } from "react-icons/md";
import { FiPlay } from "react-icons/fi";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { LuClipboardList } from "react-icons/lu";

import Step from "../../components/LearnerRoadmap/Step";
import foodImg from "../../assets/food_catering.jpg";
import BusinessIdeaCard from "../../components/Learner/BusinessIdea";
import ProgressBar from "../../components/onboarding/ProgressBar";
import LearnerResourceCard from "../../components/Learner/LearnerResourceCard";

function BusinessIdea() {
  const [showSidebar, setShowSidebar] = useState(false);

  const [showFullStep, setShowFullStep] = useState(false);

  return (
    <div className="bg-[#f5f2eb]  min-h-screen overflow-hidden">
      {/*sidebar*/}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      <Navbar showSidebar={showSidebar} />

      <div
        className={`${showSidebar ? "lg:pl-60  px-6 py-5 mt-23" : "lg:pl-50 lg:pr-30 px-6 py-5 mt-23"}`}
      >
        <div className="flex gap-2 items-center font-DM-Sans font-semibold text-[11px] text-[#c4622a] tracking-wide mb-2">
          <GoDash />
          <p>Learning Resources</p>
        </div>

        <h2 className="text-[23px] font-Outfit font-extrabold mb-6">
          Training Library
        </h2>

        <div className="flex gap-4 bg-[#1e3a1e] px-6 py-5 rounded-2xl mb-4">
          <div className="flex-1">
            <p className="text-gray-400 text-[15px] font-DM-Sans mb-1">
              Your learning progress
            </p>
            <ProgressBar />
            <p className="text-gray-400 text-[13px] font-DM-Sans">
              2 of 8 completed
            </p>
          </div>
          <div>
            <p className="text-[27px] text-white font-bold">25%</p>
            <p className="text-gray-400">complete</p>
          </div>
        </div>

        <ul className="flex items-center gap-2 text-[13px] mb-5">
          <li className="bg-white text-gray-700 px-4 py-1.5 rounded-2xl">
            All
          </li>
          <li className="bg-white  text-gray-700 px-4 py-1.5 rounded-2xl">
            Video
          </li>
          <li className="bg-white  text-gray-700 px-4 py-1.5 rounded-2xl">
            Article
          </li>
          <li className="bg-white  text-gray-700 px-4 py-1.5 rounded-2xl">
            Checklist
          </li>
          <TbMinusVertical />
          <li className="bg-white text-gray-700 px-4 py-1.5 rounded-2xl">
            All
          </li>
          <li className="bg-white text-gray-700 px-4 py-1.5 rounded-2xl">
            Ideation
          </li>
          <li className="bg-white text-gray-700 px-4 py-1.5 rounded-2xl">
            Legal
          </li>
          <li className="bg-white  text-gray-700 px-4 py-1.5 rounded-2xl">
            Finance
          </li>
          <li className="bg-white  text-gray-700 px-4 py-1.5 rounded-2xl">
            Operations
          </li>
          <li className="bg-white text-gray-700 px-4 py-1.5 rounded-2xl">
            Marketing
          </li>
        </ul>

        <div className="lg:grid lg:grid-cols-3 gap-4">
          <LearnerResourceCard 
          Icon={FiPlay}
          resource="VIDEO IDEATION"
          description="How to Validate Your Business Idea in 7 Days"
          duration="18 min"
          status="Done"
          />

           <LearnerResourceCard 
          Icon={FiPlay}
          resource="VIDEO IDEATION"
          description="How to Validate Your Business Idea in 7 Days"
          duration="18 min"
          status="Done"
          />

           <LearnerResourceCard 
          Icon={FiPlay}
          resource="VIDEO IDEATION"
          description="How to Validate Your Business Idea in 7 Days"
          duration="18 min"
          status="Done"
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessIdea;
