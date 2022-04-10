import express from "express";
import apiRoutes from "./routes/api";
require("dotenv").config();

const app = express();
app.use(express.json());
const PORT = 8000;

app.listen(PORT, () => console.log(`ready port ${PORT}`));
app.use("/api", apiRoutes);
