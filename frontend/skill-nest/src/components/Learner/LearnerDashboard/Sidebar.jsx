import { FiHome, FiBookOpen } from "react-icons/fi";
import { LuLightbulb } from "react-icons/lu";
import { FaBullseye, FaArrowTrendUp } from "react-icons/fa6";
import { RxPeople } from "react-icons/rx";
import { useState } from "react";
import { PiPlantThin } from "react-icons/pi";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/userSlice";
import { logoutUser } from "../../../lib/logout";
import { MdOutlineLogout } from "react-icons/md";
import { FiUser } from "react-icons/fi";

function Sidebar({ showSidebar, setShowSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const navItems = [
    {
      icon: FiHome,
      label: "Dashboard",
      path: "/learner/dashboard",
    },
    {
      icon: LuLightbulb,
      label: "Business Ideas",
      path: "/learner/business-ideas",
    },
    {
      icon: FaBullseye,
      label: "My Roadmap",
      path: "/learner/my-roadmap",
    },
    {
      icon: FiBookOpen,
      label: "Resources",
      path: "/learner/resources",
    },
    {
      icon: RxPeople,
      label: "Find Mentors",
      path: "/learner/find-mentors",
    },
    {
      icon: FaArrowTrendUp,
      label: "My Progress",
      path: "/learner/my-progress",
    },
    {
      icon: FiUser,
      label: "My Profile",
      path: "/learner/profile",
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside
      className={`
        fixed
        top-0
        left-0
        h-screen
        bg-[#1e3a1e]
        z-40
        transition-all
        duration-300
        ease-in-out
        ${showSidebar ? "w-[220px]" : "w-[88px]"}
      `}
    >
      {/* Logo / Toggle */}
      <div
        className={`
          h-[82px]
          flex
          items-center
          border-b
          border-gray-500
          transition-all
          duration-300
          ${showSidebar ? "justify-between px-4" : "justify-center px-2"}
        `}
      >
        {showSidebar && (
          <div className="flex items-center gap-1.5">
            <div className="bg-[#c4662a] text-white p-2 rounded-xl">
              <PiPlantThin className="text-[14px]" />
            </div>

            <p className="text-white text-[15px] font-DM-Sans font-extrabold">
              SkilF<span className="text-[#c4622a]">orge</span>
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowSidebar(!showSidebar)}
          className="
            text-white
            hover:bg-[#2d4d2d]
            rounded-lg
            p-1.5
            transition-colors
          "
        >
          {showSidebar ? (
            <MdKeyboardArrowLeft className="text-[22px]" />
          ) : (
            <MdKeyboardArrowRight className="text-[22px]" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = isActive(path);

          return (
            <button
              key={path}
              type="button"
              onClick={() => navigate(path)}
              title={!showSidebar ? label : ""}
              className={`
                w-full
                flex
                items-center
                ${showSidebar ? "gap-3 px-3" : "justify-center px-2"}
                py-3
                mb-1
                rounded-2xl
                text-white
                font-DM-Sans
                font-semibold
                text-[14px]
                cursor-pointer
                transition-all
                duration-200
                ${
                  active
                    ? "bg-[#c4662a]"
                    : "bg-transparent hover:bg-[#2d4d2d]"
                }
              `}
            >
              <Icon className="text-[19px] shrink-0" />

              {showSidebar && (
                <span className="whitespace-nowrap">
                  {label}
                </span>
              )}
            </button>
          );
        })}
      </nav>
      <button type="button" onClick={async () => { await logoutUser(dispatch, logout); navigate("/login", { replace: true }); }} title={!showSidebar ? "Log out" : ""} className={`absolute bottom-4 ${showSidebar ? "left-3 right-3 justify-start px-3" : "left-2 right-2 justify-center px-2"} flex items-center gap-3 rounded-2xl py-3 text-sm font-semibold text-white hover:bg-[#2d4d2d]`}><MdOutlineLogout className="text-[19px]" />{showSidebar && "Log out"}</button>
    </aside>
  );
}

export default Sidebar;