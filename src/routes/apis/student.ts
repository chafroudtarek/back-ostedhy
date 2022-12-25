import {
  subscribeToChapter,
  subscribeToSubject,
  updateprofile,
  uploadAvatar,
  DeleteStudentImage,
} from "./../../controllers/student.controller";

import { Router } from "express";
import { config } from "../../config/config";
import upload from "../../middleware/upload";
import { accessRole } from "../../middleware/accessRole";
const router = Router();

router.put("/:id",accessRole(new Array("ADMIN", "STUDENT", "TEACHER")), updateprofile);
router.post("/subscribechapter",accessRole(new Array("ADMIN", "STUDENT")), subscribeToChapter);
router.post("/subscribesubject", accessRole(new Array("ADMIN", "STUDENT")),subscribeToSubject);
router.post("/upload/:id",accessRole(new Array("ADMIN", "STUDENT", "TEACHER")), upload.single("File"), uploadAvatar);
router.delete("/image/:id",accessRole(new Array("ADMIN", "STUDENT", "TEACHER")), DeleteStudentImage);
export { router as student };
