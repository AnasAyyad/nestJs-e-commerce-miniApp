import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/Entites/categories.entity';
import { ProductHistory } from 'src/Entites/productHistory.entity';
import { Products } from 'src/Entites/products.entity';
import { Users } from 'src/Entites/users.entity';
import { UserService } from 'src/Users/signup/user.service';
import { ProductsBuyerController } from './buyer/productsBuyer.controller';
import { ProductsBuyerService } from './buyer/productsBuyer.service';
import { ProductsSellerController } from './seller/productsSeller.controller';
import { ProductsSellerService } from './seller/productsSeller.service';
import { JwtStrategy } from 'src/Utilites/strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Category,ProductHistory,Products,Users]),
            PassportModule],
            
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
     },
    JwtStrategy
] 
})
export class ProductsModule {}
