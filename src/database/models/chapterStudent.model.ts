import { Student } from "./students.model";
import { Chapter } from "./chapter.model";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "chapterStudent",
})
export class ChapterStudent extends Model {
  @ForeignKey(() => Chapter)
  @Column
  declare chapterId: number;

  @ForeignKey(() => Student)
  @Column
  declare studentId: number;
}
