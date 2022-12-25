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
  DefaultScope,
} from "sequelize-typescript";
import { Class } from "./class.model";

@Table({
  timestamps: false,
  tableName: "teacher",
})
export class Teacher extends Model {
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
    allowNull: false,
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

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare birthDate: Date;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  declare is_verified: boolean;
  @Default("")
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare image: string;

  @Default("TEACHER")
  @Column({
    type: DataType.STRING,
  })
  declare role: string;

  @Default("")
  @Column({
    type: DataType.STRING,
  })
  declare codevalidation: string;

  /**
   * RELATIONS
   */

  @HasMany(() => Subject)
  declare subjects: Subject[];

  @HasMany(() => Class)
  declare classes: Class[];

  @ForeignKey(() => Governement)
  @Column
  declare governementId: number;

  @BelongsTo(() => Governement)
  declare governement: Governement;
}
