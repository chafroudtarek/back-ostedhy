import { Request, Response, NextFunction } from "express";
import { service } from "../services/factory";
import { Governement } from "../database/models/governement.model";
import asyncHandler from "express-async-handler";
import logger from "../utils/logging";

const NAMESPACE = "GIVERNEMENT CONTROLLER";

export const getAllGovernements = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  getAllGovernements starting ...`);

    const allGovernements = await service.getAll(Governement);
    res.status(200).json({ allGovernements, success: true });
    logger.info(` ${NAMESPACE} : getAllGovernements get terminated ...`);
  }
);

export const getOneGovernement = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  getOneGovernement starting ...`);

    const oneGovernement = await service.getOne(Governement, req.params.id);
    res.status(200).json({ oneGovernement, success: true });
    logger.info(` ${NAMESPACE} : getOneGovernement get terminated ...`);
  }
);

export const deleteOneGovernement = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  deleteOneGovernement starting ...`);

    const oneGovernement = await service.deleteOne(Governement, req.params.id);
    res.status(200).json({ oneGovernement, success: true });
    logger.info(` ${NAMESPACE} : deleteOneGovernement get terminated ...`);
  }
);

export const updateOneGovernement = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  updateOneGovernement starting ...`);

    const oneGovernement = await service.updateOne(
      Governement,
      req.body,
      req.params.id
    );
    res.status(200).json({ oneGovernement, success: true });
    logger.info(` ${NAMESPACE} : updateOneGovernement get terminated ...`);
  }
);
export const createOneGovernement = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} :  createOneGovernement starting ...`);

    const oneGovernement = await service.createOne(Governement, req.body);
    res.status(200).json({ oneGovernement, success: true });
    logger.info(` ${NAMESPACE} : createOneGovernement get terminated ...`);
  }
);
