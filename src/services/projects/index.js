const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");
const { check, validationResult } = require("express-validator");

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

router.post(
  "/",
  [
    check("Name")
      .isLength({ min: 4 })
      .withMessage("No way! Name too short!")
      .exists(),

    check("Decription")
      .isLength({ min: 2 })
      .withMessage("Description is too short!")
      .exists(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error();
      err.message = errors;
      err.httpStatusCode = 400;
      next(err);
    } else {
      const newProject = req.body;
      const projectsArray = readDatabase();

      newProject.ID = uniqid();
      projectsArray.push(newProject);
      fs.writeFileSync(projectsFilePath, JSON.stringify(projectsArray));
      res.status(201).send(newProject);
    }
  }
);

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
