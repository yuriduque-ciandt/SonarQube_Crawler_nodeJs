import sonarRoutes from "./sonarRoutes.js";
import sonarWebHook from "./sonarWebHook.js";

const buildRoutes = (app) => {
  app.use("/api/sonar", sonarRoutes);
  app.use("/api/webhook", sonarWebHook);
};

export default buildRoutes;
