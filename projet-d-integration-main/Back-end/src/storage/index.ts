import Multer from "multer";
import { Router } from "express";
import path from "path";
import fs from "fs";

const multer = Multer({
  storage: Multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/tmp");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = file.originalname.split(".").pop();
      cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
    },
  }),
});

export const upload = () => multer.single("file");

export const getFile = () => {
  const router = Router();

  router.get("/storage/:filename", (req, res) => {
    try {
      const filename = req.params.filename;
      const fullPath = path.join(__dirname, `../tmp/${filename}`);
      const file = fs.readFileSync(fullPath);
      res.send(file);
    } catch {
      res.status(404).send("File not found");
    }
  });
  return router;
};
