import {
  register,
  login,
  refreshToken,
  requestresetpwd,
  resetpassword,
  requestcodevalidation,
  verifyaccount,
  changepassword,
  getLoggenInUser,
} from "./../../controllers/auth.controller";

import { Router } from "express";
import { config } from "../../config/config";
import {
  checkValidationResult,
  createValidationFor,
} from "../../utils/validation";
import auth from "../../middleware/auth";
const router = Router();

router.post(
  "/register",
  createValidationFor("register"),
  checkValidationResult,
  register
);
router.post(
  "/login",
  createValidationFor("login"),
  checkValidationResult,
  login
);
router.get("/getloggenin", auth, getLoggenInUser);
router.get("/refresh", refreshToken);
router.get("/requestresetpassword", requestresetpwd);
router.post("/resetpassword", resetpassword);
router.get("/requestcodevalidation", auth, requestcodevalidation);
router.post("/verifyaccount", auth, verifyaccount);
router.post("/changepassword/:id", auth, changepassword);
export { router as authusers };
