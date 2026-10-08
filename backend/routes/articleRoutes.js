const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Article } = require("../models");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

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
    const baseUrl = process.env.BACKEND_URL || "http://localhost:3000";
    if (req.file) {
      imgPath = `${baseUrl}/uploads/${req.file.filename}`;
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
    const baseUrl = process.env.BACKEND_URL || "http://localhost:3000";
    if (req.file) {
      imgPath = `${baseUrl}/uploads/${req.file.filename}`;

      // Delete old file
      if (article.featured_image && article.featured_image.includes("/uploads/")) {
        const parts = article.featured_image.split("/uploads/");
        const oldPath = path.join(__dirname, "../public/uploads", parts[1]);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
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

    if (article.featured_image && article.featured_image.includes("/uploads/")) {
      const parts = article.featured_image.split("/uploads/");
      const filePath = path.join(__dirname, "../public/uploads", parts[1]);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await article.destroy();
    res.json({ message: "Article deleted" });
  } catch (error) {
    console.error("[Article DELETE Error]:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
