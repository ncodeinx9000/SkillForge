import { FiHome } from "react-icons/fi";
import { LuLightbulb } from "react-icons/lu";
import { FaBullseye } from "react-icons/fa6";
import { FiBookOpen } from "react-icons/fi";
import { RxPeople } from "react-icons/rx";
import { FaArrowTrendUp } from "react-icons/fa6";
import { useState } from "react";
import { PiPlantThin } from "react-icons/pi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { MdOutlineLogout } from "react-icons/md";

function Sidebar({ showSidebar, setShowSidebar }) {
  const navigate = useNavigate();

  const navItems = [
    { icon: FiHome, label: "Dashboard" },
    { icon: LuLightbulb, label: "Business Ideas" },
    { icon: FaBullseye, label: "My Roadmap" },
    { icon: FiBookOpen, label: "Resources" },
    { icon: RxPeople, label: "Find Mentors" },
    { icon: FaArrowTrendUp, label: "My Progress" },

  ];

  const userSetting = [
    {icon: CiSettings, label:"Settings"},
    {icon: MdOutlineLogout, label: "Log Out"}
  ]

  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      {showSidebar ? (
        <div className="hidden md:flex flex-col  bg-[#1e3a1e] w-55 fixed top-0 left-0 h-screen z-10">
          <div className="flex items-center justify-between gap-1 py-4.5  border-b border-gray-500 px-4">
            <div className="flex items-center gap-1.5">
              <div className="bg-[#c4662a] text-white px-2 py-2 rounded-xl">
                <PiPlantThin className="text-[13px]" />
              </div>
              <p className="text-white text-[15px] font-DM-Sans font-extrabold">
                SkilF<span className="text-[#c4622a]">orge</span>
              </p>
            </div>

            <MdKeyboardArrowRight
              className="text-white"
              onClick={() => {
                setShowSidebar(!showSidebar);
              }}
            />
          </div>

          {navItems.map(({ icon: Icon, label }, index) => (
            <div
              key={label}
              onClick={() => {
                setActiveIndex(index);
                navigate(
                  `/learner/${label.toLowerCase().replace(/\s+/g, "-")}`,
                );
              }}
              className={`flex items-center text-[14px] text-white font-DM-Sans font-semibold gap-2 px-2.5 py-2 ml-2 mr-2 mt-2 mb-0.5 rounded-2xl cursor-pointer transition-colors ${
                activeIndex === index
                  ? "bg-[#c4662a]"
                  : "bg-transparent hover:bg-[#2d4d2d]"
              }`}
            >
              <Icon />
              <p>{label}</p>
            </div>
          ))}

          <div className="mt-auto">
            {userSetting.map(({icon: Icon, label}, index) => (
              <div 
              key={label}
              onClick={() => {
                setActiveIndex(index);
                navigate(
                  `/learner/${label.toLowerCase().replace(/\s+/g, "-")}`,
                );
              }}
              className={`flex items-center text-[14px] text-white font-DM-Sans font-semibold gap-2 px-2.5 py-2 ml-2 mr-2 mt-2 mb-0.5 rounded-2xl cursor-pointer transition-colors ${
                activeIndex === index
                  ? "bg-[#c4662a]"
                  : "bg-transparent hover:bg-[#2d4d2d]"
              }`}>
                <Icon />
                <p>{label}</p>
              </div>
          ))}
          </div>
          
        </div>
      ) : (
        <div className="hidden md:flex flex-col  bg-[#1e3a1e] fixed top-0 left-0 h-screen z-10">
          <div className="flex items-center gap-1 py-4.5  border-b border-gray-500 px-4">
            <div className="bg-[#c4662a] text-white px-2 py-2 rounded-xl">
              <PiPlantThin className="text-[13px]" />
            </div>
            <MdKeyboardArrowRight
              className="text-white"
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </div>
          {navItems.map(({ icon: Icon, label }, index) => (
            <div
              key={index}
              onClick={() => {
                setActiveIndex(index);
                navigate(
                  `/learner/${label.toLowerCase().replace(/\s+/g, "-")}`,
                );
              }}
              className={`text-[14px] text-white font-DM-Sans font-semibold px-2 w-12 py-2 ml-2 mr-2 mt-2 mb-0.5 rounded-2xl cursor-pointer transition-colors ${
                activeIndex === index
                  ? "bg-[#c4662a]"
                  : "bg-transparent hover:bg-[#2d4d2d]"
              }`}
            >
              <Icon />
            </div>
          ))}

           <div className="mt-auto">
            {userSetting.map(({icon: Icon, label}, index) => (
              <div 
              key={index}
              onClick={() => {
                setActiveIndex(index);
                navigate(
                  `/learner/${label.toLowerCase().replace(/\s+/g, "-")}`,
                );
              }}
               className={`text-[14px] text-white font-DM-Sans font-semibold px-2 w-12 py-2 ml-2 mr-2 mt-2 mb-0.5 rounded-2xl cursor-pointer transition-colors ${
                activeIndex === index
                  ? "bg-[#c4662a]"
                  : "bg-transparent hover:bg-[#2d4d2d]"
              }`}>
                <Icon />
              </div>
          ))}
          </div>
        </div>
      )}


    </>
  );
}

export default Sidebar;
