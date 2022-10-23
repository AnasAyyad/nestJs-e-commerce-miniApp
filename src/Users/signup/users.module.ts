import { Module } from '@nestjs/common';
import {  UserController } from './user.controller';
import {  UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {  Users } from 'src/Entites/users.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  providers: [{
    provide:'USER_SERVICE',
    useClass:UserService
  },

]
})
export class UsersModule {}
