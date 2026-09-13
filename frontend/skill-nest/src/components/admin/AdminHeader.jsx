import React from "react";
import { useSelector } from "react-redux";
import NotificationBell from "../Notifications/NotificationBell";

const AdminHeader = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <header className="h-20 bg-white border-b border-[#d4cec0] flex items-center justify-between px-6">
      {/* Left */}
      <div>
        <h2 className="text-xl font-semibold text-[#1e3a1e]">
          {user?.role === "admin" && <p>Admin Panel</p>}
        </h2>

        <p className="text-sm text-gray-500">Manage your SkillForge platform</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <NotificationBell />

        {/* Admin Profile */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#1e3a1e] text-white flex items-center justify-center font-semibold">
            {user?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">{user?.name || "Admin"}</p>

            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
