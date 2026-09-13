import { useEffect, useState } from "react";
import api from "../../lib/axios";

function WelcomeBanner() {
  const [mentor, setMentor] = useState(null);
  useEffect(() => { api.get("/mentor/me").then((response) => setMentor(response.data.mentor)).catch(() => setMentor(null)); }, []);
  const name = mentor?.user?.name || "Mentor";
  return <div className="mb-4 rounded-2xl bg-[#1e3a1e] px-6 py-6 text-white"><div className="flex items-start gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8a533077] text-xl font-semibold">{name.charAt(0)}</div><div><p className="text-lg font-extrabold">{name}</p><p className="text-sm text-gray-300">{mentor?.title || "Mentor profile"} · {mentor?.location || "Location not set"}</p><div className="mt-2 flex flex-wrap gap-2">{(mentor?.expertise || []).slice(0, 4).map((skill) => <span key={skill} className="rounded-full bg-[#3d513d] px-2 py-1 text-[10px]">{skill}</span>)}</div></div></div></div>;
}

export default WelcomeBanner;
