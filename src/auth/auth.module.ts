import { Module } from '@nestjs/common';

import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/user/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    UserModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
