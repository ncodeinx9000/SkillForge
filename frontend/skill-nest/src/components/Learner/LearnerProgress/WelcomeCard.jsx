function WelcomeCard({ progress }) {
  const learner = progress?.learner;
  const roadmapProgress = progress?.roadmapProgress?.percentage || 0;
  const completedResources = progress?.resourceProgress?.completed || 0;
  const totalResources = progress?.resourceProgress?.total || 0;
  return <div className="mb-4 rounded-2xl bg-[#1e3a1e] px-6 py-6 text-white"><p className="text-sm text-gray-300">Progress Report</p><h3 className="font-Outfit text-2xl font-bold">{learner?.name || "Learner"}</h3><div className="my-4 h-2 rounded-full bg-white/20"><div className="h-2 rounded-full bg-[#c4662a]" style={{ width: `${roadmapProgress}%` }} /></div><p>{roadmapProgress}% of roadmap complete</p><p className="mt-2 text-sm text-gray-300">{completedResources}/{totalResources} resources done</p></div>;
}

export default WelcomeCard;
