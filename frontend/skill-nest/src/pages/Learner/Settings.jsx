import { useState } from "react";
import Navbar from "../../components/Learner/LearnerDashboard/Navbar";
import Sidebar from "../../components/Learner/LearnerDashboard/Sidebar";
import { GoDash } from "react-icons/go";
import { MdOutlinePersonOutline } from "react-icons/md";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuShield } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { MdOutlineFileUpload } from "react-icons/md";

function Settings() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="bg-[#f5f2eb]  min-h-screen overflow-hidden">
      <Sidebar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />

      <Navbar showSidebar={showSidebar} />

      <div
        className={`${showSidebar ? "lg:pl-75  px-6 py-5 mt-23" : "lg:pl-50 lg:pr-30 px-6 py-5 mt-23"}`}
      >
        <div className="flex items-center gap-1 text-[11px] font-DM-Sans text-[#c4622a] font-semibold mb-2">
          <GoDash />
          <p className="">SETTINGS</p>
        </div>

        <h3 className="text-[20px] font-Outfit font-extrabold mb-10">Account Settings</h3>

        <div className="flex items-start gap-10">
            <div className="text-[14px] bg-white px-5 py-4 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                    <MdOutlinePersonOutline />
                    <p>Profile</p>
                </div>
                <div className="flex items-center gap-2 mb-3">
                    <AiOutlineThunderbolt />
                    <p>Skills & Interests</p>
                </div>
                <div className="flex items-center gap-2 mb-3">
                    <IoMdNotificationsOutline />
                    <p>Notifications</p>
                </div>
                <div className="flex items-center gap-2 mb-3">
                    <LuShield />
                    <p>Security</p>
                </div>
                <div className="flex items-center gap-2">
                    <CiSettings />
                    <p>Account</p>
                </div>
            </div>
            <div className="w-[60%] bg-white  px-6 py-7 rounded-2xl">
                <h2 className="text-[17px] font-Outfit font-extrabold mb-5">Public Profile</h2>

                <div className="flex items-center gap-5 mb-5">
                    <div className="bg-[#1e3a1e] text-white font-Outfit text-[25px] font-semibold px-6.5 py-4 rounded-2xl">
                        <p>K</p>
                    </div>
                    <div>
                        <p className="text-[14px] font-DM-Sans font-semibold">Kavitha Menon</p>
                        <p className="text-[13px] text-gray-600 mb-1.5">user@example.com</p>

                        <div className="flex items-center gap-1 text-[13px] font-DM-Sans text-[#c4622a] font-semibold">
                            <MdOutlineFileUpload />
                            <p>Upload photo</p>
                        </div>
                    </div>
                </div>

                <p className="text-[12px] font-DM-Sans font-semibold text-gray-600 mb-1">FULL NAME</p>
                <input type="text" placeholder="Kavitha Menon" className="bg-[#f5f2eb] px-2 py-2 rounded-2xl border border-[#c4622a] mb-4"/>

                 <p className="text-[12px] font-DM-Sans font-semibold text-gray-600">EMAIL</p>
                <input type="text" placeholder="Kavitha Menon" className="bg-[#f5f2eb] px-2 py-2 rounded-2xl border border-[#c4622a]"/>

                 <p className="text-[12px] font-DM-Sans font-semibold text-gray-600 mb-1">CITY/LOCATION</p>
                <input type="text" placeholder="Thrissur, Kerala" className="bg-[#f5f2eb] px-2 py-2 rounded-2xl border border-[#c4622a] mb-6"/>

                <div className="bg-[#c4622a] text-white text-[15px] font-Outfit px-3 py-2 rounded-2xl">Save Changes</div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
