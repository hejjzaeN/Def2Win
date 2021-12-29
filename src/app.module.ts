import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserModel } from './user/user.model';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AccessModule } from './access/access.module';

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            models: [
                UserModel
            ],
            autoLoadModels: true,
            synchronize: true
        }),
        UserModule,
        AuthModule,
        AccessModule
    ],
    controllers: [],
    providers: [],
    exports: []
})

export class AppModule {}