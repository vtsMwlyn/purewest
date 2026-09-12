const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { LabTest } = require("../models");
const auth = require("../middleware/auth");

const supabase = require("../config/supabase");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET all lab tests (public)
router.get("/", async (req, res) => {
  try {
    const labTests = await LabTest.findAll({
      order: [["sampled_at", "DESC"]],
    });
    res.json(labTests);
  } catch (error) {
    console.error("[LabTest GET Error]:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET single lab test (public)
router.get("/:id", async (req, res) => {
  try {
    const labTest = await LabTest.findByPk(req.params.id);
    if (!labTest) return res.status(404).json({ message: "Lab Test not found" });
    res.json(labTest);
  } catch (error) {
    console.error("[LabTest GET Single Error]:", error);
    res.status(500).json({ error: error.message });
  }
});

// POST new lab test (protected)
router.post("/", auth, upload.single("pdf_file"), async (req, res) => {
  try {
    const { title, subtitle, reference, sample_id, sampled_at, analyzed_at, method, signed_by } = req.body;
    let pdfPath = "";
    if (req.file) {
      if (!supabase) throw new Error("Supabase client is not configured");
      const fileExt = path.extname(req.file.originalname);
      const fileName = `labtest-${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
      const { error } = await supabase.storage.from('uploads').upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });
      if (error) throw new Error("PDF upload failed: " + error.message);
      
      const { data: publicUrlData } = supabase.storage.from('uploads').getPublicUrl(fileName);
      pdfPath = publicUrlData.publicUrl;
    }

    const labTest = await LabTest.create({
      title,
      subtitle,
      reference,
      sample_id,
      sampled_at: sampled_at || null,
      analyzed_at: analyzed_at || null,
      method,
      signed_by,
      pdf_path: pdfPath,
    });

    res.status(201).json(labTest);
  } catch (error) {
    console.error("[LabTest POST Error]:", error);
    res.status(500).json({ error: error.message });
  }
});

// PUT update lab test (protected)
router.put("/:id", auth, upload.single("pdf_file"), async (req, res) => {
  try {
    const { title, subtitle, reference, sample_id, sampled_at, analyzed_at, method, signed_by } = req.body;
    const labTest = await LabTest.findByPk(req.params.id);

    if (!labTest) return res.status(404).json({ message: "Lab Test not found" });

    let pdfPath = labTest.pdf_path;
    if (req.file) {
      if (!supabase) throw new Error("Supabase client is not configured");
      const fileExt = path.extname(req.file.originalname);
      const fileName = `labtest-${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
      const { error } = await supabase.storage.from('uploads').upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });
      if (error) throw new Error("PDF upload failed: " + error.message);
      
      const { data: publicUrlData } = supabase.storage.from('uploads').getPublicUrl(fileName);
      pdfPath = publicUrlData.publicUrl;
      
      // Optionally delete the old file
      if (labTest.pdf_path && labTest.pdf_path.includes("supabase.co")) {
        const oldParts = labTest.pdf_path.split("/");
        const oldFileName = oldParts[oldParts.length - 1];
        if (oldFileName) {
          supabase.storage.from("uploads").remove([oldFileName]).catch(err => {
            console.error("[Supabase Delete Old File Error]:", err);
          });
        }
      }
    }

    await labTest.update({
      title,
      subtitle,
      reference,
      sample_id,
      sampled_at: sampled_at || labTest.sampled_at,
      analyzed_at: analyzed_at || labTest.analyzed_at,
      method,
      signed_by,
      pdf_path: pdfPath,
    });

    res.json(labTest);
  } catch (error) {
    console.error("[LabTest PUT Error]:", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE lab test (protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const labTest = await LabTest.findByPk(req.params.id);
    if (!labTest) return res.status(404).json({ message: "Lab Test not found" });

    if (labTest.pdf_path && labTest.pdf_path.includes("supabase.co")) {
      const parts = labTest.pdf_path.split("/");
      const fileName = parts[parts.length - 1];
      if (fileName) {
        const { error: deleteError } = await supabase.storage.from("uploads").remove([fileName]);
        if (deleteError) {
          console.error("[Supabase Delete Error]:", deleteError);
        }
      }
    }

    await labTest.destroy();
    res.json({ message: "Lab Test deleted" });
  } catch (error) {
    console.error("[LabTest DELETE Error]:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
