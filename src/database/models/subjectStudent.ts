import { Subject } from "./subject.model";
import { Student } from "./students.model";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "subjectStudent",
})
export class SubjectStudent extends Model {
  @ForeignKey(() => Subject)
  @Column
  declare subjectId: number;

  @ForeignKey(() => Student)
  @Column
  declare studentId: number;
}
