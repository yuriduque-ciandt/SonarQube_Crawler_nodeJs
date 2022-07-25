import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";

import projectRoutes from "./routes/projectRoutes.js";
import sonarRoutes from "./routes/sonarRoutes.js";

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/project", projectRoutes);
app.use("/api/sonar", sonarRoutes);

app.listen(3000, () => {
  console.log("Application started on port 3000!");
});
