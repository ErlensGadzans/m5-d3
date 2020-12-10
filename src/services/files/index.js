const express = require("express");
const multer = require("multer");
const { writeFile, writeJSON, readJSON } = require("fs-extra");
const { join, extname } = require("path");

const router = express.Router();

const upload = multer({});

const projectsFolderPath = join(__dirname, "../../../public");
const projectsDBFolderPath = join(__dirname, "../projects/projects.json");

router.post("/upload", upload.single("peace"), async (req, res, next) => {
  try {
    await writeFile(
      join(projectsFolderPath, req.file.originalname),
      req.file.buffer
    );
    res.send("ok");
  } catch (error) {
    next(error);
  }
});

router.post("/upload/:id", upload.single("peace"), async (req, res, next) => {
  const projectsDB = await readJSON(projectsDBFolderPath);
  const index = projectsDB.findIndex((project) => project.ID === req.params.id);
  if (index !== -1) {
    const fileName = req.params.id + extname(req.file.originalname);
    try {
      await writeFile(join(projectsFolderPath, fileName), req.file.buffer);
      projectsDB[index].image = `http://localhost:3007/images/${fileName}`;
      await writeJSON(projectsDBFolderPath, projectsDB);
      res.send(projectsDB[index]);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(404).send("not found");
  }
});

module.exports = router;
