import { ChapterStudent } from "./../database/models/chapterStudent.model";
import { Student } from "../database/models/students.model";
import { database } from "../database/repositories/factory";
import { userdatabase } from "../database/repositories/user.database";
import { ApplicationError } from "../shared/applicationError";
import { AuthError } from "../shared/errors/authError";
import { HTTPError } from "../shared/errors/commonError";
import { SubjectStudent } from "../database/models/subjectStudent";
import fs from "fs";
import { currentpath } from "../app";
import logger from "../utils/logging";
import { STUDENTError } from "../shared/errors/studentError";
import { v2 as cloudinary } from "cloudinary";
import { extractpublicidcloudianry } from "../utils/extractidcloudinary";

cloudinary.config({
  cloud_name: "djaqfxic1",
  api_key: "397917968126626",
  api_secret: "mNbkEU9_NHN13Q5IBxTyIjgcdV0",
});

const NAMESPACE = "STUDENT SERVICE";
export const updateProfile = async (data: any, id: string) => {
  logger.info(` ${NAMESPACE} :  updateProfile starting ...`);
  const student = await userdatabase.findById(id);
  const { email } = data;

  if (!(email == student?.email)) {
    const user = await userdatabase.findByEmail(Student, email);
    if (user) {
      throw new ApplicationError(AuthError.EMAIL_ALREADY_EXIST);
    }
  }

  const updateduser = await database.updateOne(Student, data, id);
  const { password, ...filteruser } = updateduser.dataValues;
  return filteruser;
};

export const subscribeToChapter = async (data: any) => {
  logger.info(` ${NAMESPACE} :  subscribeToChapter starting ...`);
  const { studentId, chapterId } = data;
  if (!studentId || !chapterId) {
    throw new ApplicationError(HTTPError.INVALID_DATA);
  }
  const object = new ChapterStudent({
    studentId,
    chapterId,
  });
  await object.save();
  return object;
};
export const subscribeToSubject = async (data: any) => {
  logger.info(` ${NAMESPACE} :  subscribeToSubject starting ...`);
  const { studentId, subjectId, points } = data;
  if (!studentId || !subjectId) {
    throw new ApplicationError(HTTPError.INVALID_DATA);
  }
  const subscribe = await database.getStudentSubject(studentId, subjectId);
  if (subscribe) {
    throw new ApplicationError(STUDENTError.SUBSCRIBED);
  }
  const student = await userdatabase.findStudentbyId(studentId);
  if (student) {
    await userdatabase.updateObject(
      student,
      { solde: Number(student?.solde) + Number(points) },
      studentId
    );
  } else {
    throw new ApplicationError(HTTPError.INVALID_DATA);
  }

  const object = new SubjectStudent({
    studentId,
    subjectId,
  });
  await object.save();
  return object;
};

export const uploadAvatar = async (data: any, id: string) => {
  logger.info(` ${NAMESPACE} :  uploadAvatar starting ...`);
  if (data.file == undefined) {
    throw new ApplicationError(STUDENTError.INVALID_DATA);
  }
  if (data.file.size > 2000000)
    throw new ApplicationError(STUDENTError.INVALID_SIZE);

  //let newImage = "http://localhost:3500/temp/" + data.file.originalname;
  const upload = await cloudinary.uploader.upload(data.file.path);
  await database.updateOne(Student, { image: upload.secure_url }, id);

  // fs.writeFileSync(
  //   currentpath + "/public/temp/" + data.file.originalname,
  //   fs.readFileSync(currentpath + "/public/images/" + data.file.filename)
  // );

  return {
    message: "image successfully uploaded",
    url: upload.secure_url,
  };
};

export const deleteStudentImage = async (id: string) => {
  const user = await userdatabase.findById(id);

  if (user!.image == "") throw new ApplicationError(STUDENTError.NOT_FOUND);
  const public_id = extractpublicidcloudianry(user?.image);
  await cloudinary.uploader.destroy(public_id);
  await database.updateOne(Student, { image: "" }, id);
  return {
    message: "image successfully deleted",
  };
};

export const studentServie = {
  updateProfile,
  subscribeToChapter,
  subscribeToSubject,
  uploadAvatar,
  deleteStudentImage,
};
