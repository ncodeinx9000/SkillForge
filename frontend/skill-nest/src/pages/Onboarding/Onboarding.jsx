import Logo from "../../components/onboarding/Logo";
import welcomeImage from "../../assets/welcome-image.png";
import { FaCheck } from "react-icons/fa6";
import { MdArrowRightAlt } from "react-icons/md";
import ProgressBar from "../../components/onboarding/ProgressBar";
import { useNavigate } from "react-router-dom";
function Onboarding() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between px-15 pt-6">
        <Logo />
        <p className="text-[13px] font-DM-Sans font-bold">STEP 1 OF 5</p>
      </div>
      <div className="w-2xl pt-10 mx-auto">
        <ProgressBar currentStep={1} totalStep={5} />
      </div>

      <div className="flex justify-center">
        <img src={welcomeImage} className="h-90 object-cover" alt="" />
      </div>
      <div className="flex flex-col items-center text-gray-600">
        <h1 className="text-[30px] text-black font-bold font-DM-Sans">
          Welcome to SkillNest 👋
        </h1>
        <p className="mb-6">
          Let's personalize your experience in a few simple steps
        </p>
        <ul>
          <li className="flex items-center gap-1 mb-2">
            <FaCheck className="text-[#c4662a]" />
            <p>Get personalised between ideas</p>
          </li>
          <li className="flex items-center gap-1 mb-2">
            <FaCheck className="text-[#c4662a]" />
            <p> Follows step-by-step roadmaps</p>
          </li>
          <li className="flex items-center gap-1 mb-2">
            <FaCheck className="text-[#c4662a]" />
            <p>Learn from expert mentors</p>
          </li>
          <li className="flex items-center gap-1 mb-8">
            <FaCheck className="text-[#c4662a]" />
            <p>track your progress</p>
          </li>
        </ul>
        <div>
          <button
            onClick={() => navigate("/onboarding/skills")}
            className="flex items-center justify-center gap-2 mb-20 font-DM-Sans bg-[#c4662a] text-white w-2xs py-1.5 rounded-xl"
          >
            <p>Let's Start</p>
            <MdArrowRightAlt />
          </button>
        </div>
      </div>
    </>
  );
}

export default Onboarding;
