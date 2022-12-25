import { ApplicationError } from "./../shared/applicationError";
import { Model } from "sequelize-typescript";
import { database } from "../database/repositories/factory";
import { HTTPError } from "../shared/errors/commonError";
import logger from "../utils/logging";

const NAMESPACE = "FACTORY SERVICE";

export const getAll = async (model: any) => {
  logger.info(` ${NAMESPACE} : Starting getAll ...`);
  const objects = await database.getAll(model);
  if (objects.length == 0) {
    logger.error(` ${NAMESPACE} : empty table in getAll function Line 13`);
    throw new Error("your table is empty");
  }
  return objects;
};

const getOne = async (model: any, id: string) => {
  logger.info(` ${NAMESPACE} : Starting getOne ...`);
  const object = await database.getOne(model, id);
  if (!object) {
    logger.error(
      ` ${NAMESPACE} : object doesn't found in getOne function line 23`
    );
    throw new ApplicationError(HTTPError.NOT_FOUND);
  }
  return object;
};

const deleteOne = async (model: any, id: string) => {
  logger.info(` ${NAMESPACE} : Starting deleteOne ...`);
  const object = await database.deleteOne(model, id);
  if (!object) {
    logger.error(
      ` ${NAMESPACE} : object doesn't found in deleteOne function line 34`
    );
    throw new ApplicationError(HTTPError.NOT_FOUND);
  }
  return object;
};

const updateOne = async (model: any, newData: Model, id: string) => {
  logger.info(` ${NAMESPACE} : Starting updateOne ...`);
  const object = await database.updateOne(model, newData, id);
  if (!object) {
    logger.error(
      ` ${NAMESPACE} : object doesn't found in updateOne function line 46`
    );
    throw new ApplicationError(HTTPError.NOT_FOUND);
  }
  return object;
};
const createOne = async (model: any, newData: Model) => {
  logger.info(` ${NAMESPACE} : Starting createOne ...`);
  const object = await database.createaOne(model, newData);

  return object;
};

export const getAllSubjectWithClass = async () => {
  logger.info(` ${NAMESPACE} : Starting getAllSubjects ...`);
  const objects = await database.getAllSubjectsWithClass();
  if (objects.length == 0) {
    logger.error(
      ` ${NAMESPACE} : empty table in getAllSubjects function Line 13`
    );
    throw new Error("your table is empty");
  }
  return objects;
};

export const getOneSubjectWithChapter = async (id: string) => {
  logger.info(` ${NAMESPACE} : Starting getOneSubjectWithChapter ...`);
  return await database.getOneSubjectWithChapter(id);
};

export const service = {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
  getAllSubjectWithClass,
  getOneSubjectWithChapter,
};
