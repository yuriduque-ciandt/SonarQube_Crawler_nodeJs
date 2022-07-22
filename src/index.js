import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes.js";
import Database from "./database/mongoContext.js";
import "dotenv/config";

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", routes);

Database.connect();

app.listen(3001, () => {
  console.log("Application started on port 3000!");
});
