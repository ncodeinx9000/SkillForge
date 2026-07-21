import { PiPlantThin } from "react-icons/pi";

function Logo() {
  return (
    <div className="flex items-center gap-2 px-6 py-4">
      <span className="bg-[#c4622a] text-white px-1.5 py-1.5 rounded">
        <PiPlantThin />
      </span>
      <h1 className=" font-bold font-Outfit text-[22px] ">EntreSkill Hub</h1>
    </div>
  );
}

export default Logo;
