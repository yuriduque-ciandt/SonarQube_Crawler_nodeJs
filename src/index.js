import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";

import Database from "./database/mongoContext.js";

import routes from "./routes/routes.js";

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", routes);

Database.connect();

app.listen(3001, () => {
  console.log("Application started on port 3001!");
});
