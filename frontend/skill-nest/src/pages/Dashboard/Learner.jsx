import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiPlantThin } from "react-icons/pi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FiHome } from "react-icons/fi";
import { LuLightbulb } from "react-icons/lu";
import { FaBullseye } from "react-icons/fa6";
import { FiBookOpen } from "react-icons/fi";
import { RxPeople } from "react-icons/rx";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdArrowRightAlt } from "react-icons/md";
import { LuBookMarked } from "react-icons/lu";

export default function Learner() {
  return (
    <div className="bg-[#f5f2eb] w-full min-h-screen">
      {/* Nav */}
      <div className="flex items-center  bg-white relative z-0 border-b border-gray-300">
        <div className="text-[18px] font-Outfit font-bold px-22 py-5">
          My Dashboard
        </div>
        <div className="flex items-center gap-2 font-DM-Sans bg-[#e8e4da] text-[15px] px-3 py-2 rounded-xl w-52 ml-75 lg:ml-240">
          <CiSearch />
          <input type="text" placeholder="Search..." />
        </div>
        <IoMdNotificationsOutline className="ml-6 text-[18px] " />
      </div>

      {/*sidebar*/}
      <div className="bg-[#1e3a1e] absolute top-0 left-0 h-screen z-10">
        <div className="flex items-center gap-1 py-4.5  border-b border-gray-500 ml-4">
          <div className="bg-[#c4662a] text-white px-2 py-2 rounded-xl">
            <PiPlantThin className="text-[13px]" />
          </div>
          <MdKeyboardArrowRight className="text-white" />
        </div>
        <div className="flex w-12 px-2.5 py-3 bg-[#c4662a] ml-2 mt-4 rounded-2xl">
          <FiHome className=" text-white text-[15px]" />
          {/* <p>Dashboard</p> */}
        </div>
        <div className="flex w-12 px-2.5 py-3 bg-[#c4662a] ml-2 rounded-2xl">
          <LuLightbulb className=" text-white text-[15px]" />
        </div>
        <div className="flex w-12 px-2.5 py-3 bg-[#c4662a] ml-2 rounded-2xl">
          <FaBullseye className=" text-white text-[15px]" />
        </div>
        <div className="flex w-12 px-2.5 py-3 bg-[#c4662a] ml-2 rounded-2xl">
          <FiBookOpen className=" text-white text-[15px]" />
        </div>
        <div className="flex w-12 px-2.5 py-3 bg-[#c4662a] ml-2 rounded-2xl">
          <RxPeople className=" text-white text-[15px]" />
        </div>
        <div className="flex w-12 px-2.5 py-3 bg-[#c4662a] ml-2 rounded-2xl">
          <FaArrowTrendUp className=" text-white text-[15px]" />
        </div>
      </div>

      {/* main */}
      <div className="ml-21 mt-7 w-191 lg:w-[75rem] lg:ml-50 ">
        {/* learner Info Card*/}
        <div className="bg-[#1e3a1e] text-white rounded-2xl px-6 py-6 mb-4">
          <p className="text-[#a1a1aa] font-DM-Sans text-[15px]">
            Welcome back,
          </p>
          <h3 className="font-Outfit font-bold text-[27px] mb-1.5">
            Kavitha Menon👋
          </h3>
          <div className="flex gap-2 items-center font-DM-Sans text-[12px] text-[#ececf0] mb-3">
            <p className="bg-[#4d744d91] px-2 py-0.5 rounded-xl">
              Cooking & Food Prep
            </p>
            <p className="bg-[#4d744d91] px-2 py-0.5 rounded-xl">
              Retail & Trading
            </p>
          </div>
          <p className="text-[14px] text-[#a1a1aa] mb-4">
            Roadmap: <span className="text-[#c4622a]">49% complete</span> ·
            Budget:
            <span className="text-[#c4622a]">Rs.5,000 to 20,000</span> ·{" "}
            <span className="text-[#c4622a]">Thrissur, Kerala</span>
          </p>
          <div className="flex gap-4 items-center text-[14px]  text-white font-DM-Sans">
            <div className="flex gap-1.5 items-center bg-[#c4622a] px-4 py-2 rounded-2xl">
              <p>Continue Roadmap </p>
              <MdArrowRightAlt />
            </div>
            <div className="border-1 border-gray-400 px-2.5 py-1 rounded-xl">
              Browse Ideas
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#fff] px-5 py-5 rounded-2xl">
            <div className="flex items-start justify-between mb-3.5 ">
              <div className="bg-gray-200 text-[#c2815b] px-2.5 py-2.5 rounded-xl">
                <FaBullseye />
              </div>
              <div className="text-[11px] font-DM-Sans text-green-700 bg-green-100 font-semibold px-1 py-0.5 rounded-2xl">
                +12% this week
              </div>
            </div>
            <h3 className="text-[25px] font-Outfit font-extrabold mb-1">49%</h3>
            <p className="text-[12px] font-DM-Sans text-gray-500">
              Roadmap Progress
            </p>
          </div>

          <div className="bg-[#fff] px-5 py-5 rounded-2xl">
            <div className="flex items-start justify-between mb-3.5 ">
              <div className="bg-gray-200 text-gray-800 px-2.5 py-2.5 rounded-xl">
                <LuBookMarked />
              </div>
              {/* <div className="text-[11px] font-DM-Sans text-green-700 bg-green-100 font-semibold px-1 py-0.5 rounded-2xl">
                +12% this week
              </div> */}
            </div>
            <h3 className="text-[25px] font-Outfit font-extrabold mb-1">2</h3>
            <p className="text-[12px] font-DM-Sans text-gray-500">
              Interest Saved
            </p>
          </div>
          <div className="bg-[#fff] px-5 py-5 rounded-2xl">
            <div className="flex items-start justify-between mb-3.5 ">
              <div className="bg-gray-200 text-blue-600 px-2.5 py-2.5 rounded-xl">
                <FiBookOpen />
              </div>
              <div className="text-[11px] font-DM-Sans text-green-700 bg-green-100 font-semibold px-1 py-0.5 rounded-2xl">
                +2 today
              </div>
            </div>
            <h3 className="text-[25px] font-Outfit font-extrabold mb-1">7</h3>
            <p className="text-[12px] font-DM-Sans text-gray-500">
              Resources Accessed
            </p>
          </div>
          <div className="bg-[#fff] px-5 py-5 rounded-2xl">
            <div className="flex items-start justify-between mb-3.5 ">
              <div className="bg-gray-200 text-purple-600 px-2.5 py-2.5 rounded-xl">
                <RxPeople />
              </div>
              {/* <div className="text-[11px] font-DM-Sans text-green-700 bg-green-100 font-semibold px-1 py-0.5 rounded-2xl">
                +12% this week
              </div> */}
            </div>
            <h3 className="text-[25px] font-Outfit font-extrabold mb-1">1</h3>
            <p className="text-[12px] font-DM-Sans text-gray-500">
              Active Mentor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
