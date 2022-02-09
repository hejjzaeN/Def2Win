import { Column, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { UserModel } from "src/user/user.model";

@Table({tableName: 'goals'})
export class GoalModel extends Model<GoalModel> {

    @Column({
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataTypes.DATE
    })
    date: Date;

    @Column({
        type: DataTypes.INTEGER
    })
    type: number;

    @Column({
        type: DataTypes.INTEGER,
        references: {
            model: UserModel,
            key: 'id'
        }
    })
    userId: number;

    @Column({
        type: DataTypes.INTEGER
    })
    categoryId: number;

    @Column({
        type: DataTypes.INTEGER
    })
    priorityId: number;

    @Column({
        type: DataTypes.INTEGER
    })
    statusId: number;

    @Column({
        type: DataTypes.STRING
    })
    description: number;

    @Column({
        type: DataTypes.INTEGER
    })
    completed: number;

    @Column({
        type: DataTypes.INTEGER
    })
    archived: number;
}