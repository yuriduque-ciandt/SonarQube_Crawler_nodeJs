import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import buildRoutes from "./routes/routes.js";

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

buildRoutes(app);

app.listen(process.env.PORT || 3000, () => {
  console.log("Application started on port 3000!");
});
