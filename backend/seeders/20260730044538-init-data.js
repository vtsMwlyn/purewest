'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    const adminPassword = await bcrypt.hash('password123', 10);
    
    await queryInterface.bulkInsert('Admins', [{
      email: 'admin@purewest.com',
      password: adminPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Products', [
      {
        name: "Jarrah Honey",
        eyebrow: "Active Honey · South-West WA",
        ta: "TA 35+",
        desc: "The rarest honey in the world. Jarrah's extraordinary antimicrobial potency is matched only by its smooth, caramel-rich complexity — harvested from ancient forests that bloom just once every two years.",
        specs: JSON.stringify([
          "Total Activity (TA) 35+ independently certified",
          "Naturally antimicrobial — no additives or preservatives",
          "Low glycaemic index — slow energy release",
          "Raw cold-extracted from pristine WA forests",
          "No blending, no heat treatment, no compromise",
        ]),
        sizes: JSON.stringify([
          { s: "250g", p: "$39.95" },
          { s: "400g", p: "$54.95" },
          { s: "500g", p: "$64.95" },
        ]),
        img: "/images/tile-img-jarrah.jpg",
        icons: JSON.stringify([
          { emoji: "🌿", label: "Raw & Natural" },
          { emoji: "🧬", label: "High Activity" },
          { emoji: "🌲", label: "Old Growth" },
          { emoji: "📦", label: "Free Shipping" },
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Marri Honey",
        eyebrow: "Active Honey · South-West WA",
        ta: "TA 35+",
        desc: "High-activity Marri honey with a bold, distinctly WA character. Rich in antimicrobial compounds, naturally complex, with warm spice notes and a generous lingering finish.",
        specs: JSON.stringify([
          "Total Activity (TA) 35+ independently certified",
          "Bold antimicrobial profile",
          "Distinctive WA floral character",
          "Harvested from old-growth Marri forests",
          "Cold-extracted and raw — never blended",
        ]),
        sizes: JSON.stringify([
          { s: "250g", p: "$29.95" },
          { s: "400g", p: "$44.95" },
          { s: "500g", p: "$54.95" },
        ]),
        img: "/images/tile-img-marri35.jpg",
        icons: JSON.stringify([
          { emoji: "🌿", label: "Raw & Natural" },
          { emoji: "🧬", label: "High Activity" },
          { emoji: "🌲", label: "Old Growth" },
          { emoji: "📦", label: "Free Shipping" },
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Marri Honey",
        eyebrow: "Active Honey · Everyday Wellness",
        ta: "TA 15+",
        desc: "An accessible entry into Australia's most extraordinary honey tradition. TA 15+ Marri is warm, smooth, and deeply satisfying — the perfect everyday honey for those who refuse to compromise on quality.",
        specs: JSON.stringify([
          "Total Activity (TA) 15+ independently certified",
          "Smooth, versatile everyday honey",
          "Naturally antimicrobial",
          "Sustainably harvested from WA forests",
          "Perfect for cooking, wellness, and everyday use",
        ]),
        sizes: JSON.stringify([
          { s: "250g", p: "$19.95" },
          { s: "400g", p: "$29.95" },
          { s: "500g", p: "$36.95" },
        ]),
        img: "/images/tile-img-marri15.jpg",
        icons: JSON.stringify([
          { emoji: "🌿", label: "Raw & Natural" },
          { emoji: "✨", label: "Everyday Use" },
          { emoji: "🌲", label: "Old Growth" },
          { emoji: "📦", label: "Free Shipping" },
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
    await queryInterface.bulkDelete('Products', null, {});
  }
};
