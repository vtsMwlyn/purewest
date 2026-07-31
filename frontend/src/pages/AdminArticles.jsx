import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

const C = {
  gold: "#A89060",
  goldLight: "#C4AA7A",
  goldPale: "#C8AE80",
  dark: "#0e0a05",
  dark2: "#120d07",
  dark3: "#1a120a",
  rule: "rgba(168,144,96,0.12)",
  text: "#d4c4a8",
  textMuted: "#7a6a55",
};

export default function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  
  const initialFormState = {
    title: "",
    date: "",
    subtitle: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [contentHtml, setContentHtml] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const token = localStorage.getItem("purewest_admin_token");

  const { quill, quillRef } = useQuill();

  // Watch for Quill content changes
  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setContentHtml(quill.root.innerHTML);
      });
    }
  }, [quill]);

  // If we open edit modal, inject HTML into Quill
  useEffect(() => {
    if (quill && isModalOpen) {
      if (editingArticle) {
        quill.clipboard.dangerouslyPasteHTML(editingArticle.content || "");
      } else {
        quill.clipboard.dangerouslyPasteHTML(""); // Reset for new
      }
    }
  }, [quill, isModalOpen, editingArticle]);

  useEffect(() => {
    if (!token) {
      window.location.href = "/admin";
    }
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      console.log("[Data Fetch] Fetching articles from /api/articles...");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/articles`);
      console.log("[Data Fetch] Articles response status:", res.status);
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const openAddModal = () => {
    setEditingArticle(null);
    setFormData(initialFormState);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title || "",
      date: article.date ? article.date.split("T")[0] : "",
      subtitle: article.subtitle || "",
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      console.log(`[Data Fetch] Deleting article ${id}...`);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/articles/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`[Data Fetch] Delete article response status:`, res.status);
      if (res.ok) {
        toast.success("Article deleted successfully");
      } else {
        toast.error("Failed to delete article");
      }
      fetchArticles();
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("date", formData.date);
    data.append("subtitle", formData.subtitle);
    data.append("content", contentHtml);
    
    if (imageFile) {
      data.append("featured_image", imageFile);
    }

    try {
      const url = editingArticle
        ? `${import.meta.env.VITE_API_URL}/api/articles/${editingArticle.id}`
        : `${import.meta.env.VITE_API_URL}/api/articles`;
      const method = editingArticle ? "PUT" : "POST";

      console.log(`[Data Fetch] Submitting article data to ${url} via ${method}...`);
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      console.log(`[Data Fetch] Submit article response status:`, res.status);

      if (res.ok) {
        toast.success(editingArticle ? "Article updated successfully" : "Article added successfully");
        setIsModalOpen(false);
        fetchArticles();
      } else {
        toast.error("Error saving article");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while saving");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("purewest_admin_token");
    window.location.href = "/admin";
  };

  // Optional styling for Quill toolbar and container so it fits the dark theme better
  // (You could also override .ql-toolbar in a CSS file)
  
  return (
    <AdminLayout
      title={<>Articles <em style={{ color: C.gold, fontStyle: "italic" }}>Management</em></>}
      action={
        <button
          onClick={openAddModal}
          className="px-5 py-2 text-[0.55rem] tracking-[2px] uppercase font-bold cursor-pointer"
          style={{ background: C.gold, color: C.dark, border: "none" }}
        >
          + Add Article
        </button>
      }
    >
      {/* Basic dark overrides for quill since .snow is light by default */}
      <style>{`
        .ql-toolbar.ql-snow { border-color: ${C.rule}; background: #1a1a1a; }
        .ql-container.ql-snow { border-color: ${C.rule}; background: ${C.dark}; font-family: 'Libre Baskerville', serif; color: #fff; min-height: 250px; font-size: 0.85rem; }
        .ql-snow .ql-stroke { stroke: ${C.goldPale}; }
        .ql-snow .ql-fill { fill: ${C.goldPale}; }
        .ql-snow .ql-picker { color: ${C.goldPale}; }
      `}</style>

      {/* Article list */}
      <div className="flex flex-col gap-4">
            {articles.length === 0 ? (
              <p style={{ color: C.textMuted }}>No articles found.</p>
            ) : (
              articles.map((a) => (
                <div key={a.id} className="flex gap-6 items-center p-4 transition-colors duration-300" style={{ background: C.dark3, border: `1px solid ${C.rule}` }}>
                  <img src={a.featured_image && a.featured_image.startsWith('/') && !a.featured_image.includes('localhost') ? a.featured_image : (a.featured_image || '/placeholder.png')} alt={a.title} className="w-20 h-20 object-cover" />
                  <div className="flex-1">
                    <div className="text-[1.4rem] font-light mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>{a.title}</div>
                    <div className="text-[0.6rem] tracking-[2px] uppercase" style={{ color: C.goldPale }}>
                      {a.date ? new Date(a.date).toLocaleDateString() : ""}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => handleEdit(a)} className="px-5 py-[10px] text-[0.55rem] tracking-[2px] uppercase cursor-pointer" style={{ background: C.gold, color: C.dark, border: "none" }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(a.id)} className="px-5 py-[10px] text-[0.55rem] tracking-[2px] uppercase cursor-pointer transition-colors hover:bg-red-900" style={{ background: "transparent", color: "#ff4444", border: "1px solid #ff4444" }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
        </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: "rgba(5,4,2,0.9)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-[900px] max-h-[95vh] overflow-y-auto p-10 relative flex flex-col" style={{ background: C.dark2, border: `1px solid ${C.gold}` }}>
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-2xl cursor-pointer z-10" style={{ color: C.textMuted, background: "none", border: "none" }}>
              &times;
            </button>
            <h3 className="text-[1.8rem] font-light mb-6 pb-4 shrink-0" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff", borderBottom: `1px solid ${C.rule}` }}>
              {editingArticle ? "Edit Article" : "Add New Article"}
            </h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>Title</label>
                  <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                </div>
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>Date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                </div>
              </div>
              
              <div className="shrink-0">
                <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>Subtitle (Excerpt)</label>
                <input type="text" name="subtitle" value={formData.subtitle} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
              </div>

              <div className="shrink-0">
                <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>Featured Image</label>
                <input type="file" onChange={handleFileChange} className="w-full p-2 text-[0.85rem]" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
              </div>

              <div className="flex-1 flex flex-col min-h-[300px]">
                <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>Content</label>
                {/* React-QuillJS injects into this ref */}
                <div className="flex-1">
                  <div ref={quillRef} />
                </div>
              </div>

              <div className="flex gap-4 mt-6 pt-6 shrink-0" style={{ borderTop: `1px solid ${C.rule}` }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-[14px] text-[0.6rem] tracking-[3px] uppercase cursor-pointer" style={{ background: "transparent", color: C.textMuted, border: `1px solid ${C.rule}` }}>
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-[14px] text-[0.6rem] tracking-[3px] uppercase font-bold transition-all duration-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" style={{ fontFamily: "'Libre Baskerville', serif", background: C.gold, color: C.dark, border: "none" }}>
                  {isSubmitting ? "Saving..." : (editingArticle ? "Update Article" : "Save Article")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
