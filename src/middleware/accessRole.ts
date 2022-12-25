import { NextFunction } from "express";
import { Response } from "express";
import { Request } from "express";
import logger from "../utils/logging";

export const accessRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.info(`  MIDDLEWARE => accessRole ...`);

    const role = res.locals.user.role;
    if (roles.includes(role)) {
      next();
    } else {
      throw new Error(" you don't have rights to access");
    }
  };
};
