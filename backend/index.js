const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes");  // <-- This should be correct

const app = express();

app.use(cors());
app.use(express.json());

// API routes with versioning
app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
