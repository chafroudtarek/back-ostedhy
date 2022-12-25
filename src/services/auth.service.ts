import { setexpiryDateCode } from "./../database/models/verifications";
import { userdatabase } from "../database/repositories/user.database";
import { ApplicationError } from "../shared/applicationError";
import { sendmail, sendsms } from "../utils/sendEmail";

import { Verification } from "../database/models/verifications";
import crypto from "crypto";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { AuthError } from "../shared/errors/authError";

import { createRefreshToken, verifyExpiration } from "../utils/refreshtoken";
import { verifdatabase } from "../database/repositories/verification.database";
import logger from "../utils/logging";
import { STUDENTError } from "../shared/errors/studentError";

const NAMESPACE = "AUTH SERVICE";

const getLoggenInUser = async (id: string) => {
  const user = await userdatabase.findById(id);
  if (!user) {
    throw new ApplicationError(AuthError.FAILED_AUTHENTIFICATION);
  }
  return {
    user,
  };
};

const register = async (Model: any, data: any) => {
  logger.info(` ${NAMESPACE} : Starting register ...`);
  const { email, firstname, lastname, phone, governementId, classId } = data;

  const user = await userdatabase.findByEmail(Model, email);
  if (user) {
    logger.error(` ${NAMESPACE} : email exist in  register function line 33`);
    throw new ApplicationError(AuthError.EMAIL_ALREADY_EXIST);
  }
  const _user = new Model({
    firstname,
    lastname,
    email,
    password: data.password,
    phone,
    governementId,
    classId,
  });
  const hash = bcrypt.hashSync(data.password, 5);

  _user.password = hash;
  const token = jwt.sign(
    { id:  _user.id, is_verified:  _user.is_verified, role:  _user.role },
    config.server.token.secret,
    {
      expiresIn: config.server.token.expireTime,
    }
  );
  const newuser = await userdatabase.createUser(Model, _user);
  logger.info(` ${NAMESPACE} :  register  successfully line 50`);

  const { password, ...filteruser } = newuser;
  return {
    message: "Register Successful",
    accessToken: token,
    user: filteruser,
  };
};

const login = async (email: string, phone: string, userpassword: string) => {
  logger.info(` ${NAMESPACE} : Starting login ...`);
  if (!email && !phone) {
    logger.error(` ${NAMESPACE} : invlaid data in  login function line 57`);
    throw new ApplicationError(AuthError.BAD_REQUEST);
  }
  const user = await userdatabase.findBy(phone, email);
  if (!user) {
    logger.error(
      ` ${NAMESPACE} : user doesn't found in  login function line 63`
    );
    throw new ApplicationError(AuthError.NOT_FOUND);
  }
  const isMatch = bcrypt.compareSync(userpassword, user.password);

  if (!isMatch) {
    logger.error(` ${NAMESPACE} : wrong password in  login function line 70`);
    throw new ApplicationError(AuthError.CREDENTIALS_ERROR);
  }

  let refreshToken = await createRefreshToken(user);
  const token = jwt.sign(
    { id: user.id, is_verified: user.is_verified, role: user.role },
    config.server.token.secret,
    {
      expiresIn: config.server.token.expireTime,
    }
  );
  logger.info(` ${NAMESPACE} :  login  successfully line 75`);
  const { password, ...filteruser } = user.dataValues;
  return {
    message: "Authentication Successful",
    accessToken: token,
    refreshToken: refreshToken,
    user: filteruser,
  };
};

const refresh = async (requestToken: string) => {
  logger.info(` ${NAMESPACE} : Starting refresh ...`);
  if (requestToken == null) {
    logger.error(
      ` ${NAMESPACE} :  refresh token is required  in  refresh function line 93`
    );
    throw new ApplicationError(AuthError.REQUIRED_REFRESH_TOKEN);
  }

  const refreshToken = await userdatabase.findToken(requestToken);

  if (verifyExpiration(refreshToken)) {
    await userdatabase.destroyToken(refreshToken);
    logger.error(
      ` ${NAMESPACE} :  refresh token is expired  in  refresh function line 104`
    );
    throw new ApplicationError(AuthError.EXPIRED_TOKEN);
  }

  let newAccessToken = jwt.sign(
    { email: refreshToken.email },
    config.server.token.secret,
    {
      expiresIn: config.server.token.expireTime,
    }
  );
  logger.info(` ${NAMESPACE} :  refresh token  successfully line 109`);
  return {
    accessToken: newAccessToken,
    refreshToken: refreshToken?.token,
  };
};

const requestresetpwd = async (data: any) => {
  logger.info(` ${NAMESPACE} : Starting request reset password ...`);
  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, 3);
  let expired = await setexpiryDateCode();

  if (data.email) {
    const user = await userdatabase.findBy(undefined, data.email);
    console.log("user user",user)

    if (!user) {
      logger.error(
        ` ${NAMESPACE} :  user doesn't found   in  requestresetpwd function line 133`
      );
      throw new ApplicationError(AuthError.NOT_FOUND);
    }
    const link = `http://localhost:3000/resetpassword?code=${resetToken}&userId=${user.id}`;
    const objectVerif = await verifdatabase.findByEmail(user.email);
    if (objectVerif) {
      let newdata = {
        code: hash,
        title: "Forget Password",
        type: "Email Verification",
        expiryDate: expired,
      };

      await verifdatabase.update(newdata, objectVerif.id);

      let body = `use this link for reset your pwd => ${link}`;
      await sendmail(user!.email, "Reset Your  Password", body);
      logger.info(
        ` ${NAMESPACE} :  send email successfully  in  requestresetpwd function line 152`
      );
      return { message: "SEND EMAIL Successfully" };
    } else {
      const verification = new Verification({
        userId: user.id,
        email: user.email,
        phone: user.phone,
        code: hash,
        title: "Forget Password",
        type: "Email Verification",
        role: user.role,
        expiryDate: expired,
      });
      await verification.save();

      let body = `use this code for validate your pwd =>${link}`;
      await sendmail(user!.email, "Reset Your  Password", body);
      logger.info(
        ` ${NAMESPACE} :  send email successfully  in  requestresetpwd function line 169`
      );

      return { message: "SEND EMAIL Successfully" };
    }
  } else if (data.phone) {
    const user = await userdatabase.findBy(data.phone, undefined);
    if (!user) {
      logger.error(
        ` ${NAMESPACE} :  user doesn't found  in  requestresetpwd function line 180`
      );

      throw new ApplicationError(AuthError.NOT_FOUND);
    }
    const link = `http://localhost:3000/resetpassword?code=${resetToken}&userId=${user.id}`;
    const objectVerif = await verifdatabase.findByPhone(user!.phone);
    if (objectVerif) {
      let newdata = {
        code: hash,
        title: "Forget Password",
        type: "Phone Verification",
        expiryDate: expired,
      };

      await verifdatabase.update(newdata, objectVerif.id);

      let body = `use this link for reset your pwd => ${link}`;
      await sendsms(user!.phone, "Reset Your  Password", body);
      logger.info(
        ` ${NAMESPACE} :  send SMS successfully  in  requestresetpwd function line 200`
      );

      return { message: "SEND SMS Successfully" };
    } else {
      const verification = new Verification({
        userId: user.id,
        phone: user.phone,
        email: user.email,
        code: hash,
        title: "Forget Password",
        type: "Phone Verification",
        role: user.role,
        expiryDate: expired,
      });
      await verification.save();

      let body = `use this code for validate your pwd =>${link}`;
      await sendsms(user!.phone, "Reset Your  Password", body);
      logger.info(
        ` ${NAMESPACE} :  send SMS successfully  in  requestresetpwd function line 200`
      );
      return { message: "SEND SMS Successfully" };
    }
  }
};

const resetpassword = async (data: any, newpassword: string) => {
  logger.info(` ${NAMESPACE} : starting reset password ...`);
  const verifObject = await verifdatabase.findById(data.userId);
  console.log("verification is ", verifObject, " user id is  ",data.userId)
  if (!verifObject) {
    logger.error(
      ` ${NAMESPACE} :  failed to find codeverification in  resetpassword function line 235`
    );
    throw new ApplicationError(AuthError.UNAVAILABLE_CODE);
  }
  if (verifObject.expiryDate.getTime() < new Date().getTime()) {
    logger.error(
      ` ${NAMESPACE} :  code is expired in  resetpassword function line 241`
    );
    throw new ApplicationError(AuthError.EXPIRED_CODE);
  }
  const isValid = await bcrypt.compare(data.code, verifObject.code);

  if (!isValid) {
    logger.error(
      ` ${NAMESPACE} :  code is invalid in  resetpassword function line 249`
    );
    throw new ApplicationError(AuthError.INVALID_CODE);
  }
  let newdata = {
    password: newpassword,
  };

  await verifdatabase.update(newdata, verifObject.id);

  const hash = bcrypt.hashSync(newpassword, 5);
  await userdatabase.updateObject(verifObject, { password: hash }, data.userId);
  logger.info(` ${NAMESPACE} :  reset password successfully line 262`);
  return { message: "password changed successfully" };
};

const requestcodevalidation = async (data: any) => {
  logger.info(` ${NAMESPACE} : starting request code validation ...`);

  let code = Math.floor(100000 + Math.random() * 900000);

  if (data.email) {
    const user = await userdatabase.findBy(undefined, data.email);
    if (!user) {
      logger.error(
        ` ${NAMESPACE} :  user doesn't found in request code validation line 279`
      );
      throw new ApplicationError(AuthError.NOT_FOUND);
    }
    await userdatabase.updateObject(user, { codevalidation: code }, user.id);

    let body = `Your verification code is =>${code}`;
    await sendmail(user!.email, "Verify your account", body);
    logger.info(
      ` ${NAMESPACE} :  send email successfully in request code validation line 286`
    );
    return { message: "Send EMAIL Successfully" };
  }
  if (data.phone) {
    const user = await userdatabase.findBy(data.phone, undefined);
    if (!user) {
      logger.error(
        ` ${NAMESPACE} :  user doesn't found in request code validation line 296`
      );
      throw new ApplicationError(AuthError.NOT_FOUND);
    }
    await userdatabase.updateObject(user, { codevalidation: code }, user.id);

    let body = `Your verification code is =>${code}`;
    await sendsms(user.phone, "Verify your account", body);
    logger.info(
      ` ${NAMESPACE} :  send sms successfully in request code validation line 305`
    );
    return { message: "Send SMS Successfully" };
  }
};
const verifyaccount = async (code: string, query: any) => {
  logger.info(` ${NAMESPACE} : starting verify account ...`);

  let user = await userdatabase.findBy(undefined, query.email);

  if (!user) throw new ApplicationError(AuthError.NOT_FOUND);

  if (user.codevalidation != code) {
    logger.error(
      ` ${NAMESPACE} :  wrong codevalidation in verifyaccount line 319`
    );
    throw new ApplicationError(AuthError.INVALID_CODE);
  }
  await userdatabase.updateObject(user, { is_verified: true }, user.id);
  logger.info(
    ` ${NAMESPACE} :  account has been activated in verify account linr 325`
  );
  return { message: "your account has been activated" };
};

const changepassword = async (password: string, id: string) => {
  const student = await userdatabase.findById(id);
  if (!student) {
    throw new ApplicationError(AuthError.NOT_FOUND);
  }
  const newpassword = bcrypt.hashSync(password, 5);
  await userdatabase.updateObject(student, { password: newpassword }, id);
  return { message: "password changed successfully" };
};

export const service = {
  register,
  login,
  requestresetpwd,
  resetpassword,
  requestcodevalidation,
  verifyaccount,
  refresh,
  changepassword,
  getLoggenInUser,
};
