import { PiPlantThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const navLink =
    "text-gray-500 hover:text-[#c4622a] transition-colors duration-200";
  return (
    <header className="fixed w-full top-0 bg-[#f5f5f5] border-b border-gray-200">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4 ">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <PiPlantThin className="bg-primary text-white p-2 w-10 h-10 rounded-lg" />
          <div>
            <h3 className="font-bold font-Outfit text-lg leading-tight">
              EntreSkill Hub
            </h3>
            <p className="text-sm text-gray-400 font-Outfit leading-tight">
              Skill-to-Startup Platform
            </p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 font-DM-Sans font-semibold text-sm text-gray-500">
          <li>
            <a href="#businessidea" className={navLink}>
              Business Ideas
            </a>
          </li>
          <li>
            <a href="#roadmaps" className={navLink}>
              Roadmaps
            </a>
          </li>
          <li>
            <a href="#mentors" className={navLink}>
              Mentors
            </a>
          </li>
          <li>
            <a href="#resources" className={navLink}>
              Resources
            </a>
          </li>
        </ul>

        {/* Desktop Buttons*/}
        <div className="hidden md:flex items-center gap-3 font-DM-Sans">
          <a
            href="/login"
            className="px-4 py-2 text-sm hover:text-primary transition-colors"
          >
            Sign In
          </a>

          <a
            onClick={() => navigate("/signup")}
            className="bg-primary text-white px-6 py-3 rounded-full hover:bg-amber-700 transition-colors cursor-pointer"
          >
            Get Started Free
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
