import { Chapter } from "./chapter.model";
import { Governement } from "./governement.model";
import { Subject } from "./subject.model";
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  Default,
  Unique,
  BelongsToMany,
  Scopes,
} from "sequelize-typescript";
import { Class } from "./class.model";
import { SubjectStudent } from "./subjectStudent";
import { ChapterStudent } from "./chapterStudent.model";

@Scopes(() => ({
  withoutPassword: {
    attributes: { exclude: ["password"] },
  },
}))
@Table({
  timestamps: false,
  tableName: "student",
})
export class Student extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare firstname: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare lastname: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare email: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare phone: string;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
  })
  declare solde: number;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  declare is_verified: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare birthDate: Date;
  @Default("STUDENT")
  @Column({
    type: DataType.STRING,
  })
  declare role: string;

  @Column({
    type: DataType.STRING,
  })
  declare codevalidation: string;

  @Column({
    type: DataType.STRING,
  })
  declare image: string;

  /**
   * RELATIONS
   */

  @BelongsToMany(() => Subject, () => SubjectStudent)
  declare subjects: Subject[];

  @BelongsToMany(() => Chapter, () => ChapterStudent)
  declare chapters: Chapter[];

  @ForeignKey(() => Governement)
  @Column
  declare governementId: number;

  @BelongsTo(() => Governement)
  declare governement: Governement;

  @ForeignKey(() => Class)
  @Column
  declare classId: number;

  @BelongsTo(() => Class)
  declare class: Class;
}
