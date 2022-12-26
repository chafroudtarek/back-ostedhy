import { Subject } from "./subject.model";
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { Teacher } from "./Teacher.model";
import { Student } from "./students.model";

@Table({
  timestamps: false,
  tableName: "classe",
})
export class Class extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  /**
   * RELATIONS
   */
  @ForeignKey(() => Teacher)
  @Column
  declare teacherId: number;
  @BelongsTo(() => Teacher)
  declare teacher: Teacher;

  @HasMany(() => Subject)
  declare Subjects: Subject[];
  @HasMany(() => Student)
  declare students: Student[];
}
