import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";

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

export default function AdminLabTests() {
  const [labTests, setLabTests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  
  const initialFormState = {
    title: "",
    subtitle: "",
    reference: "",
    sample_id: "",
    sampled_at: "",
    analyzed_at: "",
    method: "",
    signed_by: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [pdfFile, setPdfFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const token = localStorage.getItem("purewest_admin_token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/admin";
    }
    fetchLabTests();
  }, []);

  const fetchLabTests = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/lab-tests`);
      const data = await res.json();
      setLabTests(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const openAddModal = () => {
    setEditingTest(null);
    setFormData(initialFormState);
    setPdfFile(null);
    setIsModalOpen(true);
  };

  const handleEdit = (test) => {
    setEditingTest(test);
    setFormData({
      title: test.title || "",
      subtitle: test.subtitle || "",
      reference: test.reference || "",
      sample_id: test.sample_id || "",
      sampled_at: test.sampled_at ? test.sampled_at.split("T")[0] : "",
      analyzed_at: test.analyzed_at ? test.analyzed_at.split("T")[0] : "",
      method: test.method || "",
      signed_by: test.signed_by || "",
    });
    setPdfFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lab test?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/lab-tests/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        toast.success("Lab test deleted successfully");
        fetchLabTests();
      } else {
        toast.error("Failed to delete lab test");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    
    if (pdfFile) {
      data.append("pdf_file", pdfFile);
    }

    try {
      const url = editingTest
        ? `${import.meta.env.VITE_API_URL}/api/lab-tests/${editingTest.id}`
        : `${import.meta.env.VITE_API_URL}/api/lab-tests`;
      const method = editingTest ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      if (res.ok) {
        toast.success(editingTest ? "Lab test updated" : "Lab test added");
        setIsModalOpen(false);
        fetchLabTests();
      } else {
        toast.error("Error saving lab test");
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
      title={<>Lab <em style={{ color: C.gold, fontStyle: "italic" }}>Tests</em></>}
      action={
        <button
          onClick={openAddModal}
          className="px-5 py-2 text-[0.55rem] tracking-[2px] uppercase font-bold cursor-pointer"
          style={{ background: C.gold, color: C.dark, border: "none" }}
        >
          + Add Test
        </button>
      }
    >
      <div className="flex flex-col gap-4">
        {labTests.length === 0 ? (
          <p style={{ color: C.textMuted }}>No lab tests found.</p>
        ) : (
          labTests.map((t) => (
            <div key={t.id} className="flex flex-col md:flex-row gap-6 items-start md:items-center p-6 transition-colors duration-300" style={{ background: C.dark3, border: `1px solid ${C.rule}` }}>
              <div className="flex-1">
                <div className="text-[1.4rem] font-light mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff" }}>
                  {t.title}
                </div>
                <div className="text-[0.6rem] tracking-[2px] uppercase mb-3" style={{ color: C.goldPale }}>
                  Sample ID: {t.sample_id || "N/A"}
                </div>
                <div className="text-[0.8rem]" style={{ color: C.textMuted }}>
                  {t.subtitle}
                </div>
                {t.pdf_path && (
                  <div className="mt-3">
                    <a href={t.pdf_path} target="_blank" rel="noopener noreferrer" style={{ color: C.gold, fontSize: "0.8rem", textDecoration: "underline" }}>
                      View PDF Report
                    </a>
                  </div>
                )}
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <button onClick={() => handleEdit(t)} className="px-5 py-[10px] text-[0.55rem] tracking-[2px] uppercase cursor-pointer" style={{ background: C.gold, color: C.dark, border: "none" }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(t.id)} className="px-5 py-[10px] text-[0.55rem] tracking-[2px] uppercase cursor-pointer transition-colors hover:bg-red-900" style={{ background: "transparent", color: "#ff4444", border: "1px solid #ff4444" }}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: "rgba(5,4,2,0.9)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-[900px] max-h-[95vh] overflow-y-auto p-10 relative flex flex-col" style={{ background: C.dark2, border: `1px solid ${C.gold}` }}>
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-2xl cursor-pointer z-10" style={{ color: C.textMuted, background: "none", border: "none" }}>
              &times;
            </button>
            <h3 className="text-[1.8rem] font-light mb-6 pb-4 shrink-0" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#fff", borderBottom: `1px solid ${C.rule}` }}>
              {editingTest ? "Edit Lab Test" : "Add New Lab Test"}
            </h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>Title</label>
                  <input type="text" name="title" required value={formData.title} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                </div>
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>Sample ID</label>
                  <input type="text" name="sample_id" required value={formData.sample_id} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                </div>
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>Sampled At</label>
                  <input type="date" name="sampled_at" value={formData.sampled_at} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                </div>
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>Analyzed At</label>
                  <input type="date" name="analyzed_at" value={formData.analyzed_at} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                </div>
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>Reference</label>
                  <input type="text" name="reference" value={formData.reference} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                </div>
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>Method</label>
                  <input type="text" name="method" value={formData.method} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                </div>
                <div>
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>Signed By</label>
                  <input type="text" name="signed_by" value={formData.signed_by} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>Subtitle (Short Description)</label>
                  <textarea name="subtitle" rows={3} value={formData.subtitle} onChange={handleInputChange} className="w-full p-3 text-[0.85rem] outline-none resize-y" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                </div>
              </div>

              <div className="shrink-0">
                <label className="block text-[0.6rem] tracking-[2px] uppercase mb-2" style={{ color: C.goldPale }}>PDF Report</label>
                <input type="file" accept="application/pdf" onChange={handleFileChange} className="w-full p-2 text-[0.85rem]" style={{ background: C.dark, border: `1px solid ${C.rule}`, color: C.text }} />
                
                {(pdfFile || (editingTest && editingTest.pdf_path)) && (
                  <div className="mt-4 p-2" style={{ background: C.dark3, border: `1px solid ${C.rule}`, height: "400px" }}>
                    <iframe 
                      src={pdfFile ? URL.createObjectURL(pdfFile) : editingTest.pdf_path} 
                      title="PDF Preview"
                      className="w-full h-full"
                      style={{ border: "none" }}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-6 pt-6 shrink-0" style={{ borderTop: `1px solid ${C.rule}` }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-[14px] text-[0.6rem] tracking-[3px] uppercase cursor-pointer" style={{ background: "transparent", color: C.textMuted, border: `1px solid ${C.rule}` }}>
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-[14px] text-[0.6rem] tracking-[3px] uppercase font-bold transition-all duration-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" style={{ fontFamily: "'Libre Baskerville', serif", background: C.gold, color: C.dark, border: "none" }}>
                  {isSubmitting ? "Saving..." : (editingTest ? "Update Lab Test" : "Save Lab Test")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
