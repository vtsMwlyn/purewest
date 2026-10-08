const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Testimonial } = require("../models");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

// GET all testimonials (public)
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(testimonials);
  } catch (error) {
    console.error("[Testimonial GET Error]:", error);
    res.status(500).json({ error: error.message });
  }
});

// POST new testimonial (protected)
router.post("/", auth, upload.single("photo"), async (req, res) => {
  try {
    const { name, rating, comment, address } = req.body;
    let imgPath = "";
    const baseUrl = process.env.BACKEND_URL || "http://localhost:3000";
    if (req.file) {
      imgPath = `${baseUrl}/uploads/${req.file.filename}`;
    }

    const testimonial = await Testimonial.create({
      name,
      rating: parseInt(rating) || 5,
      photo: imgPath,
      comment,
      address,
    });

    res.status(201).json(testimonial);
  } catch (error) {
    console.error("[Testimonial POST Error]:", error);
    res.status(500).json({ error: error.message });
  }
});

// PUT update testimonial (protected)
router.put("/:id", auth, upload.single("photo"), async (req, res) => {
  try {
    const { name, rating, comment, address } = req.body;
    const testimonial = await Testimonial.findByPk(req.params.id);

    if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });

    let imgPath = testimonial.photo;
    const baseUrl = process.env.BACKEND_URL || "http://localhost:3000";
    if (req.file) {
      imgPath = `${baseUrl}/uploads/${req.file.filename}`;
      
      if (testimonial.photo && testimonial.photo.includes("/uploads/")) {
        const parts = testimonial.photo.split("/uploads/");
        const oldPath = path.join(__dirname, "../public/uploads", parts[1]);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    await testimonial.update({
      name,
      rating: parseInt(rating) || testimonial.rating,
      photo: imgPath,
      comment,
      address: address !== undefined ? address : testimonial.address,
    });

    res.json(testimonial);
  } catch (error) {
    console.error("[Testimonial PUT Error]:", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE testimonial (protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) return res.status(404).json({ message: "Testimonial not found" });

    if (testimonial.photo && testimonial.photo.includes("/uploads/")) {
      const parts = testimonial.photo.split("/uploads/");
      const filePath = path.join(__dirname, "../public/uploads", parts[1]);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await testimonial.destroy();
    res.json({ message: "Testimonial deleted" });
  } catch (error) {
    console.error("[Testimonial DELETE Error]:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
