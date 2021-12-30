import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Model } from 'sequelize-typescript';
import { Column, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

import { AccessLevel } from 'src/const/db.const';

@ApiTags('Users')
@Table({tableName: 'users'})
export class UserModel extends Model<UserModel> {

    @Column({
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ApiProperty({example: 'def2win@gmail.com', description: 'user email'})
    @Column({
        type: DataTypes.STRING,
        allowNull: false
    })
    email: string;

    @ApiProperty({example: '#hfk92@dkM_2s', description: 'user password'})
    @Column({
        type: DataTypes.STRING,
        allowNull: false
    })
    password: string;

    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', description: 'jwt token'})
    @Column({
        type: DataTypes.STRING
    })
    token: string;

    @Column({
        allowNull: true
    })
    resetedOn: Date;

    @ApiProperty({example: 'Pavel', description: 'user firstname'})
    @Column({
        type: DataTypes.STRING,
        allowNull: false
    })
    firstname: string;

    @ApiProperty({example: 'Petrov', description: 'user surname'})
    @Column({
        type: DataTypes.STRING,
        allowNull: false
    })
    surname: string;

    @ApiProperty({example: '08/08/1995', description: 'user date of birth'})
    @Column({
        type: DataTypes.STRING,
        allowNull: false
    })
    dob: Date;

    @Column({
        type: DataTypes.STRING,
        allowNull: true
        // TO DO :
        // ,defaultValue: 'link to a default img'
    })
    avatarPath: string;

    @ApiProperty({example: '4', description: 'user access level'})
    @Column({
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: AccessLevel.MEMBER
    })
    accessLevel: number;

    @Column({
        type: DataTypes.INTEGER,
        allowNull: true
    })
    loginAttempts: number

    @Column({
        type: DataTypes.DATE,
        allowNull: false
    })
    joinedOn: Date;

    @Column({
        type: DataTypes.DATE,
        allowNull: true
    })
    lastActionOn: Date;

    @Column({
        type: DataTypes.DATE,
        allowNull: true
    })
    lastVisitOn: Date;
}