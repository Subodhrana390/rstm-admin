import express from "express";
import { jwtCheck, jwtParse } from "../middlewares/auth.js";
import multer from "multer";
import MyProjectController from "../controller/MyProjectController.js";
import { validateMyProjectRequest } from "../controller/validation.js";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
const router = express.Router();

router.get("/", jwtCheck, jwtParse, MyProjectController.getProjectByUser);
router.get("/:id", jwtCheck, jwtParse, MyProjectController.getProjectById);
router.post(
  "/",
  upload.single("imageFile"),
  jwtCheck,
  jwtParse,
  MyProjectController.createProject
);

router.put(
  "/:id",
  upload.single("imageFile"),
  validateMyProjectRequest,
  jwtCheck,
  jwtParse,
  MyProjectController.updateMyProject
);
router.delete("/", jwtCheck, jwtParse, MyProjectController.deleteProjectById);

export default router;
