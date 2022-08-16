import express from "express";

const router = express.Router();

router.post("/analysis-done", async (req, res) => {
  console.log("body:" + JSON.stringify(req.body));

  res.status(200).send("sucesso");
});

export default router;
