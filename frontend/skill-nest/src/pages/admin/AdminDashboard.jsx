import React from "react";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  console.log("Redux user:", user);
  console.log("Redux authenticated:", isAuthenticated);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

        <p className="text-gray-500 mt-1">
          Welcome {user?.name}, Admin. Here's what's happening in SkillForge.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">Total Mentors</p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">0</h2>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">Business Ideas</p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">0</h2>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">Resources</p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">0</h2>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">Open Reports</p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">0</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
