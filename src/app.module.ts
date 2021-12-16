import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize/types';
import { UserModel } from './user/user.model';
import { UserModule } from './user/user.module';

// export const databaseProviders = [
//     {
//       provide: 'SEQUELIZE',
//       useFactory: async () => {
//         const sequelize = new Sequelize({
//           dialect: 'postgres',
//           host: process.env.DB_HOST,
//           port: +process.env.DB_PORT,
//           username: process.env.DB_USER,
//           password: process.env.DB_PASSWORD,
//           database: process.env.DB_DATABASE,
//         });
//         sequelize.addModels([UserModel]);
//         await sequelize.sync();
//         return sequelize;
//       },
//     },
//   ];

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            models: [__dirname + '/**/*.model.ts'],
            synchronize: true
            // models: [
            //     UserModel
            // ],
        }),
        UserModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
