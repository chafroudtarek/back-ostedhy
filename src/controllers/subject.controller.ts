import { getAllSubjectsWithClass } from "./../database/repositories/factory";
import { Class } from "./../database/models/class.model";
import { Subject } from "./../database/models/subject.model";
import { Request, Response, NextFunction } from "express";
import { service } from "../services/factory";
import asyncHandler from "express-async-handler";
import logger from "../utils/logging";

const NAMESPACE = "SUBJECT CONTROLLER";

export const getAllSubjects = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  getAllSubjects starting ...`);

    const allSubjects = await service.getAllSubjectWithClass();
    res.status(200).json({ allSubjects, success: true });
    logger.info(` ${NAMESPACE} : getAllSubjects get terminated ...`);
  }
);

export const getOneSubject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  getOneSubject starting ...`);

    const oneSubject = await service.getOneSubjectWithChapter(req.params.id);
    res.status(200).json({ oneSubject, success: true });
    logger.info(` ${NAMESPACE} : getOneSubject get terminated ...`);
  }
);

export const deleteOneSubject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  deleteOneSubject starting ...`);

    const oneSubject = await service.deleteOne(Subject, req.params.id);
    res.status(200).json({ oneSubject, success: true });
    logger.info(` ${NAMESPACE} : deleteOneSubject get terminated ...`);
  }
);

export const updateOneSubject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  updateOneSubject starting ...`);

    const oneSubject = await service.updateOne(
      Subject,
      req.body,
      req.params.id
    );
    res.status(200).json({ oneSubject, success: true });
    logger.info(` ${NAMESPACE} : updateOneSubject get terminated ...`);
  }
);
export const createOneSubject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  createOneSubject starting ...`);

    const oneSubject = await service.createOne(Subject, req.body);
    res.status(200).json({ oneSubject, success: true });
    logger.info(` ${NAMESPACE} : createOneSubject get terminated ...`);
  }
);
