import { createOneClass } from "./../../controllers/class.controller";
import {
  getAllClasses,
  deleteOneClass,
  getOneClass,
  updateOneClass,
} from "../../controllers/class.controller";
import { Router } from "express";
import { config } from "../../config/config";
import { accessRole } from "../../middleware/accessRole";
import auth from "../../middleware/auth";
const router = Router();

router.get(
  "/",
 
  getAllClasses
);
router.post("/",  auth,accessRole(new Array("ADMIN")), createOneClass);
router.get(
  "/:id",
  auth,
  accessRole(new Array("ADMIN", "STUDENT", "TEACHER")),
  getOneClass
);
router.delete("/:id", auth, accessRole(new Array("ADMIN")), deleteOneClass);
router.put("/:id", auth, accessRole(new Array("ADMIN")), updateOneClass);

export { router as classe };
