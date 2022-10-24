import { Module } from '@nestjs/common';
import {  UsersModule } from './Users/signup/users.module';
import { LoginModule } from './Users/login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './Entites/users.entity';
import { Category } from './Entites/categories.entity';
import { Products } from './Entites/products.entity';
import { ProductsModule } from './products/products.module';
import { ProductHistory } from './Entites/productHistory.entity';


@Module({
  imports: [UsersModule, LoginModule,TypeOrmModule.forRoot({
    type:'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:"##qlaANAS123450qlaANAS",
    database:'e_commerce',
    entities:[Users,Category,Products,ProductHistory],
    synchronize:true
  }), ProductsModule]
})

export class AppModule {}
