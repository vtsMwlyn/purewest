import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
  const token = localStorage.getItem("purewest_admin_token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/admin";
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
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
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        ? `http://localhost:5000/api/products/${editingProduct}`
        : "http://localhost:5000/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts();
      } else {
        alert("Error saving product");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("purewest_admin_token");
    window.location.href = "/admin";
  };

  return (
    <div style={{ background: C.dark, minHeight: "100svh", paddingTop: "100px", paddingBottom: "100px", fontFamily: "'Libre Baskerville', serif", color: C.text }}>
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="flex justify-between items-center mb-10 pb-6" style={{ borderBottom: `1px solid ${C.rule}` }}>
          <h2 className="text-[2rem] font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>
            Admin <em style={{ color: C.gold, fontStyle: "italic" }}>Dashboard</em>
          </h2>
          <div className="flex gap-4">
            <Link to="/admin/articles" className="px-5 py-2 text-[0.6rem] tracking-[2px] uppercase cursor-pointer no-underline flex items-center" style={{ background: "transparent", color: C.goldPale, border: `1px solid ${C.rule}` }}>
              Articles
            </Link>
            <button onClick={openAddModal} className="px-6 py-2 text-[0.6rem] tracking-[2px] uppercase font-bold cursor-pointer" style={{ background: C.gold, color: C.dark, border: "none" }}>
              + Add Product
            </button>
            <button onClick={handleLogout} className="px-5 py-2 text-[0.6rem] tracking-[2px] uppercase cursor-pointer" style={{ background: "transparent", color: C.goldPale, border: `1px solid ${C.rule}` }}>
              Logout
            </button>
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-4">
            {products.map((p) => (
              <div key={p.id} className="flex gap-6 items-center p-4 transition-colors duration-300" style={{ background: C.dark3, border: `1px solid ${C.rule}` }}>
                <img src={p.img.startsWith('/') && !p.img.includes('localhost') && p.img.startsWith('/uploads') ? `http://localhost:5000${p.img}` : p.img} alt={p.name} className="w-20 h-20 object-cover" />
                <div className="flex-1">
                  <div className="text-[1.4rem] font-light mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>{p.name}</div>
                  <div className="text-[0.6rem] tracking-[2px] uppercase" style={{ color: C.goldPale }}>{p.ta}</div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleEdit(p)} className="px-5 py-[10px] text-[0.55rem] tracking-[2px] uppercase cursor-pointer" style={{ background: C.gold, color: C.dark, border: "none" }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="px-5 py-[10px] text-[0.55rem] tracking-[2px] uppercase cursor-pointer transition-colors hover:bg-red-900" style={{ background: "transparent", color: "#ff4444", border: "1px solid #ff4444" }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: "rgba(5,4,2,0.9)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-[800px] max-h-[90vh] overflow-y-auto p-10 relative" style={{ background: C.dark2, border: `1px solid ${C.gold}` }}>
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-2xl cursor-pointer" style={{ color: C.textMuted, background: "none", border: "none" }}>
              &times;
            </button>
            <h3 className="text-[1.8rem] font-light mb-8 pb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff", borderBottom: `1px solid ${C.rule}` }}>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>Product Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                </div>
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>Eyebrow Text</label>
                  <input type="text" name="eyebrow" required value={formData.eyebrow} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                </div>
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>TA Rating</label>
                  <input type="text" name="ta" placeholder="e.g. TA 35+" required value={formData.ta} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                </div>
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>Image Upload</label>
                  <input type="file" onChange={handleFileChange} className="w-full p-2 text-[0.85rem]" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                </div>
              </div>

              <div>
                <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>Description</label>
                <textarea name="desc" rows="3" required value={formData.desc} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
              </div>

              {/* Dynamic Specifications */}
              <div>
                <label className="block text-[0.6rem] tracking-[2px] uppercase mb-3" style={{ color: C.goldPale }}>Specifications</label>
                {formData.specs.map((spec, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" value={spec} onChange={(e) => handleSpecChange(i, e.target.value)} placeholder="e.g. Naturally antimicrobial" className="flex-1 p-3 text-[0.85rem] outline-none" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                    <button type="button" onClick={() => removeSpec(i)} className="px-4 text-[0.8rem] cursor-pointer" style={{ background: "transparent", color: "#ff4444", border: `1px solid ${C.rule}` }}>&times;</button>
                  </div>
                ))}
                <button type="button" onClick={addSpec} className="text-[0.6rem] tracking-[1px] uppercase cursor-pointer" style={{ color: C.gold, background: "none", border: "none" }}>+ Add Specification</button>
              </div>

              {/* Dynamic Sizes */}
              <div>
                <label className="block text-[0.6rem] tracking-[2px] uppercase mb-3" style={{ color: C.goldPale }}>Sizes & Prices</label>
                {formData.sizes.map((sz, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" value={sz.s} onChange={(e) => handleSizeChange(i, 's', e.target.value)} placeholder="Size (e.g. 250g)" className="flex-1 p-3 text-[0.85rem] outline-none" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                    <input type="text" value={sz.p} onChange={(e) => handleSizeChange(i, 'p', e.target.value)} placeholder="Price (e.g. $39.95)" className="flex-1 p-3 text-[0.85rem] outline-none" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                    <button type="button" onClick={() => removeSize(i)} className="px-4 text-[0.8rem] cursor-pointer" style={{ background: "transparent", color: "#ff4444", border: `1px solid ${C.rule}` }}>&times;</button>
                  </div>
                ))}
                <button type="button" onClick={addSize} className="text-[0.6rem] tracking-[1px] uppercase cursor-pointer" style={{ color: C.gold, background: "none", border: "none" }}>+ Add Size Variant</button>
              </div>

              {/* Dynamic Icons */}
              <div>
                <label className="block text-[0.6rem] tracking-[2px] uppercase mb-3" style={{ color: C.goldPale }}>Icons / Badges</label>
                {formData.icons.map((ic, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" value={ic.emoji} onChange={(e) => handleIconChange(i, 'emoji', e.target.value)} placeholder="Emoji (e.g. 🌿)" className="w-16 p-3 text-[0.85rem] outline-none text-center" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                    <input type="text" value={ic.label} onChange={(e) => handleIconChange(i, 'label', e.target.value)} placeholder="Label (e.g. Raw & Natural)" className="flex-1 p-3 text-[0.85rem] outline-none" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                    <button type="button" onClick={() => removeIcon(i)} className="px-4 text-[0.8rem] cursor-pointer" style={{ background: "transparent", color: "#ff4444", border: `1px solid ${C.rule}` }}>&times;</button>
                  </div>
                ))}
                <button type="button" onClick={addIcon} className="text-[0.6rem] tracking-[1px] uppercase cursor-pointer" style={{ color: C.gold, background: "none", border: "none" }}>+ Add Icon</button>
              </div>

              <div className="flex gap-4 mt-6 pt-6" style={{ borderTop: `1px solid ${C.rule}` }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-[14px] text-[0.6rem] tracking-[3px] uppercase cursor-pointer" style={{ background: "transparent", color: C.textMuted, border: `1px solid ${C.rule}` }}>
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-[14px] text-[0.6rem] tracking-[3px] uppercase font-bold transition-all duration-400 cursor-pointer" style={{ fontFamily: "'Libre Baskerville', serif", background: C.gold, color: C.dark, border: "none" }}>
                  {editingProduct ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
