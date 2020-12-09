const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const readDatabase = () => {
  const projectsFilePath = path.join(__dirname, "projects.json");
  const fileAsBuffer = fs.readFileSync(projectsFilePath);
  const fileAsAString = fileAsBuffer.toString();
  const projectsArray = JSON.parse(fileAsAString);
  return projectsArray;
};

router.get("/", (req, res, next) => {
  const projectsArray = readDatabase();

  res.send(projectsArray);
});

module.exports = router;
