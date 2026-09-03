import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../redux/userSlice";

const AdminSidebar = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
    try {
        const response = await fetch(
            `${API_URL}/api/auth/logout`,
            {
                method: "POST",
                credentials: "include",
            }
        );

        const data = await response.json();

        if (data.success) {
            dispatch(logout());
            navigate("/login");
        }
    } catch (error) {
        console.error("Logout error:", error);
    }
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
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">

            {/* Logo */}
            <div className="h-20 flex items-center px-6 border-b border-gray-200">
                <div>
                    <h1 className="text-2xl font-bold text-indigo-600">
                        SkillForge
                    </h1>

                    <p className="text-xs text-gray-500 mt-1">
                        Admin Panel
                    </p>
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
                                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                                    isActive
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`
                            }
                        >
                            <span className="text-lg">
                                {item.icon}
                            </span>

                            <span>
                                {item.name}
                            </span>
                        </NavLink>
                    ))}

                </div>
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-200">
                <button
                    type="button"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition"
                >
                    <span className="text-lg">🚪</span>

                    <span>
                        Logout
                    </span>
                </button>
            </div>

        </aside>
    );
};

export default AdminSidebar;