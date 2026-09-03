import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";

function Navbar(){
    return(
        <div className="flex items-center justify-between bg-white relative z-0 border-b border-gray-300">
                <div className="text-[18px] font-Outfit font-bold px-22 py-5">
                  My Dashboard
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-DM-Sans bg-[#e8e4da] text-[15px] px-3 py-2 rounded-xl w-52">
                    <CiSearch />
                    <input type="text" placeholder="Search..." />
                  </div>
                  <IoMdNotificationsOutline className="ml-3 mr-4 text-[18px] " />
                </div>
              </div>
    )
}

export default Navbar;