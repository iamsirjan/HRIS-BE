import { Router } from "express";
import { uploadFile } from "../config/multer";
import {
  fileUploadHandler,
  uploadMultipleMedia,
} from "../controllers/media-upload.controller";
import { requireSignIn } from "../middlewares/auth.middleware";

const router = Router();
router.use(requireSignIn);

router.post("/file", uploadFile.single("file"), fileUploadHandler);
router.post("/files", uploadFile.array("files", 5), uploadMultipleMedia);

export default router;
