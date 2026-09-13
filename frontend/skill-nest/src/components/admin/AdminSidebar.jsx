import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/userSlice";
import { FaUsers } from "react-icons/fa";
import { logoutUser } from "../../lib/logout";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser(dispatch, logout);
    navigate("/login", { replace: true });
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: "📊",
    },

    {
      name: "Mentors",
      path: "/admin/mentors",
      icon: "👨‍🏫",
    },

    {
      name: "Users",
      path: "/admin/users",
      icon: "👥",
    },

    {
      name: "Learners",
      path: "/admin/learners",
      icon: <FaUsers />,
    },

    {
      name: "Business Ideas",
      path: "/admin/business-ideas",
      icon: "💡",
    },


    {
      name: "Roadmaps",
      path: "/admin/roadmaps",
      icon: "🗺️",
    },

    {
      name: "Resources",
      path: "/admin/resources",
      icon: "📚",
    },

    {
      name: "Reports",
      path: "/admin/reports",
      icon: "🚩",
    },

    {
      name: "Profile",
      path: "/admin/profile",
      icon: "⚙️",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#1e3a1e] text-white flex flex-col">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-white/20">
        <div>
          <h1 className="text-2xl font-bold text-white">Skill<span className="text-[#e08a50]">Forge</span></h1>

          <p className="text-xs text-gray-300 mt-1">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-[#c4662a] text-white"
                    : "text-gray-200 hover:bg-[#2d4d2d] hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>

              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/20">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#f2b08a] hover:bg-[#2d4d2d] transition"
        >
          <span className="text-lg">🚪</span>

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
