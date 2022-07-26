import express from "express";
import sonarApi from "../apis/sonarApi.js";
import getProjectsMeasures from "../services/getProjectsMeasures.js";

const router = express.Router();

router.get("/list", async (req, res) => {
  try {
    console.log("receive request");

    res.status(200).send("success");
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

router.get("/listComponents", async (req, res) => {
  try {
    const components = await sonarApi.listComponents();

    res.status(200).send(components);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

router.get("/getProjectsMeasures", async (req, res) => {
  try {
    const data = await getProjectsMeasures();

    res.status(200).send(data);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

router.get("/getProjectMeasureHistory", async (req, res) => {
  try {
    const { projecKey, metricKey } = req.query;

    const measures = await sonarApi.getProjectMeasureHistory(
      projecKey,
      metricKey
    );

    res.status(200).send({ projecKey, measures });
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});
export default router;
