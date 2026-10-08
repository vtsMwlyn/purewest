const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { LabTest } = require("../models");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

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
    const baseUrl = process.env.BACKEND_URL || "http://localhost:3000";
    if (req.file) {
      pdfPath = `${baseUrl}/uploads/${req.file.filename}`;
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
    const baseUrl = process.env.BACKEND_URL || "http://localhost:3000";
    if (req.file) {
      pdfPath = `${baseUrl}/uploads/${req.file.filename}`;
      
      // Optionally delete the old file
      if (labTest.pdf_path && labTest.pdf_path.includes("/uploads/")) {
        const parts = labTest.pdf_path.split("/uploads/");
        const oldPath = path.join(__dirname, "../public/uploads", parts[1]);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
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

    if (labTest.pdf_path && labTest.pdf_path.includes("/uploads/")) {
      const parts = labTest.pdf_path.split("/uploads/");
      const filePath = path.join(__dirname, "../public/uploads", parts[1]);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
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
