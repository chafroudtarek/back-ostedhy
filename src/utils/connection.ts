import { Test } from "./../database/models/test.model";
import { ChapterStudent } from "./../database/models/chapterStudent.model";
import { SubjectStudent } from "./../database/models/subjectStudent";
import { Verification } from "./../database/models/verifications";
import { RefreshToken } from "./../database/models/refreshToken.model";
import { Student } from "./../database/models/students.model";
import { Teacher } from "./../database/models/Teacher.model";
import { Governement } from "./../database/models/governement.model";
import { Class } from "./../database/models/class.model";
import { Subject } from "./../database/models/subject.model";
import { Chapter } from "./../database/models/chapter.model";
import { Sequelize } from "sequelize-typescript";
import { config } from "../config/config";

const connection = new Sequelize({
  dialect: "mysql",
  host: config.database.host,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  logging: false,
  models: [
    Teacher,
    Student,
    Chapter,
    Subject,
    Class,
    Governement,
    Verification,
    RefreshToken,
    SubjectStudent,
    ChapterStudent,
    Test,
  ],
});

export default connection;
