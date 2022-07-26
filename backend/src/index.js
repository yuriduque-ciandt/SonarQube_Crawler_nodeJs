import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import buildRoutes from "./routes/routes.js";

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

buildRoutes(app);

app.listen(3000, () => {
  console.log("Application started on port 3000!");
});
