// backend/server.js
require("dotenv").config(); // MUST be first line

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// ----------------------
// Test if MONGO_URI is loaded
// ----------------------
console.log("MONGO_URI =", process.env.MONGO_URI);

// ----------------------
// MongoDB Connection
// ----------------------
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.log("MongoDB Error:", err));

// ----------------------
// Middleware
// ----------------------
app.use(cors({ origin: "*" }));
app.use(express.json());

// ----------------------
// Root route (test server)
// ----------------------
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

// ----------------------
// Schema & Model
// ----------------------
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const User = mongoose.model("User", userSchema);

// ----------------------
// POST feedback
// ----------------------
app.post("/users", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and Email required" });
    }

    try {
        const newUser = new User({ name, email, message });
        await newUser.save();
        console.log("New Feedback:", newUser);
        res.json({ message: "Feedback saved to MongoDB ✅" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error saving data" });
    }
});

// ----------------------
// GET all feedback
// ----------------------
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data" });
    }
});

// ----------------------
// Start server
// ----------------------
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});