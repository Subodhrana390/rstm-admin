import express from "express";
import MyUserController from "../controller/MyUserController.js";
import {
  checkRequiredPermissions,
  jwtCheck,
  jwtParse,
} from "../middlewares/auth.js";
import { validateMyUserRequest } from "../controller/validation.js";
import multer from "multer";
import { AdminMessagesPermissions } from "../utils/requiredPermissions.js";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
const router = express.Router();

router.get("/", jwtCheck, jwtParse, MyUserController.getCurrentUser);
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put(
  "/",
  upload.single("imageFile"),
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  MyUserController.updateCurrentUser
);

router.get(
  "/admin",
  jwtCheck,
  checkRequiredPermissions([AdminMessagesPermissions.Create]),
  MyUserController.getAdminMessage
);

export default router;
