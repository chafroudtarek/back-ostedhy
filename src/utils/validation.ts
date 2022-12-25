import { Request, Response, NextFunction } from "express";

import { check, validationResult } from "express-validator";

export function createValidationFor(route: string) {
  switch (route) {
    case "register":
      return [
        check("firstname")
          .not()
          .isEmpty()
          .withMessage("firstname is required."),
        check("lastname").not().isEmpty().withMessage("lastname is required."),
        check("phone").not().isEmpty().withMessage("phone is required."),
        check("password")
          .isLength({ min: 6 })
          .withMessage("Please enter a valid password ( min length is 6 )."),
      ];
    case "login":
      return [
        check("password")
          .isLength({ min: 6 })
          .withMessage("Please enter a valid password ( min length is 6 )."),
      ];

    default:
      return [];
  }
}

export function checkValidationResult(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  res.status(422).json({
    error: {
      message: result.array({ onlyFirstError: true })[0].msg,
    },
    listerrors: result.array(),
  });
}
