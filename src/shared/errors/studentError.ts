import { ApplicationError } from "../applicationError";

const STUDENTError = {
  INVALID_DATA: {
    type: ApplicationError.type.NETWORK,
    code: "BAD_REQUEST",
    message: "you must enter an image",
    statusCode: 400,
  },

  INVALID_SIZE: {
    type: ApplicationError.type.NETWORK,
    code: "INVALID DATA",
    message: "You must enter a image below than 2mo",
    statusCode: 401,
  },
  NOT_FOUND: {
    type: ApplicationError.type.NETWORK,
    code: "NOT_FOUND",
    message: "Already doesn't have an image",
    statusCode: 401,
  },
};

export { STUDENTError };
