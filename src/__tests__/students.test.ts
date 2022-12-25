import { currentpath } from "./../app";
import { studentServie } from "./../services/student.service";

import connection from "../utils/connection";
import app from "../app";
import request from "supertest";
import { describe, expect } from "@jest/globals";
import token from "../utils/gTokenForTest";

import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../shared/applicationError";
import fs from "fs";
beforeAll(() => {
  return connection.sync();
});
afterAll(() => {
  return connection.close();
});
const mockRequest = (sessionData: any, body: any) => ({
  session: { data: sessionData },
  body,
});

describe("Students endpoints", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  it("update student profile class return the student  with successful message ", async () => {
    const response = await request(app)
      .put(`/api/student/1`)
      .send({
        firstname: "update profile",
        lastname: "update profile",
        phone: "5555555",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      updateduser: {
        id: 1,

        firstname: "update profile",
        lastname: "update profile",
        email: response.body.updateduser.email,
        phone: "5555555",

        is_verified: response.body.updateduser.is_verified,
        birthDate: response.body.updateduser.birthDate,
        role: response.body.updateduser.role,
        codevalidation: response.body.updateduser.codevalidation,
        governementId: response.body.updateduser.governementId,
        classId: response.body.updateduser.classId,
      },
      success: true,
    });
  });

  it(" when student subscribe a chapter should return studentid ,chapterId and successful message ", async () => {
    let lastStudentForTest: any = await connection.query(
      "select * from student ORDER BY id DESC LIMIT 1"
    );
    let newChapterForTest: any = await connection.query(
      "INSERT INTO chapter (name,slug) VALUES ('test', 'test')"
    );
    let lastChapterForTest: any = await connection.query(
      "select * from chapter ORDER BY id DESC LIMIT 1"
    );

    const response = await request(app)
      .post(`/api/student/subscribechapter`)
      .send({
        studentId: lastStudentForTest[0][0].id,
        chapterId: lastChapterForTest[0][0].id,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      subscribe: {
        studentId: lastStudentForTest[0][0].id,
        chapterId: lastChapterForTest[0][0].id,
      },
      success: true,
    });
  });

  it(" when student subscribe a subject should return studentid ,subjectId and successful message ", async () => {
    let lastStudentForTest: any = await connection.query(
      "select * from student ORDER BY id DESC LIMIT 1"
    );
    let newSubjectForTest: any = await connection.query(
      "INSERT INTO subject (name,slug,thumbnail,price) VALUES ('test', 'test','test',45)"
    );
    let lastSubjectForTest: any = await connection.query(
      "select * from subject ORDER BY id DESC LIMIT 1"
    );

    const response = await request(app)
      .post(`/api/student/subscribesubject`)
      .send({
        studentId: lastStudentForTest[0][0].id,
        subjectId: lastSubjectForTest[0][0].id,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      subscribe: {
        studentId: lastStudentForTest[0][0].id,
        subjectId: lastSubjectForTest[0][0].id,
      },
      success: true,
    });
  });
  it("update profile with exist email should return error email already exist ", async () => {
    let lastStudentForTest: any = await connection.query(
      "select * from student ORDER BY id DESC LIMIT 1"
    );
    try {
      await studentServie.updateProfile(
        { email: lastStudentForTest[0][0].email },
        lastStudentForTest[0][0].id
      );
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationError);
    }
  });

  it("subscribe to chapter with invalid data should return error  ", async () => {
    try {
      await studentServie.subscribeToChapter({ studentId: "fdfd" });
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationError);
    }
  });
  it("subscribe to subject with invalid data should return error  ", async () => {
    try {
      await studentServie.subscribeToSubject({ studentId: "fdfd" });
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationError);
    }
  });

  // it("should return 201 and create user with single image upload", async () => {
  //   const response = await request(app)
  //     .post("/api/student/upload")
  //     .set("Authorization", `Bearer ${token}`)
  //     .set("content-type", "multipart/form-data")
  //     .attach(
  //       "file",
  //       fs.readFileSync(`${currentpath}/public/temp/ali.jpg`),
  //       "tests/file.png"
  //     );
  //   console.log("reeeeesss", response.body);
  //   expect(response.status).toEqual(404);
  //   expect(response.body).toEqual({
  //     upload: {
  //       message: "image successfully uploaded",
  //       url: "http://localhost:3500/temp/file.png",
  //     },
  //     success: true,
  //   });
  // });
});
