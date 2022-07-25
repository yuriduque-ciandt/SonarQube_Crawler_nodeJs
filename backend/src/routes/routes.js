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

    const data = await Promise.all(
      keyComponents.map(async (key) => {
        const {
          data: {
            component: { measures },
          },
        } = await instance.get(`/measures/component`, {
          params: {
            metricKeys:
              "bugs,vulnerabilities,security_hotspots_reviewed,code_smells,coverage,duplicated_lines_density",
            component: key,
          },
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
