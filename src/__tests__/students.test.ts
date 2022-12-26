import { Verification } from "./../database/models/verifications";
import { currentpath } from "./../app";
import { studentServie } from "./../services/student.service";

import connection from "../utils/connection";
import app from "../app";
import request from "supertest";
import { describe, expect } from "@jest/globals";
import token from "../utils/gTokenForTest";
import { generateEmail } from "../utils/generatemail";
import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../shared/applicationError";
import { verifdatabase } from "../database/repositories/verification.database";

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

  it("subscribe the same subject again should return an error msg  ", async () => {
    let lastobject: any = await connection.query(
      "select * from subjectStudent order By subjectId DESC LIMIT 1  "
    );

    try {
      await studentServie.subscribeToSubject({
        studentId: lastobject[0][0].studentId,
        subjectId: lastobject[0][0].subjectId,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationError);
    }
  });

  it("find student with valid phone should return the student  ", async () => {
    const response = await verifdatabase.findByPhone("54456521");
    console.log("erere", response);
    expect(response?.dataValues.phone).toEqual("54456521");
  });

  it("Subscribe to a subject with invalid user should return an error ", async () => {
    try {
      await studentServie.subscribeToSubject({
        studentId: "55555555555",
        subjectId: "555555555",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationError);
    }
  });
});
