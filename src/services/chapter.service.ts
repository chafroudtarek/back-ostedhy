import logger from "../utils/logging";
import { database } from "../database/repositories/chapter.database";

const NAMESPACE = "CHAPTER SERVICE";

export const approve = async (id: string) => {
  logger.info(` ${NAMESPACE} : Starting approve ...`);
  const object = await database.approve(id);
  return object;
};

export const disapprove = async (id: string) => {
  logger.info(` ${NAMESPACE} : Starting disapprove ...`);
  const object = await database.disapprove(id);
  return object;
};

export const chapterservice = {
  approve,
  disapprove,
};
