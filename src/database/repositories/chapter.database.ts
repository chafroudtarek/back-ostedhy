import logger from "../../utils/logging";
import { Chapter } from "../models/chapter.model";

const NAMESPACE = "CHAPTER DATABASE";

export const approve = async (id: string) => {
  logger.info(` ${NAMESPACE} :  approve starting ...`);

  await Chapter.update(
    { approved: "true", status: "approved" },
    { where: { id } }
  );
  return await Chapter.findByPk(id);
  
};

export const disapprove = async (id: string) => {
  logger.info(` ${NAMESPACE} :  disapprove starting ...`);

  await Chapter.update(
    { approved: "false", status: "disapproved" },
    { where: { id } }
  );
  return await Chapter.findByPk(id);

};

export const database = {
  approve,
  disapprove,
};
