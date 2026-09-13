import { MdArrowRightAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function WelcomeBanner({ dashboard }) {
  const navigate = useNavigate();
  const interests = dashboard?.learner?.interests || dashboard?.learner?.skills || [];
  return <div className="mb-4 rounded-2xl bg-[#1e3a1e] px-6 py-6 text-white"><p className="text-sm text-gray-300">Welcome back,</p><h3 className="mb-2 font-Outfit text-2xl font-bold">{dashboard?.learner?.name || "Learner"}</h3><div className="mb-3 flex flex-wrap gap-2">{interests.length ? interests.slice(0, 3).map((interest) => <span key={interest} className="rounded-xl bg-[#4d744d91] px-2 py-1 text-xs">{interest}</span>) : <span className="text-xs text-gray-400">Complete onboarding to personalize your journey.</span>}</div><p className="mb-4 text-sm text-gray-300">Roadmap: <span className="text-[#c4622a]">{dashboard?.businessIdea?.title || "Not selected"}</span> · Progress: <span className="text-[#c4622a]">{dashboard?.roadmapProgress || 0}%</span></p><button type="button" onClick={() => navigate(dashboard?.roadmap ? "/learner/my-roadmap" : "/learner/business-ideas")} className="flex items-center gap-1 rounded-2xl bg-[#c4622a] px-4 py-2 text-sm font-semibold">{dashboard?.roadmap ? "Continue Roadmap" : "Browse Ideas"}<MdArrowRightAlt /></button></div>;
}

export default WelcomeBanner;
