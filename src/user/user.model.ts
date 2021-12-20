import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Model } from 'sequelize-typescript';
import { Column, DataType, Table } from 'sequelize-typescript';
import { ARRAY } from 'sequelize/types';

import { AccessLevel } from 'src/const/db';

interface UserCreationAttrs {
    email: string,
    password: string,
    firstname: string,
    surname: string,
    dob: Date
}

@ApiTags('Users')
@Table({tableName: 'user'})
export class UserModel extends Model<UserModel> {

    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    Id: number;

    @ApiProperty({example: 'def2win@gmail.com', description: 'user email'})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    Email: string;

    @ApiProperty({example: '#hfk92@dkM_2s', description: 'user password'})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    Password: string;

    @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', description: 'jwt token'})
    @Column({
        type: DataType.STRING
    })
    Tokens: string;

    @Column({
        allowNull: true
    })
    ResetedOn: Date;

    @ApiProperty({example: 'Pavel', description: 'user firstname'})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    Firstname: string;

    @ApiProperty({example: 'Petrov', description: 'user surname'})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    Surname: string;

    @ApiProperty({example: '08/08/1995', description: 'user date of birth'})
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    Dob: Date;

    @Column({
        allowNull: true
        // TO DO :
        // ,defaultValue: 'link to a default img'
    })
    AvatarPath: string;

    @ApiProperty({example: '4', description: 'user access level'})
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: AccessLevel.MEMBER
    })
    AccessLevel: number;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    JoinedOn: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    LastActionOn: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    LastVisitOn: Date;
}