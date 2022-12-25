import { response } from "express";
import { generateEmail } from "./../utils/generatemail";
import { Teacher } from "./../database/models/Teacher.model";
import app from "../app";
import request from "supertest";
import { describe, expect, test } from "@jest/globals";
import connection from "../utils/connection";
import token from "../utils/gTokenForTest";
import { createRefreshToken } from "../utils/refreshtoken";
import { userdatabase } from "../database/repositories/user.database";

beforeAll(() => connection.sync());
afterAll(() => connection.close());

const user = new Teacher({
  firstname: "test",
  lastname: "test",
  email: "test@gmail.com",
  password: "test123",
});

describe("Auth endpoints", () => {
  it("post exist email in register should return error message", async () => {
    const response = await request(app).post("/api/auth/register").send({
      firstname: "testtest",
      lastname: "testtest",
      email: "admin@admin.com",
      password: "test454",
      phone: "6666666",
      test: "test",
    });
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      error: {
        name: "auth Error",
        type: "INVALID DATA",
        code: "BAD_REQUEST",
        statusCode: 400,
        message: "Email already exits.",
      },
      success: false,
    });
  });
  it("post with valide data in register should return successful message", async () => {
    let user = {
      firstname: "testtest",
      lastname: "testtest",
      email: generateEmail(),
      password: "test454",
      phone: "6666666",
    };
    const response = await request(app).post("/api/auth/register").send(user);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      response: {
        message: "Register Successful",
        user: {
          is_verified: false,
          role: "TEACHER",
          codevalidation: "",
          id: response.body.response.user.id,
          firstname: "testtest",
          lastname: "testtest",
          email: user.email,
          phone: "6666666",
        },
      },
      success: true,
    });
  });

  it("enter invalid password  should return error message", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "admin@admin.com",
      password: "test123",
    });

    expect(response.status).toEqual(403);
    expect(response.body).toEqual({
      error: {
        name: "auth Error",
        type: "INVALID DATA",
        code: "CREDENTIALS",
        statusCode: 403,
        message: "Invalid credentials",
      },
      success: false,
    });
  });

  it("enter valid password and email  should return success message with user data ", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "admin@admin.com",
      password: "adminadmin",
    });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      response: {
        message: "Authentication Successful",
        accessToken: response.body.response.accessToken,
        refreshToken: response.body.response.refreshToken,
        user: {
          id: response.body.response.user.id,
          firstname: "admin",
          lastname: "admin",
          email: "admin@admin.com",
          phone: "54456521",
          birthDate: null,
          is_verified: false,
          role: "ADMIN",
          codevalidation: response.body.response.user.codevalidation,
          governementId: null,
        },
      },
      success: true,
    });
  });
  it("enter a refresh Token should give me a refresh token details  ", async () => {
    const refreshtoken = await createRefreshToken(user);
    const response = await userdatabase.findToken(refreshtoken);
    expect(response.dataValues).toEqual({
      id: response.dataValues.id,
      token: refreshtoken,
      email: "test@gmail.com",
      expiryDate: response.dataValues.expiryDate,
    });
  });
  it("send a request for get new access token without refresh token should return an error   ", async () => {
    const response = await request(app).get("/api/auth/refresh");

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      error: {
        name: "refesh token Error",
        type: "INVALID DATA",
        code: "BAD_REQUEST",
        statusCode: 400,
        message: "Refresh token is required",
      },
      success: false,
    });
  });
  it("request for reset password with a valid email should  return successful message ", async () => {
    const response = await request(app).get(
      "/api/auth/requestresetpassword?email=admin@admin.com"
    );

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      response: {
        message: "SEND EMAIL Successfully",
      },
      success: true,
    });
  });
  it("post a password for reset password with a invalid link should return an error message ", async () => {
    const response = await request(app)
      .post(
        "/api/auth/resetpassword?code=e90ed0df20c21a0c1ad7349feee04c7786eb38bd777489cdcc18ee9d01d7a1f5&userId=1"
      )
      .send({ newpassword: "admin123" });

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      error: {
        code: "BAD_REQUEST",
        message: "code is invalid",
        name: "auth Error",
        statusCode: 400,
        type: "INVALID",
      },
      success: false,
    });
  });

  it("request for get code validation should return successful message", async () => {
    const response = await request(app).get(
      "/api/auth/requestcodevalidation?phone=54456521"
    );

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      response: {
        message: "Send SMS Successfully",
      },
      success: true,
    });
  });

  it("post for verify account with wrong code should return an error message ", async () => {
    const response = await request(app)
      .post("/api/auth/verifyaccount?email=admin@admin.com")
      .send({ code: "45645" });

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      error: {
        code: "BAD_REQUEST",
        message: "code is invalid",
        name: "auth Error",
        statusCode: 400,
        type: "INVALID",
      },
      success: false,
    });
  });
});
