import { update } from "./verification.database";
import { Teacher } from "./../models/Teacher.model";
import { Student } from "./../models/students.model";
import { ApplicationError } from "../../shared/applicationError";
import { AuthError } from "../../shared/errors/authError";
import { RefreshToken } from "../models/refreshToken.model";
import logger from "../../utils/logging";

const NAMESPACE = "USER DATABASE";

const findByEmail = async (Model: any, email: string) => {
  logger.info(` ${NAMESPACE} :  findByEmail starting ...`);

  return await Model.findOne({ where: { email: email } });
};
const findById = async (id: string) => {
  logger.info(` ${NAMESPACE} :  findbyid starting ...`);
  let user;
  user = await Student.findByPk(id);
  if (!user) user = await Teacher.findByPk(id);

  return user;
};
const findStudentbyId = async (id: string) => {
  logger.info(` ${NAMESPACE} :  findstudent by id starting ...`);
  return await Student.findByPk(id);
};

const findBy = async (phone?: string, email?: string) => {
  logger.info(` ${NAMESPACE} :  findBy starting ...`);

  let user;

  email
    ? (user = await Student.findOne({
        where: { email },
      }))
    : (user = await Student.findOne({
        where: { phone },
      }));

  if (!user) {
    email
      ? (user = await Teacher.findOne({
          where: { email },
        }))
      : (user = await Teacher.findOne({
          where: { phone },
        }));
  }
  return user;
};

const createUser = async (Model: any, _user: any) => {
  logger.info(` ${NAMESPACE} :  createUser starting ...`);

  const user = await Model.create(_user.dataValues);

  return user.dataValues;
};
export const updateObject = async (user: any, data: any, id: string) => {
  logger.info(` ${NAMESPACE} :  updateObject starting ...`);

  let object;
  if (user.role == "TEACHER") {
    await Teacher.update(data, { where: { id } });
    object = await Teacher.findByPk(id);
    return object;
  }
  await Student.update(data, { where: { id } });
  object = await Student.findByPk(id);
  return object;
};

const findToken = async (requestToken: String) => {
  logger.info(` ${NAMESPACE} :  findToken starting ...`);

  let refreshToken = await RefreshToken.findOne({
    where: { token: requestToken },
  });
  if (!refreshToken)
    throw new ApplicationError(AuthError.UNAVAILABLE_REFRESH_TOKEN);

  return refreshToken;
};
const destroyToken = async (refreshToken: RefreshToken) => {
  logger.info(` ${NAMESPACE} :  destroyToken starting ...`);

  await RefreshToken.destroy({ where: { id: refreshToken.id } });
};

export const userdatabase = {
  findByEmail,
  findBy,
  createUser,
  destroyToken,
  findById,
  findStudentbyId,
  updateObject,
  findToken,
};
