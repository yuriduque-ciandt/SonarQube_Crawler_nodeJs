import express from "express";
import slackApi from "../apis/slackApi";

const router = express.Router();

router.post("/analysis-done", async (req, res) => {
  console.log("body:" + JSON.stringify(req.body));

  await slackApi.sendMessage();

  res.status(200).send(JSON.stringify(req.body));
});

export default router;
