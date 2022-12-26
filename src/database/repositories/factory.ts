import { Class } from "./../models/class.model";
import { Student } from "./../models/students.model";
import { Chapter } from "./../models/chapter.model";
import { Subject } from "./../models/subject.model";
import { Model } from "sequelize-typescript";
import logger from "../../utils/logging";
import { SubjectStudent } from "../models/subjectStudent";

const NAMESPACE = "FACTORY DATABASE";

export const getAll = async (Model: any) => {
  logger.info(` ${NAMESPACE} :  getAll starting ...`);

  return await Model.findAll({});
};

export const getOne = async (Model: any, id: string) => {
  logger.info(` ${NAMESPACE} :  getOne starting ...`);

  return await Model.findByPk(id);
};

export const getOneByUserId = async (Model: any, id: string) => {
  logger.info(` ${NAMESPACE} :  getOneByUserId starting ...`);

  return await Model.findOne({ where: { userId: id } });
};
export const deleteOne = async (Model: any, id: string) => {
  logger.info(` ${NAMESPACE} :  deleteOne starting ...`);

  const data = await Model.findByPk(id);
  await Model.destroy({ where: { id } });
  return data;
};

export const updateOne = async (Model: any, newData: any, id: string) => {
  logger.info(` ${NAMESPACE} :  updateOne starting ...`);

  await Model.update(newData, { where: { id } });
  return await Model.findByPk(id);
};

export const createaOne = async (Model: any, data: any) => {
  logger.info(` ${NAMESPACE} :  createaOne starting ...`);

  return await Model.create(data);
};
export const getAllSubjectsWithClass = async () => {
  logger.info(` ${NAMESPACE} :  getAllSubjectWithClass starting ...`);

  return await Subject.findAll({
    include: [Class],
  });
};
export const getOneSubjectWithChapter = async (id: string) => {
  logger.info(` ${NAMESPACE} :  getOneSubjectWithChapter starting ...`);

  return await Subject.findByPk(id, { include: { all: true } });
};

const getStudentSubject = async (studentId: string, subjectId: string) => {
  return await SubjectStudent.findOne({ where: { studentId, subjectId } });
};
export const database = {
  getAll,
  getOne,
  getOneByUserId,
  updateOne,
  deleteOne,
  createaOne,
  getAllSubjectsWithClass,
  getOneSubjectWithChapter,
  getStudentSubject,
};
