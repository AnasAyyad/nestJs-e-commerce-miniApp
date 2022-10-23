import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/Entites/categories.entity';
import { ProductHistory } from 'src/Entites/productHistory.entity';
import { Products } from 'src/Entites/products.entity';
import { Users } from 'src/Entites/users.entity';
import { RoleGuard } from 'src/Users/guards/roles.guard';
import { UserService } from 'src/Users/signup/user.service';
import { ProductsBuyerController } from './buyer/productsBuyer.controller';
import { ProductsBuyerService } from './buyer/productsBuyer.service';
import { ProductsSellerController } from './seller/productsSeller.controller';
import { ProductsSellerService } from './seller/productsSeller.service';
import { SessionSerializer } from '../Utilites/session/session.serializer';

@Module({
  imports: [TypeOrmModule.forFeature([Category,ProductHistory,Products,Users]),
            PassportModule.register({session:true})],
            
  controllers: [ProductsBuyerController,ProductsSellerController],
  providers: [
    {provide:'SELLER_SERVICE',
     useClass:ProductsSellerService},
     {
      provide:'BUYER_SERVICE',
      useClass:ProductsBuyerService
     },
     {
      provide:'USER_SERVICE',
      useClass:UserService
     },{
      provide:APP_GUARD,
      useClass:RoleGuard
     },
    SessionSerializer
] 
})
export class ProductsModule {}
