const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); // allow all (for now)
app.use(express.json());

// ✅ IMPORTANT ROUTE
app.post("/users", (req, res) => {
  console.log(req.body);
  res.json({ message: "Success" });
});

// test route
app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(5000, () => {
  console.log("Server started");
});
