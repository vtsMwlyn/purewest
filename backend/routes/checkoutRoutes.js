const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  try {
    const { cartItems, total, customerDetails } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOSTNAME,
      port: process.env.MAIL_PORT,
      secure: true, // true for 465
      auth: {
        user: process.env.MAIL_ACCOUNT,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const itemsHtml = cartItems
      .map(
        (item) =>
          `<li>${item.quantity}x ${item.product.name} (${item.size.s}) - ${item.size.p}</li>`
      )
      .join("");

    const mailOptions = {
      from: process.env.MAIL_ACCOUNT,
      to: "vannestheo@gmail.com",
      subject: "New Checkout from PureWest",
      html: `
        <h2>New Order Received!</h2>
        <p><strong>Customer:</strong> ${customerDetails?.name || "Guest"}</p>
        <p><strong>Email:</strong> ${customerDetails?.email || "N/A"}</p>
        <h3>Order Items:</h3>
        <ul>${itemsHtml}</ul>
        <h3>Total: $${total}</h3>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Order placed and email sent successfully" });
  } catch (error) {
    console.error(error);
    console.error("[Checkout Error]:", error);
    res.status(500).json({ message: "Checkout failed", error: error.message });
  }
});

module.exports = router;
