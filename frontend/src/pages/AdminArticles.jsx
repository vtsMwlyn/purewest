import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";
import Quill from "quill";
import "quill/dist/quill.snow.css";

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

  const quillRef = useRef(null);
  const [quill, setQuill] = useState(null);

  useEffect(() => {
    if (!isModalOpen) {
      setQuill(null);
      return;
    }

    // Wait for the modal DOM to paint
    const initTimer = setTimeout(() => {
      if (quillRef.current && !quill) {
        const q = new Quill(quillRef.current, {
          theme: 'snow',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ align: [] }],
              [{ list: 'ordered'}, { list: 'bullet' }],
              [{ indent: '-1'}, { indent: '+1' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ['link', 'image', 'video'],
              [{ color: [] }, { background: [] }],
              ['clean'],
            ],
          },
        });

        q.on("text-change", () => {
          setContentHtml(q.root.innerHTML);
        });

        if (editingArticle) {
          q.clipboard.dangerouslyPasteHTML(editingArticle.content || "");
        } else {
          q.clipboard.dangerouslyPasteHTML("");
        }

        setQuill(q);
      }
    }, 10);

    return () => clearTimeout(initTimer);
  }, [isModalOpen, editingArticle, quill]);

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
    setContentHtml("");
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
    setContentHtml(article.content || "");
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

  return (
    <AdminLayout
      title={<>Articles <em className="text-gold italic">Management</em></>}
      action={
        <button
          onClick={openAddModal}
          className="px-5 py-2 text-[0.55rem] tracking-[2px] uppercase font-bold cursor-pointer bg-gold text-dark border-none hover:bg-gold-light transition-colors"
        >
          + Add Article
        </button>
      }
    >
      {/* Basic dark overrides for quill since .snow is light by default */}
      <style>{`
        .ql-toolbar.ql-snow { border-color: rgba(168,144,96,0.12); background: #1a1a1a; }
        .ql-container.ql-snow { border-color: rgba(168,144,96,0.12); background: #0e0a05; font-family: 'Libre Baskerville', serif; color: #fff; min-height: 250px; font-size: 0.85rem; }
        .ql-editor { min-height: 250px; }
        .ql-snow .ql-stroke { stroke: #C8AE80; }
        .ql-snow .ql-fill { fill: #C8AE80; }
        .ql-snow .ql-picker { color: #C8AE80; }
      `}</style>

      {/* Article list */}
      <div className="flex flex-col gap-4">
        {articles.length === 0 ? (
          <p className="text-text-muted">No articles found.</p>
        ) : (
          articles.map((a) => (
            <div key={a.id} className="flex gap-6 items-center p-4 transition-colors duration-300 bg-dark3 border border-rule">
              <img src={a.featured_image && a.featured_image.startsWith('/') && !a.featured_image.includes('localhost') ? a.featured_image : (a.featured_image || '/placeholder.png')} alt={a.title} className="w-20 h-20 object-cover" />
              <div className="flex-1">
                <div className="text-[1.4rem] font-light mb-1 font-garamond text-white">{a.title}</div>
                <div className="text-[0.6rem] tracking-[2px] uppercase text-gold-pale">
                  {a.date ? new Date(a.date).toLocaleDateString() : ""}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleEdit(a)} className="px-5 py-[10px] text-[0.55rem] tracking-[2px] uppercase cursor-pointer bg-gold text-dark border-none hover:bg-gold-light transition-colors">
                  Edit
                </button>
                <button onClick={() => handleDelete(a.id)} className="px-5 py-[10px] text-[0.55rem] tracking-[2px] uppercase cursor-pointer transition-colors hover:bg-red-900 hover:text-white bg-transparent text-[#ff4444] border border-[#ff4444]">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[rgba(5,4,2,0.9)] backdrop-blur-sm">
          <div className="w-full max-w-[900px] max-h-[95vh] overflow-y-auto p-10 relative flex flex-col bg-dark2 border border-gold">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-2xl cursor-pointer z-10 text-text-muted bg-none border-none hover:text-gold transition-colors">
              &times;
            </button>
            <h3 className="text-[1.8rem] font-light mb-6 pb-4 shrink-0 font-garamond text-white border-b border-rule">
              {editingArticle ? "Edit Article" : "Add New Article"}
            </h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2 text-gold-pale">Title</label>
                  <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none bg-dark border border-rule text-text" />
                </div>
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2 text-gold-pale">Date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none bg-dark border border-rule text-text" />
                </div>
              </div>
              
              <div className="shrink-0">
                <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2 text-gold-pale">Subtitle (Excerpt)</label>
                <textarea name="subtitle" rows={3} value={formData.subtitle} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none resize-y bg-dark border border-rule text-text" />
              </div>

              <div className="shrink-0">
                <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2 text-gold-pale">Featured Image</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 text-[0.85rem] bg-dark border border-rule text-text" />
                {(imageFile || (editingArticle && editingArticle.featured_image)) && (
                  <div className="mt-4 p-2 inline-block bg-dark3 border border-rule">
                    <img 
                      src={imageFile ? URL.createObjectURL(imageFile) : (editingArticle.featured_image.startsWith('/') && !editingArticle.featured_image.includes('localhost') ? editingArticle.featured_image : editingArticle.featured_image)} 
                      alt="Preview" 
                      className="max-h-[150px] object-contain"
                    />
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col min-h-[300px]">
                <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2 text-gold-pale">Content</label>
                <div className="flex-1">
                  <div ref={quillRef} />
                </div>
              </div>

              <div className="flex gap-4 mt-6 pt-6 shrink-0 border-t border-rule">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-[14px] text-[0.6rem] tracking-[3px] uppercase cursor-pointer bg-transparent text-text-muted border border-rule hover:text-gold hover:border-gold transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-[14px] text-[0.6rem] tracking-[3px] uppercase font-bold transition-all duration-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-baskerville bg-gold text-dark border-none hover:bg-gold-light">
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
