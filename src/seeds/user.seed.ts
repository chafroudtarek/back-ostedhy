import { Teacher } from "./../database/models/Teacher.model";
import connection from "../utils/connection";
import bcrypt from "bcrypt";

export const connectDB = async () => {
  connection.sync().then(async () => {
    const privateadmin1 = await Teacher.findOne({
      where: { email: "admin@admin.com" },
    });

    if (!privateadmin1) {
      const admin1 = new Teacher({
        firstname: "admin",
        lastname: "admin",
        password: bcrypt.hashSync("adminadmin", 5),
        email: "admin@admin.com",
        role: "ADMIN",
        phone: "54456521",
      });
      await admin1.save();
    }
  });
};
