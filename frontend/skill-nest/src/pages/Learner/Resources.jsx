import { useEffect, useState } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import Navbar from "../../components/Learner/LearnerDashboard/Navbar";
import Sidebar from "../../components/Learner/LearnerDashboard/Sidebar";
import api from "../../lib/axios";

function Resources() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [progress, setProgress] = useState(null);
  const [resources, setResources] = useState([]);
  const [type, setType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(null);

  const loadResources = async () => {
    try {
      setLoading(true);
      const progressResponse = await api.get("/progress/my-progress");
      const activeRoadmap = progressResponse.data.activeRoadmap;
      setProgress(progressResponse.data);
      if (!activeRoadmap?.roadmap?._id) {
        setResources([]);
        return;
      }
      const resourceResponse = await api.get(`/learner/allResources/${activeRoadmap.roadmap._id}`);
      setResources(resourceResponse.data.resources || []);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load learning resources.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadResources(); }, []);

  const toggleCompletion = async (resourceId) => {
    try {
      setUpdating(resourceId);
      await api.patch(`/progress/resource/${resourceId}`);
      await loadResources();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to update resource progress.");
    } finally {
      setUpdating(null);
    }
  };

  const activeProgress = progress?.activeRoadmap;
  const completedIds = new Set(activeProgress?.completedResourceIds || []);
  const visibleResources = type === "All" ? resources : resources.filter((resource) => resource.type === type);
  const percentage = activeProgress?.resourceProgress?.percentage || 0;

  return (
    <div className="min-h-screen bg-[#f5f2eb]">
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Navbar showSidebar={showSidebar} />
      <main className={`${showSidebar ? "lg:pl-60" : "lg:pl-50 lg:pr-30"} mt-23 px-6 py-5`}>
        <p className="text-xs font-semibold tracking-wide text-[#c4622a]">LEARNING RESOURCES</p>
        <h1 className="mb-6 mt-2 font-Outfit text-2xl font-extrabold">Training Library</h1>
        {error && <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        <section className="mb-5 rounded-2xl bg-[#1e3a1e] px-6 py-5 text-white">
          <div className="flex items-center justify-between"><div><p className="text-sm text-gray-300">Your resource progress</p><p className="mt-1 text-xs text-gray-300">{activeProgress?.resourceProgress?.completed || 0} of {activeProgress?.resourceProgress?.total || 0} completed</p></div><strong className="text-3xl">{percentage}%</strong></div>
          <div className="mt-4 h-2 rounded-full bg-white/20"><div className="h-2 rounded-full bg-[#d9a77e]" style={{ width: `${percentage}%` }} /></div>
        </section>
        <div className="mb-5 flex flex-wrap gap-2">{["All", "Article", "Video", "PDF", "Template", "Website", "Course"].map((resourceType) => <button key={resourceType} onClick={() => setType(resourceType)} className={`rounded-full px-4 py-2 text-xs ${type === resourceType ? "bg-[#1e3a1e] text-white" : "bg-white text-gray-600"}`}>{resourceType}</button>)}</div>
        {loading ? <div className="rounded-2xl bg-white p-8 text-center text-sm text-gray-500">Loading resources...</div> : visibleResources.length === 0 ? <div className="rounded-2xl bg-white p-8 text-center text-sm text-gray-500">{activeProgress ? "No published resources are attached to this roadmap yet." : "Select a business idea to unlock its resources."}</div> : <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{visibleResources.map((resource) => { const completed = completedIds.has(resource._id); return <article key={resource._id} className="overflow-hidden rounded-2xl bg-white"><>{resource.thumbnail && <img src={resource.thumbnail} alt="" className="h-32 w-full object-cover" />}</><div className="p-5"><div className="mb-3 flex items-start justify-between gap-3"><span className="rounded-full bg-[#f5f2eb] px-2 py-1 text-[10px] font-semibold text-gray-600">{resource.type}</span><button title={completed ? "Mark incomplete" : "Mark complete"} disabled={updating === resource._id} onClick={() => toggleCompletion(resource._id)} className="text-[#1e3a1e] disabled:opacity-50">{completed ? <FaCheckCircle /> : <FaRegCircle />}</button></div><h2 className="font-Outfit font-bold">{resource.title}</h2><p className="mt-2 line-clamp-3 text-xs text-gray-500">{resource.description || "Open this resource to continue learning."}</p><div className="mt-4 flex items-center justify-between gap-2"><span className="text-[11px] text-gray-400">{resource.estimatedDuration || "Self-paced"}</span><a href={resource.url} target="_blank" rel="noreferrer" className="rounded-lg bg-[#1e3a1e] px-3 py-2 text-xs font-semibold text-white">Open</a></div></div></article>; })}</div>}
      </main>
    </div>
  );
}

export default Resources;
