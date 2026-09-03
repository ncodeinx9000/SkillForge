import Navbar from "../../components/Learner/LearnerDashboard.jsx/Navbar";
import Sidebar from "../../components/Learner/LearnerDashboard.jsx/Sidebar";
import { GoDash } from "react-icons/go";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import LearnerMentorCard from "../../components/Learner/LearnerMentorCard";

function Mymentor() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="bg-[#f5f2eb]  min-h-screen overflow-hidden">
      <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />

      <Navbar showSidebar={showSidebar} />

      <div
        className={`${showSidebar ? "lg:pl-60  px-6 py-5 mt-23" : "lg:pl-50 lg:pr-30 px-6 py-5 mt-23"}`}
      >
        <div className="flex gap-2 items-center font-DM-Sans font-semibold text-[11px] text-[#c4622a] tracking-wide mb-2">
          <GoDash />
          <p>Mentor Directory</p>
        </div>

        <h2 className="text-[23px] font-Outfit font-extrabold mb-6">
          Find your mentor
        </h2>

        <div className="relative w-[460px] mb-5">
          <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />

          <input
            type="text"
            placeholder="Search by name or domain..."
            className="
          w-full
          bg-white
          border border-gray-300
          rounded-2xl
          py-3
          pl-12
          pr-4
          text-[15px]
          outline-none
          focus:border-gray-400
          placeholder:text-gray-400
        "
          />
        </div>

        <LearnerMentorCard />
      </div>
    </div>
  );
}

export default Mymentor;
