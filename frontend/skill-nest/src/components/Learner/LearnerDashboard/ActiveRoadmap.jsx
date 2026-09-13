import { GoDash } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function ActiveRoadmap({ dashboard }) {
  const navigate = useNavigate();
  const roadmap = dashboard?.roadmap;
  const percentage = dashboard?.roadmapProgress || 0;
  return <div className="mb-4 rounded-2xl bg-white px-6 py-6"><div className="mb-2 flex items-center gap-1 text-[11px] font-semibold text-[#c4622a]"><GoDash />ACTIVE ROADMAP</div>{roadmap ? <><div className="mb-5 flex items-start justify-between"><h1 className="font-Outfit text-lg font-extrabold">{roadmap.title}</h1><button type="button" onClick={() => navigate("/learner/my-roadmap")} className="text-xs font-semibold text-[#c4622a]">Full roadmap</button></div><div className="mb-5 flex items-center gap-2"><div className="h-2 flex-1 rounded-full bg-gray-200"><div className="h-2 rounded-full bg-[#c4622a]" style={{ width: `${percentage}%` }} /></div><span className="text-xs">{percentage}%</span></div><div className="space-y-2">{(roadmap.steps || []).slice(0, 4).map((step) => <div key={step._id} className="rounded-xl bg-[#f8ede7d1] px-3 py-3"><p className="text-sm font-semibold">{step.order}. {step.title}</p></div>)}</div></> : <p className="text-sm text-gray-500">Select a published business idea to begin a roadmap.</p>}</div>;
}

export default ActiveRoadmap;
