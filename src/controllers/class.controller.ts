import { Request, Response, NextFunction } from "express";
import { service } from "../services/factory";
import { Class } from "../database/models/class.model";
import asyncHandler from "express-async-handler";
import logger from "../utils/logging";

const NAMESPACE = "CLASS CONTROLLER";

export const getAllClasses = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  getAllClasses starting ...`);
    const allClasses = await service.getAll(Class);
    res.status(200).json({ allClasses, success: true });
    logger.info(` ${NAMESPACE} : getAllClasses get terminated ...`);
  }
);

export const getOneClass = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  getOneClass starting ...`);

    const oneClass = await service.getOne(Class, req.params.id);
    res.status(200).json({ oneClass, success: true });
    logger.info(` ${NAMESPACE} : getOneClass get terminated ...`);
  }
);

export const deleteOneClass = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  deleteOneClass starting ...`);

    const oneClass = await service.deleteOne(Class, req.params.id);
    res.status(200).json({ oneClass, success: true });
    logger.info(` ${NAMESPACE} : deleteOneClass get terminated ...`);
  }
);

export const updateOneClass = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  updateOneClass starting ...`);

    const oneClass = await service.updateOne(Class, req.body, req.params.id);
    res.status(200).json({ oneClass, success: true });
    logger.info(` ${NAMESPACE} : updateOneClass get terminated ...`);
  }
);
export const createOneClass = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  createOneClass starting ...`);

    const oneClass = await service.createOne(Class, req.body);
    res.status(200).json({ oneClass, success: true });
    logger.info(` ${NAMESPACE} : createOneClass get terminated ...`);
  }
);
