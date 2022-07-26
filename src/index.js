import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import buildRoutes from "./routes/routes.js";

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get("/list", async (req, res) => {
  try {
    console.log("receive request");

    res.status(200).send("success");
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

// buildRoutes(app);

app.listen(3000, () => {
  console.log("Application started on port 3000!");
});
