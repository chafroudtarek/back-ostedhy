import { config } from "./../../config/config";
import { Student } from "./students.model";
import { Teacher } from "./Teacher.model";
import { Table, Model, Column, DataType, Default } from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "verification",
})
export class Verification extends Model {
  @Column({
    type: DataType.STRING,
  })
  declare title: string;
  @Column({
    type: DataType.STRING,
  })
  declare userId: string;

  @Column({
    type: DataType.STRING,
  })
  declare type: string;

  @Default("")
  @Column({
    type: DataType.STRING,
  })
  declare email: string;
  @Default("")
  @Column({
    type: DataType.STRING,
  })
  declare password: string;
  @Default("")
  @Column({
    type: DataType.STRING,
  })
  declare phone: string;
  @Column({
    type: DataType.STRING,
  })
  declare role: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare code: string;
  @Column({
    type: DataType.DATE,
  })
  declare expiryDate: Date;
}

export const setexpiryDateCode = async () => {
  let expired = new Date();
  expired.setSeconds(expired.getSeconds() + Number(config.server.code));
  return expired.getTime();
};
