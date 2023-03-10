import jwt from "jsonwebtoken";
import { config } from "../config/config";

const token = jwt.sign(
  {
    name: "test user",
    id: 1,
    email: "test@email.com",
    password: "testpass",
    role: "ADMIN",
  },

  config.server.token.secret,
  {}
);

export default token;
