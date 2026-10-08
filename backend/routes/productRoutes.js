const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Product } = require("../models");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const parseJSONField = (field, fallback = []) => {
  if (typeof field === "string") {
    try {
      return JSON.parse(field);
    } catch (e) {
      return fallback;
    }
  }
  return field || fallback;
};

// GET all products (public)
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error("[Product GET Error]:", error);
    res.status(500).json({ error: error.message });
  }
});

// POST new product (protected)
router.post("/", auth, upload.single("img"), async (req, res) => {
  try {
    const { name, eyebrow, ta, desc, specs, sizes, icons } = req.body;
    let imgPath = "";
    const baseUrl = process.env.BACKEND_URL || "http://localhost:3000";
    if (req.file) {
      imgPath = `${baseUrl}/uploads/${req.file.filename}`;
    }

    const product = await Product.create({
      name,
      eyebrow,
      ta,
      desc,
      specs: parseJSONField(specs),
      sizes: parseJSONField(sizes),
      icons: parseJSONField(icons),
      img: imgPath,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("[Product POST Error]:", error);
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
    const baseUrl = process.env.BACKEND_URL || "http://localhost:3000";
    if (req.file) {
      imgPath = `${baseUrl}/uploads/${req.file.filename}`;

      if (product.img && product.img.includes("/uploads/")) {
        const parts = product.img.split("/uploads/");
        const oldPath = path.join(__dirname, "../public/uploads", parts[1]);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    await product.update({
      name,
      eyebrow,
      ta,
      desc,
      specs: specs ? parseJSONField(specs) : product.specs,
      sizes: sizes ? parseJSONField(sizes) : product.sizes,
      icons: icons ? parseJSONField(icons) : product.icons,
      img: imgPath,
    });

    res.json(product);
  } catch (error) {
    console.error("[Product PUT Error]:", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE product (protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.img && product.img.includes("/uploads/")) {
      const parts = product.img.split("/uploads/");
      const filePath = path.join(__dirname, "../public/uploads", parts[1]);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await product.destroy();
    res.json({ message: "Product deleted" });
  } catch (error) {
    console.error("[Product DELETE Error]:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
