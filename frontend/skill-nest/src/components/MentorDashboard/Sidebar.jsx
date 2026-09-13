import { PiPlantThin } from "react-icons/pi";
import { MdOutlineLogout, MdOutlineFileUpload } from "react-icons/md";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { RxPeople } from "react-icons/rx";
import { GoDeviceCameraVideo, GoComment } from "react-icons/go";
import { VscGraphLine } from "react-icons/vsc";
import { FiUser } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { logoutUser } from "../../lib/logout";

const items = [[HiOutlineSquares2X2, "Dashboard", "/mentor/dashboard"], [RxPeople, "My Mentees", "/mentor/my-mentees"], [GoDeviceCameraVideo, "Sessions", "/mentor/sessions"], [MdOutlineFileUpload, "Resources", "/mentor/resources"], [GoComment, "Q&A", "/mentor/q&a"], [VscGraphLine, "Analytics", "/mentor/analytics"], [FiUser, "My Profile", "/mentor/profile"]];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  return <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col bg-[#1e3a1e] text-white lg:flex">
    <div className="flex items-center gap-2 border-b border-white/20 px-5 py-5"><span className="rounded-xl bg-[#c4662a] p-2"><PiPlantThin /></span><span className="font-bold">Skill<span className="text-[#e08a50]">Forge</span></span></div>
    <nav className="flex-1 px-3 py-4">{items.map(([Icon, label, path]) => <button key={path} onClick={() => navigate(path)} className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold ${location.pathname === path || (path === "/mentor/dashboard" && location.pathname === "/mentor") ? "bg-[#c4662a]" : "hover:bg-[#2d4d2d]"}`}><Icon />{label}</button>)}</nav>
    <button onClick={async () => { await logoutUser(dispatch, logout); navigate("/login", { replace: true }); }} className="m-3 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold hover:bg-[#2d4d2d]"><MdOutlineLogout />Log out</button>
  </aside>;
}

export default Sidebar;
