const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { Testimonial } = require("../models");
const auth = require("../middleware/auth");
const supabase = require("../config/supabase");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
    if (req.file) {
      if (!supabase) throw new Error("Supabase client is not configured");
      const fileExt = path.extname(req.file.originalname);
      const fileName = `testimonial-${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
      const { error } = await supabase.storage.from('uploads').upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });
      if (error) throw new Error("Image upload failed: " + error.message);
      
      const { data: publicUrlData } = supabase.storage.from('uploads').getPublicUrl(fileName);
      imgPath = publicUrlData.publicUrl;
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
    if (req.file) {
      if (!supabase) throw new Error("Supabase client is not configured");
      const fileExt = path.extname(req.file.originalname);
      const fileName = `testimonial-${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
      const { error } = await supabase.storage.from('uploads').upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });
      if (error) throw new Error("Image upload failed: " + error.message);
      
      const { data: publicUrlData } = supabase.storage.from('uploads').getPublicUrl(fileName);
      imgPath = publicUrlData.publicUrl;
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

    if (testimonial.photo && testimonial.photo.includes("supabase.co")) {
      const parts = testimonial.photo.split("/");
      const fileName = parts[parts.length - 1];
      if (fileName) {
        const { error: deleteError } = await supabase.storage.from("uploads").remove([fileName]);
        if (deleteError) {
          console.error("[Supabase Delete Error]:", deleteError);
        }
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
