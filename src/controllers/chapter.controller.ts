import { Request, Response, NextFunction } from "express";
import { service } from "../services/factory";
import { Chapter } from "../database/models/chapter.model";
import { chapterservice } from "../services/chapter.service";
import asyncHandler from "express-async-handler";
import logger from "../utils/logging";

const NAMESPACE = "CHAPTER CONTROLLER";

export const getAllChapters = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  getAllCHapters starting ...`);
    const allChapters = await service.getAll(Chapter);
    res.status(200).json({ allChapters, success: true });
    logger.info(` ${NAMESPACE} : getAllCHapters get terminated ...`);
  }
);

export const getOneChapter = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  getOneChapter starting ...`);
    const oneChapter = await service.getOne(Chapter, req.params.id);
    res.status(200).json({ oneChapter, success: true });
    logger.info(` ${NAMESPACE} : getOneChapter get terminated ...`);
  }
);

export const deleteOneChapter = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  deleteOneChapter starting ...`);

    const oneChapter = await service.deleteOne(Chapter, req.params.id);
    res.status(200).json({ oneChapter, success: true });
    logger.info(` ${NAMESPACE} : deleteOneChapter get terminated ...`);
  }
);

export const updateOneChapter = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  updateOneChapter starting ...`);

    const oneChapter = await service.updateOne(
      Chapter,
      req.body,
      req.params.id
    );
    res.status(200).json({ oneChapter, success: true });
    logger.info(` ${NAMESPACE} : updateOneChapter get terminated ...`);
  }
);
export const createOneChapter = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  createOneChapter starting ...`);

    const oneChapter = await service.createOne(Chapter, req.body);
    res.status(200).json({ oneChapter, success: true });
    logger.info(` ${NAMESPACE} : createOneChapter get terminated ...`);
  }
);

export const approve = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  approve starting ...`);

    const oneChapter = await chapterservice.approve(req.params.id);
    res.status(200).json({ oneChapter, success: true });
    logger.info(` ${NAMESPACE} : approve get terminated ...`);
  }
);

export const disapprove = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  disapprove starting ...`);

    const oneChapter = await chapterservice.disapprove(req.params.id);
    res.status(200).json({ oneChapter, success: true });
    logger.info(` ${NAMESPACE} : disapprove get terminated ...`);
  }
);
