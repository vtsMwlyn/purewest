let app;
try {
  require("dotenv").config();
  const express = require("express");
  const cors = require("cors");
  const path = require("path");
  const db = require("./models");

  app = express();

  const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  };
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

  const authRoutes = require("./routes/authRoutes");
  const productRoutes = require("./routes/productRoutes");
  const checkoutRoutes = require("./routes/checkoutRoutes");
  const articleRoutes = require("./routes/articleRoutes");
  const labTestRoutes = require("./routes/labTestRoutes");
  const testimonialRoutes = require("./routes/testimonialRoutes");

  app.use("/api/auth", authRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/checkout", checkoutRoutes);
  app.use("/api/articles", articleRoutes);
  app.use("/api/lab-tests", labTestRoutes);
  app.use("/api/testimonials", testimonialRoutes);

  app.get('/health', (req, res) => {
    res.json({
      message: 'Server is online'
    });
  });

  const PORT = process.env.PORT || 3000;

  if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    db.sequelize.sync().then(() => {
      console.log("Database connected.");
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    });
  }
} catch (err) {
  console.error("INITIALIZATION ERROR:", err);
  app = (req, res) => {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      error: "INIT_ERROR",
      message: err.message,
      stack: err.stack
    }));
  };
}

module.exports = app;
