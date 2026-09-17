import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  
  const initialFormState = {
    name: "",
    rating: 5,
    address: "",
    comment: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const token = localStorage.getItem("purewest_admin_token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/admin";
    }
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      console.log("[Data Fetch] Fetching testimonials from /api/testimonials...");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/testimonials`);
      console.log("[Data Fetch] Testimonials response status:", res.status);
      const data = await res.json();
      setTestimonials(data);
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
    setEditingTestimonial(null);
    setFormData(initialFormState);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name || "",
      rating: testimonial.rating || 5,
      address: testimonial.address || "",
      comment: testimonial.comment || "",
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      console.log(`[Data Fetch] Deleting testimonial ${id}...`);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/testimonials/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`[Data Fetch] Delete testimonial response status:`, res.status);
      if (res.ok) {
        toast.success("Testimonial deleted successfully");
      } else {
        toast.error("Failed to delete testimonial");
      }
      fetchTestimonials();
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("rating", formData.rating);
    data.append("address", formData.address);
    data.append("comment", formData.comment);
    
    if (imageFile) {
      data.append("photo", imageFile);
    }

    try {
      const url = editingTestimonial
        ? `${import.meta.env.VITE_API_URL}/api/testimonials/${editingTestimonial.id}`
        : `${import.meta.env.VITE_API_URL}/api/testimonials`;
      const method = editingTestimonial ? "PUT" : "POST";

      console.log(`[Data Fetch] Submitting testimonial data to ${url} via ${method}...`);
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      console.log(`[Data Fetch] Submit testimonial response status:`, res.status);

      if (res.ok) {
        toast.success(editingTestimonial ? "Testimonial updated successfully" : "Testimonial added successfully");
        setIsModalOpen(false);
        fetchTestimonials();
      } else {
        toast.error("Error saving testimonial");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while saving");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout
      title={<>Testimonials <em className="text-gold italic">Management</em></>}
      action={
        <button
          onClick={openAddModal}
          className="px-5 py-2 text-[0.55rem] tracking-[2px] uppercase font-bold cursor-pointer bg-gold text-dark border-none hover:bg-gold-light transition-colors"
        >
          + Add Testimonial
        </button>
      }
    >
      <div className="flex flex-col gap-4">
        {testimonials.length === 0 ? (
          <p className="text-text-muted">No testimonials found.</p>
        ) : (
          testimonials.map((t) => (
            <div key={t.id} className="flex gap-6 items-center p-4 transition-colors duration-300 bg-dark3 border border-rule">
              <img src={t.photo && t.photo.startsWith('/') && !t.photo.includes('localhost') ? t.photo : (t.photo || 'https://via.placeholder.com/150')} alt={t.name} className="w-16 h-16 rounded-full object-cover border border-rule" />
              <div className="flex-1">
                <div className="text-[1.4rem] font-light mb-1 font-garamond text-white">{t.name}</div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < t.rating ? "#A89060" : "none"} stroke="#A89060" strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <div className="text-[0.8rem] text-text-muted italic">"{t.comment}"</div>
                {t.address && <div className="text-[0.6rem] text-gold-pale uppercase mt-2 tracking-[1px]">{t.address}</div>}
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleEdit(t)} className="px-5 py-[10px] text-[0.55rem] tracking-[2px] uppercase cursor-pointer bg-gold text-dark border-none hover:bg-gold-light transition-colors">
                  Edit
                </button>
                <button onClick={() => handleDelete(t.id)} className="px-5 py-[10px] text-[0.55rem] tracking-[2px] uppercase cursor-pointer transition-colors hover:bg-red-900 hover:text-white bg-transparent text-[#ff4444] border border-[#ff4444]">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[rgba(5,4,2,0.9)] backdrop-blur-sm">
          <div className="w-[95vw] md:max-w-[700px] max-h-[95vh] overflow-y-auto p-6 md:p-10 relative flex flex-col bg-dark2 border border-gold">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-2xl cursor-pointer z-10 text-text-muted bg-none border-none hover:text-gold transition-colors">
              &times;
            </button>
            <h3 className="text-[1.8rem] font-light mb-6 pb-4 shrink-0 font-garamond text-white border-b border-rule">
              {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
            </h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2 text-gold-pale">Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none bg-dark border border-rule text-text" />
                </div>
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2 text-gold-pale">Rating (1-5)</label>
                  <input type="number" name="rating" min="1" max="5" required value={formData.rating} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none bg-dark border border-rule text-text" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2 text-gold-pale">Address</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none bg-dark border border-rule text-text" placeholder="e.g. Sydney, NSW" />
                </div>
              </div>
              
              <div className="shrink-0">
                <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2 text-gold-pale">Photo</label>
                <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 text-[0.85rem] bg-dark border border-rule text-text" />
                {(imageFile || (editingTestimonial && editingTestimonial.photo)) && (
                  <div className="mt-4 p-2 inline-block bg-dark3 border border-rule">
                    <img 
                      src={imageFile ? URL.createObjectURL(imageFile) : (editingTestimonial.photo.startsWith('/') && !editingTestimonial.photo.includes('localhost') ? editingTestimonial.photo : editingTestimonial.photo)} 
                      alt="Preview" 
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="shrink-0">
                <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2 text-gold-pale">Comment</label>
                <textarea name="comment" rows={4} required value={formData.comment} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none resize-y bg-dark border border-rule text-text" />
              </div>

              <div className="flex gap-4 mt-6 pt-6 shrink-0 border-t border-rule">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-[14px] text-[0.6rem] tracking-[3px] uppercase cursor-pointer bg-transparent text-text-muted border border-rule hover:text-gold hover:border-gold transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-[14px] text-[0.6rem] tracking-[3px] uppercase font-bold transition-all duration-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-baskerville bg-gold text-dark border-none hover:bg-gold-light">
                  {isSubmitting ? "Saving..." : (editingTestimonial ? "Update Testimonial" : "Save Testimonial")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
