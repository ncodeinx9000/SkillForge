import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";


function Navbar({showSidebar}){
    return(
        <div className="fixed flex items-center justify-between bg-white w-full z-0 border-b border-gray-300 ">
                <div className={`${showSidebar ? "text-[18px] font-Outfit font-bold lg:px-60  px-6 py-5" : "text-[18px] font-Outfit font-bold lg:px-25  px-6 py-5"}`}>
                   My Dashboard
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-DM-Sans bg-[#e8e4da] text-[15px] px-3 py-2 rounded-xl w-52">
                    <CiSearch />
                    <input type="text" placeholder="Search..."  />
                  </div>
                  <IoMdNotificationsOutline className="ml-3 mr-4 text-[18px] " />
                </div>
              </div>
    )
}

export default Navbar;