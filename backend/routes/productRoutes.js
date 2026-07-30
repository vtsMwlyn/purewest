const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Product } = require("../models");
const auth = require("../middleware/auth");

const supabase = require("../config/supabase");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
    if (req.file) {
      if (!supabase) throw new Error("Supabase client is not configured");
      const fileExt = path.extname(req.file.originalname);
      const fileName = `product-${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
      const { error } = await supabase.storage.from('uploads').upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });
      if (error) throw new Error("Image upload failed: " + error.message);
      
      const { data: publicUrlData } = supabase.storage.from('uploads').getPublicUrl(fileName);
      imgPath = publicUrlData.publicUrl;
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
    if (req.file) {
      if (!supabase) throw new Error("Supabase client is not configured");
      const fileExt = path.extname(req.file.originalname);
      const fileName = `product-${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;
      const { error } = await supabase.storage.from('uploads').upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
      });
      if (error) throw new Error("Image upload failed: " + error.message);
      
      const { data: publicUrlData } = supabase.storage.from('uploads').getPublicUrl(fileName);
      imgPath = publicUrlData.publicUrl;
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
    console.error("[Product PUT Error]:", error);
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
    console.error("[Product DELETE Error]:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
