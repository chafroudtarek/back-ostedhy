import { Student } from "./../database/models/students.model";
import { Teacher } from "./../database/models/Teacher.model";
import { Model } from "sequelize-typescript";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

import { v4 as uuidv4 } from "uuid";
import { RefreshToken } from "../database/models/refreshToken.model";

export const createRefreshToken = async (user: Teacher | Student) => {
  let expiredAt = new Date();
  expiredAt.setSeconds(
    expiredAt.getSeconds() + Number(config.server.token.refreshTokenTime)
  );

  let _token = uuidv4();

  let refreshToken = await RefreshToken.create({
    token: _token,
    email: user?.email,
    expiryDate: expiredAt.getTime(),
  });

  return refreshToken.token;
};

export const verifyExpiration = (refreshToken: RefreshToken) => {
  return refreshToken.expiryDate.getTime() < new Date().getTime();
};
