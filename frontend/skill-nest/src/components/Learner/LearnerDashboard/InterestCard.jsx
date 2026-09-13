import { GoDash } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function InterestCard({ dashboard }) {
  const navigate = useNavigate();
  const interests = dashboard?.learner?.interests || dashboard?.learner?.skills || [];
  return <div className="mb-4 rounded-2xl bg-white px-6 py-6 font-DM-Sans"><div className="mb-5 flex items-end justify-between"><div className="flex items-center gap-1 text-[11px] font-semibold tracking-wide text-[#c4622a]"><GoDash />YOUR INTERESTS</div><button type="button" onClick={() => navigate("/learner/business-ideas")} className="text-[10px] font-bold text-[#c4622a]">See ideas</button></div><div className="flex flex-wrap gap-2 text-xs text-gray-600">{interests.length ? interests.map((interest) => <span key={interest} className="rounded-2xl bg-[#eae3d29d] px-2 py-1">{interest}</span>) : <span className="text-gray-400">No interests saved yet.</span>}</div></div>;
}

export default InterestCard;
