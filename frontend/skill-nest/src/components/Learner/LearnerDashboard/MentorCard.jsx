import { GoDash } from "react-icons/go";
import { FaStar } from "react-icons/fa";

function MentorCard({ dashboard }) {
  const mentor = dashboard?.bookedMentor?.[0];
  const name = mentor?.user?.name || "No mentor booked";
  return <div className="mb-4 rounded-2xl bg-white px-6 py-6"><div className="mb-3 flex items-center gap-1 text-[11px] font-semibold text-[#c4622a]"><GoDash />MY MENTOR</div>{mentor ? <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4cec0] font-bold">{name.charAt(0)}</div><div><p className="text-sm font-semibold">{name}</p><p className="text-xs text-gray-600">{mentor.title || "Mentor"}</p><p className="flex items-center gap-1 text-xs text-[#c4622a]"><FaStar />{Number(mentor.rating || 0).toFixed(1)}</p></div></div> : <p className="text-sm text-gray-500">Book a verified mentor to see them here.</p>}</div>;
}

export default MentorCard;
