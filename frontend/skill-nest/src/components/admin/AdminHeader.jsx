import React from "react";
import { useSelector } from "react-redux";

const AdminHeader = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          {user?.role === "admin" && <p>Admin Panel</p>}
        </h2>

        <p className="text-sm text-gray-500">Manage your SkillForge platform</p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <button
          type="button"
          className="relative w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
        >
          <span className="text-xl">🔔</span>

          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Admin Profile */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">Admin</p>

            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
