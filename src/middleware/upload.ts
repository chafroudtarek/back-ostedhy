import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { currentpath } from "../app";
import logger from "../utils/logging";

const imageFilter = (req: Request, file: any, cb: any) => {
  logger.info(`  MIDDLEWARE => imageFilter ...`);

  console.log("file.mimetype", file.mimetype);
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    return cb(new Error("Please upload only images."));
  }
};

var storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, currentpath + "/public/images/");
  },
  filename: (req: Request, file: any, cb: any) => {
    cb(null, `${Date.now()}-ostedhy-${file.originalname}`);
  },
});

var upload = multer({ storage: storage, fileFilter: imageFilter });

export default upload;
