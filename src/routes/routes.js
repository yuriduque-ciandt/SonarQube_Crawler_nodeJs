import express from "express";

import instance from "../apis/axiosConfig.js";
import Model from "../database/models/dataModel.js";

const router = express.Router();

//Post Method
router.post("/post", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/list", async (_, res) => {
  const organization = process.env.SONAR_ORGANIZATION;

  try {
    const {
      data: { components: fetchedComponents },
    } = await instance.get("/components/search", {
      params: {
        organization,
      },
    });

    const keyComponents = fetchedComponents.map(({ key }) => key);

    const metricsKeys = [
      "bugs",
      "vulnerabilities",
      "security_hotspots_reviewed",
      "code_smells",
      "coverage",
      "duplicated_lines_density",
    ];

    let {
      data: { metrics },
    } = await instance.get("/metrics/search", { params: { ps: 200 } });
    metrics = metrics.filter(({ key }) => metricsKeys.includes(key));
    metrics = metrics.map(({ key, type, name, direction }) => ({
      key,
      type,
      name,
      direction,
    }));

    const data = await Promise.all(
      keyComponents.map(async (key) => {
        const { data } = await instance.get(`/measures/component`, {
          params: {
            metricKeys: metrics.map(({ key }) => key).join(","),
            component: key,
          },
        });

        let {
          component: { measures },
        } = data;
        measures = measures.map(({ metric, value, bestValue }) => {
          const data = metrics.find(({ key }) => metric === key);

          return {
            ...data,
            value,
            bestValue,
          };
        });

        return {
          key,
          measures,
        };
      })
    );
    res.send({ data });
  } catch (error) {
    console.log(error);
  }
});
export default router;
