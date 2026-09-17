import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const initialFormState = {
    name: "",
    eyebrow: "",
    ta: "",
    desc: "",
    specs: [""],
    sizes: [{ s: "", p: "" }],
    icons: [{ emoji: "", label: "" }],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("purewest_admin_token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/admin";
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log("[Data Fetch] Fetching admin products from /api/products...");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      console.log("[Data Fetch] Admin products response status:", res.status);
      const data = await res.json();
      setProducts(data);
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

  /* Dynamic array handlers */
  const handleSpecChange = (index, value) => {
    const newSpecs = [...formData.specs];
    newSpecs[index] = value;
    setFormData({ ...formData, specs: newSpecs });
  };
  const addSpec = () => setFormData({ ...formData, specs: [...formData.specs, ""] });
  const removeSpec = (index) => setFormData({ ...formData, specs: formData.specs.filter((_, i) => i !== index) });

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...formData.sizes];
    newSizes[index][field] = value;
    setFormData({ ...formData, sizes: newSizes });
  };
  const addSize = () => setFormData({ ...formData, sizes: [...formData.sizes, { s: "", p: "" }] });
  const removeSize = (index) => setFormData({ ...formData, sizes: formData.sizes.filter((_, i) => i !== index) });

  const handleIconChange = (index, field, value) => {
    const newIcons = [...formData.icons];
    newIcons[index][field] = value;
    setFormData({ ...formData, icons: newIcons });
  };
  const addIcon = () => setFormData({ ...formData, icons: [...formData.icons, { emoji: "", label: "" }] });
  const removeIcon = (index) => setFormData({ ...formData, icons: formData.icons.filter((_, i) => i !== index) });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(initialFormState);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    const parseJSON = (val, fallback) => {
      if (typeof val === "string") {
        try { return JSON.parse(val); } catch (e) { return fallback; }
      }
      return val || fallback;
    };

    setFormData({
      name: product.name,
      eyebrow: product.eyebrow,
      ta: product.ta,
      desc: product.desc,
      specs: parseJSON(product.specs, [""]),
      sizes: parseJSON(product.sizes, [{ s: "", p: "" }]),
      icons: parseJSON(product.icons, [{ emoji: "", label: "" }]),
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      console.log(`[Data Fetch] Deleting product ${id}...`);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`[Data Fetch] Delete product response status:`, res.status);
      if (res.ok) {
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
      fetchProducts();
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
    data.append("eyebrow", formData.eyebrow);
    data.append("ta", formData.ta);
    data.append("desc", formData.desc);
    
    // Clean up empty arrays before sending
    data.append("specs", JSON.stringify(formData.specs.filter(s => s.trim() !== "")));
    data.append("sizes", JSON.stringify(formData.sizes.filter(sz => sz.s.trim() !== "" && sz.p.trim() !== "")));
    data.append("icons", JSON.stringify(formData.icons.filter(ic => ic.emoji.trim() !== "" && ic.label.trim() !== "")));
    
    if (imageFile) {
      data.append("img", imageFile);
    }

    try {
      const url = editingProduct
        ? `${import.meta.env.VITE_API_URL}/api/products/${editingProduct}`
        : `${import.meta.env.VITE_API_URL}/api/products`;
      const method = editingProduct ? "PUT" : "POST";

      console.log(`[Data Fetch] Submitting product data to ${url} via ${method}...`);
      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      console.log(`[Data Fetch] Submit product response status:`, res.status);

      if (res.ok) {
        toast.success(editingProduct ? "Product updated successfully" : "Product added successfully");
        setIsModalOpen(false);
        fetchProducts();
      } else {
        toast.error("Error saving product");
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
      title={<>Products <em className="text-gold italic">Management</em></>}
      action={
        <button
          onClick={openAddModal}
          className="px-5 py-2 text-[0.55rem] tracking-[2px] uppercase font-bold cursor-pointer bg-gold text-dark border-none hover:bg-gold-light transition-colors"
        >
          + Add Product
        </button>
      }
    >
      {/* Product list */}
      <div className="flex flex-col gap-4">
        {products.map((p) => (
          <div key={p.id} className="flex gap-6 items-center p-4 transition-colors duration-300 bg-dark3 border border-rule">
            <img src={p.img.startsWith('/') && !p.img.includes('localhost') && p.img.startsWith('/uploads') ? p.img : p.img} alt={p.name} className="w-20 h-20 object-cover" />
            <div className="flex-1">
              <div className="text-[1.4rem] font-light mb-1 font-garamond text-white">{p.name}</div>
              <div className="text-[0.6rem] tracking-[2px] uppercase text-gold-pale">{p.ta}</div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => handleEdit(p)} className="px-5 py-[10px] text-[0.55rem] tracking-[2px] uppercase cursor-pointer bg-gold text-dark border-none hover:bg-gold-light transition-colors">
                Edit
              </button>
              <button onClick={() => handleDelete(p.id)} className="px-5 py-[10px] text-[0.55rem] tracking-[2px] uppercase cursor-pointer transition-colors hover:bg-red-900 bg-transparent text-[#ff4444] border border-[#ff4444] hover:text-white">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[rgba(5,4,2,0.9)] backdrop-blur-sm">
          <div className="w-[95vw] md:max-w-[800px] max-h-[90vh] overflow-y-auto p-6 md:p-10 relative bg-dark2 border border-gold">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-2xl cursor-pointer text-text-muted bg-none border-none hover:text-gold transition-colors">
              &times;
            </button>
            <h3 className="text-[1.8rem] font-light mb-8 pb-4 font-garamond text-white border-b border-rule">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2 text-gold-pale">Product Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none bg-dark border border-rule text-text" />
                </div>
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2 text-gold-pale">Eyebrow Text</label>
                  <input type="text" name="eyebrow" required value={formData.eyebrow} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none bg-dark border border-rule text-text" />
                </div>
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2 text-gold-pale">TA Rating</label>
                  <input type="text" name="ta" placeholder="e.g. TA 35+" required value={formData.ta} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none bg-dark border border-rule text-text" />
                </div>
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2 text-gold-pale">Image Upload</label>
                  <input type="file" onChange={handleFileChange} className="w-full p-2 text-[0.85rem] bg-dark border border-rule text-text" />
                </div>
              </div>

              <div>
                <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2 text-gold-pale">Description</label>
                <textarea name="desc" rows="3" required value={formData.desc} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none bg-dark border border-rule text-text" />
              </div>

              {/* Dynamic Specifications */}
              <div>
                <label className="block text-[0.6rem] tracking-[2px] uppercase mb-3 text-gold-pale">Specifications</label>
                {formData.specs.map((spec, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" value={spec} onChange={(e) => handleSpecChange(i, e.target.value)} placeholder="e.g. Naturally antimicrobial" className="flex-1 p-3 text-[0.85rem] outline-none bg-dark border border-rule text-text" />
                    <button type="button" onClick={() => removeSpec(i)} className="px-4 text-[0.8rem] cursor-pointer bg-transparent text-[#ff4444] border border-rule hover:bg-[#ff4444] hover:text-white transition-colors">&times;</button>
                  </div>
                ))}
                <button type="button" onClick={addSpec} className="text-[0.6rem] tracking-[1px] uppercase cursor-pointer text-gold bg-none border-none hover:text-gold-light">+ Add Specification</button>
              </div>

              {/* Dynamic Sizes */}
              <div>
                <label className="block text-[0.6rem] tracking-[2px] uppercase mb-3 text-gold-pale">Sizes & Prices</label>
                {formData.sizes.map((sz, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" value={sz.s} onChange={(e) => handleSizeChange(i, 's', e.target.value)} placeholder="Size (e.g. 250g)" className="flex-1 p-3 text-[0.85rem] outline-none bg-dark border border-rule text-text" />
                    <input type="text" value={sz.p} onChange={(e) => handleSizeChange(i, 'p', e.target.value)} placeholder="Price (e.g. $39.95)" className="flex-1 p-3 text-[0.85rem] outline-none bg-dark border border-rule text-text" />
                    <button type="button" onClick={() => removeSize(i)} className="px-4 text-[0.8rem] cursor-pointer bg-transparent text-[#ff4444] border border-rule hover:bg-[#ff4444] hover:text-white transition-colors">&times;</button>
                  </div>
                ))}
                <button type="button" onClick={addSize} className="text-[0.6rem] tracking-[1px] uppercase cursor-pointer text-gold bg-none border-none hover:text-gold-light">+ Add Size Variant</button>
              </div>

              {/* Dynamic Icons */}
              <div>
                <label className="block text-[0.6rem] tracking-[2px] uppercase mb-3 text-gold-pale">Icons / Badges</label>
                {formData.icons.map((ic, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" value={ic.emoji} onChange={(e) => handleIconChange(i, 'emoji', e.target.value)} placeholder="Emoji (e.g. 🌿)" className="w-16 p-3 text-[0.85rem] outline-none text-center bg-dark border border-rule text-text" />
                    <input type="text" value={ic.label} onChange={(e) => handleIconChange(i, 'label', e.target.value)} placeholder="Label (e.g. Raw & Natural)" className="flex-1 p-3 text-[0.85rem] outline-none bg-dark border border-rule text-text" />
                    <button type="button" onClick={() => removeIcon(i)} className="px-4 text-[0.8rem] cursor-pointer bg-transparent text-[#ff4444] border border-rule hover:bg-[#ff4444] hover:text-white transition-colors">&times;</button>
                  </div>
                ))}
                <button type="button" onClick={addIcon} className="text-[0.6rem] tracking-[1px] uppercase cursor-pointer text-gold bg-none border-none hover:text-gold-light">+ Add Icon</button>
              </div>

              <div className="flex gap-4 mt-6 pt-6 border-t border-rule">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-[14px] text-[0.6rem] tracking-[3px] uppercase cursor-pointer bg-transparent text-text-muted border border-rule hover:text-gold hover:border-gold transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-[14px] text-[0.6rem] tracking-[3px] uppercase font-bold transition-all duration-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-baskerville bg-gold text-dark border-none hover:bg-gold-light">
                  {isSubmitting ? "Saving..." : (editingProduct ? "Update Product" : "Save Product")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
