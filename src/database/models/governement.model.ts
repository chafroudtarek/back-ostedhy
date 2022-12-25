import { Student } from "./students.model";
import { Teacher } from "./Teacher.model";
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "governement",
})
export class Governement extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare name: string;

  /**
   * RELATIONS
   */

  @HasMany(() => Teacher)
  declare Teachers: Teacher[];

  @HasMany(() => Student)
  declare students: Student[];
}
