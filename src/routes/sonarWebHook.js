import express from "express";
import slackApi from "../apis/slackApi.js";
import buildSlackMessage from "../services/buildSlackMessage.js";

const router = express.Router();

router.post("/analysis-done", async (req, res) => {
  console.log("body:" + JSON.stringify(req.body));

  const message = buildSlackMessage(req.body);

  await slackApi.sendMessage(message);

  res.status(200).send();
});

export default router;
