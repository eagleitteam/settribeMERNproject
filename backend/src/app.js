import express from "express";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json()); // JSON data accept

// user Register
app.use("/api/users", userRoutes);

// login for all 
app.use("/api/auth", authRoutes);

export default app;
