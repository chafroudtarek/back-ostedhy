import { studentServie } from "./../services/student.service";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import logger from "../utils/logging";

const NAMESPACE = "Student CONTROLLER";

export const updateprofile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  updateprofile starting ...`);

    const updateduser = await studentServie.updateProfile(
      req.body,
      req.params.id
    );
    res.status(200).json({ updateduser, success: true });

    logger.info(` ${NAMESPACE} : updateprofile get terminated ...`);
  }
);

export const subscribeToChapter = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  subscribeToChapter starting ...`);

    const subscribe = await studentServie.subscribeToChapter(req.body);
    res.status(200).json({ subscribe, success: true });

    logger.info(` ${NAMESPACE} : subscribeToChapter get terminated ...`);
  }
);
export const subscribeToSubject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  subscribeToSubject starting ...`);

    const subscribe = await studentServie.subscribeToSubject(req.body);
    res.status(200).json({ subscribe, success: true });

    logger.info(` ${NAMESPACE} : subscribeToSubject get terminated ...`);
  }
);

export const uploadAvatar = asyncHandler(
  async (req: Request, res: Response) => {
    logger.info(` ${NAMESPACE} :  uploadAvatar starting ...`);
    const upload = await studentServie.uploadAvatar(req, req.params.id);
    res.status(200).json({ upload, success: true });
    logger.info(` ${NAMESPACE} :  uploadAvatar get terminated ...`);
  }
);

export const DeleteStudentImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  DeleteStudentImage starting ...`);

    const deleted = await studentServie.deleteStudentImage(req.params.id);
    res.status(200).json({ response: deleted, success: true });

    logger.info(` ${NAMESPACE} : DeleteStudentImage get terminated ...`);
  }
);


