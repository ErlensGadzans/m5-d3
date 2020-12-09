const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");

const router = express.Router();

const projectsFilePath = path.join(__dirname, "projects.json");

const readDatabase = () => {
  const fileAsBuffer = fs.readFileSync(projectsFilePath);
  const fileAsAString = fileAsBuffer.toString();
  const projectsArray = JSON.parse(fileAsAString);
  return projectsArray;
};

router.get("/", (req, res, next) => {
  const projectsArray = readDatabase();

  res.send(projectsArray);
});

// router.post("/", (req, res, nex)=>{
//     const newProject = createNewProject(req.body)
//     res.status(201).send(newProject);
// })

// const createNewProject = (newProject) => {
//   const projectsArray = readDatabase();

//   newProject.ID = uniqid();
//   projectsArray.push(newProject);
//   fs.writeFileSync(projectsFilePath, JSON.stringify(projectsArray));

//   return newProject;
// };

router.post("/", (req, res, nex) => {
  const newProject = req.body;
  const projectsArray = readDatabase();

  newProject.ID = uniqid();
  projectsArray.push(newProject);
  fs.writeFileSync(projectsFilePath, JSON.stringify(projectsArray));
  res.status(201).send(newProject);
});

const updateProject = (id, update) => {
  const projectsArray = readDatabase();

  const newProjectsArray = projectsArray.filter((project) => project.ID !== id);
  const modifiedProject = update;
  modifiedProject.ID = id;
  newProjectsArray.push(modifiedProject);
  fs.writeFileSync(projectsFilePath, JSON.stringify(newProjectsArray));
  return modifiedProject;
};

const deleteProject = (id) => {
  const projectsArray = readDatabase();

  const newProjectsArray = projectsArray.filter((project) => project.ID !== id);
  fs.writeFileSync(projectsFilePath, JSON.stringify(newProjectsArray));
  return id;
};

module.exports = router;
