import { CiSearch } from "react-icons/ci";
import NotificationBell from "../../Notifications/NotificationBell";

function Navbar({ showSidebar }) {
  return (
    <header
      className={`
        fixed
        top-0
        right-0
        h-[82px]
        bg-white
        border-b
        border-gray-300
        z-30
        transition-all
        duration-300
        ease-in-out

        ${
          showSidebar
            ? "md:left-[220px]"
            : "md:left-[88px]"
        }

        left-0
      `}
    >
      <div className="h-full flex items-center justify-between px-5 sm:px-6">

        {/* Page Title */}
        <h1 className="text-[18px] sm:text-[20px] font-Outfit font-bold">
          My Dashboard
        </h1>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Search */}
          <div
            className="
              hidden
              sm:flex
              items-center
              gap-2
              bg-[#e8e4da]
              text-[15px]
              px-3
              py-2.5
              rounded-xl
              w-52
            "
          >
            <CiSearch className="text-[20px]" />

            <input
              type="text"
              placeholder="Search..."
              className="
                bg-transparent
                outline-none
                w-full
                font-DM-Sans
              "
            />
          </div>

          {/* Notification */}
          <NotificationBell />

        </div>
      </div>
    </header>
  );
}

export default Navbar;