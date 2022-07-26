import sonarRoutes from "./sonarRoutes.js";

const buildRoutes = (app) => {
  app.use("/api/sonar", sonarRoutes);
};

export default buildRoutes;
