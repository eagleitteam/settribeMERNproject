import express from "express";
import routes from "./routes/index.js";

const app = express();

app.use(express.json()); // JSON data accept
app.use("/api", routes); // all routes

export default app;
