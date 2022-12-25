import { Student } from "./students.model";
import { Subject } from "./subject.model";
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import { ChapterStudent } from "./chapterStudent.model";

@Table({
  timestamps: false,
  tableName: "chapter",
})
export class Chapter extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare slug: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare thumbnail: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare price: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare shortDescription: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare longDescription: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare approved: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare status: string;

  /**
   * RELATIONS
   */

  @BelongsToMany(() => Student, () => ChapterStudent)
  declare students: Student[];

  @ForeignKey(() => Subject)
  @Column
  declare subjectId: number;

  @BelongsTo(() => Subject)
  declare subject: Subject;
}
