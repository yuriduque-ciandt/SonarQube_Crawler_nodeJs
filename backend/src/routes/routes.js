import projectRoutes from "./projectRoutes.js";
import sonarRoutes from "./sonarRoutes.js";

const buildRoutes = (app) => {
  app.use("/api/project", projectRoutes);
  app.use("/api/sonar", sonarRoutes);
};

export default buildRoutes;
