// Import required modules
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes/index");

// Initialize environment variables
dotenv.config();

// Create an Express application
const app = express();

// Define a port
const PORT = process.env.PORT || 5000;

// app.use(cors());

// CORS configuration
// app.use(cors())
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",  // Adjust this URL if needed
  // origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));



app.use(express.json());

//database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb is connected"))
  .catch((e) => console.log(e));
 //routes configuration
  app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
