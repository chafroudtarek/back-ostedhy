import { createRefreshToken } from "./../utils/refreshtoken";
import { database, updateOne } from "./../database/repositories/factory";
import { resetpassword } from "./../controllers/auth.controller";
import { ApplicationError } from "./../shared/applicationError";
import { Student } from "./../database/models/students.model";
import { generateEmail } from "./../utils/generatemail";
import connection from "../utils/connection";
import app from "../app";
import request from "supertest";
import { describe, expect } from "@jest/globals";
import token from "../utils/gTokenForTest";
import { createValidationFor } from "../utils/validation";
import { service } from "../services/auth.service";
import { Teacher } from "../database/models/Teacher.model";
import { userdatabase } from "../database/repositories/user.database";

beforeAll(() => {
  return connection.sync();
});
afterAll(() => {
  return connection.close();
});
let id = Math.floor(Math.random() * 1000000000).toString();
let wrongemail = "*******re**@aaaa.com";
describe("Auth service : endpoints", () => {
  it("login with invalid data    should return  an error message ", async () => {
    try {
      await service.login("", "", "");
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationError);
    }
  });
  it("login with non exist email or phone    should return  an error message ", async () => {
    try {
      await service.login(wrongemail, "", "");
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationError);
    }
  });
  it("request code validation with registered email   should return  Successful message ", async () => {
    let data = {
      email: "admin@admin.com",
    };
    const register = await service.requestcodevalidation(data);

    expect(register?.message).toEqual("Send EMAIL Successfully");
  });

  it("request resetpassword  with registered email   should return  Successful message ", async () => {
    let data = {
      email: "admin@admin.com",
    };
    const register = await service.requestresetpwd(data);

    expect(register?.message).toEqual("SEND EMAIL Successfully");
  });
  it("request resetpassword  with invalid email   should return  error message ", async () => {
    let data = {
      email: wrongemail,
    };
    try {
      await service.requestresetpwd(data);
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationError);
    }
  });
  it("request reset with invalid email   should return error message ", async () => {
    let data = {
      email: wrongemail,
    };
    try {
      await service.requestcodevalidation(data);
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationError);
    }
  });

  it("reset password with wrong user id should return error message ", async () => {
    let data = {
      userId: id,
    };
    try {
      await service.resetpassword(data, "password");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
  it("request code validation with invalid phone number should return error message ", async () => {
    let data = {
      phone: "**999g99999999",
    };
    try {
      await service.requestcodevalidation(data);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it("if refresh token expired should return an error ", async () => {
    let firstusedToken: any = await connection.query(
      "select * from refreshToken ORDER BY id ASC LIMIT 1"
    );
    let token = firstusedToken[0][0].token;

    try {
      await service.refresh(token);
    } catch (error) {
      expect(error).toBeInstanceOf(ApplicationError);
    }
  });

  it("verify account with valid data should return successful message ", async () => {
    let user: any = await connection.query(
      "SELECT * FROM teacher ORDER BY id ASC LIMIT 1"
    );
    let updateuser: any = await connection.query(
      "UPDATE teacher SET codevalidation ='121212' WHERE id = 1"
    );

    const response = await service.verifyaccount("121212", {
      email: user[0][0].email,
    });
    expect(response.message).toEqual("your account has been activated");
  });

  it("refresh token with valid token should return new access token ", async () => {
    let user: any = await connection.query(
      "SELECT * FROM student ORDER BY id ASC LIMIT 1"
    );
    let student = new Student(user[0][0]);
    let token = await createRefreshToken(student);

    const response = await service.refresh(token);
    console.log("refresh token", response);

    expect(response).toEqual({
      accessToken: response.accessToken,
      refreshToken: token,
    });
  });

  it("getloggn user with valid id should return the user ", async () => {
    const response = await service.getLoggenInUser("1");
    const targetuser = await userdatabase.findById("1");
    console.log("getloggneuser", response);

    expect(response.user).toEqual(targetuser);
  });
});
