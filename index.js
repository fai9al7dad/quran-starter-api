require("dotenv").config();
const apiRoutes = require("./src/routes/api");
const express = require("express");

const app = express();
app.use(express.json());
const PORT = 8000;

app.listen(PORT, () => console.log(`ready port ${PORT}`));
app.use("/api", apiRoutes);
