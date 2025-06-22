const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// Routes
const mainRoutes = require("../routes/mainRoutes");
app.use("/", mainRoutes);

// Contact route
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Monica2509@gmail.com",
      pass: "YOUR-APP-PASSWORD-HERE"
    }
  });

  try {
    await transporter.sendMail({
      from: email,
      to: "Monica2509@gmail.com",
      subject: `New Contact Message from ${name}`,
      text: message,
    });
    res.send("Message sent successfully!");
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).send("Message failed to send.");
  }
});

// This part keeps your server running!
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
