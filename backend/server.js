const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Allow your Vercel frontend
app.use(cors({
  origin: "https://portfolio-2-one-omega.vercel.app",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// ✅ Middleware
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ✅ API route (IMPORTANT)
app.post("/users", (req, res) => {
  const { name, email, message } = req.body;

  console.log("Received Data:", name, email, message);

  res.json({
    success: true,
    message: "Feedback received successfully"
  });
});

// ✅ Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
