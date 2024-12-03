const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://sensational-cactus-5081cd.netlify.app", // React frontend origin
    credentials: true,
  })
);

// Set a cookie with expiration time
app.post("/set-cookie", (req, res) => {
  const { name, value } = req.body;

  // Set expiration date to 10 years from now
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 10); // 10 years from now

  res.cookie(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "Strict",
    expires: expirationDate, // Set the expiration date
  });

  res.status(200).send(`Cookie ${name} set successfully!`);
});

// Get all cookies
app.get("/get-cookies", (req, res) => {
  res.status(200).json(req.cookies);
});

// Clear a cookie
app.post("/clear-cookie", (req, res) => {
  const { name } = req.body;
  res.clearCookie(name);
  res.status(200).send(`Cookie ${name} cleared successfully!`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
