import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductHistory } from 'src/Entites/productHistory.entity';
import { Products } from 'src/Entites/products.entity';
import { UserService } from 'src/Users/signup/user.service';
import { boughtProductParam } from 'src/Utilites/types/types';
import {  Repository } from 'typeorm';

@Injectable()
export class ProductsBuyerService {
    constructor(@InjectRepository(Products) private readonly productsRepository:Repository<Products>,
    @InjectRepository(ProductHistory) private readonly productHistoryRepository:Repository<ProductHistory>,
    @Inject("USER_SERVICE") private readonly userService:UserService){}

    //searching Products by ID
   async searchProductById(id:number){
      const product= await  this.productsRepository.findOneBy({id});
      if(!product){
        throw new HttpException('Product not found',HttpStatus.NOT_FOUND)
      }
      return product;
    }

    //searching Products by name
    async searchProductByName(name:string){
        const product= await this.productsRepository.findOneBy({name}) 
        if(!product){
            throw new HttpException('Product not found ',HttpStatus.NOT_FOUND)
        }
        return product
    }

    // buying products 
    async buyingProduct(id:number,boughtProductParam:boughtProductParam){
        const user = await this.userService.findUserById(id);
        if(!user){
            throw new HttpException('User Not Found!',HttpStatus.NOT_FOUND)
        }
        const product= this.productHistoryRepository.create({...boughtProductParam,dateOfPurchase:new Date(),user})
        
        return this.productHistoryRepository.save(product)
        
    }

    // Product history
    async getProductsHistory(id:number){
        const userId = await this.userService.findUserById(id)
        console.log("service");
        
       return this.productHistoryRepository.find({where:{user:userId}})
    }

}
