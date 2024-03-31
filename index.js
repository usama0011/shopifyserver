import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userroute from "./routes/userroute.js";
import authroute from "./auth/authroute.js";
import orderroute from "./routes/orderroute.js";
import taskroute from "./routes/taskroute.js";
import withdrawalroute from "./routes/withdrawroute.js";
import customersroute from "./routes/customersroute.js";
import submitorderroute from "./routes/submitorderroute.js";
import rechargeroute from "./routes/rechargeroute.js";
import receiptrecord from "./routes/rechargereceiptroute.js";
import withdrawreceipt from "./routes/withdrawreceiptroute.js";
import reffaralroute from "./routes/refferalroute.js";
const app = express();
dotenv.config();

try {
  await mongoose.connect(
    "mongodb+srv://haiderali:haiderali@cluster0.ntofij5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Database Connection Successfully!!");
} catch (error) {
  console.error("Error connecting to MongoDB:", error.message);
  process.exit(1); // Exit the process if unable to connect to MongoDB
}

// Middleware to parse JSON requests
// Middleware to parse JSON requests
// Middleware to parse JSON requests
// My Main URL https://crm-lms-client-v2.vercel.app
// Local host URL http://localhost:3000
// Add comment
//I am addig some more comments to server th server
// I add some more comments
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Define a simple route
app.get("/", (req, res) => {
  res.status(200).json("App Work 100%");
});

// Start router from here
app.use("/api/users", userroute);
app.use("/api/auth", authroute);
app.use("/api/orders", orderroute);
app.use("/api/taskroute", taskroute);
app.use("/api/withdrawalroute", withdrawalroute);
app.use("/api/customers", customersroute);
app.use("/api/submitorder", submitorderroute);
app.use("/api/recharge", rechargeroute);
app.use("/api/receipt", receiptrecord);
app.use("/api/withdrawreceipt", withdrawreceipt);
app.use("/api/refferals", reffaralroute);
// Error handling middleware
// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res
    .status(500)
    .json({ error: "Internal Server Error", message: err.message });
});

// Start the server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
