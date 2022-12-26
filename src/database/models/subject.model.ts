import { Teacher } from "./Teacher.model";
import { Class } from "./class.model";
import { Chapter } from "./chapter.model";
import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
} from "sequelize-typescript";
import { Student } from "./students.model";
import { SubjectStudent } from "./subjectStudent";

@Table({
  timestamps: false,
  tableName: "subject",
})
export class Subject extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare slug: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare thumbnail: string;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare price: number;

  /**
   * RELATIONS
   */

  @BelongsToMany(() => Student, () => SubjectStudent)
  declare students: Student[];

  @HasMany(() => Chapter)
  declare chapters: Chapter[];

  @ForeignKey(() => Class)
  @Column
  declare classId: number;

  @BelongsTo(() => Class)
  declare classe: Class;

  @ForeignKey(() => Teacher)
  @Column
  declare teacherId: number;

  @BelongsTo(() => Teacher)
  declare teacher: Teacher;
}
