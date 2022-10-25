import { BadRequestException, HttpException, HttpStatus,Inject,Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/Entites/categories.entity';
import { Products } from 'src/Entites/products.entity';
import { UserService } from 'src/Users/signup/user.service';
import { addProductParam, updateProductParam } from 'src/Utilites/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsSellerService {
    constructor(@InjectRepository(Products) private readonly productsRepository:Repository<Products>,
    @InjectRepository(Category) private readonly categoryRepository:Repository<Category>,
    @Inject("USER_SERVICE") private readonly userService:UserService){}



     private async  addCategory(categoryName:string){
        const duplicatedCategory =await this.categoryRepository.findOneBy({categoryName});
        if(duplicatedCategory) {
            return duplicatedCategory}
        
        const category= this.categoryRepository.create({categoryName});
        await this.categoryRepository.save(category);
        return category
    }


   async addProducts(id:number,addProductParam:addProductParam){
    const seller= await this.userService.findUserById(id);
    if(!seller){
        throw new HttpException("Invalid Seller ID ",HttpStatus.NOT_FOUND)
    }
    
    const {categoryName,...details}= addProductParam;

   
    const category= await this.addCategory(categoryName)

    const product= this.productsRepository.create({...details,category,seller,sellerId:seller.id,categoryName:categoryName});
    
     return this.productsRepository.save(product)
    }


  
   private async userCheck(userId:number,productId:number){
        const product=await this.productsRepository.findOneBy({id:productId,sellerId:userId})
        if (!product){
            throw new BadRequestException('You Cant Edit This Product!')
        }

    }

    async editProduct(userId:number,id:number,updateProductParam:updateProductParam){
       await this.userCheck(userId,id)
      return  this.productsRepository.update({id},{...updateProductParam})
    }

    async removeProduct(userId:number,id:number){
        this.userCheck(userId,id)
        return this.productsRepository.delete(id)
    }
    
}
