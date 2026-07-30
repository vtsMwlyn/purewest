const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { Article } = require("../models");
const auth = require("../middleware/auth");

const supabase = require("../config/supabase");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET all articles (public)
router.get("/", async (req, res) => {
  try {
    const articles = await Article.findAll({
      order: [["date", "DESC"]],
    });
    res.json(articles);
  } catch (error) {
    console.error("[Article GET Error]:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET single article (public)
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (error) {
    console.error("[Article GET Single Error]:", error);
    res.status(500).json({ error: error.message });
  }
});

// POST new article (protected)
router.post("/", auth, upload.single("featured_image"), async (req, res) => {
  try {
    const { title, date, subtitle, content } = req.body;
    let imgPath = "";
    if (req.file) {
      if (!supabase) throw new Error("Supabase client is not configured");
      const fileExt = path.extname(req.file.originalname);
      const fileName = `article-${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
      const { error } = await supabase.storage.from('uploads').upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });
      if (error) throw new Error("Image upload failed: " + error.message);
      
      const { data: publicUrlData } = supabase.storage.from('uploads').getPublicUrl(fileName);
      imgPath = publicUrlData.publicUrl;
    }

    const article = await Article.create({
      title,
      date: date || new Date(),
      subtitle,
      content,
      featured_image: imgPath,
    });

    res.status(201).json(article);
  } catch (error) {
    console.error("[Article POST Error]:", error);
    res.status(500).json({ error: error.message });
  }
});

// PUT update article (protected)
router.put("/:id", auth, upload.single("featured_image"), async (req, res) => {
  try {
    const { title, date, subtitle, content } = req.body;
    const article = await Article.findByPk(req.params.id);

    if (!article) return res.status(404).json({ message: "Article not found" });

    let imgPath = article.featured_image;
    if (req.file) {
      if (!supabase) throw new Error("Supabase client is not configured");
      const fileExt = path.extname(req.file.originalname);
      const fileName = `article-${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
      const { error } = await supabase.storage.from('uploads').upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });
      if (error) throw new Error("Image upload failed: " + error.message);
      
      const { data: publicUrlData } = supabase.storage.from('uploads').getPublicUrl(fileName);
      imgPath = publicUrlData.publicUrl;
    }

    await article.update({
      title,
      date: date || article.date,
      subtitle,
      content,
      featured_image: imgPath,
    });

    res.json(article);
  } catch (error) {
    console.error("[Article PUT Error]:", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE article (protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    await article.destroy();
    res.json({ message: "Article deleted" });
  } catch (error) {
    console.error("[Article DELETE Error]:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
