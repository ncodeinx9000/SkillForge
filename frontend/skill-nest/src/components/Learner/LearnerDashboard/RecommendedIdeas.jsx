import { GoDash } from "react-icons/go";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../lib/axios";

function RecommendedIdeas() {
  const [ideas, setIdeas] = useState([]);
  const navigate = useNavigate();
  useEffect(() => { api.get("/businessIdea/getBusinessIdeas").then((response) => setIdeas(response.data.ideas || [])).catch(() => setIdeas([])); }, []);
  return <section className="mb-4 rounded-2xl bg-white px-6 py-6"><div className="mb-2 flex items-center gap-1 text-[11px] font-semibold text-[#c4622a]"><GoDash />RECOMMENDED FOR YOU</div><div className="mb-4 flex items-center justify-between"><h3 className="font-Outfit text-lg font-extrabold">Based on your skills and interests</h3><button type="button" onClick={() => navigate("/learner/business-ideas")} className="text-xs font-semibold text-[#c4622a]">Browse all</button></div>{ideas.length ? <div className="grid gap-3 md:grid-cols-3">{ideas.slice(0, 3).map((idea) => <button type="button" key={idea._id} onClick={() => navigate(`/learner/business-idea?id=${idea._id}`)} className="rounded-xl bg-[#f5f2eb] p-4 text-left"><p className="text-[10px] font-semibold text-gray-500">{idea.category?.join(" · ")}</p><p className="mt-2 text-sm font-semibold">{idea.title}</p><p className="mt-1 text-xs text-gray-600">₹{idea.investment?.min || 0} - ₹{idea.investment?.max || 0}</p></button>)}</div> : <p className="text-sm text-gray-500">No published recommendations yet.</p>}</section>;
}

export default RecommendedIdeas;
