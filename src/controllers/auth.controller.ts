import { Teacher } from "./../database/models/Teacher.model";
import { Student } from "./../database/models/students.model";
import { service } from "./../services/auth.service";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import logger from "../utils/logging";

const NAMESPACE = "AUTH CONTROLLER";

export const getLoggenInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(` ${NAMESPACE} : Starting getLoggenInUser ...`);
  const { id } = res.locals.user;
  console.log("user id isis ", id , " ressss ", res.locals)
  const response = await service.getLoggenInUser(id);
  res.status(200).json({ response, success: true });
  logger.info(` ${NAMESPACE} : getLoggenInUser get terminated ...`);
};

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} : Starting register ...`);
    let response;
    req.query.student
      ? (response = await service.register(Student, req.body))
      : (response = await service.register(Teacher, req.body));

    res.status(200).json({ response, success: true });
    logger.info(` ${NAMESPACE} : register get terminated ...`);
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} : Starting login ...`);
    const { email, phone, password } = req.body;
    const user = await service.login(email, phone, password);
    res
      .cookie("refreshToken", user.refreshToken, {
        expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
      })
      .status(200)
      .json({ response: user, success: true });
    logger.info(` ${NAMESPACE} : login get terminated ...`);
  }
);

export const refreshToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} : Starting refreshToken ...`);
    const { refreshToken: requestToken } = req.cookies;

    const response = await service.refresh(requestToken);
    res.status(200).json({ response, success: true });
    logger.info(` ${NAMESPACE} : refreshToken get terminated ...`);
  }
);

export const requestresetpwd = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} : Starting request resetpwd...`);
    const response = await service.requestresetpwd(req.query);
    res.status(200).json({ response, success: true });
    logger.info(` ${NAMESPACE} : requestresetpwd get terminated ...`);
  }
);
export const resetpassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} : Starting reset password...`);

    const response = await service.resetpassword(
      req.query,
      req.body.newpassword
    );
    res.status(200).json({ response, success: true });
    logger.info(` ${NAMESPACE} : reset password get terminated ...`);
  }
);

export const requestcodevalidation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} : Starting requestcodevalidation ...`);

    const response = await service.requestcodevalidation(req.query);
    res.status(200).json({ response, success: true });
    logger.info(` ${NAMESPACE} : request code validation get terminated ...`);
  }
);

export const verifyaccount = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} : Starting verify account ...`);

    const response = await service.verifyaccount(req.body.code, req.query);
    res.status(200).json({ response, success: true });
    logger.info(` ${NAMESPACE} : verifyaccount get terminated ...`);
  }
);

export const changepassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    logger.info(` ${NAMESPACE} : Starting change password ...`);

    const response = await service.changepassword(
      req.body.newpassword,
      req.params.id
    );
    res.status(200).json({ response, success: true });
    logger.info(` ${NAMESPACE} : changepassword get terminated ...`);
  }
);
