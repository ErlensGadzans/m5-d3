const express = require("express");
const listEndpoints = require("express-list-endpoints");
const projectsRouter = require("./services/projects");
const problematicRoutes = require("./services/problematicRoutes");
const {
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  catchAllHandler,
  badRequestHandler,
} = require("./errorHandling");

const server = express();

const port = process.env.PORT || 3007;

const loggerMiddleware = (req, res, next) => {
  next();
};

server.use(express.json());
server.use(loggerMiddleware);

server.use("/projects", projectsRouter);
server.use("/problems", problematicRoutes);

server.use(notFoundHandler);
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(badRequestHandler);
server.use(catchAllHandler);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
