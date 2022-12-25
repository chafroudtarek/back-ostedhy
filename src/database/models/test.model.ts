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
  tableName: "test",
})
export class Test extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;
}
