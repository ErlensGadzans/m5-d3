const express = require("express");
const listEndpoints = require("express-list-endpoints");
const { join } = require("path");
const fs = require("fs");
const projectsRouter = require("./services/projects");
const problematicRoutes = require("./services/problematicRoutes");
const filesRouter = require("./services/files");
const {
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  catchAllHandler,
  badRequestHandler,
} = require("./errorHandling");

const server = express();

const port = process.env.PORT || 3007;
const publicFolderPath = join(__dirname);

const loggerMiddleware = (req, res, next) => {
  next();
};

server.use(express.json());
server.use(loggerMiddleware);
server.use("/images", express.static(join(__dirname, "../public")));

server.use("/projects", projectsRouter);
server.use("/problems", problematicRoutes);
server.use("/files", filesRouter);

server.use(notFoundHandler);
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(badRequestHandler);
server.use(catchAllHandler);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
