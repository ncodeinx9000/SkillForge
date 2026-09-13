import { useEffect, useState } from "react";
import { FaCloudUploadAlt, FaPlus, FaTrash } from "react-icons/fa";
import api from "../../lib/axios";
import { uploadAsset } from "../../lib/upload";

const emptyForm = {
    title: "",
    description: "",
    type: "Article",
    url: "",
    thumbnail: "",
    estimatedDuration: "",
    category: "",
    level: "Beginner",
    tags: "",
};

function MentorResources() {
    const [resources, setResources] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const loadResources = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/mentor/resources");
            setResources(data.resources || []);
        } catch (error) {
            setMessage(error.response?.data?.message || "Unable to load resources.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadResources(); }, []);

    const updateField = (event) => setForm({ ...form, [event.target.name]: event.target.value });

    const uploadFile = async (event, field, folder) => {
        const file = event.target.files?.[0];
        if (!file) return;
        try {
            setUploading(true);
            const asset = await uploadAsset(file, folder);
            setForm((current) => ({ ...current, [field]: asset.secure_url || asset.url }));
            setMessage("Upload complete.");
        } catch (error) {
            setMessage(error.response?.data?.message || "Upload failed.");
        } finally {
            setUploading(false);
            event.target.value = "";
        }
    };

    const submit = async (event) => {
        event.preventDefault();
        try {
            setSaving(true);
            const request = editingId ? api.put(`/mentor/resources/${editingId}`, form) : api.post("/mentor/resources", form);
            const { data } = await request;
            setMessage(data.message);
            setForm(emptyForm);
            setEditingId(null);
            await loadResources();
        } catch (error) {
            setMessage(error.response?.data?.message || "Unable to save resource.");
        } finally {
            setSaving(false);
        }
    };

    const edit = (resource) => {
        setEditingId(resource._id);
        setForm({ ...emptyForm, ...resource, tags: (resource.tags || []).join(", ") });
    };

    const remove = async (resourceId) => {
        if (!window.confirm("Delete this resource?")) return;
        try {
            await api.delete(`/mentor/resources/${resourceId}`);
            await loadResources();
        } catch (error) {
            setMessage(error.response?.data?.message || "Unable to delete resource.");
        }
    };

    return (
        <div className="mt-4 space-y-4">
            <section className="rounded-2xl bg-white p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div><h2 className="font-Outfit text-lg font-bold">My Resources</h2><p className="mt-1 text-xs text-gray-500">Submit useful learning material for admin review.</p></div>
                    <span className="rounded-full bg-[#f5f2eb] px-3 py-1 text-xs text-gray-600">{resources.length} total</span>
                </div>
                {message && <p className="mt-3 text-xs text-[#1e3a1e]">{message}</p>}
                <form onSubmit={submit} className="mt-5 grid gap-3 md:grid-cols-2">
                    <input required name="title" value={form.title} onChange={updateField} placeholder="Resource title" className="rounded-xl border p-3 text-sm" />
                    <select name="type" value={form.type} onChange={updateField} className="rounded-xl border p-3 text-sm">{["Article", "Video", "PDF", "Template", "Website", "Course"].map((type) => <option key={type}>{type}</option>)}</select>
                    <textarea name="description" value={form.description} onChange={updateField} placeholder="Description" className="rounded-xl border p-3 text-sm md:col-span-2" rows="3" />
                    <input required name="url" value={form.url} onChange={updateField} placeholder="Resource URL or uploaded file URL" className="rounded-xl border p-3 text-sm" />
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm text-gray-600"><FaCloudUploadAlt />{uploading ? "Uploading..." : "Upload file"}<input type="file" accept="application/pdf,video/mp4,video/webm,video/quicktime,image/jpeg,image/png,image/webp,image/gif,text/plain,text/markdown" onChange={(event) => uploadFile(event, "url", "mentor-resources")} className="hidden" /></label>
                    <input name="thumbnail" value={form.thumbnail} onChange={updateField} placeholder="Thumbnail URL (optional)" className="rounded-xl border p-3 text-sm" />
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm text-gray-600"><FaCloudUploadAlt />Upload thumbnail<input type="file" accept="image/*" onChange={(event) => uploadFile(event, "thumbnail", "mentor-thumbnails")} className="hidden" /></label>
                    <input name="category" value={form.category} onChange={updateField} placeholder="Category" className="rounded-xl border p-3 text-sm" />
                    <input name="tags" value={form.tags} onChange={updateField} placeholder="Tags, comma separated" className="rounded-xl border p-3 text-sm" />
                    <div className="flex gap-2 md:col-span-2"><button disabled={saving || uploading} className="flex items-center gap-2 rounded-xl bg-[#1e3a1e] px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"><FaPlus />{saving ? "Saving..." : editingId ? "Update resource" : "Submit resource"}</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="rounded-xl bg-gray-100 px-4 py-3 text-sm">Cancel</button>}</div>
                </form>
            </section>
            <section className="space-y-3">{loading ? <div className="rounded-2xl bg-white p-6 text-sm text-gray-500">Loading resources...</div> : resources.length === 0 ? <div className="rounded-2xl bg-white p-6 text-sm text-gray-500">No resources submitted yet.</div> : resources.map((resource) => <article key={resource._id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-5">{resource.thumbnail && <img src={resource.thumbnail} alt="" className="h-14 w-20 rounded-lg object-cover" />}<div className="mr-auto"><h3 className="font-Outfit font-bold">{resource.title}</h3><p className="text-xs text-gray-500">{resource.type} · {resource.status}</p></div><div className="flex gap-2"><button onClick={() => edit(resource)} className="rounded-lg bg-[#f5f2eb] px-3 py-2 text-xs">Edit</button><button onClick={() => remove(resource._id)} className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600"><FaTrash /></button></div></article>)}</section>
        </div>
    );
}

export default MentorResources;