import login from "./login";
import register from "./register";
import refresh from "./refreshToken";
import requestresetpassword from "./requestresetpassword";
import resetpassword from "./resetpassword";
import requestcodevalidation from "./requestcodevalidation";
import verifyaccount from "./verifyaccount";
export default {
  "/auth/login": {
    ...login,
  },
  "/auth/register": {
    ...register,
  },
  "/auth/refresh": {
    ...refresh,
  },
  "/auth/requestresetpassword": {
    ...requestresetpassword,
  },
  "/auth/resetpassword": {
    ...resetpassword,
  },
  "/auth/requestcodevalidation": {
    ...requestcodevalidation,
  },
  "/auth/verifyaccount": {
    ...verifyaccount,
  },
};
