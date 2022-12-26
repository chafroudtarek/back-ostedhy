import express from "express";
import { classe } from "./apis/class";
import { governement } from "./apis/governement";
import { subject } from "./apis/subject";
import { chapter } from "./apis/chapter";
import { authusers } from "./apis/auth";
import { student } from "./apis/student";
import auth from "../middleware/auth";
import swaggerUi from "swagger-ui-express";
import docs from "../docs";
const router = express.Router();

router.use("/api/class", classe);
router.use("/api/governement", governement);
router.use("/api/subject", auth, subject);
router.use("/api/chapter", auth, chapter);
router.use("/api/auth", authusers);
router.use("/api/student", auth, student);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(docs));
router.get("/docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(docs);
});
export default router;
