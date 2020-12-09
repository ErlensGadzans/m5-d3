const express = require("express");
const listEndpoints = require("express-list-endpoints");
const projectsRouter = require("./services/projects");
const problematicRoutes = require("./services/problematicRoutes");

const server = express();

const port = process.env.PORT || 3007;

server.use(express.json());

server.use("/projects", projectsRouter);
server.use("/problems", problematicRoutes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
