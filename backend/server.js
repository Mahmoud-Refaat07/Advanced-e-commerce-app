import express from "express";
import authRoutes from "./routes/auth.route.js";
import connectDatabase from "./lib/db.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDatabase();
});
