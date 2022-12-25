import { Model } from "sequelize-typescript";
import { ApplicationError } from "../../shared/applicationError";
import { AuthError } from "../../shared/errors/authError";
import logger from "../../utils/logging";
import { Verification } from "./../models/verifications";

const NAMESPACE = "VERIFICATION DATABASE";

const findByEmail = async (email: string) => {
  logger.info(` ${NAMESPACE} :  findByEmail starting ...`);

  return await Verification.findOne({ where: { email } });

  
};

const findById = async (id: string) => {
  logger.info(` ${NAMESPACE} :  findByEmail starting ...`);

  return await Verification.findOne({ where: { userId: id } });

 
};

const findByPhone = async (phone: string) => {
  logger.info(` ${NAMESPACE} :  findByPhone starting ...`);

  return await Verification.findOne({ where: { phone } });

};
export const update = async (newData: any, id: string) => {
  logger.info(` ${NAMESPACE} :  update starting ...`);

  await Verification.update(newData, { where: { id } });
  return await Verification.findByPk(id);
 
};

export const verifdatabase = {
  findByEmail,
  findByPhone,
  findById,
  update,
};
