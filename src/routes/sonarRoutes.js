import express from "express";
import sonarApi from "../apis/sonarApi.js";
import getProjectsMeasures from "../services/getProjectsMeasures.js";

const router = express.Router();

router.get("/listComponents", async (req, res) => {
  console.log(process.env.SONAR_KEY);
  console.log(process.env.SONAR_METRICS);
  console.log(process.env.SONAR_ORGANIZATION);
  console.log(process.env.SONAR_URL);
  try {
    console.log("sonarRoutes - '/listComponents' - received");

    const components = await sonarApi.listComponents();

    console.log("sonarRoutes - '/listComponents' - done");

    res.status(200).send(components);
  } catch (error) {
    console.log("sonarRoutes - '/listComponents' - error: " + error.message);
    res.status(400).send(error.message);
  }
});

router.get("/getProjectsMeasures", async (req, res) => {
  try {
    console.log("sonarRoutes - '/getProjectsMeasures' - received");

    const data = await getProjectsMeasures();

    console.log("sonarRoutes - '/getProjectsMeasures' - done");

    res.status(200).send(data);
  } catch (error) {
    console.log(
      "sonarRoutes - '/getProjectsMeasures' - error: " + error.message
    );
    res.status(400).send(error.message);
  }
});

router.get("/getProjectMeasureHistory", async (req, res) => {
  try {
    console.log("sonarRoutes - '/getProjectMeasureHistory' - received");
    const { projecKey, metricKey } = req.query;

    const measures = await sonarApi.getProjectMeasureHistory(
      projecKey,
      metricKey
    );

    console.log("sonarRoutes - '/getProjectMeasureHistory' - done");

    res.status(200).send({ projecKey, measures });
  } catch (error) {
    console.log(
      "sonarRoutes - '/getProjectMeasureHistory' - error: " + error.message
    );
    res.status(400).send(error.message);
  }
});
export default router;
