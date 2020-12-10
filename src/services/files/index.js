const express = require("express");
const multer = require("multer");
const { writeFile } = require("fs-extra");
const { join } = require("path");

const router = express.Router();

const upload = multer({});

const projectsFolderPath = join(__dirname, "../../../img/projects");

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

module.exports = router;
