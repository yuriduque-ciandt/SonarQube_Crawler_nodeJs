import express from "express";
import sonarApi from "../apis/sonarApi.js";

const router = express.Router();

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
    const components = await sonarApi.listComponents();
    const componentKey = components.map(({ key }) => key);

    const data = await Promise.all(
      componentKey.map(async (key) => {
        const measures = await sonarApi.getProjectMeasures(key);

        return {
          key,
          measures,
        };
      })
    );
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
