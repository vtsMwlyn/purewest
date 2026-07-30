const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Product } = require("../models");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// GET all products (public)
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new product (protected)
router.post("/", auth, upload.single("img"), async (req, res) => {
  try {
    const { name, eyebrow, ta, desc, specs, sizes, icons } = req.body;
    let imgPath = "";
    if (req.file) {
      imgPath = "/uploads/" + req.file.filename;
    }

    const product = await Product.create({
      name,
      eyebrow,
      ta,
      desc,
      specs: specs || "[]",
      sizes: sizes || "[]",
      icons: icons || "[]",
      img: imgPath,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update product (protected)
router.put("/:id", auth, upload.single("img"), async (req, res) => {
  try {
    const { name, eyebrow, ta, desc, specs, sizes, icons } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    let imgPath = product.img;
    if (req.file) {
      imgPath = "/uploads/" + req.file.filename;
      // Optionally delete old image file here
    }

    await product.update({
      name,
      eyebrow,
      ta,
      desc,
      specs: specs || product.specs,
      sizes: sizes || product.sizes,
      icons: icons || product.icons,
      img: imgPath,
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE product (protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
