import {
  getAllSubjects,
  createOneSubject,
  getOneSubject,
  deleteOneSubject,
  updateOneSubject,
} from "../../controllers/subject.controller";

import { Router } from "express";
import { config } from "../../config/config";
import { accessRole } from "../../middleware/accessRole";
const router = Router();

router.get(
  "/",
  accessRole(new Array("ADMIN", "STUDENT", "TEACHER")),
  getAllSubjects
);
router.post("/", accessRole(new Array("ADMIN")), createOneSubject);
router.get(
  "/:id",
  accessRole(new Array("ADMIN", "STUDENT", "TEACHER")),
  getOneSubject
);
router.delete("/:id",  accessRole(new Array("ADMIN")), deleteOneSubject);
router.put(
  "/:id",
  accessRole(new Array("ADMIN", "TEACHER")), updateOneSubject
);

export { router as subject };
