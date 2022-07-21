import express from "express";
import bodyParser from "body-parser";
// import apiRoutes from "./routes/apiRoutes";
import "dotenv/config";

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) =>
  res.send("TESTE B2W DIGITAL - BRUNO ALVARES DE MIRANDA")
);

app.listen(3000, () => {
  console.log("Application started on port 3000!");
});
