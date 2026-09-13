import { GoDash } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function LearningResources({ dashboard }) {
  const navigate = useNavigate();
  const resources = dashboard?.roadmap?.steps?.flatMap((step) => step.resources || []) || [];
  return <div className="mb-4 rounded-2xl bg-white px-6 py-6"><div className="mb-2 flex items-center gap-1 text-[11px] font-semibold text-[#c4622a]"><GoDash />CONTINUE LEARNING</div><div className="mb-4 flex items-center justify-between"><h3 className="font-Outfit text-lg font-extrabold">Your resources</h3><button type="button" onClick={() => navigate("/learner/resources")} className="text-xs font-semibold text-[#c4622a]">View all</button></div>{resources.length ? <div className="grid gap-3 md:grid-cols-3">{resources.slice(0, 3).map((resource) => <a key={resource._id} href={resource.url} target="_blank" rel="noreferrer" className="rounded-xl bg-[#f5f2eb] p-4"><p className="text-[10px] font-semibold text-gray-500">{resource.type}</p><p className="mt-2 text-sm font-semibold">{resource.title}</p></a>)}</div> : <p className="text-sm text-gray-500">No published resources are attached to this roadmap yet.</p>}</div>;
}

export default LearningResources;
