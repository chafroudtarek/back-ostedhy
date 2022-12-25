import {
  getAllGovernements,
  createOneGovernement,
  getOneGovernement,
  deleteOneGovernement,
  updateOneGovernement,
} from "../../controllers/governement.controller";

import { response, Router } from "express";
import { config } from "../../config/config";
import { accessRole } from "../../middleware/accessRole";
import { request } from "http";
import auth from "../../middleware/auth";

const router = Router();

router.get(
  "/",
  getAllGovernements
)
router.post("/", auth,accessRole(new Array("ADMIN")), createOneGovernement);
router.get(
  "/:id",
  auth,
  accessRole(new Array("ADMIN", "STUDENT", "TEACHER")),
  getOneGovernement
);
router.delete("/:id",  auth,accessRole(new Array("ADMIN")), deleteOneGovernement);
router.put("/:id", auth, accessRole(new Array("ADMIN")), updateOneGovernement);

export { router as governement };
