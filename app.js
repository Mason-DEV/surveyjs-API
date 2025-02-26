require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const formRoutes = require("./routes/forms");
const submissionRoutes = require("./routes/submissions");

app.use("/api/forms", formRoutes);
app.use("/api/submissions", submissionRoutes);

// Catch-all route handler for undefined routes
app.use((req, res, next) => {
  res.status(500).send("Route not found!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
