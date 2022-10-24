import { HttpException, HttpStatus,Inject,Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/Entites/categories.entity';
import { Products } from 'src/Entites/products.entity';
import { UserService } from 'src/Users/signup/user.service';
import { addProductParam } from 'src/Utilites/utils/types';
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
        const saveCategory= await this.categoryRepository.save(category);
        return category
    }


   async addProducts(id:number,addProductParam:addProductParam){
    const seller= await this.userService.findUserById(id);
    if(!seller){
        throw new HttpException("Invalid Seller ID ",HttpStatus.NOT_FOUND)
    }
    const {categoryName,...details}= addProductParam;

   
    const category= await this.addCategory(categoryName)

    const product= this.productsRepository.create({...details,category,seller});

     return this.productsRepository.save(product)
    }


    
}
