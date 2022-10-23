import { Body, Controller, Inject, Post, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { addProductDto } from 'src/Dto/products.dto';
import { Role } from 'src/Utilites/types/role.enum';
import { Roles } from 'src/Utilites/types/roles.decorator';
import { ProductsSellerService } from './productsSeller.service';

@Controller('products')
export class ProductsSellerController {
    constructor(@Inject('SELLER_SERVICE') private readonly sellerService:ProductsSellerService){}
 

    // ADD PRODUCTS 
    @Post('add')
    @UsePipes(ValidationPipe)
    @Roles(Role.SELLER)
    async addProducts(@Request() req,@Body() addproductsDto:addProductDto){
           
         
           return this.sellerService.addProducts(req.user.id,addproductsDto);
    }
}
