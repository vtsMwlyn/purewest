const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { Article } = require("../models");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "article-" + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// GET all articles (public)
router.get("/", async (req, res) => {
  try {
    const articles = await Article.findAll({
      order: [["date", "DESC"]],
    });
    res.json(articles);
  } catch (error) {
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
    res.status(500).json({ error: error.message });
  }
});

// POST new article (protected)
router.post("/", auth, upload.single("featured_image"), async (req, res) => {
  try {
    const { title, date, subtitle, content } = req.body;
    let imgPath = "";
    if (req.file) {
      imgPath = "/uploads/" + req.file.filename;
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
      imgPath = "/uploads/" + req.file.filename;
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
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
