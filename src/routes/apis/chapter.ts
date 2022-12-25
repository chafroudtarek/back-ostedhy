import {
  getAllChapters,
  createOneChapter,
  getOneChapter,
  deleteOneChapter,
  updateOneChapter,
  approve,
  disapprove,
} from "../../controllers/chapter.controller";

import { Router } from "express";
import { config } from "../../config/config";
import { accessRole } from "../../middleware/accessRole";
const router = Router();

router.get(
  "/",
  accessRole(new Array("ADMIN", "STUDENT", "TEACHER")),
  getAllChapters
);
router.post("/", accessRole(new Array("ADMIN")),  createOneChapter);
router.get(
  "/:id",
  accessRole(new Array("ADMIN", "STUDENT", "TEACHER")),
  getOneChapter
);
router.delete("/:id", accessRole(new Array("ADMIN")),  deleteOneChapter);
router.put("/:id", accessRole(new Array("ADMIN")), updateOneChapter);
router.put("/approve/:id", accessRole(new Array("ADMIN")),approve);
router.put("/disapprove/:id", accessRole(new Array("ADMIN")), disapprove);

export { router as chapter };
