import { useEffect, useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios";

const destination = { Session: "/learner/find-mentors", Question: "/mentor/q&a", Resource: "/mentor/resources", Review: "/mentor/analytics", Report: "/admin/reports", Roadmap: "/learner/my-roadmap" };

function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [error, setError] = useState("");
  const ref = useRef(null);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const [{ data: all }, { data: unreadData }] = await Promise.all([api.get("/notifications"), api.get("/notifications/unread")]);
      setItems(all.notifications || []);
      setUnread(unreadData.unreadCount ?? unreadData.notifications?.length ?? 0);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load notifications.");
    }
  };

  useEffect(() => { load(); const timer = window.setInterval(load, 30000); return () => window.clearInterval(timer); }, []);
  useEffect(() => { const close = (event) => { if (!ref.current?.contains(event.target)) setOpen(false); }; document.addEventListener("mousedown", close); return () => document.removeEventListener("mousedown", close); }, []);

  const markRead = async (item) => {
    if (!item.isRead) { await api.patch(`/notifications/${item._id}/read`); setItems((current) => current.map((entry) => entry._id === item._id ? { ...entry, isRead: true } : entry)); setUnread((count) => Math.max(0, count - 1)); }
    const path = destination[item.relatedModel];
    if (path) navigate(path);
    setOpen(false);
  };
  const markAll = async () => { await api.patch("/notifications/read-all"); setItems((current) => current.map((item) => ({ ...item, isRead: true }))); setUnread(0); };

  return <div ref={ref} className="relative"><button type="button" onClick={() => setOpen((value) => !value)} aria-label="Notifications" className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"><IoMdNotificationsOutline className="text-2xl" />{unread > 0 && <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c4662a] px-1 text-[10px] font-bold text-white">{unread > 9 ? "9+" : unread}</span>}</button>{open && <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl"><div className="flex items-center justify-between border-b pb-3"><h3 className="font-Outfit font-bold">Notifications</h3><button type="button" onClick={markAll} className="text-xs font-semibold text-[#c4662a]">Mark all read</button></div>{error && <p className="p-3 text-xs text-red-600">{error}</p>}{!error && items.length === 0 && <p className="p-6 text-center text-sm text-gray-500">You&apos;re all caught up.</p>}<div className="max-h-80 overflow-y-auto">{items.slice(0, 8).map((item) => <button type="button" key={item._id} onClick={() => markRead(item)} className={`block w-full border-b px-2 py-3 text-left last:border-0 ${item.isRead ? "bg-white" : "bg-[#fff8f3]"}`}><div className="flex gap-2"><span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${item.isRead ? "bg-gray-300" : "bg-[#c4662a]"}`} /><span><p className="text-sm font-semibold text-gray-800">{item.title}</p><p className="mt-1 text-xs text-gray-500">{item.message}</p><p className="mt-1 text-[10px] text-gray-400">{new Date(item.createdAt).toLocaleString()}</p></span></div></button>)}</div></div>}</div>;
}

export default NotificationBell;